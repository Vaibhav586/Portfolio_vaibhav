import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Octocat } from './Octocat';

export const GithubLogo = () => {
  return (
    <div className="h-[300px] w-[300px]">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Octocat />
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
};