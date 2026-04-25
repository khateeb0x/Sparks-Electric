"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  MeshDistortMaterial,
  Float,
  Sparkles,
  Stars,
} from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

function EnergyCore() {
  const matRef = useRef<THREE.Mesh>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);
  const ringCRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (matRef.current) {
      matRef.current.rotation.y = t * 0.25;
      matRef.current.rotation.x = Math.sin(t * 0.5) * 0.15;
    }
    if (ringARef.current) {
      ringARef.current.rotation.x = t * 0.6;
      ringARef.current.rotation.y = t * 0.3;
    }
    if (ringBRef.current) {
      ringBRef.current.rotation.x = -t * 0.4;
      ringBRef.current.rotation.z = t * 0.7;
    }
    if (ringCRef.current) {
      ringCRef.current.rotation.y = -t * 0.5;
      ringCRef.current.rotation.z = -t * 0.3;
    }
  });

  return (
    <group>
      <mesh ref={matRef}>
        <icosahedronGeometry args={[1.1, 8]} />
        <MeshDistortMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={2}
          roughness={0.15}
          metalness={0.4}
          distort={0.45}
          speed={2.2}
          toneMapped={false}
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[1.18, 2]} />
        <meshBasicMaterial
          color="#fbbf24"
          wireframe
          transparent
          opacity={0.35}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={ringARef}>
        <torusGeometry args={[1.7, 0.012, 8, 128]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={6}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={ringBRef}>
        <torusGeometry args={[2.1, 0.01, 8, 128]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={5}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={ringCRef}>
        <torusGeometry args={[2.5, 0.008, 8, 128]} />
        <meshStandardMaterial
          color="#fb923c"
          emissive="#fb923c"
          emissiveIntensity={4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function ElectricArc({
  radius,
  speed,
  offset,
  color,
}: {
  radius: number;
  speed: number;
  offset: number;
  color: string;
}) {
  const ref = useRef<THREE.Group>(null);

  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 24;
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      const jitter = (Math.random() - 0.5) * 0.18;
      points.push(
        new THREE.Vector3(
          Math.cos(a) * (radius + jitter),
          Math.sin(a * 2) * 0.25 + jitter,
          Math.sin(a) * (radius + jitter)
        )
      );
    }
    return new THREE.CatmullRomCurve3(points, true);
  }, [radius]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * speed + offset;
    ref.current.rotation.x = Math.sin(t * speed * 0.7 + offset) * 0.4;
  });

  return (
    <group ref={ref}>
      <mesh>
        <tubeGeometry args={[curve, 100, 0.012, 8, true]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function MouseLight() {
  const ref = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.x = state.pointer.x * 4;
    ref.current.position.y = state.pointer.y * 3;
  });
  return <pointLight ref={ref} color="#fbbf24" intensity={4} distance={10} decay={2} position={[0, 0, 3]} />;
}

export default function HeroScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.2, 5.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <color attach="background" args={["#050507"]} />
      <fog attach="fog" args={["#050507", 6, 14]} />

      <ambientLight intensity={0.15} />
      <pointLight position={[3, 3, 3]} intensity={1.4} color="#f97316" />
      <pointLight position={[-3, -2, -2]} intensity={1.2} color="#fbbf24" />
      <MouseLight />

      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.5}>
          <EnergyCore />
        </Float>

        <ElectricArc radius={1.55} speed={0.6} offset={0} color="#f97316" />
        <ElectricArc radius={1.85} speed={-0.45} offset={Math.PI / 3} color="#fbbf24" />
        <ElectricArc radius={2.25} speed={0.35} offset={Math.PI / 1.5} color="#fb923c" />
        <ElectricArc radius={2.6} speed={-0.55} offset={Math.PI} color="#f59e0b" />

        <Sparkles
          count={120}
          scale={[6, 6, 6]}
          size={3}
          speed={0.4}
          color="#fbbf24"
          opacity={0.9}
        />
        <Sparkles
          count={60}
          scale={[10, 10, 10]}
          size={1.2}
          speed={0.2}
          color="#f97316"
          opacity={0.6}
        />

        <Stars
          radius={20}
          depth={40}
          count={1500}
          factor={2.5}
          fade
          speed={0.3}
        />

        <Environment preset="warehouse" />
      </Suspense>

      <EffectComposer>
        <Bloom
          intensity={1.6}
          luminanceThreshold={0.35}
          luminanceSmoothing={0.5}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0006, 0.0012] as unknown as [number, number]}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    </Canvas>
  );
}
