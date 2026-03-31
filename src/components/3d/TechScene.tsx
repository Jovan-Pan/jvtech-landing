'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface TechItem {
  name: string;
  position: [number, number, number];
  color: string;
}

function TechNode({ name, position, color }: TechItem) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={ref}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Sora-Bold.ttf"
        >
          {name}
        </Text>
      </group>
    </Float>
  );
}

function OrbitalRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      ref.current.rotation.z = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[3, 0.02, 16, 100]} />
      <meshBasicMaterial color="#00D4FF" transparent opacity={0.3} />
    </mesh>
  );
}

const techItems: TechItem[] = [
  { name: 'AWS', position: [2, 0, 0], color: '#FF9900' },
  { name: 'React', position: [-2, 0, 0], color: '#61DAFB' },
  { name: 'Node.js', position: [0, 2, 0], color: '#339933' },
  { name: 'Python', position: [0, -2, 0], color: '#3776AB' },
  { name: 'Docker', position: [1.4, 1.4, 0], color: '#2496ED' },
  { name: 'K8s', position: [-1.4, -1.4, 0], color: '#326CE5' },
];

export default function TechScene() {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <OrbitalRing />
        {techItems.map((item) => (
          <TechNode key={item.name} {...item} />
        ))}
      </Canvas>
    </div>
  );
}
