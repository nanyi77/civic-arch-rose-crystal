import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Grid, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { TUNNEL } from "@/lib/cfd";
import { useTunnel, type CameraPreset } from "@/store/tunnel";
import { aeroUniforms } from "./aero-material";
import { XC90Model } from "./xc90-model";
import { FlowParticles, Streamlines } from "./flow-viz";
import { ProbeMarkers } from "./probes";

const PRESETS: Record<CameraPreset, { pos: [number, number, number]; target: [number, number, number] }> = {
  threeQuarter: { pos: [7.2, 2.9, 7.8], target: [0.2, 0.72, 0] },
  side: { pos: [0.3, 1.55, 9.4], target: [0.1, 0.7, 0] },
  front: { pos: [-9.2, 1.5, 0.15], target: [0, 0.7, 0] },
  rear: { pos: [8.6, 1.7, 0.35], target: [0.2, 0.75, 0] },
  top: { pos: [0.4, 13.2, 0.15], target: [0, 0, 0] },
};

function CameraRig() {
  const controls = useRef<THREE.EventDispatcher | null>(null);
  const preset = useTunnel((s) => s.cameraPreset);
  const tick = useTunnel((s) => s.presetTick);
  const started = useTunnel((s) => s.started);
  const camera = useThree((s) => s.camera);
  const goalPos = useRef(new THREE.Vector3());
  const goalTarget = useRef(new THREE.Vector3());
  const blending = useRef(0);

  useEffect(() => {
    const p = PRESETS[preset];
    goalPos.current.set(...p.pos);
    goalTarget.current.set(...p.target);
    blending.current = 1;
  }, [preset, tick]);

  useFrame((_, rawDt) => {
    const ctrl = controls.current as unknown as {
      target: THREE.Vector3;
      update: () => void;
    } | null;
    if (blending.current <= 0 || !ctrl) return;
    const dt = Math.min(rawDt, 0.05);
    const k = 1 - Math.exp(-5.5 * dt);
    camera.position.lerp(goalPos.current, k);
    ctrl.target.lerp(goalTarget.current, k);
    ctrl.update();
    blending.current -= dt;
  });

  return (
    <OrbitControls
      ref={controls as never}
      makeDefault
      enabled={started}
      enableDamping
      dampingFactor={0.08}
      minDistance={4.2}
      maxDistance={20}
      maxPolarAngle={Math.PI / 2 - 0.05}
      target={[0.2, 0.72, 0]}
    />
  );
}

function TunnelShell() {
  const wall = "#12181f";
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1, -0.01, 0]} receiveShadow>
        <planeGeometry args={[TUNNEL.length, TUNNEL.width]} />
        <meshStandardMaterial color="#0e1218" roughness={0.92} metalness={0.04} />
      </mesh>
      <Grid
        position={[1, 0.002, 0]}
        args={[TUNNEL.length, TUNNEL.width]}
        cellSize={0.5}
        cellThickness={0.6}
        cellColor="#24303a"
        sectionSize={2}
        sectionThickness={1.1}
        sectionColor="#3a4a58"
        fadeDistance={24}
        fadeStrength={1.4}
        infiniteGrid={false}
      />
      <mesh position={[1, 2.5, TUNNEL.width / 2]}>
        <planeGeometry args={[TUNNEL.length, 5]} />
        <meshPhysicalMaterial
          color="#152028"
          transparent
          opacity={0.14}
          roughness={0.05}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[1, 2.5, -TUNNEL.width / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[TUNNEL.length, 5]} />
        <meshPhysicalMaterial
          color="#152028"
          transparent
          opacity={0.14}
          roughness={0.05}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[1, TUNNEL.height, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[TUNNEL.length, TUNNEL.width]} />
        <meshStandardMaterial color={wall} roughness={0.85} />
      </mesh>
      <mesh position={[TUNNEL.inletX - 0.2, 2.55, 0]}>
        <boxGeometry args={[0.4, 5.1, TUNNEL.width - 0.2]} />
        <meshStandardMaterial color="#151c24" metalness={0.35} roughness={0.55} />
      </mesh>
      {Array.from({ length: 11 }, (_, i) => (
        <mesh key={i} position={[TUNNEL.inletX + 0.05, 0.35 + i * 0.46, 0]}>
          <boxGeometry args={[0.08, 0.06, TUNNEL.width - 0.6]} />
          <meshStandardMaterial
            color="#9ec4d8"
            emissive="#6aa0bc"
            emissiveIntensity={0.35}
            toneMapped={false}
          />
        </mesh>
      ))}
      <mesh position={[TUNNEL.outletX, 2.55, 0]}>
        <boxGeometry args={[0.5, 5.1, TUNNEL.width - 0.2]} />
        <meshStandardMaterial color="#10161c" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[TUNNEL.outletX - 0.2, 2.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <circleGeometry args={[1.35, 40]} />
        <meshStandardMaterial color="#1a222c" metalness={0.6} roughness={0.3} />
      </mesh>
      {[-4, -1, 2, 5].map((x) => (
        <mesh key={x} position={[x, TUNNEL.height - 0.08, 0]}>
          <boxGeometry args={[2.4, 0.04, 0.18]} />
          <meshStandardMaterial
            color="#e8eef4"
            emissive="#d0dce8"
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function AeroSync() {
  const mix = useTunnel((s) => s.showPressure);
  useFrame(() => {
    const target = mix ? 1 : 0;
    const cur = aeroUniforms.uPressureMix.value;
    aeroUniforms.uPressureMix.value = cur + (target - cur) * 0.08;
  });
  return null;
}

export function TunnelScene() {
  const viz = useTunnel((s) => s.vizMode);
  const started = useTunnel((s) => s.started);

  return (
    <>
      <color attach="background" args={["#090b0e"]} />
      <fog attach="fog" args={["#090b0e", 14, 34]} />
      <hemisphereLight args={["#8aa0b4", "#1a1512", 0.45]} />
      <ambientLight intensity={0.22} />
      <directionalLight
        position={[-8, 8, 4]}
        intensity={1.55}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <directionalLight position={[6, 4, -6]} intensity={0.45} color="#9bb4c8" />
      <pointLight position={[-6, 3.2, 0]} intensity={18} distance={16} color="#8eb4cc" />
      <CameraRig />
      <TunnelShell />
      <XC90Model />
      <ContactShadows position={[0, 0.01, 0]} opacity={0.45} scale={12} blur={2.2} far={4} />
      <AeroSync />
      {viz === "particles" && <FlowParticles />}
      {viz === "smoke" && <FlowParticles smoke />}
      {viz === "streamlines" && <Streamlines />}
      {started && <ProbeMarkers />}
    </>
  );
}
