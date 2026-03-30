import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 120;

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < COUNT; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 6,
        z: (Math.random() - 0.5) * 4 - 2,
        speed: 0.1 + Math.random() * 0.3,
        scale: 0.02 + Math.random() * 0.04,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.offset) * 0.5,
        p.y + Math.cos(t * p.speed * 0.7 + p.offset) * 0.3,
        p.z
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#94a3b8" transparent opacity={0.4} />
    </instancedMesh>
  );
}

function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null!);

  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 18; i++) {
      arr.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 2 - 2
        )
      );
    }
    return arr;
  }, []);

  const geometry = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 3.5) {
          positions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          positions.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [nodes]);

  useFrame(({ clock }) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.05) * 0.1;
      lineRef.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.03) * 0.05;
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#cbd5e1" transparent opacity={0.15} />
    </lineSegments>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Particles />
        <ConnectionLines />
      </Canvas>
    </div>
  );
}
