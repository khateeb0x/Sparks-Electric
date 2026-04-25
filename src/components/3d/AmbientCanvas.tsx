"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function AmbientObject({ scrollYRef }: { scrollYRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const colorA = useMemo(() => new THREE.Color("#f97316"), []);
  const colorB = useMemo(() => new THREE.Color("#fbbf24"), []);
  const tmp = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return;
    const t = state.clock.getElapsedTime();
    const docH = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const p = Math.min(1, Math.max(0, scrollYRef.current / docH));

    const speed = 0.18 - p * 0.12;
    meshRef.current.rotation.y = t * speed;
    meshRef.current.rotation.x = Math.sin(t * speed * 0.6) * 0.4;

    meshRef.current.position.x = Math.sin(t * 0.05 + p * Math.PI) * 1.2;
    meshRef.current.position.y = -1.5 + p * 3.0;

    tmp.copy(colorA).lerp(colorB, p);
    matRef.current.color.copy(tmp);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.6, 1]} />
      <meshBasicMaterial
        ref={matRef}
        wireframe
        transparent
        opacity={0.55}
        toneMapped={false}
      />
    </mesh>
  );
}

function ScrollSync({
  scrollYRef,
}: {
  scrollYRef: React.MutableRefObject<number>;
}) {
  useFrame(() => {
    scrollYRef.current = window.scrollY || window.pageYOffset || 0;
  });
  return null;
}

export default function AmbientCanvas() {
  const [visible, setVisible] = useState(true);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[-1] h-screen w-screen"
      style={{ opacity: 0.32 }}
    >
      {visible && (
        <Canvas
          dpr={[1, 1.25]}
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
          frameloop="always"
          style={{ background: "transparent" }}
        >
          <ScrollSync scrollYRef={scrollYRef} />
          <AmbientObject scrollYRef={scrollYRef} />
          <Stars
            radius={40}
            depth={50}
            count={1200}
            factor={2}
            fade
            speed={0.15}
          />
        </Canvas>
      )}
    </div>
  );
}
