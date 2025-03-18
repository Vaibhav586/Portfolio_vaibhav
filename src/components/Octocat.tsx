import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Octocat = () => {
  const mesh = React.useRef<THREE.Mesh>(null!);

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial
        color="#171515"
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  );
};