import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COLORS = [
  '#6366f1', // indigo
  '#0ea5e9', // sky
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
];

function FloatingMesh({ color, hovered }: { color: string; hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const targetScale = hovered ? 1.15 : 0.85;

  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta * 0.3;
    meshRef.current.rotation.y += delta * 0.5;
    const s = meshRef.current.scale.x;
    const next = THREE.MathUtils.lerp(s, targetScale, delta * 4);
    meshRef.current.scale.setScalar(next);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={hovered ? 0.9 : 0.5}
      />
    </mesh>
  );
}

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  colorIndex: number;
}

export default function ProjectCard({ title, description, tags, colorIndex }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const color = COLORS[colorIndex % COLORS.length];

  return (
    <div
      className="group relative rounded-2xl border border-slate-100 bg-white overflow-hidden transition-all duration-300 hover:border-slate-200 hover:shadow-lg hover:-translate-y-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Three.js Canvas */}
      <div className="h-48 bg-slate-950 relative overflow-hidden">
        <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1} />
          <FloatingMesh color={color} hovered={hovered} />
        </Canvas>
        <div
          className="absolute inset-0 opacity-20 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color}40, transparent 70%)`,
            opacity: hovered ? 0.4 : 0.15,
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
