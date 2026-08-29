import * as THREE from "three";
import { useMemo } from "react";
import { PROBES, cpToRgb, flowAt, kmhToMs, windowKey } from "@/lib/cfd";
import { useTunnel } from "@/store/tunnel";

export function ProbeMarkers() {
  const show = useTunnel((s) => s.showProbes);
  const selected = useTunnel((s) => s.selectedProbe);
  const setSelected = useTunnel((s) => s.setSelectedProbe);
  const yawDeg = useTunnel((s) => s.yawDeg);
  const windKmh = useTunnel((s) => s.windKmh);
  const inspect = useTunnel((s) => s.inspect);
  const windows = useTunnel((s) => s.windows);

  const yaw = (yawDeg * Math.PI) / 180;
  const u = kmhToMs(windKmh);
  const key = windowKey(windows);

  const samples = useMemo(() => {
    return PROBES.map((p) => {
      const c = Math.cos(yaw);
      const s = Math.sin(yaw);
      const wx = c * p.x + s * p.z;
      const wz = -s * p.x + c * p.z;
      const f = flowAt(wx, p.y, wz, yaw, u, undefined, windows);
      return { probe: p, wx, wy: p.y, wz, ...f };
    });
  }, [yaw, u, key, windows]);

  if (!show) return null;

  return (
    <group>
      {samples.map(({ probe, wx, wy, wz, cp }) => {
        const active = selected === probe.id;
        const [r, g, b] = cpToRgb(cp);
        return (
          <mesh
            key={probe.id}
            position={[wx, wy, wz]}
            onClick={(e) => {
              e.stopPropagation();
              setSelected(probe.id);
            }}
          >
            <sphereGeometry args={[active ? 0.075 : 0.05, 16, 16]} />
            <meshBasicMaterial color={new THREE.Color(r, g, b)} toneMapped={false} />
          </mesh>
        );
      })}
      {inspect && (
        <mesh position={[inspect.x, inspect.y, inspect.z]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.05, 0.08, 24]} />
          <meshBasicMaterial color="#e8eaed" toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}
