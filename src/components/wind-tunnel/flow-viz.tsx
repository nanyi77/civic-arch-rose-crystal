import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import {
  flowAt,
  kmhToMs,
  speedToRgb,
  TUNNEL,
  windowKey,
  type WindowState,
} from "@/lib/cfd";
import { useTunnel } from "@/store/tunnel";

const DENSITY_COUNT = { low: 1600, med: 3800, high: 6400 } as const;

function spawnParticle(
  x: Float32Array,
  y: Float32Array,
  z: Float32Array,
  life: Float32Array,
  i: number,
  smoke: boolean,
) {
  const tight = Math.random() < 0.62;
  x[i] = TUNNEL.inletX + Math.random() * 1.4;
  y[i] = tight
    ? 0.12 + Math.random() * (smoke ? 1.5 : 2.05)
    : 0.08 + Math.random() * 2.9;
  z[i] = (Math.random() - 0.5) * (tight ? (smoke ? 2.2 : 2.6) : smoke ? 3.2 : 6.4);
  life[i] = Math.random();
}

export function FlowParticles({ smoke = false }: { smoke?: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const density = useTunnel((s) => s.density);
  const playing = useTunnel((s) => s.playing);
  const yawDeg = useTunnel((s) => s.yawDeg);
  const windKmh = useTunnel((s) => s.windKmh);
  const windows = useTunnel((s) => s.windows);

  const mobile =
    typeof window !== "undefined" && window.innerWidth < 640 ? 0.45 : 1;
  const n = Math.max(
    400,
    Math.floor(DENSITY_COUNT[density] * (smoke ? 0.55 : 1) * mobile),
  );

  const sim = useMemo(() => {
    const x = new Float32Array(n);
    const y = new Float32Array(n);
    const z = new Float32Array(n);
    const life = new Float32Array(n);
    for (let i = 0; i < n; i++) spawnParticle(x, y, z, life, i, smoke);
    return { x, y, z, life };
  }, [n, smoke]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const zAxis = useMemo(() => new THREE.Vector3(0, 0, 1), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const sample = useMemo(
    () => ({ vx: 0, vy: 0, vz: 0, speed: 0, cp: 0 }),
    [],
  );

  const geom = useMemo(() => {
    if (smoke) return new THREE.SphereGeometry(0.07, 6, 6);
    return new THREE.BoxGeometry(0.038, 0.038, 0.22);
  }, [smoke]);

  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: smoke ? 0.28 : 0.95,
        depthWrite: !smoke,
        blending: smoke ? THREE.AdditiveBlending : THREE.NormalBlending,
        toneMapped: false,
      }),
    [smoke],
  );

  useEffect(() => {
    return () => {
      geom.dispose();
      mat.dispose();
    };
  }, [geom, mat]);

  useFrame((_, rawDt) => {
    const mesh = meshRef.current;
    if (!mesh || !playing) return;
    const dt = Math.min(rawDt, 0.05);
    const yaw = (yawDeg * Math.PI) / 180;
    const u = kmhToMs(windKmh);
    const { x, y, z, life } = sim;

    for (let i = 0; i < n; i++) {
      flowAt(x[i]!, y[i]!, z[i]!, yaw, u, sample, windows);
      const speed = sample.speed;
      if (speed < 0.08) {
        spawnParticle(x, y, z, life, i, smoke);
      } else {
        const k = smoke ? 0.72 : 1;
        x[i]! += sample.vx * dt * k;
        y[i]! += sample.vy * dt * k;
        z[i]! += sample.vz * dt * k;
        if (smoke) {
          z[i]! += Math.sin(i * 12.9898 + x[i]! * 0.4) * 0.35 * dt;
          y[i]! += 0.12 * dt;
        }
        life[i]! += dt * (smoke ? 0.12 : 0.18);
      }
      if (
        x[i]! > TUNNEL.outletX - 0.6 ||
        y[i]! < 0.03 ||
        y[i]! > 4.8 ||
        Math.abs(z[i]!) > 4.6 ||
        life[i]! > 1
      ) {
        spawnParticle(x, y, z, life, i, smoke);
      }

      dummy.position.set(x[i]!, y[i]!, z[i]!);
      dir.set(sample.vx, sample.vy, sample.vz);
      if (dir.lengthSq() > 1e-6) {
        dir.normalize();
        dummy.quaternion.setFromUnitVectors(zAxis, dir);
      }
      const len = smoke ? 1.1 : Math.min(2.4, 0.55 + speed / (u + 1e-3));
      const fat = smoke ? 2.4 : 1;
      dummy.scale.set(fat, fat, len);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      const [r, g, b] = smoke ? [0.72, 0.78, 0.84] : speedToRgb(speed, u);
      color.setRGB(r, g, b);
      mesh.setColorAt(i, color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geom, mat, n]} frustumCulled={false} />;
}

function makeStreamlines(yaw: number, uInf: number, dense: boolean, windows: WindowState) {
  const ny = dense ? 7 : 5;
  const nz = dense ? 9 : 7;
  const lines: { pts: [number, number, number][]; colors: [number, number, number][] }[] =
    [];
  const sample = { vx: 0, vy: 0, vz: 0, speed: 0, cp: 0 };
  for (let iy = 0; iy < ny; iy++) {
    for (let iz = 0; iz < nz; iz++) {
      const y0 = 0.14 + (iy / Math.max(ny - 1, 1)) * 2.5;
      const z0 = -2.35 + (iz / Math.max(nz - 1, 1)) * 4.7;
      const pts: [number, number, number][] = [];
      const colors: [number, number, number][] = [];
      let x = TUNNEL.inletX + 0.8;
      let y = y0;
      let z = z0;
      for (let s = 0; s < 110; s++) {
        pts.push([x, y, z]);
        flowAt(x, y, z, yaw, uInf, sample, windows);
        colors.push(speedToRgb(sample.speed, uInf));
        const step = 0.05;
        x += sample.vx * step;
        y += sample.vy * step;
        z += sample.vz * step;
        if (x > TUNNEL.outletX - 1 || y < 0.04 || y > 4.6 || sample.speed < 0.15) break;
      }
      if (pts.length > 4) lines.push({ pts, colors });
    }
  }
  return lines;
}

export function Streamlines() {
  const yawDeg = useTunnel((s) => s.yawDeg);
  const windKmh = useTunnel((s) => s.windKmh);
  const density = useTunnel((s) => s.density);
  const windows = useTunnel((s) => s.windows);
  const yaw = (yawDeg * Math.PI) / 180;
  const u = kmhToMs(windKmh);
  const key = windowKey(windows);
  const lines = useMemo(
    () => makeStreamlines(yaw, u, density !== "low", windows),
    [yaw, u, density, key, windows],
  );

  return (
    <group>
      {lines.map((ln, i) => (
        <Line
          key={i}
          points={ln.pts}
          vertexColors={ln.colors}
          lineWidth={1.35}
          transparent
          opacity={0.85}
        />
      ))}
    </group>
  );
}
