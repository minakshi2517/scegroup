"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Box,
  Environment,
  Float,
  Sphere,
  Torus,
} from "@react-three/drei";
import * as THREE from "three";
import { CanvasErrorBoundary, supportsWebGL } from "@/components/CanvasErrorBoundary";

type Car3DProps = {
  car: {
    name: string;
    year: string;
    body: string;
    pricePerDay: number;
    seats: number;
    fuel: string;
    transmission: string;
    image: string;
  };
  className?: string;
};

// Clean stylized low-poly car
function CarMesh({ car }: { car: Car3DProps["car"] }) {
  const mesh = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!mesh.current) return;

    mesh.current.rotation.y = state.clock.elapsedTime * 0.18;

    mesh.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.6) * 0.06;

    mesh.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.4) * 0.04;
  });

  return (
    <group ref={mesh}>
      {/* Ground shadow / glow */}
      <Sphere args={[0.32, 32, 32]}>
        <meshStandardMaterial
          color="#b8924a"
          roughness={0.8}
          metalness={0.1}
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </Sphere>

      {/* Car body */}
      <group position={[0, 0.02, 0]}>
        {/* Roof + cabin */}
        <Box
          args={[0.34, 0.24, 0.22]}
          position={[0, 0.2, 0]}
          rotation={[-0.12, 0, 0.05]}
        >
          <meshStandardMaterial
            color="#d4b98a"
            roughness={0.4}
            metalness={0.3}
          />
        </Box>

        {/* Hood */}
        <Box
          args={[0.1, 0.1, 0.28]}
          position={[0.28, 0.05, 0]}
          rotation={[0.18, 0, 0]}
        >
          <meshStandardMaterial
            color="#a8876b"
            roughness={0.7}
            metalness={0.2}
          />
        </Box>

        {/* Rear */}
        <Box
          args={[0.12, 0.12, 0.26]}
          position={[-0.28, 0.04, 0]}
          rotation={[0.16, 0, 0]}
        >
          <meshStandardMaterial
            color="#a8876b"
            roughness={0.7}
            metalness={0.2}
          />
        </Box>

        {/* Wheels */}
        {([-1, 1] as const).map((side) => (
          <group
            key={side}
            position={[side * 0.33, 0.04, 0]}
          >
            <Torus
              args={[0.038, 0.016, 12, 24]}
              rotation={[0.08, 0, 0]}
              scale={[1, 1, side * 0.26]}
            >
              <meshStandardMaterial
                color="#3a332c"
                roughness={0.9}
                metalness={0.05}
              />
            </Torus>

            <Torus
              args={[0.022, 0.008, 10, 20]}
              rotation={[0.08, 0, 0]}
              scale={[1, 1, side * 0.16]}
              position={[0, 0, side * 0.18]}
            >
              <meshStandardMaterial
                color="#5a5246"
                roughness={0.95}
                metalness={0.1}
              />
            </Torus>
          </group>
        ))}

        {/* Headlights */}
        <Sphere
          args={[0.01, 12, 12]}
          position={[0.14, 0.06, -0.12]}
        >
          <meshStandardMaterial
            color="#f4d98a"
            emissive="#f4d98a"
            emissiveIntensity={0.6}
          />
        </Sphere>

        <Sphere
          args={[0.01, 12, 12]}
          position={[-0.14, 0.06, -0.12]}
        >
          <meshStandardMaterial
            color="#f4d98a"
            emissive="#f4d98a"
            emissiveIntensity={0.6}
          />
        </Sphere>
      </group>

      {/* Underglow */}
      <Torus
        args={[0.5, 0.012, 16, 40]}
        position={[0, -0.02, 0]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#b8924a"
          emissive="#b8924a"
          emissiveIntensity={0.3}
        />
      </Torus>
    </group>
  );
}

export function Car3D({
  car,
  className = "",
}: Car3DProps) {
  const webglAvailable = useMemo(supportsWebGL, []);
  const fallback = (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <img
        src={car.image}
        alt={`${car.name} ${car.year}`}
        className="h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/15" />
    </div>
  );

  if (!webglAvailable) {
    return <div className={`relative h-full w-full ${className}`}>{fallback}</div>;
  }

  return (
    <div className={`relative h-full w-full ${className}`}>
      <CanvasErrorBoundary
        fallback={fallback}
      >
        <Canvas
          dpr={[1, 2]}
          frameloop="always"
          gl={{
            antialias: true,
            alpha: true,
          }}
          className="size-full"
        >
          <color attach="background" args={["#0c1016"]} />

          <fog
            attach="fog"
            args={["#0c1016", 4, 12]}
          />

          <Environment preset="city" />

          <spotLight
            position={[5, 8, 5]}
            angle={0.3}
            penumbra={0.6}
            intensity={1.6}
          />

          <ambientLight intensity={0.25} />

          <Float
            speed={1.6}
            floatIntensity={0.04}
          >
            <CarMesh car={car} />
          </Float>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}