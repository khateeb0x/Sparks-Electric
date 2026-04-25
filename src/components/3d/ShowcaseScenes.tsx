"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ============================================================
   Reusable canvas wrapper — keeps perf consistent
   ============================================================ */
function MiniCanvas({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ background: "transparent" }}
    >
      <color attach="background" args={["#050507"]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#f97316" />
      <pointLight position={[-2, -2, -1]} intensity={1.0} color="#fbbf24" />
      <Suspense fallback={null}>
        {children}
        <Environment preset="warehouse" />
      </Suspense>
      <EffectComposer>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.5}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}

/* ============================================================
   Scene 1 — EV charger plug (cylindrical body + handle + cord)
   ============================================================ */
function EVPlug() {
  const groupRef = useRef<THREE.Group>(null);
  const tipRef = useRef<THREE.Mesh>(null);

  const cordCurve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      points.push(
        new THREE.Vector3(
          Math.sin(t * Math.PI * 1.5) * 0.6,
          -1.2 - t * 1.0,
          Math.cos(t * Math.PI * 1.5) * 0.4
        )
      );
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.4;
    if (tipRef.current) {
      const pulse = 1 + Math.sin(t * 4) * 0.5;
      const mat = tipRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2 + pulse;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef} position={[0, 0.4, 0]}>
        {/* Plug body */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.85, 32]} />
          <meshStandardMaterial color="#1e1e24" metalness={0.7} roughness={0.35} />
        </mesh>
        {/* Front cap with prongs */}
        <mesh position={[0, 0.92, 0]}>
          <cylinderGeometry args={[0.45, 0.42, 0.18, 32]} />
          <meshStandardMaterial color="#0d0d12" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Three prongs (J1772-ish) */}
        {[
          [-0.18, 1.06, 0],
          [0.18, 1.06, 0],
          [0, 1.06, 0.18],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <cylinderGeometry args={[0.04, 0.04, 0.12, 16]} />
            <meshStandardMaterial color="#cbd5e1" metalness={1} roughness={0.15} />
          </mesh>
        ))}
        {/* Glowing tip indicator */}
        <mesh ref={tipRef} position={[0, 1.18, 0]}>
          <sphereGeometry args={[0.08, 24, 24]} />
          <meshStandardMaterial
            color="#f97316"
            emissive="#f97316"
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
        {/* Handle grip */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.32, 0.36, 0.55, 32]} />
          <meshStandardMaterial color="#27272a" metalness={0.5} roughness={0.6} />
        </mesh>
        {/* Cord */}
        <mesh>
          <tubeGeometry args={[cordCurve, 60, 0.07, 12, false]} />
          <meshStandardMaterial color="#1f1f25" metalness={0.3} roughness={0.7} />
        </mesh>
      </group>
    </Float>
  );
}

/* ============================================================
   Scene 2 — Edison bulb (proper teardrop silhouette + filament)
   ============================================================ */
function EdisonBulb() {
  const filamentRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const filamentCurve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const turns = 6;
    const segments = 80;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * Math.PI * 2 * turns;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * 0.18,
          (t - 0.5) * 0.45,
          Math.sin(angle) * 0.18
        )
      );
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (filamentRef.current) {
      filamentRef.current.rotation.y = t * 0.5;
      const flicker = 1 + Math.sin(t * 12) * 0.06 + Math.sin(t * 27) * 0.03;
      filamentRef.current.scale.setScalar(flicker);
    }
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.4 + Math.sin(t * 8) * 0.05;
    }
  });

  return (
    <Float speed={1.0} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={[0, 0, 0]}>
        {/* Bulb glass — teardrop via lathe */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.7, 48, 48]} />
          <meshPhysicalMaterial
            color="#fff8d6"
            transmission={0.92}
            thickness={0.4}
            roughness={0.05}
            ior={1.5}
            clearcoat={1}
            emissive="#fbbf24"
            emissiveIntensity={0.5}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Glass neck */}
        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[0.32, 0.42, 0.25, 24]} />
          <meshPhysicalMaterial
            color="#fff8d6"
            transmission={0.85}
            thickness={0.3}
            roughness={0.08}
            transparent
            opacity={0.7}
          />
        </mesh>
        {/* Filament holder posts */}
        <mesh position={[-0.04, -0.05, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.5, 8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.4} />
        </mesh>
        <mesh position={[0.04, -0.05, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.5, 8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.4} />
        </mesh>
        {/* Filament — coiled glowing curve */}
        <group ref={filamentRef}>
          <mesh>
            <tubeGeometry args={[filamentCurve, 200, 0.012, 8, false]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#fbbf24"
              emissiveIntensity={6}
              toneMapped={false}
            />
          </mesh>
          <pointLight color="#fbbf24" intensity={2.5} distance={3} decay={2} />
        </group>
        {/* Brass screw base */}
        <mesh position={[0, -1.0, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.35, 32]} />
          <meshStandardMaterial color="#a16207" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* Base contact */}
        <mesh position={[0, -1.22, 0]}>
          <cylinderGeometry args={[0.18, 0.32, 0.12, 24]} />
          <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

/* ============================================================
   Scene 3 — Lightning bolt (extruded zig-zag with arc particles)
   ============================================================ */
function LightningBolt() {
  const boltRef = useRef<THREE.Mesh>(null);
  const sparksRef = useRef<THREE.Group>(null);

  const boltGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0.15, 1.1);
    shape.lineTo(-0.35, 0.15);
    shape.lineTo(-0.05, 0.05);
    shape.lineTo(-0.4, -1.1);
    shape.lineTo(0.4, 0.05);
    shape.lineTo(0.05, 0.15);
    shape.lineTo(0.55, 0.95);
    shape.lineTo(0.15, 1.1);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (boltRef.current) {
      boltRef.current.rotation.y = Math.sin(t * 0.6) * 0.6;
      boltRef.current.rotation.z = Math.sin(t * 0.4) * 0.12;
      const pulse = 1 + Math.sin(t * 8) * 0.04;
      const mat = boltRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 4 + Math.sin(t * 12) * 1.5 * pulse;
    }
    if (sparksRef.current) {
      sparksRef.current.children.forEach((child, i) => {
        const offset = i * 0.6;
        child.position.x = Math.cos(t * 1.5 + offset) * (0.9 + i * 0.08);
        child.position.y = Math.sin(t * 1.2 + offset) * 0.8;
        child.position.z = Math.sin(t * 0.8 + offset) * 0.5;
      });
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
      <group>
        <mesh ref={boltRef} geometry={boltGeometry} castShadow>
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#f97316"
            emissiveIntensity={4}
            metalness={0.5}
            roughness={0.2}
            toneMapped={false}
          />
        </mesh>
        <group ref={sparksRef}>
          {Array.from({ length: 6 }).map((_, i) => (
            <mesh key={i}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshStandardMaterial
                color="#f97316"
                emissive="#f97316"
                emissiveIntensity={3}
                toneMapped={false}
              />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
}

/* ============================================================
   Exported wrappers — one per card
   ============================================================ */
export function EVPlugScene() {
  return (
    <MiniCanvas>
      <EVPlug />
    </MiniCanvas>
  );
}

export function EdisonBulbScene() {
  return (
    <MiniCanvas>
      <EdisonBulb />
    </MiniCanvas>
  );
}

export function LightningBoltScene() {
  return (
    <MiniCanvas>
      <LightningBolt />
    </MiniCanvas>
  );
}

/* keep one unused import alive for reference */
void MeshDistortMaterial;
