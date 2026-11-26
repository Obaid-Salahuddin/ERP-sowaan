"use client";

import { Float, MeshDistortMaterial, RoundedBox, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

/** SowaanERP palette */
const C = {
  purple: "#583474",
  purpleMid: "#75429c",
  purpleLight: "#9b6fbf",
  lilac: "#c2a6d6",
  mist: "#f4f0f7",
  red: "#ef2d28",
  white: "#ffffff",
};

// Six orbiting "modules": finance, inventory, CRM, purchasing, HR, projects
const MODULE_COLORS = [C.red, C.white, C.purpleLight, C.red, C.lilac, C.white];
const ORBIT_RADIUS = 2.6;

function Core() {
  const wire = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (!wire.current) return;
    wire.current.rotation.y += dt * 0.15;
    wire.current.rotation.x += dt * 0.05;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh>
        <sphereGeometry args={[1.05, 96, 96]} />
        <MeshDistortMaterial color={C.purpleMid} distort={0.35} speed={2} roughness={0.15} metalness={0.35} />
      </mesh>
      <mesh ref={wire}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color={C.lilac} wireframe transparent opacity={0.28} />
      </mesh>
    </Float>
  );
}

function Modules() {
  const orbit = useRef<Group>(null);
  useFrame((_, dt) => {
    if (orbit.current) orbit.current.rotation.y += dt * 0.25;
  });

  return (
    <group rotation={[0.35, 0, -0.15]}>
      {/* orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[ORBIT_RADIUS, 0.012, 16, 200]} />
        <meshBasicMaterial color={C.purpleLight} transparent opacity={0.6} />
      </mesh>
      <group ref={orbit}>
        {MODULE_COLORS.map((color, i) => {
          const a = (i / MODULE_COLORS.length) * Math.PI * 2;
          return (
            <Float key={i} speed={2 + i * 0.3} rotationIntensity={1.5} floatIntensity={0.6}>
              <RoundedBox
                args={[0.42, 0.42, 0.42]}
                radius={0.08}
                smoothness={4}
                position={[Math.cos(a) * ORBIT_RADIUS, 0, Math.sin(a) * ORBIT_RADIUS]}
              >
                <meshStandardMaterial
                  color={color}
                  roughness={0.25}
                  metalness={0.2}
                  emissive={color === C.red ? C.red : C.purple}
                  emissiveIntensity={color === C.red ? 0.35 : 0.08}
                />
              </RoundedBox>
            </Float>
          );
        })}
      </group>
      {/* second, tilted ring for depth */}
      <mesh rotation={[Math.PI / 2.6, 0.5, 0]}>
        <torusGeometry args={[ORBIT_RADIUS + 0.5, 0.006, 16, 200]} />
        <meshBasicMaterial color={C.lilac} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/** Tilts the whole scene gently toward the mouse pointer. */
function PointerParallax({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null);
  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const k = Math.min(1, dt * 3);
    const px = Math.max(-1, Math.min(1, state.pointer.x));
    const py = Math.max(-1, Math.min(1, state.pointer.y));
    g.rotation.x += (-py * 0.25 - g.rotation.x) * k;
    g.rotation.y += (px * 0.4 - g.rotation.y) * k;
  });
  return <group ref={group}>{children}</group>;
}

export default function ErpCoreScene({ active = true, compact = false }: { active?: boolean; compact?: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "demand"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, compact ? 8 : 7], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      fallback={null}
      // Track the pointer across the whole page so the scene reacts even when text overlaps it.
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
      aria-hidden
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 5]} intensity={2.2} />
      <pointLight position={[-4, -2, 3]} intensity={30} color={C.red} distance={12} />
      <pointLight position={[3, 3, -2]} intensity={20} color={C.lilac} distance={12} />

      <PointerParallax>
        <Core />
        <Modules />
      </PointerParallax>

      <Sparkles count={compact ? 40 : 80} scale={[9, 6, 6]} size={2.2} speed={0.4} color={C.mist} opacity={0.8} />
    </Canvas>
  );
}
