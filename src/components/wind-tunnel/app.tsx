import { lazy, Suspense, useEffect, useState } from "react";
import { IntroOverlay, TunnelHUD } from "./overlay";

const TunnelCanvas = lazy(() => import("./canvas"));

if (typeof window !== "undefined") {
  void import("./canvas");
}

export function WindTunnelApp() {
  const [canvasOn, setCanvasOn] = useState(false);
  useEffect(() => setCanvasOn(true), []);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-bg text-fg">
      {canvasOn ? (
        <Suspense fallback={null}>
          <TunnelCanvas />
        </Suspense>
      ) : (
        <div className="absolute inset-0 bg-bg" aria-hidden />
      )}
      <IntroOverlay />
      <TunnelHUD />
    </div>
  );
}
