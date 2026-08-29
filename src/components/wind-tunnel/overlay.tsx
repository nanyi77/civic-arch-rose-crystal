import { useEffect, useMemo, useState } from "react";
import {
  AppWindow,
  Eye,
  Gauge,
  Pause,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Wind,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  aeroCoeffs,
  CP_LEGEND,
  cpToRgb,
  flowAt,
  kmhToMs,
  PROBES,
  rgbCss,
  WINDOW_PORTS,
  WINDOW_PRESETS,
  windowKey,
  type ProbeId,
  type WindowId,
  type WindowState,
} from "@/lib/cfd";
import { cn } from "@/lib/utils";
import { useTunnel, type CameraPreset, type VizMode } from "@/store/tunnel";

const VIZ: { id: VizMode; label: string }[] = [
  { id: "particles", label: "粒子" },
  { id: "streamlines", label: "流线" },
  { id: "smoke", label: "烟雾" },
];

const CAMERAS: { id: CameraPreset; label: string }[] = [
  { id: "threeQuarter", label: "¾" },
  { id: "side", label: "侧视" },
  { id: "front", label: "迎风" },
  { id: "rear", label: "尾部" },
  { id: "top", label: "俯视" },
];

function Stat({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="min-w-0">
      <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-subtle">
        {label}
      </div>
      <div className="mt-0.5 font-mono text-lg tabular-nums leading-none text-fg">
        {value}
        {unit ? <span className="ml-1 text-xs text-muted">{unit}</span> : null}
      </div>
    </div>
  );
}

export function IntroOverlay() {
  const started = useTunnel((s) => s.started);
  const setStarted = useTunnel((s) => s.setStarted);
  if (started) return null;

  const start = (e: { stopPropagation: () => void; preventDefault: () => void }) => {
    e.preventDefault();
    e.stopPropagation();
    setStarted(true);
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-end justify-center bg-bg/70 p-5 sm:items-center sm:p-10"
      onPointerDown={start}
      onClick={start}
      role="dialog"
      aria-labelledby="tunnel-intro-title"
    >
      <div className="relative z-10 w-full max-w-lg rounded-xl border border-border bg-surface p-6 sm:p-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
          Full-scale aero lab
        </p>
        <h1
          id="tunnel-intro-title"
          className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
        >
          XC90 风洞实验室
        </h1>
        <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted">
          观察沃尔沃 XC90 车身周围的气流分离、表面压力与气动载荷。拖动视角，调节风速与偏航角，点选探针读取当地
          Cp。
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            size="lg"
            className="relative z-10 min-h-12"
            onPointerDown={start}
            onClick={start}
          >
            开始试验
          </Button>
          <p className="self-center text-xs text-subtle">也可点击空白处进入</p>
        </div>
      </div>
    </div>
  );
}

export function TunnelHUD() {
  const started = useTunnel((s) => s.started);
  const windKmh = useTunnel((s) => s.windKmh);
  const yawDeg = useTunnel((s) => s.yawDeg);
  const vizMode = useTunnel((s) => s.vizMode);
  const showPressure = useTunnel((s) => s.showPressure);
  const showProbes = useTunnel((s) => s.showProbes);
  const playing = useTunnel((s) => s.playing);
  const selected = useTunnel((s) => s.selectedProbe);
  const inspect = useTunnel((s) => s.inspect);
  const setWind = useTunnel((s) => s.setWind);
  const setYaw = useTunnel((s) => s.setYaw);
  const setVizMode = useTunnel((s) => s.setVizMode);
  const setShowPressure = useTunnel((s) => s.setShowPressure);
  const setShowProbes = useTunnel((s) => s.setShowProbes);
  const setPlaying = useTunnel((s) => s.setPlaying);
  const setSelected = useTunnel((s) => s.setSelectedProbe);
  const setCameraPreset = useTunnel((s) => s.setCameraPreset);
  const windows = useTunnel((s) => s.windows);
  const setWindow = useTunnel((s) => s.setWindow);
  const setWindows = useTunnel((s) => s.setWindows);
  const [open, setOpen] = useState(false);

  const coeffs = useMemo(
    () => aeroCoeffs(yawDeg, windKmh, windows),
    [yawDeg, windKmh, windows],
  );
  const yaw = (yawDeg * Math.PI) / 180;
  const u = kmhToMs(windKmh);
  const winKey = windowKey(windows);

  const active = useMemo(() => {
    if (inspect) {
      return {
        name: "点击测点",
        nameEn: "Picked",
        cp: inspect.cp,
        speed: inspect.speed,
      };
    }
    const p = PROBES.find((x) => x.id === selected);
    if (!p) return null;
    const c = Math.cos(yaw);
    const s = Math.sin(yaw);
    const wx = c * p.x + s * p.z;
    const wz = -s * p.x + c * p.z;
    const f = flowAt(wx, p.y, wz, yaw, u, undefined, windows);
    return { name: p.name, nameEn: p.nameEn, cp: f.cp, speed: f.speed };
  }, [inspect, selected, yaw, u, winKey, windows]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setPlaying(!useTunnel.getState().playing);
      }
      if (e.key === "1") setVizMode("particles");
      if (e.key === "2") setVizMode("streamlines");
      if (e.key === "3") setVizMode("smoke");
      if (e.key === "r" || e.key === "R") setCameraPreset("threeQuarter");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setPlaying, setVizMode, setCameraPreset]);

  if (!started) return null;

  return (
    <>
      <header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-3 sm:p-5">
        <div className="pointer-events-auto rounded-lg border border-border bg-surface/95 px-3 py-2.5 sm:px-4">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-base font-semibold tracking-tight text-fg">
              XC90
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-subtle">
              Aero Lab
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted">全尺寸风洞试验</p>
        </div>
        <div className="pointer-events-auto hidden items-stretch gap-5 rounded-lg border border-border bg-surface/95 px-4 py-2.5 sm:flex">
          <Stat label="风速" value={String(Math.round(windKmh))} unit="km/h" />
          <Stat label="偏航" value={`${yawDeg > 0 ? "+" : ""}${yawDeg.toFixed(0)}`} unit="°" />
          <Stat label="Cd" value={coeffs.cd.toFixed(3)} />
          <Stat
            label="ΔCd"
            value={coeffs.dCd > 0.0005 ? `+${coeffs.dCd.toFixed(3)}` : "0.000"}
          />
          <Stat label="Cl" value={coeffs.cl.toFixed(3)} />
        </div>
        <div className="pointer-events-auto flex gap-2 sm:hidden">
          <Button
            size="icon"
            variant="secondary"
            aria-label={playing ? "暂停" : "继续"}
            onClick={() => setPlaying(!playing)}
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </Button>
          <Button
            size="icon"
            variant="secondary"
            aria-label="试验参数"
            onClick={() => setOpen(true)}
          >
            <SlidersHorizontal className="size-4" />
          </Button>
        </div>
      </header>

      <aside
        className={cn(
          "pointer-events-auto absolute z-20 w-[min(100%-1.5rem,20rem)] flex-col gap-4 overflow-y-auto rounded-xl border border-border bg-surface p-4",
          open
            ? "inset-x-3 bottom-3 top-auto flex max-h-[70dvh]"
            : "right-3 top-20 hidden max-h-[calc(100dvh-8rem)] sm:right-5 sm:top-24 sm:flex",
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-fg">
            <Wind className="size-4 text-accent" />
            试验参数
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="icon-sm"
              variant="ghost"
              aria-label={playing ? "暂停" : "继续"}
              onClick={() => setPlaying(!playing)}
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </Button>
            <Button
              size="icon-sm"
              variant="ghost"
              className="sm:hidden"
              aria-label="关闭"
              onClick={() => setOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>

        <label className="block">
          <div className="mb-1 flex justify-between text-xs text-muted">
            <span>风速</span>
            <span className="font-mono tabular-nums text-fg">{Math.round(windKmh)} km/h</span>
          </div>
          <Slider
            min={80}
            max={220}
            step={5}
            value={[windKmh]}
            onValueChange={(v) => setWind(v[0] ?? 140)}
          />
        </label>

        <label className="block">
          <div className="mb-1 flex justify-between text-xs text-muted">
            <span>偏航角</span>
            <span className="font-mono tabular-nums text-fg">
              {yawDeg > 0 ? "+" : ""}
              {yawDeg.toFixed(0)}°
            </span>
          </div>
          <Slider
            min={-20}
            max={20}
            step={1}
            value={[yawDeg]}
            onValueChange={(v) => setYaw(v[0] ?? 0)}
          />
        </label>

        <div>
          <div className="mb-2 text-xs text-muted">流场显示</div>
          <div className="grid grid-cols-3 gap-1 rounded-md bg-bg p-1">
            {VIZ.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setVizMode(m.id)}
                className={cn(
                  "h-9 rounded-sm text-xs font-medium transition-colors",
                  vizMode === m.id ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
                )}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-fg">
            <Gauge className="size-4 text-muted" />
            表面压力
          </div>
          <Switch checked={showPressure} onCheckedChange={setShowPressure} />
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-fg">
            <Eye className="size-4 text-muted" />
            压力探针
          </div>
          <Switch checked={showProbes} onCheckedChange={setShowProbes} />
        </div>

        <WindowControls
          windows={windows}
          onToggle={setWindow}
          onPreset={setWindows}
          dCd={coeffs.dCd}
        />

        <div>
          <div className="mb-2 text-xs text-muted">相机</div>
          <div className="flex flex-wrap gap-1">
            {CAMERAS.map((c) => (
              <Button
                key={c.id}
                size="sm"
                variant="secondary"
                className="h-9 px-2.5"
                onClick={() => setCameraPreset(c.id)}
              >
                {c.label}
              </Button>
            ))}
            <Button
              size="icon-sm"
              variant="ghost"
              aria-label="复位相机"
              onClick={() => setCameraPreset("threeQuarter")}
            >
              <RotateCcw className="size-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-md bg-bg px-3 py-2.5 sm:hidden">
          <Stat label="Cd" value={coeffs.cd.toFixed(3)} />
          <Stat
            label="ΔCd"
            value={coeffs.dCd > 0.0005 ? `+${coeffs.dCd.toFixed(3)}` : "0.000"}
          />
        </div>
      </aside>

      <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-3 sm:p-5">
        <div className="pointer-events-auto mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <ProbeStrip
            selected={selected}
            onSelect={setSelected}
            yaw={yaw}
            u={u}
            windows={windows}
          />
          <div className="rounded-lg border border-border bg-surface/95 px-3 py-2 sm:min-w-56">
            {active ? (
              <div>
                <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-subtle">
                  {active.nameEn}
                </div>
                <div className="mt-0.5 text-sm font-medium text-fg">{active.name}</div>
                <div className="mt-1 font-mono text-xs tabular-nums text-muted">
                  Cp {active.cp >= 0 ? "+" : ""}
                  {active.cp.toFixed(2)}
                  <span className="mx-2 text-border">/</span>
                  {active.speed.toFixed(1)} m/s
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted">点选车身或探针读取当地压力</p>
            )}
            <Legend />
          </div>
        </div>
        <p className="pointer-events-none mt-2 text-center text-[10px] text-subtle sm:text-left">
          势流 + 尾迹简化模型，用于教学演示，并非 Volvo 官方 CFD 数据
        </p>
      </footer>
    </>
  );
}

function WindowControls({
  windows,
  onToggle,
  onPreset,
  dCd,
}: {
  windows: WindowState;
  onToggle: (id: WindowId, open: boolean) => void;
  onPreset: (w: WindowState) => void;
  dCd: number;
}) {
  const ids: WindowId[] = ["frontL", "frontR", "rearL", "rearR"];
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm text-fg">
        <AppWindow className="size-4 text-muted" />
        车窗
      </div>
      <div className="grid grid-cols-2 gap-1">
        {ids.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => onToggle(id, !windows[id])}
            className={cn(
              "h-9 rounded-md text-xs font-medium transition-colors",
              windows[id] ? "bg-accent text-accent-fg" : "bg-bg text-muted hover:text-fg",
            )}
          >
            {WINDOW_PORTS[id].name}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onToggle("sunroof", !windows.sunroof)}
        className={cn(
          "mt-1 h-9 w-full rounded-md text-xs font-medium transition-colors",
          windows.sunroof ? "bg-accent text-accent-fg" : "bg-bg text-muted hover:text-fg",
        )}
      >
        天窗
      </button>
      <div className="mt-2 grid grid-cols-4 gap-1">
        {WINDOW_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onPreset(p.windows)}
            className="h-8 rounded-sm bg-bg text-xs text-muted hover:text-fg"
          >
            {p.label}
          </button>
        ))}
      </div>
      <p className="mt-2 font-mono text-xs tabular-nums text-muted">
        开窗阻力 {dCd > 0.0005 ? `ΔCd +${dCd.toFixed(3)}` : "ΔCd 0.000"}
      </p>
    </div>
  );
}

function ProbeStrip({
  selected,
  onSelect,
  yaw,
  u,
  windows,
}: {
  selected: ProbeId | null;
  onSelect: (id: ProbeId) => void;
  yaw: number;
  u: number;
  windows: WindowState;
}) {
  return (
    <div className="flex max-w-full gap-1.5 overflow-x-auto pb-1">
      {PROBES.map((p) => {
        const c = Math.cos(yaw);
        const s = Math.sin(yaw);
        const f = flowAt(
          c * p.x + s * p.z,
          p.y,
          -s * p.x + c * p.z,
          yaw,
          u,
          undefined,
          windows,
        );
        const rgb = cpToRgb(f.cp);
        const on = selected === p.id;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect(p.id)}
            className={cn(
              "flex h-11 shrink-0 items-center gap-2 rounded-md border px-2.5 text-left transition-colors",
              on
                ? "border-accent bg-surface-2"
                : "border-border bg-surface/95 hover:bg-surface-2",
            )}
          >
            <span
              className="size-2.5 rounded-full"
              style={{ background: rgbCss(rgb) }}
              aria-hidden
            />
            <span className="text-xs text-fg">{p.name}</span>
          </button>
        );
      })}
    </div>
  );
}

function Legend() {
  return (
    <div className="mt-2">
      <div
        className="h-1.5 w-full rounded-full"
        style={{
          background:
            "linear-gradient(90deg, rgb(31 71 184), rgb(38 140 199), rgb(56 184 179), rgb(235 237 230), rgb(245 199 107), rgb(230 107 56), rgb(184 41 36))",
        }}
      />
      <div className="mt-1 flex justify-between font-mono text-[10px] tabular-nums text-subtle">
        {CP_LEGEND.map((v) => (
          <span key={v}>{v > 0 ? `+${v.toFixed(1)}` : v.toFixed(1)}</span>
        ))}
      </div>
      <div className="text-[10px] text-subtle">表面压力系数 Cp</div>
    </div>
  );
}
