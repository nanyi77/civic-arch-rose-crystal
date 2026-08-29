import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { TunnelScene } from "./scene";
import { useTunnel } from "@/store/tunnel";

export default function TunnelCanvas() {
  const started = useTunnel((s) => s.started);
  return (
    <div
      className="absolute inset-0 z-0"
      style={{ pointerEvents: started ? "auto" : "none" }}
    >
      <Canvas
        className="h-full w-full touch-none"
        shadows
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [7.2, 2.9, 7.8], fov: 34, near: 0.1, far: 80 }}
        style={{ pointerEvents: started ? "auto" : "none" }}
      >
        <Suspense fallback={null}>
          <TunnelScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
