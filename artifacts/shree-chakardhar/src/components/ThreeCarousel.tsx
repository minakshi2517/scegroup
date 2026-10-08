"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame, Canvas } from "@react-three/fiber";
import {
  Float,
  Environment,
  Box,
  Torus,
  Sphere,
} from "@react-three/drei";
import * as THREE from "three";
import { getVehicle, type Vehicle } from "@/data/vehicles";
import { CanvasErrorBoundary, supportsWebGL } from "@/components/CanvasErrorBoundary";

type ThreeCarouselProps = {
  autoRotate?: boolean;
  autoPlay?: boolean;
  onCarChange?: (car: Vehicle) => void;
};

function CarRing({
  car,
  index,
  total,
  isActive,
}: {
  car: Vehicle;
  index: number;
  total: number;
  isActive: boolean;
}) {
  const group = useRef<THREE.Group>(null!);

  const angle =
    (index / total) * Math.PI * 2 - Math.PI / 2;

  useFrame((state) => {
    if (!group.current) return;

    const t = state.clock.elapsedTime;

    group.current.rotation.y = t * 0.06;

    group.current.position.x =
      Math.cos(angle) * 1.4;

    group.current.position.z =
      Math.sin(angle) * 1.4;

    group.current.rotation.x =
      Math.sin(t * 0.5) * 0.08;
  });

  return (
    <group ref={group}>
      {/* Main car */}
      <Float
        speed={2.2}
        floatIntensity={0.06}
      >
        <group>
          {/* Car body */}
          <Box
            args={[0.55, 0.3, 0.3]}
            position={[0, 0.15, 0]}
            rotation={[-0.12, 0, 0.05]}
          >
            <meshStandardMaterial
              color="#d4b98a"
              roughness={0.45}
              metalness={0.3}
            />
          </Box>

          {/* Hood */}
          <Box
            args={[0.12, 0.1, 0.32]}
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
            args={[0.14, 0.12, 0.3]}
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
              position={[
                side * 0.33,
                0.04,
                0,
              ]}
            >
              <Torus
                args={[
                  0.04,
                  0.016,
                  12,
                  24,
                ]}
                rotation={[0.08, 0, 0]}
                scale={[
                  1,
                  1,
                  side * 0.26,
                ]}
              >
                <meshStandardMaterial
                  color="#3a332c"
                  roughness={0.9}
                  metalness={0.05}
                />
              </Torus>

              <Torus
                args={[
                  0.024,
                  0.008,
                  10,
                  20,
                ]}
                rotation={[0.08, 0, 0]}
                scale={[
                  1,
                  1,
                  side * 0.16,
                ]}
                position={[
                  0,
                  0,
                  side * 0.18,
                ]}
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
            args={[0.012, 12, 12]}
            position={[0.16, 0.07, -0.13]}
          >
            <meshStandardMaterial
              color="#f4d98a"
              emissive="#f4d98a"
              emissiveIntensity={0.6}
            />
          </Sphere>

          <Sphere
            args={[0.012, 12, 12]}
            position={[-0.16, 0.07, -0.13]}
          >
            <meshStandardMaterial
              color="#f4d98a"
              emissive="#f4d98a"
              emissiveIntensity={0.6}
            />
          </Sphere>

          {/* Underglow */}
          <Torus
            args={[
              0.7,
              0.014,
              16,
              40,
            ]}
            position={[0, -0.02, 0]}
          >
            <meshStandardMaterial
              color="#b8924a"
              emissive="#b8924a"
              emissiveIntensity={
                isActive ? 0.9 : 0.3
              }
            />
          </Torus>
        </group>
      </Float>

      {/* Orbit band */}
      {index % 2 === 0 && (
        <mesh rotation-x={-Math.PI / 2}>
          <sphereGeometry
            args={[1.5, 24, 24]}
          />

          <meshStandardMaterial
            color={
              isActive
                ? "#b8924a"
                : "#1f2937"
            }
            roughness={0.9}
            metalness={0.05}
            transparent
            opacity={
              isActive ? 0.25 : 0.08
            }
          />
        </mesh>
      )}
    </group>
  );
}

/* -------------------------------------------
   Scene rotation component
   IMPORTANT:
   This component is rendered INSIDE Canvas.
-------------------------------------------- */

function CarouselScene({
  car,
  current,
  total,
  autoRotate,
}: {
  car: Vehicle;
  current: number;
  total: number;
  autoRotate: boolean;
}) {
  const frame = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!frame.current) return;

    frame.current.rotation.y =
      state.clock.elapsedTime *
      (autoRotate ? 0.12 : 0);
  });

  return (
    <>
      {/* Background */}
      <color
        attach="background"
        args={["#0c1016"]}
      />

      {/* Fog */}
      <fog
        attach="fog"
        args={[
          "#0c1016",
          3,
          8,
        ]}
      />

      {/* Environment */}
      <Environment preset="city" />

      {/* Lighting */}
      <ambientLight intensity={0.3} />

      <spotLight
        position={[5, 10, 5]}
        angle={0.35}
        penumbra={0.6}
        intensity={1.8}
      />

      <pointLight
        position={[-4, 3, -3]}
        intensity={0.5}
        color="#b8924a"
      />

      {/* Car */}
      <group ref={frame}>
        <CarRing
          car={car}
          index={current}
          total={total}
          isActive={true}
        />
      </group>
    </>
  );
}

export function ThreeCarousel({
  autoRotate = true,
  autoPlay = true,
  onCarChange,
}: ThreeCarouselProps) {
  const [current, setCurrent] =
    useState(0);
  const webglAvailable = useMemo(supportsWebGL, []);

  const total = 4;

  const car = getVehicle("venue-2026");

  /*
   * Prevent the Three.js scene from crashing
   * if the vehicle does not exist.
   */
  if (!car) {
    return (
      <div className="relative h-[520px] w-full overflow-hidden bg-ink flex items-center justify-center">
        <p className="text-sm uppercase tracking-[0.15em] text-white/50">
          Vehicle unavailable
        </p>
      </div>
    );
  }

  if (!webglAvailable) {
    return (
      <div className="relative h-full min-h-[420px] w-full overflow-hidden bg-ink">
        <img
          src={car.image}
          alt={`${car.name} ${car.year}`}
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/20" />
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[420px] w-full overflow-hidden bg-ink">
      <CanvasErrorBoundary
        fallback={
          <div className="absolute inset-0 bg-ink">
            <img
              src={car.image}
              alt={`${car.name} ${car.year}`}
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/20" />
          </div>
        }
      >
        <Canvas
          dpr={[1, 2]}
          frameloop="always"
          gl={{
            antialias: true,
            alpha: true,
          }}
          camera={{
            position: [0, 1.2, 4.5],
            fov: 45,
          }}
          className="size-full"
        >
          <CarouselScene
            car={car}
            current={current}
            total={total}
            autoRotate={autoRotate}
          />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
