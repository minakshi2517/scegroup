"use client";

import { useRef } from "react";
import { useFrame, Canvas } from "@react-three/fiber";
import { Float, Environment, Box, Torus, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { vehicles } from "@/data/vehicles";

type Fleet3DProps = {
  cars: typeof vehicles;
  activeSlug: string;
};

function CarRing({ car, index, total, activeSlug }: { car: typeof vehicles[0]; index: number; total: number; activeSlug: string }) {
  const group = useRef<THREE.Group>(null);
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.04;
    group.current.position.x = Math.cos(angle) * 2.8;
    group.current.position.z = Math.sin(angle) * 2.8;
    group.current.rotation.x = Math.sin(t * 0.5) * 0.06;
  });

  return (
    <group ref={group}>
      {/* Main car */}
      <Float speed={1.8} floatIntensity={0.05}>
        <group>
          <meshStandardMaterial color="#d4b98a" roughness={0.45} metalness={0.3} />
          <group>
            <Box args={[0.42, 0.26, 0.22]} position={[0, 0.13, 0]} rotation={[-0.12, 0, 0.05]} />
            <Box args={[0.08, 0.08, 0.24]} position={[0.22, 0.04, 0]} rotation={[0.18, 0, 0]} />
            <Box args={[0.09, 0.09, 0.22]} position={[-0.22, 0.03, 0]} rotation={[0.16, 0, 0]} />
            {([-1, 1] as const).map((side) => (
              <group key={side} position={[(side * 0.26) + side * 0.01, 0.03, 0]}>
                <Torus args={[0.032, 0.012, 12, 24]} rotation={[0.08, 0, 0]} scale={[1, 1, side * 0.22]}>
                  <meshStandardMaterial color="#3a332c" roughness={0.9} metalness={0.05} />
                </Torus>
                <Torus args={[0.018, 0.006, 10, 20]} rotation={[0.08, 0, 0]} scale={[1, 1, side * 0.14]} position={[0, 0, side * 0.15]}>
                  <meshStandardMaterial color="#5a5246" roughness={0.95} metalness={0.1} />
                </Torus>
              </group>
            ))}
            <Sphere args={[0.01, 12, 12]} position={[0.13, 0.05, -0.11]}>
              <meshStandardMaterial color="#f4d98a" emissive="#f4d98a" emissiveIntensity={0.5} />
            </Sphere>
            <Sphere args={[0.01, 12, 12]} position={[-0.13, 0.05, -0.11]}>
              <meshStandardMaterial color="#f4d98a" emissive="#f4d98a" emissiveIntensity={0.5} />
            </Sphere>
          </group>
          <Torus args={[0.55, 0.012, 16, 40]} position={[0, -0.015, 0]}>
            <meshStandardMaterial color="#b8924a" emissive="#b8924a" emissiveIntensity={0.25} />
          </Torus>
        </group>
      </Float>

      {/* Orbit ring (subtle) */}
      <mesh rotation-x={-Math.PI / 2}>
        <sphereGeometry args={[1.3, 20, 20]} />
        <meshStandardMaterial
          color={activeSlug === car.slug ? "#b8924a" : "#1f2937"}
          roughness={0.9}
          metalness={0.05}
          transparent
          opacity={activeSlug === car.slug ? 0.3 : 0.06}
        />
      </mesh>
    </group>
  );
}

export function Fleet3D({ cars, activeSlug }: Fleet3DProps) {
  const frame = useRef<THREE.Group>(null);

  return (
    <div className="relative w-full overflow-hidden bg-ink">
      <Canvas dpr={[1, 2]} frameloop="always" gl={{ antialias: true, alpha: true }} className="size-full">
        <color attach="background" args={["#0c1016"]} />
        <fog attach="fog" args={["#0c1016", 2, 6]} />
        <Environment preset="city" />
        <ambientLight intensity={0.25} />
        <spotLight position={[6, 8, 6]} angle={0.3} penumbra={0.6} intensity={1.4} />

        <group ref={frame}>
          {cars.map((car, i) => (
            <CarRing key={car.slug} car={car} index={i} total={cars.length} activeSlug={activeSlug} />
          ))}
        </group>
      </Canvas>
    </div>
  );
}

