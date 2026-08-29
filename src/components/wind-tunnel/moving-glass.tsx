import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Props = {
  size: [number, number, number];
  closed: [number, number, number];
  open: [number, number, number];
  dropped: boolean;
};

export function MovingGlass({ size, closed, open, dropped }: Props) {
  const ref = useRef<THREE.Mesh>(null);
  const from = useRef(new THREE.Vector3(...closed));
  const to = useRef(new THREE.Vector3(...open));
  from.current.set(...closed);
  to.current.set(...open);

  useFrame((_, rawDt) => {
    const mesh = ref.current;
    if (!mesh) return;
    const dt = Math.min(rawDt, 0.05);
    const k = 1 - Math.exp(-10 * dt);
    mesh.position.lerp(dropped ? to.current : from.current, k);
  });

  return (
    <mesh ref={ref} position={closed}>
      <boxGeometry args={size} />
      <meshPhysicalMaterial
        color="#0c141c"
        metalness={0.1}
        roughness={0.06}
        transparent
        opacity={0.42}
      />
    </mesh>
  );
}
