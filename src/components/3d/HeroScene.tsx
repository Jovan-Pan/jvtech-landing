'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    // Seeded pseudo-random to satisfy react-hooks/purity rule
    let seed = 42;
    const random = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (random() - 0.5) * 10;
      positions[i * 3 + 1] = (random() - 0.5) * 10;
      positions[i * 3 + 2] = (random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00D4FF"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function Globe() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.2;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        color="#0a192f"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

function Rings() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <group ref={ref}>
      {[2.2, 2.5, 2.8].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.01, radius, 64]} />
          <meshBasicMaterial color="#00D4FF" transparent opacity={0.2 - i * 0.05} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ParticleField />
        <Globe />
        <Rings />
      </Canvas>
    </div>
  );
}
