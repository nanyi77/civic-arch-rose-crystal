/** Simplified automotive aero field for visualization (not official Volvo CFD). */

export const XC90 = {
  length: 4.95,
  width: 1.96,
  height: 1.76,
  wheelbase: 2.984,
  track: 1.67,
  wheelRadius: 0.385,
  wheelWidth: 0.275,
  groundClearance: 0.216,
  nose: -2.475,
  tail: 2.475,
  frontAxle: -1.5,
  rearAxle: 1.484,
} as const;

export const TUNNEL = {
  length: 28,
  width: 9.2,
  height: 5.4,
  inletX: -10,
  outletX: 12,
} as const;

export type ProbeId =
  | "bumper"
  | "grille"
  | "hood"
  | "windscreen"
  | "apillar"
  | "mirror"
  | "roof"
  | "door"
  | "cpillar"
  | "hatch"
  | "underbody"
  | "wheelwake"
  | "cabin"
  | "windowL"
  | "sunroof";

export type Probe = {
  id: ProbeId;
  name: string;
  nameEn: string;
  /** Local car coordinates, y up, nose −X */
  x: number;
  y: number;
  z: number;
};

export const PROBES: Probe[] = [
  { id: "bumper", name: "前保险杠", nameEn: "Front bumper", x: -2.42, y: 0.42, z: 0 },
  { id: "grille", name: "进气格栅", nameEn: "Grille", x: -2.3, y: 0.72, z: 0 },
  { id: "hood", name: "发动机盖", nameEn: "Hood", x: -1.35, y: 1.08, z: 0 },
  { id: "windscreen", name: "挡风玻璃", nameEn: "Windscreen", x: -0.52, y: 1.28, z: 0 },
  { id: "apillar", name: "A柱", nameEn: "A-pillar", x: -0.28, y: 1.42, z: 0.78 },
  { id: "mirror", name: "后视镜", nameEn: "Mirror", x: -0.55, y: 1.05, z: 1.08 },
  { id: "roof", name: "车顶", nameEn: "Roof", x: 0.45, y: 1.76, z: 0 },
  { id: "door", name: "侧门", nameEn: "Front door", x: 0.15, y: 0.85, z: 0.98 },
  { id: "cpillar", name: "C柱", nameEn: "C-pillar", x: 1.55, y: 1.38, z: 0.76 },
  { id: "hatch", name: "尾门", nameEn: "Tailgate", x: 2.42, y: 1.05, z: 0 },
  { id: "underbody", name: "车底", nameEn: "Underbody", x: 0.2, y: 0.18, z: 0 },
  { id: "wheelwake", name: "后轮尾流", nameEn: "Rear-wheel wake", x: 2.05, y: 0.38, z: 0.84 },
  { id: "cabin", name: "座舱", nameEn: "Cabin", x: 0.35, y: 1.28, z: 0 },
  { id: "windowL", name: "左前窗", nameEn: "LF window", x: 0.08, y: 1.32, z: -0.82 },
  { id: "sunroof", name: "天窗", nameEn: "Sunroof", x: 0.35, y: 1.74, z: 0 },
];

export type WindowId = "frontL" | "frontR" | "rearL" | "rearR" | "sunroof";

export type WindowState = Record<WindowId, boolean>;

export const WINDOWS_CLOSED: WindowState = {
  frontL: false,
  frontR: false,
  rearL: false,
  rearR: false,
  sunroof: false,
};

export const WINDOW_PRESETS: { id: string; label: string; windows: WindowState }[] = [
  { id: "shut", label: "全关", windows: { ...WINDOWS_CLOSED } },
  {
    id: "fronts",
    label: "前窗",
    windows: { ...WINDOWS_CLOSED, frontL: true, frontR: true },
  },
  {
    id: "cross",
    label: "交叉",
    windows: { ...WINDOWS_CLOSED, frontL: true, rearR: true },
  },
  {
    id: "all",
    label: "全开",
    windows: { frontL: true, frontR: true, rearL: true, rearR: true, sunroof: true },
  },
];

export const WINDOW_PORTS: Record<
  WindowId,
  {
    x: number;
    y: number;
    z: number;
    hx: number;
    hy: number;
    hz: number;
    ingest: boolean;
    name: string;
  }
> = {
  frontL: { x: 0.06, y: 1.32, z: -0.82, hx: 0.44, hy: 0.22, hz: 0.1, ingest: true, name: "左前" },
  frontR: { x: 0.06, y: 1.32, z: 0.82, hx: 0.44, hy: 0.22, hz: 0.1, ingest: true, name: "右前" },
  rearL: { x: 0.9, y: 1.3, z: -0.82, hx: 0.36, hy: 0.2, hz: 0.1, ingest: false, name: "左后" },
  rearR: { x: 0.9, y: 1.3, z: 0.82, hx: 0.36, hy: 0.2, hz: 0.1, ingest: false, name: "右后" },
  sunroof: { x: 0.32, y: 1.74, z: 0, hx: 0.52, hy: 0.08, hz: 0.36, ingest: false, name: "天窗" },
};

export function anyWindowOpen(w: WindowState) {
  return w.frontL || w.frontR || w.rearL || w.rearR || w.sunroof;
}

export function windowKey(w: WindowState) {
  return (
    (w.frontL ? 1 : 0) |
    (w.frontR ? 2 : 0) |
    (w.rearL ? 4 : 0) |
    (w.rearR ? 8 : 0) |
    (w.sunroof ? 16 : 0)
  );
}

export type FlowSample = {
  vx: number;
  vy: number;
  vz: number;
  speed: number;
  cp: number;
};

const _out: FlowSample = { vx: 0, vy: 0, vz: 0, speed: 0, cp: 0 };

function sdRoundBox(
  px: number,
  py: number,
  pz: number,
  hx: number,
  hy: number,
  hz: number,
  r: number,
): number {
  const ax = Math.abs(px) - hx + r;
  const ay = Math.abs(py) - hy + r;
  const az = Math.abs(pz) - hz + r;
  const qx = Math.max(ax, 0);
  const qy = Math.max(ay, 0);
  const qz = Math.max(az, 0);
  return Math.hypot(qx, qy, qz) + Math.min(Math.max(ax, ay, az), 0) - r;
}

function sdSphere(px: number, py: number, pz: number, r: number) {
  return Math.hypot(px, py, pz) - r;
}

function inCabinFluid(x: number, y: number, z: number) {
  return Math.abs(x - 0.4) < 1.05 && y > 1.0 && y < 1.6 && Math.abs(z) < 0.68;
}

function inPort(
  x: number,
  y: number,
  z: number,
  p: (typeof WINDOW_PORTS)[WindowId],
) {
  return (
    Math.abs(x - p.x) < p.hx && Math.abs(y - p.y) < p.hy && Math.abs(z - p.z) < p.hz + 0.08
  );
}

function inAnyOpening(x: number, y: number, z: number, w: WindowState) {
  const ids = Object.keys(WINDOW_PORTS) as WindowId[];
  for (const id of ids) {
    if (w[id] && inPort(x, y, z, WINDOW_PORTS[id])) return id;
  }
  return null;
}

/** Car SDF in local body frame (nose −X, y up). */
export function sdfCar(
  x: number,
  y: number,
  z: number,
  windows: WindowState = WINDOWS_CLOSED,
): number {
  const body = sdRoundBox(x - 0.06, y - 0.7, z, 2.28, 0.5, 0.9, 0.16);
  const cabin = sdRoundBox(x - 0.38, y - 1.28, z, 1.22, 0.46, 0.76, 0.14);
  const hood = sdRoundBox(x + 1.28, y - 1.0, z, 0.82, 0.1, 0.82, 0.08);
  const wr = XC90.wheelRadius * 0.92;
  const w1 = sdSphere(x - XC90.frontAxle, y - wr, z - XC90.track / 2, wr);
  const w2 = sdSphere(x - XC90.frontAxle, y - wr, z + XC90.track / 2, wr);
  const w3 = sdSphere(x - XC90.rearAxle, y - wr, z - XC90.track / 2, wr);
  const w4 = sdSphere(x - XC90.rearAxle, y - wr, z + XC90.track / 2, wr);
  let d = Math.min(body, cabin, hood, w1, w2, w3, w4);
  if (anyWindowOpen(windows) && (inCabinFluid(x, y, z) || inAnyOpening(x, y, z, windows))) {
    d = 0.12;
  }
  return d;
}

function sdfNormal(x: number, y: number, z: number, windows: WindowState) {
  const e = 0.045;
  const d = sdfCar(x, y, z, windows);
  const nx = sdfCar(x + e, y, z, windows) - d;
  const ny = sdfCar(x, y + e, z, windows) - d;
  const nz = sdfCar(x, y, z + e, windows) - d;
  const m = Math.hypot(nx, ny, nz) || 1;
  return { x: nx / m, y: ny / m, z: nz / m };
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function smoothstep(e0: number, e1: number, x: number) {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}

function applyCabinFlow(
  lx: number,
  ly: number,
  lz: number,
  uInf: number,
  windows: WindowState,
  vel: { vx: number; vy: number; vz: number },
) {
  const nFront = (windows.frontL ? 1 : 0) + (windows.frontR ? 1 : 0);
  const nRear = (windows.rearL ? 1 : 0) + (windows.rearR ? 1 : 0);
  const through = nFront > 0 && (nRear > 0 || windows.sunroof);

  vel.vx = uInf * (through ? 0.18 : 0.06);
  vel.vy = windows.sunroof ? uInf * 0.08 : uInf * 0.01;
  vel.vz = 0;
  if (windows.frontL && windows.rearR && !windows.frontR) vel.vz = uInf * 0.16;
  if (windows.frontR && windows.rearL && !windows.frontL) vel.vz = -uInf * 0.16;

  const ids = Object.keys(WINDOW_PORTS) as WindowId[];
  for (const id of ids) {
    if (!windows[id]) continue;
    const p = WINDOW_PORTS[id];
    const dx = lx - p.x;
    const dy = ly - p.y;
    const dz = lz - p.z;
    const r2 = dx * dx + dy * dy + dz * dz;
    const inf = Math.exp(-r2 / 0.22);
    const inward = p.z === 0 ? 0 : p.z > 0 ? -1 : 1;
    if (p.ingest) {
      vel.vx += uInf * 0.12 * inf;
      vel.vz += inward * uInf * 0.62 * inf;
      vel.vy += -uInf * 0.06 * inf;
    } else if (id === "sunroof") {
      vel.vy += uInf * 0.55 * inf;
      vel.vx += uInf * 0.08 * inf;
    } else {
      vel.vz += -inward * uInf * 0.5 * inf;
      vel.vx += uInf * 0.1 * inf;
    }
  }
}

/**
 * World-space flow. Wind is +X. Car sits at origin, rotated by yaw about Y
 * (turntable). Positive yaw swings the nose toward +Z.
 */
export function flowAt(
  x: number,
  y: number,
  z: number,
  yaw: number,
  uInf: number,
  out?: FlowSample,
  windows: WindowState = WINDOWS_CLOSED,
): FlowSample {
  const result = out ?? _out;
  const c = Math.cos(yaw);
  const s = Math.sin(yaw);
  const lx = c * x + s * z;
  const ly = y;
  const lz = -s * x + c * z;

  const Ux = uInf * c;
  const Uz = -uInf * s;

  const opening = inAnyOpening(lx, ly, lz, windows);
  const cabin = anyWindowOpen(windows) && inCabinFluid(lx, ly, lz);

  const d = sdfCar(lx, ly, lz, windows);
  if (d < -0.04 && !cabin && !opening) {
    result.vx = 0;
    result.vy = 0;
    result.vz = 0;
    result.speed = 0;
    result.cp = 0.95;
    return result;
  }

  const n = sdfNormal(lx, ly, lz, windows);
  const layer = 0.62;
  const t = smoothstep(0, layer, Math.max(d, 0));
  const vn = Ux * n.x + Uz * n.z;
  const tx = Ux - n.x * vn;
  const ty = 0 - n.y * vn;
  const tz = Uz - n.z * vn;
  const speedup = 1 + 0.72 * (1 - t) * Math.max(0, -vn / Math.max(uInf, 1e-3));
  let vx = tx * speedup;
  let vy = ty * speedup;
  let vz = tz * speedup;

  if (ly > 1.15 && lx > -0.8 && lx < 1.8 && Math.abs(lz) < 0.95) {
    vx *= 1 + 0.22 * (1 - t);
    vy += uInf * 0.04 * (lx < 0.6 ? 1 : -1.4) * (1 - t);
  }

  if (lx > -0.9 && lx < -0.15 && ly > 0.95 && ly < 1.55 && Math.abs(lz) < 0.85) {
    vy += uInf * 0.18 * (1 - t);
    vx *= 0.82 + 0.18 * t;
  }

  if (ly < 0.34 && Math.abs(lx) < 2.2 && Math.abs(lz) < 0.85) {
    vx *= 1.28;
    vy *= 0.2;
  }

  {
    const addVortex = (px: number, py: number, pz: number, circ: number) => {
      const dx = lx - px;
      const dy = ly - py;
      const dz = lz - pz;
      const r2 = dx * dx + dy * dy + dz * dz + 0.08;
      const k = circ / r2;
      vx += k * (dy * 0.15);
      vy += k * (pz > 0 ? -dz : dz) * 0.6;
      vz += k * (pz > 0 ? dy : -dy);
    };
    if (lx > -0.5 && lx < 1.6) {
      addVortex(-0.22, 1.38, 0.74, 0.55 * uInf);
      addVortex(-0.22, 1.38, -0.74, -0.55 * uInf);
    }
  }

  const behind = lx - XC90.tail;
  if (behind > -0.15 && behind < 7 && ly > 0.05 && ly < 1.85) {
    const halfW = 0.55 + 0.18 * Math.max(behind, 0);
    const lateral = Math.abs(lz) / (halfW + 0.01);
    const vert = ly / 1.7;
    const core =
      Math.exp(-lateral * lateral * 1.8) * Math.exp(-(vert - 0.55) * (vert - 0.55) * 2.2);
    const decay = Math.exp(-Math.max(behind, 0) / 3.2);
    const wake = core * decay * (1 - t);
    vx *= 1 - 0.85 * wake;
    if (behind < 1.8) vx -= uInf * 0.35 * wake;
    vy += uInf * 0.08 * wake * (ly < 0.9 ? 1 : -0.6);
    vz += -Math.sign(lz || 1) * uInf * 0.12 * wake;
  }

  const g = smoothstep(0, 0.22, ly);
  vx *= 0.15 + 0.85 * g;
  vy *= g;
  vz *= 0.15 + 0.85 * g;

  vx = vx * (1 - t) + Ux * t;
  vy = vy * (1 - t);
  vz = vz * (1 - t) + Uz * t;

  if (cabin || opening) {
    const cv = { vx, vy, vz };
    applyCabinFlow(lx, ly, lz, uInf, windows, cv);
    vx = cv.vx;
    vy = cv.vy;
    vz = cv.vz;
  }

  const wx = c * vx - s * vz;
  const wz = s * vx + c * vz;

  const speed = Math.hypot(wx, vy, wz);
  const q = uInf * uInf || 1;
  let cp = 1 - (speed * speed) / q;

  if (behind > 0 && behind < 2.2) {
    const base = -0.28 * Math.exp(-behind * 0.7);
    cp = cp * (1 - 0.45) + base * 0.45;
  }
  if (lx < XC90.nose + 0.35 && Math.abs(lz) < 0.7 && ly > 0.25 && ly < 1.05) {
    cp = Math.max(cp, 0.55 + 0.4 * (1 - Math.abs(lz) / 0.7));
  }

  if (cabin) {
    const nOpen =
      (windows.frontL ? 1 : 0) +
      (windows.frontR ? 1 : 0) +
      (windows.rearL ? 1 : 0) +
      (windows.rearR ? 1 : 0) +
      (windows.sunroof ? 1 : 0);
    cp = -0.18 - 0.06 * nOpen - (windows.sunroof ? 0.08 : 0);
  }
  if (opening) {
    const port = WINDOW_PORTS[opening];
    cp = port.ingest ? -0.72 : opening === "sunroof" ? -0.85 : -0.48;
  }
  if (anyWindowOpen(windows) && Math.abs(Math.abs(lz) - 0.9) < 0.18 && ly > 1.05 && ly < 1.55) {
    cp -= 0.18;
  }

  cp = clamp(cp, -1.65, 1.05);

  result.vx = wx;
  result.vy = vy;
  result.vz = wz;
  result.speed = speed;
  result.cp = cp;
  return result;
}

export function kmhToMs(kmh: number) {
  return kmh / 3.6;
}

/** Quasi-steady coefficients vs yaw (deg) and open windows. XC90 published Cd ~ 0.30. */
export function aeroCoeffs(
  yawDeg: number,
  kmh: number,
  windows: WindowState = WINDOWS_CLOSED,
) {
  const a = Math.abs(yawDeg);
  const re = clamp((kmh - 80) / 160, 0, 1);
  const cdClosed = 0.304 + 0.00038 * a * a - 0.006 * re;
  const nFront = (windows.frontL ? 1 : 0) + (windows.frontR ? 1 : 0);
  const nRear = (windows.rearL ? 1 : 0) + (windows.rearR ? 1 : 0);
  const sun = windows.sunroof ? 1 : 0;
  let dCd = 0.024 * nFront + 0.018 * nRear + 0.022 * sun;
  if (nFront && (nRear || sun)) dCd += 0.01;
  if (nFront === 1 && nRear === 0 && !sun) dCd += 0.006;
  const cd = cdClosed + dCd;
  const cl = 0.086 + 0.0016 * a + 0.01 * re + 0.007 * (nFront + nRear) - 0.018 * sun;
  const clf = 0.052 + 0.0011 * a;
  const clr = cl - clf;
  const cym = 0.018 * yawDeg + 0.012 * ((windows.frontL ? -1 : 0) + (windows.frontR ? 1 : 0));
  return { cd, cl, clf, clr, cym, cdClosed, dCd };
}

/** Diverging blue→teal→sand→red colormap for Cp in [-1.2, 1.0]. */
export function cpToRgb(cp: number): [number, number, number] {
  const t = clamp((cp + 1.2) / 2.2, 0, 1);
  return sampleStops(t, CP_STOPS);
}

export function speedToRgb(speed: number, uInf: number): [number, number, number] {
  const t = clamp(speed / (uInf * 1.55 + 1e-3), 0, 1);
  return sampleStops(t, SPEED_STOPS);
}

const CP_STOPS: [number, number, number, number][] = [
  [0.0, 0.12, 0.28, 0.72],
  [0.18, 0.15, 0.55, 0.78],
  [0.36, 0.22, 0.72, 0.7],
  [0.5, 0.92, 0.93, 0.9],
  [0.62, 0.96, 0.78, 0.42],
  [0.78, 0.9, 0.42, 0.22],
  [1.0, 0.72, 0.16, 0.14],
];

const SPEED_STOPS: [number, number, number, number][] = [
  [0.0, 0.18, 0.22, 0.48],
  [0.25, 0.2, 0.55, 0.78],
  [0.5, 0.35, 0.78, 0.62],
  [0.72, 0.92, 0.82, 0.32],
  [1.0, 0.95, 0.95, 0.92],
];

function sampleStops(
  t: number,
  stops: [number, number, number, number][],
): [number, number, number] {
  const u = clamp(t, 0, 1);
  for (let i = 1; i < stops.length; i++) {
    const a = stops[i - 1]!;
    const b = stops[i]!;
    if (u <= b[0]) {
      const f = (u - a[0]) / (b[0] - a[0] || 1);
      return [a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f, a[3] + (b[3] - a[3]) * f];
    }
  }
  const last = stops[stops.length - 1]!;
  return [last[1], last[2], last[3]];
}

export function rgbCss(rgb: [number, number, number]) {
  return `rgb(${Math.round(rgb[0] * 255)} ${Math.round(rgb[1] * 255)} ${Math.round(rgb[2] * 255)})`;
}

export const CP_LEGEND = [-1.2, -0.6, 0, 0.5, 1.0] as const;
