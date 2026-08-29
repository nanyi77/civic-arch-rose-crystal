import { create } from "zustand";
import type { ProbeId, WindowId, WindowState } from "@/lib/cfd";
import { WINDOWS_CLOSED } from "@/lib/cfd";

export type VizMode = "particles" | "streamlines" | "smoke";
export type CameraPreset = "threeQuarter" | "side" | "front" | "rear" | "top";
export type Density = "low" | "med" | "high";

export type InspectPoint = {
  x: number;
  y: number;
  z: number;
  cp: number;
  speed: number;
};

type TunnelState = {
  windKmh: number;
  yawDeg: number;
  vizMode: VizMode;
  showPressure: boolean;
  showProbes: boolean;
  playing: boolean;
  started: boolean;
  selectedProbe: ProbeId | null;
  density: Density;
  cameraPreset: CameraPreset;
  presetTick: number;
  inspect: InspectPoint | null;
  windows: WindowState;
  setWind: (v: number) => void;
  setYaw: (v: number) => void;
  setVizMode: (v: VizMode) => void;
  setShowPressure: (v: boolean) => void;
  setShowProbes: (v: boolean) => void;
  setPlaying: (v: boolean) => void;
  setStarted: (v: boolean) => void;
  setSelectedProbe: (v: ProbeId | null) => void;
  setDensity: (v: Density) => void;
  setCameraPreset: (v: CameraPreset) => void;
  setInspect: (v: InspectPoint | null) => void;
  setWindow: (id: WindowId, open: boolean) => void;
  setWindows: (w: WindowState) => void;
};

export const useTunnel = create<TunnelState>((set) => ({
  windKmh: 140,
  yawDeg: 0,
  vizMode: "particles",
  showPressure: true,
  showProbes: true,
  playing: true,
  started: false,
  selectedProbe: "apillar",
  density: "med",
  cameraPreset: "threeQuarter",
  presetTick: 0,
  inspect: null,
  windows: { ...WINDOWS_CLOSED },
  setWind: (windKmh) => set({ windKmh }),
  setYaw: (yawDeg) => set({ yawDeg }),
  setVizMode: (vizMode) => set({ vizMode }),
  setShowPressure: (showPressure) => set({ showPressure }),
  setShowProbes: (showProbes) => set({ showProbes }),
  setPlaying: (playing) => set({ playing }),
  setStarted: (started) => set({ started }),
  setSelectedProbe: (selectedProbe) => set({ selectedProbe, inspect: null }),
  setDensity: (density) => set({ density }),
  setCameraPreset: (cameraPreset) =>
    set((s) => ({ cameraPreset, presetTick: s.presetTick + 1 })),
  setInspect: (inspect) =>
    set(inspect ? { inspect, selectedProbe: null } : { inspect: null }),
  setWindow: (id, open) =>
    set((s) => ({ windows: { ...s.windows, [id]: open } })),
  setWindows: (windows) => set({ windows: { ...windows } }),
}));
