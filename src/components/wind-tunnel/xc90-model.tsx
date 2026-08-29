import { useEffect, useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { XC90, flowAt, kmhToMs } from "@/lib/cfd";
import { makePaintMaterial } from "./aero-material";
import { useTunnel } from "@/store/tunnel";
import { MovingGlass } from "./moving-glass";

function extrude(shape: THREE.Shape, depth: number, bevel = 0.05) {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 2,
    curveSegments: 24,
    steps: 1,
  });
  geo.translate(0, 0, -depth / 2);
  geo.computeVertexNormals();
  return geo;
}

function bodyShape() {
  const s = new THREE.Shape();
  s.moveTo(-2.42, 0.17);
  s.lineTo(-2.51, 0.21);
  s.lineTo(-2.53, 0.34);
  s.lineTo(-2.5, 0.52);
  s.lineTo(-2.49, 0.68);
  s.lineTo(-2.5, 0.9);
  s.quadraticCurveTo(-2.44, 1.0, -2.22, 1.02);
  s.quadraticCurveTo(-1.45, 1.08, -0.78, 1.13);
  s.quadraticCurveTo(-0.58, 1.22, -0.46, 1.46);
  s.quadraticCurveTo(-0.28, 1.7, 0.02, 1.77);
  s.lineTo(1.22, 1.78);
  s.quadraticCurveTo(1.58, 1.76, 1.82, 1.6);
  s.quadraticCurveTo(2.12, 1.36, 2.3, 1.12);
  s.quadraticCurveTo(2.44, 0.96, 2.48, 0.72);
  s.lineTo(2.5, 0.4);
  s.lineTo(2.48, 0.2);
  s.lineTo(2.32, 0.17);
  s.lineTo(-2.28, 0.17);
  s.closePath();
  return s;
}

function cabinShape() {
  const s = new THREE.Shape();
  s.moveTo(-0.54, 1.13);
  s.lineTo(-0.4, 1.46);
  s.quadraticCurveTo(-0.22, 1.7, 0.08, 1.775);
  s.lineTo(1.26, 1.775);
  s.quadraticCurveTo(1.56, 1.73, 1.8, 1.54);
  s.quadraticCurveTo(2.04, 1.32, 2.14, 1.14);
  s.lineTo(-0.54, 1.13);
  s.closePath();
  return s;
}

function shoulderShape() {
  const s = new THREE.Shape();
  s.moveTo(-2.18, 0.48);
  s.lineTo(-2.28, 0.62);
  s.lineTo(-2.16, 1.1);
  s.lineTo(2.22, 1.1);
  s.lineTo(2.32, 0.72);
  s.lineTo(2.28, 0.48);
  s.closePath();
  return s;
}

function Wheel({ x, z }: { x: number; z: number }) {
  const r = XC90.wheelRadius;
  const w = XC90.wheelWidth;
  const out = Math.sign(z) * (w * 0.22);
  return (
    <group position={[x, r, z]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[r, r, w, 36]} />
        <meshStandardMaterial color="#0b0c0e" roughness={0.94} metalness={0.05} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[r * 0.78, r * 0.78, w * 0.72, 28]} />
        <meshStandardMaterial color="#1c2026" roughness={0.45} metalness={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, out]}>
        <cylinderGeometry args={[r * 0.58, r * 0.58, 0.06, 28]} />
        <meshStandardMaterial color="#d5dde4" roughness={0.22} metalness={0.9} />
      </mesh>
      {Array.from({ length: 6 }, (_, i) => (
        <mesh
          key={i}
          position={[0, 0, out]}
          rotation={[0, 0, (i * Math.PI) / 3]}
        >
          <boxGeometry args={[0.07, r * 0.92, 0.045]} />
          <meshStandardMaterial color="#b7c0c8" roughness={0.2} metalness={0.92} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, out]}>
        <cylinderGeometry args={[0.09, 0.09, 0.07, 16]} />
        <meshStandardMaterial color="#0e1013" roughness={0.35} metalness={0.6} />
      </mesh>
    </group>
  );
}

function Arch({ x, z }: { x: number; z: number }) {
  return (
    <mesh position={[x, XC90.wheelRadius, z]}>
      <torusGeometry args={[0.44, 0.03, 8, 18, Math.PI]} />
      <meshStandardMaterial color="#c2cad2" roughness={0.34} metalness={0.7} />
    </mesh>
  );
}

function ThorHammer({ z }: { z: number }) {
  const inward = z > 0 ? -1 : 1;
  return (
    <group position={[-2.46, 0.78, z]}>
      <RoundedBox args={[0.08, 0.2, 0.52]} radius={0.03} smoothness={3} position={[0.02, -0.02, 0]}>
        <meshStandardMaterial color="#0a0c10" roughness={0.35} metalness={0.4} />
      </RoundedBox>
      <mesh position={[0.01, 0.055, 0]}>
        <boxGeometry args={[0.045, 0.038, 0.46]} />
        <meshStandardMaterial
          color="#eef6ff"
          emissive="#d7e8f8"
          emissiveIntensity={2.1}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0.01, -0.04, inward * 0.16]}>
        <boxGeometry args={[0.04, 0.16, 0.038]} />
        <meshStandardMaterial
          color="#eef6ff"
          emissive="#d7e8f8"
          emissiveIntensity={2.1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function TailLamp({ z }: { z: number }) {
  return (
    <group position={[2.42, 1.08, z]}>
      <mesh>
        <boxGeometry args={[0.07, 0.62, 0.11]} />
        <meshStandardMaterial
          color="#c4473c"
          emissive="#b13228"
          emissiveIntensity={1.05}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[-0.02, 0.02, Math.sign(z) * -0.06]} rotation={[0, Math.sign(z) * 0.35, 0]}>
        <boxGeometry args={[0.05, 0.58, 0.08]} />
        <meshStandardMaterial
          color="#d25548"
          emissive="#c43c32"
          emissiveIntensity={0.9}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export function XC90Model() {
  const yawDeg = useTunnel((s) => s.yawDeg);
  const setInspect = useTunnel((s) => s.setInspect);
  const windKmh = useTunnel((s) => s.windKmh);
  const windows = useTunnel((s) => s.windows);

  const paint = useMemo(() => makePaintMaterial("#d4dbe3"), []);
  const paintSoft = useMemo(() => makePaintMaterial("#c5ced8"), []);
  const hull = useMemo(() => {
    const body = extrude(bodyShape(), 1.84, 0.055);
    const cabin = extrude(cabinShape(), 1.62, 0.02);
    const shoulder = extrude(shoulderShape(), 1.94, 0.04);
    return { body, cabin, shoulder };
  }, []);

  useEffect(() => {
    return () => {
      paint.dispose();
      paintSoft.dispose();
      hull.body.dispose();
      hull.cabin.dispose();
      hull.shoulder.dispose();
    };
  }, [paint, paintSoft, hull]);

  const yaw = (yawDeg * Math.PI) / 180;
  const glass = {
    color: "#0b1520",
    metalness: 0.15,
    roughness: 0.05,
    transparent: true,
    opacity: 0.46,
    envMapIntensity: 1.3,
  } as const;

  return (
    <group
      rotation={[0, yaw, 0]}
      onClick={(e) => {
        e.stopPropagation();
        const u = kmhToMs(windKmh);
        const s = flowAt(e.point.x, e.point.y, e.point.z, yaw, u, undefined, windows);
        setInspect({
          x: e.point.x,
          y: e.point.y,
          z: e.point.z,
          cp: s.cp,
          speed: s.speed,
        });
      }}
    >
      <mesh geometry={hull.body} material={paint} castShadow receiveShadow />
      <mesh geometry={hull.shoulder} material={paintSoft} castShadow />
      <mesh geometry={hull.cabin} castShadow>
        <meshStandardMaterial color="#07090c" roughness={0.92} />
      </mesh>

      <RoundedBox
        args={[1.78, 0.1, 1.76]}
        radius={0.05}
        smoothness={4}
        position={[-1.28, 1.06, 0]}
        rotation={[0, 0, 0.035]}
        material={paint}
        castShadow
      />
      <RoundedBox
        args={[0.4, 0.3, 1.9]}
        radius={0.06}
        smoothness={4}
        position={[-2.32, 0.34, 0]}
        material={paint}
        castShadow
      />
      <RoundedBox
        args={[0.36, 0.7, 1.88]}
        radius={0.06}
        smoothness={4}
        position={[2.28, 0.58, 0]}
        material={paint}
        castShadow
      />

      <mesh position={[0.38, 1.72, 0]} material={paint} castShadow>
        <boxGeometry args={[2.28, 0.07, 1.62]} />
      </mesh>
      <mesh position={[-0.34, 1.46, 0.79]} rotation={[0, 0, 0.58]} material={paint} castShadow>
        <boxGeometry args={[0.1, 0.74, 0.09]} />
      </mesh>
      <mesh position={[-0.34, 1.46, -0.79]} rotation={[0, 0, 0.58]} material={paint} castShadow>
        <boxGeometry args={[0.1, 0.74, 0.09]} />
      </mesh>
      <mesh position={[1.78, 1.4, 0.79]} rotation={[0, 0, -0.42]} material={paint} castShadow>
        <boxGeometry args={[0.3, 0.74, 0.11]} />
      </mesh>
      <mesh position={[1.78, 1.4, -0.79]} rotation={[0, 0, -0.42]} material={paint} castShadow>
        <boxGeometry args={[0.3, 0.74, 0.11]} />
      </mesh>
      <mesh position={[0.5, 1.42, 0.76]}>
        <boxGeometry args={[0.08, 0.58, 0.05]} />
        <meshStandardMaterial color="#0a0c10" roughness={0.35} />
      </mesh>
      <mesh position={[0.5, 1.42, -0.76]}>
        <boxGeometry args={[0.08, 0.58, 0.05]} />
        <meshStandardMaterial color="#0a0c10" roughness={0.35} />
      </mesh>
      <mesh position={[1.22, 1.4, 0.76]}>
        <boxGeometry args={[0.08, 0.52, 0.05]} />
        <meshStandardMaterial color="#0a0c10" roughness={0.35} />
      </mesh>
      <mesh position={[1.22, 1.4, -0.76]}>
        <boxGeometry args={[0.08, 0.52, 0.05]} />
        <meshStandardMaterial color="#0a0c10" roughness={0.35} />
      </mesh>

      <mesh position={[-0.42, 1.4, 0]} rotation={[0, 0, 0.55]}>
        <boxGeometry args={[0.07, 0.7, 1.46]} />
        <meshPhysicalMaterial {...glass} />
      </mesh>
      <mesh position={[1.92, 1.36, 0]} rotation={[0, 0, -0.42]}>
        <boxGeometry args={[0.07, 0.58, 1.36]} />
        <meshPhysicalMaterial {...glass} opacity={0.4} />
      </mesh>
      <mesh position={[1.58, 1.46, 0.74]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.42, 0.38, 0.03]} />
        <meshPhysicalMaterial {...glass} opacity={0.38} />
      </mesh>
      <mesh position={[1.58, 1.46, -0.74]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.42, 0.38, 0.03]} />
        <meshPhysicalMaterial {...glass} opacity={0.38} />
      </mesh>

      <MovingGlass
        size={[0.86, 0.46, 0.032]}
        closed={[0.02, 1.4, 0.78]}
        open={[0.02, 1.0, 0.78]}
        dropped={windows.frontR}
      />
      <MovingGlass
        size={[0.86, 0.46, 0.032]}
        closed={[0.02, 1.4, -0.78]}
        open={[0.02, 1.0, -0.78]}
        dropped={windows.frontL}
      />
      <MovingGlass
        size={[0.68, 0.42, 0.032]}
        closed={[0.88, 1.38, 0.78]}
        open={[0.88, 1.0, 0.78]}
        dropped={windows.rearR}
      />
      <MovingGlass
        size={[0.68, 0.42, 0.032]}
        closed={[0.88, 1.38, -0.78]}
        open={[0.88, 1.0, -0.78]}
        dropped={windows.rearL}
      />

      {windows.sunroof && (
        <mesh position={[0.32, 1.735, 0]}>
          <boxGeometry args={[1.05, 0.02, 0.72]} />
          <meshStandardMaterial color="#050608" roughness={0.9} />
        </mesh>
      )}
      <MovingGlass
        size={[1.02, 0.03, 0.68]}
        closed={[0.32, 1.765, 0]}
        open={[1.05, 1.78, 0]}
        dropped={windows.sunroof}
      />

      <mesh position={[-0.08, 1.775, 0.5]}>
        <boxGeometry args={[1.7, 0.03, 0.035]} />
        <meshStandardMaterial color="#8b949e" metalness={0.85} roughness={0.28} />
      </mesh>
      <mesh position={[-0.08, 1.775, -0.5]}>
        <boxGeometry args={[1.7, 0.03, 0.035]} />
        <meshStandardMaterial color="#8b949e" metalness={0.85} roughness={0.28} />
      </mesh>
      {[-0.7, 1.15].map((x) => (
        <mesh key={x} position={[x, 1.8, 0.5]}>
          <boxGeometry args={[0.08, 0.05, 0.06]} />
          <meshStandardMaterial color="#6d757e" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      {[-0.7, 1.15].map((x) => (
        <mesh key={`l${x}`} position={[x, 1.8, -0.5]}>
          <boxGeometry args={[0.08, 0.05, 0.06]} />
          <meshStandardMaterial color="#6d757e" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      <mesh position={[0.45, 1.12, 0.97]}>
        <boxGeometry args={[2.35, 0.02, 0.028]} />
        <meshStandardMaterial color="#d7dee5" metalness={0.95} roughness={0.16} />
      </mesh>
      <mesh position={[0.45, 1.12, -0.97]}>
        <boxGeometry args={[2.35, 0.02, 0.028]} />
        <meshStandardMaterial color="#d7dee5" metalness={0.95} roughness={0.16} />
      </mesh>

      <mesh position={[-2.52, 0.74, 0]}>
        <boxGeometry args={[0.08, 0.4, 1.08]} />
        <meshStandardMaterial color="#0c0e12" roughness={0.5} metalness={0.25} />
      </mesh>
      {Array.from({ length: 13 }, (_, i) => {
        const zz = (i - 6) * 0.072;
        return (
          <mesh key={i} position={[-2.56, 0.74, zz]}>
            <boxGeometry args={[0.035, 0.32, 0.018]} />
            <meshStandardMaterial color="#dce3ea" metalness={0.92} roughness={0.18} />
          </mesh>
        );
      })}
      <mesh position={[-2.58, 0.74, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.095, 0.013, 10, 28]} />
        <meshStandardMaterial color="#e8eef4" metalness={0.96} roughness={0.14} />
      </mesh>
      <mesh position={[-2.58, 0.74, 0]} rotation={[0.62, 0, 0.12]}>
        <boxGeometry args={[0.028, 0.018, 0.21]} />
        <meshStandardMaterial color="#e8eef4" metalness={0.96} roughness={0.14} />
      </mesh>

      <mesh position={[-2.5, 0.36, 0]}>
        <boxGeometry args={[0.12, 0.2, 1.22]} />
        <meshStandardMaterial color="#0b0d10" roughness={0.7} />
      </mesh>
      <mesh position={[-2.48, 0.28, 0]}>
        <boxGeometry args={[0.1, 0.06, 0.72]} />
        <meshStandardMaterial color="#c5ccd4" metalness={0.8} roughness={0.28} />
      </mesh>

      <ThorHammer z={0.82} />
      <ThorHammer z={-0.82} />
      <mesh position={[-2.46, 0.42, 0.8]}>
        <boxGeometry args={[0.06, 0.05, 0.22]} />
        <meshStandardMaterial color="#e8eef6" emissive="#b7c4d2" emissiveIntensity={0.45} />
      </mesh>
      <mesh position={[-2.46, 0.42, -0.8]}>
        <boxGeometry args={[0.06, 0.05, 0.22]} />
        <meshStandardMaterial color="#e8eef6" emissive="#b7c4d2" emissiveIntensity={0.45} />
      </mesh>

      <RoundedBox args={[0.2, 0.16, 0.28]} radius={0.04} smoothness={4} position={[-0.48, 1.08, 1.08]} material={paint} castShadow />
      <RoundedBox args={[0.2, 0.16, 0.28]} radius={0.04} smoothness={4} position={[-0.48, 1.08, -1.08]} material={paint} castShadow />
      <mesh position={[-0.48, 1.08, 1.2]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[0.16, 0.1, 0.02]} />
        <meshPhysicalMaterial {...glass} opacity={0.55} />
      </mesh>
      <mesh position={[-0.48, 1.08, -1.2]} rotation={[0, -0.15, 0]}>
        <boxGeometry args={[0.16, 0.1, 0.02]} />
        <meshPhysicalMaterial {...glass} opacity={0.55} />
      </mesh>

      <TailLamp z={0.88} />
      <TailLamp z={-0.88} />
      <mesh position={[2.46, 1.18, 0]}>
        <boxGeometry args={[0.03, 0.025, 1.62]} />
        <meshStandardMaterial
          color="#c4473c"
          emissive="#a83830"
          emissiveIntensity={0.45}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[2.46, 0.52, 0]}>
        <boxGeometry args={[0.04, 0.025, 1.5]} />
        <meshStandardMaterial color="#d7dee5" metalness={0.95} roughness={0.16} />
      </mesh>
      <mesh position={[2.4, 1.58, 0]} material={paintSoft} castShadow>
        <boxGeometry args={[0.22, 0.05, 1.28]} />
      </mesh>
      <mesh position={[2.46, 0.26, 0]}>
        <boxGeometry args={[0.22, 0.14, 1.36]} />
        <meshStandardMaterial color="#0c0e12" roughness={0.78} />
      </mesh>

      <mesh position={[0.18, 0.46, 0.97]}>
        <boxGeometry args={[3.4, 0.08, 0.05]} />
        <meshStandardMaterial color="#d7dee5" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.18, 0.46, -0.97]}>
        <boxGeometry args={[3.4, 0.08, 0.05]} />
        <meshStandardMaterial color="#d7dee5" metalness={0.9} roughness={0.2} />
      </mesh>

      {[0.12, 1.05].map((x) => (
        <mesh key={`h${x}`} position={[x, 0.92, 0.99]}>
          <boxGeometry args={[0.14, 0.03, 0.04]} />
          <meshStandardMaterial color="#cfd6de" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      {[0.12, 1.05].map((x) => (
        <mesh key={`hl${x}`} position={[x, 0.92, -0.99]}>
          <boxGeometry args={[0.14, 0.03, 0.04]} />
          <meshStandardMaterial color="#cfd6de" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      <mesh position={[0.15, 1.18, 0.35]}>
        <boxGeometry args={[0.55, 0.42, 0.5]} />
        <meshStandardMaterial color="#12151a" roughness={0.8} />
      </mesh>
      <mesh position={[0.55, 1.12, -0.28]}>
        <boxGeometry args={[0.5, 0.38, 0.48]} />
        <meshStandardMaterial color="#14181e" roughness={0.8} />
      </mesh>

      <Arch x={XC90.frontAxle} z={0.95} />
      <Arch x={XC90.frontAxle} z={-0.95} />
      <Arch x={XC90.rearAxle} z={0.95} />
      <Arch x={XC90.rearAxle} z={-0.95} />

      <Wheel x={XC90.frontAxle} z={XC90.track / 2} />
      <Wheel x={XC90.frontAxle} z={-XC90.track / 2} />
      <Wheel x={XC90.rearAxle} z={XC90.track / 2} />
      <Wheel x={XC90.rearAxle} z={-XC90.track / 2} />
    </group>
  );
}
