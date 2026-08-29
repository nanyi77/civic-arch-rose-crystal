import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, r as Slot, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
import { a as RotateCcw, c as Gauge, i as SlidersHorizontal, l as Eye, n as Wind, o as Play, s as Pause, t as X, u as AppWindow } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-KVHLF1Gt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
/** Simplified automotive aero field for visualization (not official Volvo CFD). */
var XC90 = {
	length: 4.95,
	width: 1.96,
	height: 1.76,
	wheelbase: 2.984,
	track: 1.67,
	wheelRadius: .385,
	wheelWidth: .275,
	groundClearance: .216,
	nose: -2.475,
	tail: 2.475,
	frontAxle: -1.5,
	rearAxle: 1.484
};
var TUNNEL = {
	length: 28,
	width: 9.2,
	height: 5.4,
	inletX: -10,
	outletX: 12
};
var PROBES = [
	{
		id: "bumper",
		name: "前保险杠",
		nameEn: "Front bumper",
		x: -2.42,
		y: .42,
		z: 0
	},
	{
		id: "grille",
		name: "进气格栅",
		nameEn: "Grille",
		x: -2.3,
		y: .72,
		z: 0
	},
	{
		id: "hood",
		name: "发动机盖",
		nameEn: "Hood",
		x: -1.35,
		y: 1.08,
		z: 0
	},
	{
		id: "windscreen",
		name: "挡风玻璃",
		nameEn: "Windscreen",
		x: -.52,
		y: 1.28,
		z: 0
	},
	{
		id: "apillar",
		name: "A柱",
		nameEn: "A-pillar",
		x: -.28,
		y: 1.42,
		z: .78
	},
	{
		id: "mirror",
		name: "后视镜",
		nameEn: "Mirror",
		x: -.55,
		y: 1.05,
		z: 1.08
	},
	{
		id: "roof",
		name: "车顶",
		nameEn: "Roof",
		x: .45,
		y: 1.76,
		z: 0
	},
	{
		id: "door",
		name: "侧门",
		nameEn: "Front door",
		x: .15,
		y: .85,
		z: .98
	},
	{
		id: "cpillar",
		name: "C柱",
		nameEn: "C-pillar",
		x: 1.55,
		y: 1.38,
		z: .76
	},
	{
		id: "hatch",
		name: "尾门",
		nameEn: "Tailgate",
		x: 2.42,
		y: 1.05,
		z: 0
	},
	{
		id: "underbody",
		name: "车底",
		nameEn: "Underbody",
		x: .2,
		y: .18,
		z: 0
	},
	{
		id: "wheelwake",
		name: "后轮尾流",
		nameEn: "Rear-wheel wake",
		x: 2.05,
		y: .38,
		z: .84
	},
	{
		id: "cabin",
		name: "座舱",
		nameEn: "Cabin",
		x: .35,
		y: 1.28,
		z: 0
	},
	{
		id: "windowL",
		name: "左前窗",
		nameEn: "LF window",
		x: .08,
		y: 1.32,
		z: -.82
	},
	{
		id: "sunroof",
		name: "天窗",
		nameEn: "Sunroof",
		x: .35,
		y: 1.74,
		z: 0
	}
];
var WINDOWS_CLOSED = {
	frontL: false,
	frontR: false,
	rearL: false,
	rearR: false,
	sunroof: false
};
var WINDOW_PRESETS = [
	{
		id: "shut",
		label: "全关",
		windows: { ...WINDOWS_CLOSED }
	},
	{
		id: "fronts",
		label: "前窗",
		windows: {
			...WINDOWS_CLOSED,
			frontL: true,
			frontR: true
		}
	},
	{
		id: "cross",
		label: "交叉",
		windows: {
			...WINDOWS_CLOSED,
			frontL: true,
			rearR: true
		}
	},
	{
		id: "all",
		label: "全开",
		windows: {
			frontL: true,
			frontR: true,
			rearL: true,
			rearR: true,
			sunroof: true
		}
	}
];
var WINDOW_PORTS = {
	frontL: {
		x: .06,
		y: 1.32,
		z: -.82,
		hx: .44,
		hy: .22,
		hz: .1,
		ingest: true,
		name: "左前"
	},
	frontR: {
		x: .06,
		y: 1.32,
		z: .82,
		hx: .44,
		hy: .22,
		hz: .1,
		ingest: true,
		name: "右前"
	},
	rearL: {
		x: .9,
		y: 1.3,
		z: -.82,
		hx: .36,
		hy: .2,
		hz: .1,
		ingest: false,
		name: "左后"
	},
	rearR: {
		x: .9,
		y: 1.3,
		z: .82,
		hx: .36,
		hy: .2,
		hz: .1,
		ingest: false,
		name: "右后"
	},
	sunroof: {
		x: .32,
		y: 1.74,
		z: 0,
		hx: .52,
		hy: .08,
		hz: .36,
		ingest: false,
		name: "天窗"
	}
};
function anyWindowOpen(w) {
	return w.frontL || w.frontR || w.rearL || w.rearR || w.sunroof;
}
function windowKey(w) {
	return (w.frontL ? 1 : 0) | (w.frontR ? 2 : 0) | (w.rearL ? 4 : 0) | (w.rearR ? 8 : 0) | (w.sunroof ? 16 : 0);
}
var _out = {
	vx: 0,
	vy: 0,
	vz: 0,
	speed: 0,
	cp: 0
};
function sdRoundBox(px, py, pz, hx, hy, hz, r) {
	const ax = Math.abs(px) - hx + r;
	const ay = Math.abs(py) - hy + r;
	const az = Math.abs(pz) - hz + r;
	return Math.hypot(Math.max(ax, 0), Math.max(ay, 0), Math.max(az, 0)) + Math.min(Math.max(ax, ay, az), 0) - r;
}
function sdSphere(px, py, pz, r) {
	return Math.hypot(px, py, pz) - r;
}
function inCabinFluid(x, y, z) {
	return Math.abs(x - .4) < 1.05 && y > 1 && y < 1.6 && Math.abs(z) < .68;
}
function inPort(x, y, z, p) {
	return Math.abs(x - p.x) < p.hx && Math.abs(y - p.y) < p.hy && Math.abs(z - p.z) < p.hz + .08;
}
function inAnyOpening(x, y, z, w) {
	const ids = Object.keys(WINDOW_PORTS);
	for (const id of ids) if (w[id] && inPort(x, y, z, WINDOW_PORTS[id])) return id;
	return null;
}
/** Car SDF in local body frame (nose −X, y up). */
function sdfCar(x, y, z, windows = WINDOWS_CLOSED) {
	const body = sdRoundBox(x - .06, y - .7, z, 2.28, .5, .9, .16);
	const cabin = sdRoundBox(x - .38, y - 1.28, z, 1.22, .46, .76, .14);
	const hood = sdRoundBox(x + 1.28, y - 1, z, .82, .1, .82, .08);
	const wr = XC90.wheelRadius * .92;
	const w1 = sdSphere(x - XC90.frontAxle, y - wr, z - XC90.track / 2, wr);
	const w2 = sdSphere(x - XC90.frontAxle, y - wr, z + XC90.track / 2, wr);
	const w3 = sdSphere(x - XC90.rearAxle, y - wr, z - XC90.track / 2, wr);
	const w4 = sdSphere(x - XC90.rearAxle, y - wr, z + XC90.track / 2, wr);
	let d = Math.min(body, cabin, hood, w1, w2, w3, w4);
	if (anyWindowOpen(windows) && (inCabinFluid(x, y, z) || inAnyOpening(x, y, z, windows))) d = .12;
	return d;
}
function sdfNormal(x, y, z, windows) {
	const e = .045;
	const d = sdfCar(x, y, z, windows);
	const nx = sdfCar(x + e, y, z, windows) - d;
	const ny = sdfCar(x, y + e, z, windows) - d;
	const nz = sdfCar(x, y, z + e, windows) - d;
	const m = Math.hypot(nx, ny, nz) || 1;
	return {
		x: nx / m,
		y: ny / m,
		z: nz / m
	};
}
function clamp(v, a, b) {
	return Math.max(a, Math.min(b, v));
}
function smoothstep(e0, e1, x) {
	const t = clamp((x - e0) / (e1 - e0), 0, 1);
	return t * t * (3 - 2 * t);
}
function applyCabinFlow(lx, ly, lz, uInf, windows, vel) {
	const nFront = (windows.frontL ? 1 : 0) + (windows.frontR ? 1 : 0);
	const nRear = (windows.rearL ? 1 : 0) + (windows.rearR ? 1 : 0);
	vel.vx = uInf * (nFront > 0 && (nRear > 0 || windows.sunroof) ? .18 : .06);
	vel.vy = windows.sunroof ? uInf * .08 : uInf * .01;
	vel.vz = 0;
	if (windows.frontL && windows.rearR && !windows.frontR) vel.vz = uInf * .16;
	if (windows.frontR && windows.rearL && !windows.frontL) vel.vz = -uInf * .16;
	const ids = Object.keys(WINDOW_PORTS);
	for (const id of ids) {
		if (!windows[id]) continue;
		const p = WINDOW_PORTS[id];
		const dx = lx - p.x;
		const dy = ly - p.y;
		const dz = lz - p.z;
		const r2 = dx * dx + dy * dy + dz * dz;
		const inf = Math.exp(-r2 / .22);
		const inward = p.z === 0 ? 0 : p.z > 0 ? -1 : 1;
		if (p.ingest) {
			vel.vx += uInf * .12 * inf;
			vel.vz += inward * uInf * .62 * inf;
			vel.vy += -uInf * .06 * inf;
		} else if (id === "sunroof") {
			vel.vy += uInf * .55 * inf;
			vel.vx += uInf * .08 * inf;
		} else {
			vel.vz += -inward * uInf * .5 * inf;
			vel.vx += uInf * .1 * inf;
		}
	}
}
/**
* World-space flow. Wind is +X. Car sits at origin, rotated by yaw about Y
* (turntable). Positive yaw swings the nose toward +Z.
*/
function flowAt(x, y, z, yaw, uInf, out, windows = WINDOWS_CLOSED) {
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
	if (d < -.04 && !cabin && !opening) {
		result.vx = 0;
		result.vy = 0;
		result.vz = 0;
		result.speed = 0;
		result.cp = .95;
		return result;
	}
	const n = sdfNormal(lx, ly, lz, windows);
	const t = smoothstep(0, .62, Math.max(d, 0));
	const vn = Ux * n.x + Uz * n.z;
	const tx = Ux - n.x * vn;
	const ty = 0 - n.y * vn;
	const tz = Uz - n.z * vn;
	const speedup = 1 + .72 * (1 - t) * Math.max(0, -vn / Math.max(uInf, .001));
	let vx = tx * speedup;
	let vy = ty * speedup;
	let vz = tz * speedup;
	if (ly > 1.15 && lx > -.8 && lx < 1.8 && Math.abs(lz) < .95) {
		vx *= 1 + .22 * (1 - t);
		vy += uInf * .04 * (lx < .6 ? 1 : -1.4) * (1 - t);
	}
	if (lx > -.9 && lx < -.15 && ly > .95 && ly < 1.55 && Math.abs(lz) < .85) {
		vy += uInf * .18 * (1 - t);
		vx *= .82 + .18 * t;
	}
	if (ly < .34 && Math.abs(lx) < 2.2 && Math.abs(lz) < .85) {
		vx *= 1.28;
		vy *= .2;
	}
	{
		const addVortex = (px, py, pz, circ) => {
			const dx = lx - px;
			const dy = ly - py;
			const dz = lz - pz;
			const k = circ / (dx * dx + dy * dy + dz * dz + .08);
			vx += k * (dy * .15);
			vy += k * (pz > 0 ? -dz : dz) * .6;
			vz += k * (pz > 0 ? dy : -dy);
		};
		if (lx > -.5 && lx < 1.6) {
			addVortex(-.22, 1.38, .74, .55 * uInf);
			addVortex(-.22, 1.38, -.74, -.55 * uInf);
		}
	}
	const behind = lx - XC90.tail;
	if (behind > -.15 && behind < 7 && ly > .05 && ly < 1.85) {
		const halfW = .55 + .18 * Math.max(behind, 0);
		const lateral = Math.abs(lz) / (halfW + .01);
		const vert = ly / 1.7;
		const wake = Math.exp(-lateral * lateral * 1.8) * Math.exp(-(vert - .55) * (vert - .55) * 2.2) * Math.exp(-Math.max(behind, 0) / 3.2) * (1 - t);
		vx *= 1 - .85 * wake;
		if (behind < 1.8) vx -= uInf * .35 * wake;
		vy += uInf * .08 * wake * (ly < .9 ? 1 : -.6);
		vz += -Math.sign(lz || 1) * uInf * .12 * wake;
	}
	const g = smoothstep(0, .22, ly);
	vx *= .15 + .85 * g;
	vy *= g;
	vz *= .15 + .85 * g;
	vx = vx * (1 - t) + Ux * t;
	vy = vy * (1 - t);
	vz = vz * (1 - t) + Uz * t;
	if (cabin || opening) {
		const cv = {
			vx,
			vy,
			vz
		};
		applyCabinFlow(lx, ly, lz, uInf, windows, cv);
		vx = cv.vx;
		vy = cv.vy;
		vz = cv.vz;
	}
	const wx = c * vx - s * vz;
	const wz = s * vx + c * vz;
	const speed = Math.hypot(wx, vy, wz);
	const q = uInf * uInf || 1;
	let cp = 1 - speed * speed / q;
	if (behind > 0 && behind < 2.2) {
		const base = -.28 * Math.exp(-behind * .7);
		cp = cp * .55 + base * .45;
	}
	if (lx < XC90.nose + .35 && Math.abs(lz) < .7 && ly > .25 && ly < 1.05) cp = Math.max(cp, .55 + .4 * (1 - Math.abs(lz) / .7));
	if (cabin) cp = -.18 - .06 * ((windows.frontL ? 1 : 0) + (windows.frontR ? 1 : 0) + (windows.rearL ? 1 : 0) + (windows.rearR ? 1 : 0) + (windows.sunroof ? 1 : 0)) - (windows.sunroof ? .08 : 0);
	if (opening) cp = WINDOW_PORTS[opening].ingest ? -.72 : opening === "sunroof" ? -.85 : -.48;
	if (anyWindowOpen(windows) && Math.abs(Math.abs(lz) - .9) < .18 && ly > 1.05 && ly < 1.55) cp -= .18;
	cp = clamp(cp, -1.65, 1.05);
	result.vx = wx;
	result.vy = vy;
	result.vz = wz;
	result.speed = speed;
	result.cp = cp;
	return result;
}
function kmhToMs(kmh) {
	return kmh / 3.6;
}
/** Quasi-steady coefficients vs yaw (deg) and open windows. XC90 published Cd ~ 0.30. */
function aeroCoeffs(yawDeg, kmh, windows = WINDOWS_CLOSED) {
	const a = Math.abs(yawDeg);
	const re = clamp((kmh - 80) / 160, 0, 1);
	const cdClosed = .304 + 38e-5 * a * a - .006 * re;
	const nFront = (windows.frontL ? 1 : 0) + (windows.frontR ? 1 : 0);
	const nRear = (windows.rearL ? 1 : 0) + (windows.rearR ? 1 : 0);
	const sun = windows.sunroof ? 1 : 0;
	let dCd = .024 * nFront + .018 * nRear + .022 * sun;
	if (nFront && (nRear || sun)) dCd += .01;
	if (nFront === 1 && nRear === 0 && !sun) dCd += .006;
	const cd = cdClosed + dCd;
	const cl = .086 + .0016 * a + .01 * re + .007 * (nFront + nRear) - .018 * sun;
	const clf = .052 + .0011 * a;
	return {
		cd,
		cl,
		clf,
		clr: cl - clf,
		cym: .018 * yawDeg + .012 * ((windows.frontL ? -1 : 0) + (windows.frontR ? 1 : 0)),
		cdClosed,
		dCd
	};
}
/** Diverging blue→teal→sand→red colormap for Cp in [-1.2, 1.0]. */
function cpToRgb(cp) {
	return sampleStops(clamp((cp + 1.2) / 2.2, 0, 1), CP_STOPS);
}
function speedToRgb(speed, uInf) {
	return sampleStops(clamp(speed / (uInf * 1.55 + .001), 0, 1), SPEED_STOPS);
}
var CP_STOPS = [
	[
		0,
		.12,
		.28,
		.72
	],
	[
		.18,
		.15,
		.55,
		.78
	],
	[
		.36,
		.22,
		.72,
		.7
	],
	[
		.5,
		.92,
		.93,
		.9
	],
	[
		.62,
		.96,
		.78,
		.42
	],
	[
		.78,
		.9,
		.42,
		.22
	],
	[
		1,
		.72,
		.16,
		.14
	]
];
var SPEED_STOPS = [
	[
		0,
		.18,
		.22,
		.48
	],
	[
		.25,
		.2,
		.55,
		.78
	],
	[
		.5,
		.35,
		.78,
		.62
	],
	[
		.72,
		.92,
		.82,
		.32
	],
	[
		1,
		.95,
		.95,
		.92
	]
];
function sampleStops(t, stops) {
	const u = clamp(t, 0, 1);
	for (let i = 1; i < stops.length; i++) {
		const a = stops[i - 1];
		const b = stops[i];
		if (u <= b[0]) {
			const f = (u - a[0]) / (b[0] - a[0] || 1);
			return [
				a[1] + (b[1] - a[1]) * f,
				a[2] + (b[2] - a[2]) * f,
				a[3] + (b[3] - a[3]) * f
			];
		}
	}
	const last = stops[stops.length - 1];
	return [
		last[1],
		last[2],
		last[3]
	];
}
function rgbCss(rgb) {
	return `rgb(${Math.round(rgb[0] * 255)} ${Math.round(rgb[1] * 255)} ${Math.round(rgb[2] * 255)})`;
}
var CP_LEGEND = [
	-1.2,
	-.6,
	0,
	.5,
	1
];
var useTunnel = create((set) => ({
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
	setSelectedProbe: (selectedProbe) => set({
		selectedProbe,
		inspect: null
	}),
	setDensity: (density) => set({ density }),
	setCameraPreset: (cameraPreset) => set((s) => ({
		cameraPreset,
		presetTick: s.presetTick + 1
	})),
	setInspect: (inspect) => set(inspect ? {
		inspect,
		selectedProbe: null
	} : { inspect: null }),
	setWindow: (id, open) => set((s) => ({ windows: {
		...s.windows,
		[id]: open
	} })),
	setWindows: (windows) => set({ windows: { ...windows } })
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-[opacity,transform,background-color,color,border-color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			solid: "bg-fg text-bg hover:opacity-90",
			secondary: "bg-surface-2 text-fg border border-border hover:bg-surface",
			ghost: "text-fg hover:bg-surface-2",
			outline: "border border-border bg-transparent text-fg hover:bg-surface-2"
		},
		size: {
			default: "h-11 px-4 text-sm",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5 text-base",
			icon: "size-11",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Slider({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex w-full touch-none select-none items-center py-3", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1 w-full grow overflow-hidden rounded-full bg-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-accent" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full border border-accent bg-fg shadow-sm ring-offset-bg transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:pointer-events-none" })]
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:cursor-not-allowed disabled:opacity-40 data-[state=checked]:bg-accent data-[state=unchecked]:bg-surface-2", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 translate-x-0.5 rounded-full bg-fg shadow-sm transition-transform data-[state=checked]:translate-x-[1.35rem] data-[state=checked]:bg-accent-fg" })
	});
}
var VIZ = [
	{
		id: "particles",
		label: "粒子"
	},
	{
		id: "streamlines",
		label: "流线"
	},
	{
		id: "smoke",
		label: "烟雾"
	}
];
var CAMERAS = [
	{
		id: "threeQuarter",
		label: "¾"
	},
	{
		id: "side",
		label: "侧视"
	},
	{
		id: "front",
		label: "迎风"
	},
	{
		id: "rear",
		label: "尾部"
	},
	{
		id: "top",
		label: "俯视"
	}
];
function Stat({ label, value, unit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] font-medium uppercase tracking-[0.14em] text-subtle",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-0.5 font-mono text-lg tabular-nums leading-none text-fg",
			children: [value, unit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-1 text-xs text-muted",
				children: unit
			}) : null]
		})]
	});
}
function IntroOverlay() {
	const started = useTunnel((s) => s.started);
	const setStarted = useTunnel((s) => s.setStarted);
	if (started) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-20 flex items-end justify-center bg-bg/70 p-5 sm:items-center sm:p-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-lg rounded-xl border border-border bg-surface p-6 sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-[0.22em] text-accent",
					children: "Full-scale aero lab"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl",
					children: "XC90 风洞实验室"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted",
					children: "观察沃尔沃 XC90 车身周围的气流分离、表面压力与气动载荷。拖动视角，调节风速与偏航角，点选探针读取当地 Cp。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						className: "min-h-11",
						onClick: () => setStarted(true),
						children: "开始试验"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "self-center text-xs text-subtle",
						children: "拖拽旋转 · 滚轮缩放"
					})]
				})
			]
		})
	});
}
function TunnelHUD() {
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
	const [open, setOpen] = (0, import_react.useState)(false);
	const coeffs = (0, import_react.useMemo)(() => aeroCoeffs(yawDeg, windKmh, windows), [
		yawDeg,
		windKmh,
		windows
	]);
	const yaw = yawDeg * Math.PI / 180;
	const u = kmhToMs(windKmh);
	const winKey = windowKey(windows);
	const active = (0, import_react.useMemo)(() => {
		if (inspect) return {
			name: "点击测点",
			nameEn: "Picked",
			cp: inspect.cp,
			speed: inspect.speed
		};
		const p = PROBES.find((x) => x.id === selected);
		if (!p) return null;
		const c = Math.cos(yaw);
		const s = Math.sin(yaw);
		const wx = c * p.x + s * p.z;
		const wz = -s * p.x + c * p.z;
		const f = flowAt(wx, p.y, wz, yaw, u, void 0, windows);
		return {
			name: p.name,
			nameEn: p.nameEn,
			cp: f.cp,
			speed: f.speed
		};
	}, [
		inspect,
		selected,
		yaw,
		u,
		winKey,
		windows
	]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
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
	}, [
		setPlaying,
		setVizMode,
		setCameraPreset
	]);
	if (!started) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-3 sm:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto rounded-lg border border-border bg-surface/95 px-3 py-2.5 sm:px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-base font-semibold tracking-tight text-fg",
							children: "XC90"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-medium uppercase tracking-[0.16em] text-subtle",
							children: "Aero Lab"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs text-muted",
						children: "全尺寸风洞试验"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto hidden items-stretch gap-5 rounded-lg border border-border bg-surface/95 px-4 py-2.5 sm:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "风速",
							value: String(Math.round(windKmh)),
							unit: "km/h"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "偏航",
							value: `${yawDeg > 0 ? "+" : ""}${yawDeg.toFixed(0)}`,
							unit: "°"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Cd",
							value: coeffs.cd.toFixed(3)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "ΔCd",
							value: coeffs.dCd > 5e-4 ? `+${coeffs.dCd.toFixed(3)}` : "0.000"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Cl",
							value: coeffs.cl.toFixed(3)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto flex gap-2 sm:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "secondary",
						"aria-label": playing ? "暂停" : "继续",
						onClick: () => setPlaying(!playing),
						children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "secondary",
						"aria-label": "试验参数",
						onClick: () => setOpen(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4" })
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: cn("pointer-events-auto absolute z-20 w-[min(100%-1.5rem,20rem)] flex-col gap-4 overflow-y-auto rounded-xl border border-border bg-surface p-4", open ? "inset-x-3 bottom-3 top-auto flex max-h-[70dvh]" : "right-3 top-20 hidden max-h-[calc(100dvh-8rem)] sm:right-5 sm:top-24 sm:flex"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm font-medium text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, { className: "size-4 text-accent" }), "试验参数"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon-sm",
							variant: "ghost",
							"aria-label": playing ? "暂停" : "继续",
							onClick: () => setPlaying(!playing),
							children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon-sm",
							variant: "ghost",
							className: "sm:hidden",
							"aria-label": "关闭",
							onClick: () => setOpen(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex justify-between text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "风速" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono tabular-nums text-fg",
							children: [Math.round(windKmh), " km/h"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						min: 80,
						max: 220,
						step: 5,
						value: [windKmh],
						onValueChange: (v) => setWind(v[0] ?? 140)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex justify-between text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "偏航角" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono tabular-nums text-fg",
							children: [
								yawDeg > 0 ? "+" : "",
								yawDeg.toFixed(0),
								"°"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						min: -20,
						max: 20,
						step: 1,
						value: [yawDeg],
						onValueChange: (v) => setYaw(v[0] ?? 0)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 text-xs text-muted",
					children: "流场显示"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-1 rounded-md bg-bg p-1",
					children: VIZ.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setVizMode(m.id),
						className: cn("h-9 rounded-sm text-xs font-medium transition-colors", vizMode === m.id ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"),
						children: m.label
					}, m.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "size-4 text-muted" }), "表面压力"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: showPressure,
						onCheckedChange: setShowPressure
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4 text-muted" }), "压力探针"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: showProbes,
						onCheckedChange: setShowProbes
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowControls, {
					windows,
					onToggle: setWindow,
					onPreset: setWindows,
					dCd: coeffs.dCd
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 text-xs text-muted",
					children: "相机"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-1",
					children: [CAMERAS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						className: "h-9 px-2.5",
						onClick: () => setCameraPreset(c.id),
						children: c.label
					}, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon-sm",
						variant: "ghost",
						"aria-label": "复位相机",
						onClick: () => setCameraPreset("threeQuarter"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" })
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3 rounded-md bg-bg px-3 py-2.5 sm:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Cd",
						value: coeffs.cd.toFixed(3)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "ΔCd",
						value: coeffs.dCd > 5e-4 ? `+${coeffs.dCd.toFixed(3)}` : "0.000"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
			className: "pointer-events-none absolute inset-x-0 bottom-0 z-10 p-3 sm:p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-auto mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProbeStrip, {
					selected,
					onSelect: setSelected,
					yaw,
					u,
					windows
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-surface/95 px-3 py-2 sm:min-w-56",
					children: [active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-medium uppercase tracking-[0.14em] text-subtle",
							children: active.nameEn
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 text-sm font-medium text-fg",
							children: active.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 font-mono text-xs tabular-nums text-muted",
							children: [
								"Cp ",
								active.cp >= 0 ? "+" : "",
								active.cp.toFixed(2),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mx-2 text-border",
									children: "/"
								}),
								active.speed.toFixed(1),
								" m/s"
							]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "点选车身或探针读取当地压力"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pointer-events-none mt-2 text-center text-[10px] text-subtle sm:text-left",
				children: "势流 + 尾迹简化模型，用于教学演示，并非 Volvo 官方 CFD 数据"
			})]
		})
	] });
}
function WindowControls({ windows, onToggle, onPreset, dCd }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center gap-2 text-sm text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppWindow, { className: "size-4 text-muted" }), "车窗"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-1",
			children: [
				"frontL",
				"frontR",
				"rearL",
				"rearR"
			].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onToggle(id, !windows[id]),
				className: cn("h-9 rounded-md text-xs font-medium transition-colors", windows[id] ? "bg-accent text-accent-fg" : "bg-bg text-muted hover:text-fg"),
				children: WINDOW_PORTS[id].name
			}, id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onToggle("sunroof", !windows.sunroof),
			className: cn("mt-1 h-9 w-full rounded-md text-xs font-medium transition-colors", windows.sunroof ? "bg-accent text-accent-fg" : "bg-bg text-muted hover:text-fg"),
			children: "天窗"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 grid grid-cols-4 gap-1",
			children: WINDOW_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onPreset(p.windows),
				className: "h-8 rounded-sm bg-bg text-xs text-muted hover:text-fg",
				children: p.label
			}, p.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 font-mono text-xs tabular-nums text-muted",
			children: ["开窗阻力 ", dCd > 5e-4 ? `ΔCd +${dCd.toFixed(3)}` : "ΔCd 0.000"]
		})
	] });
}
function ProbeStrip({ selected, onSelect, yaw, u, windows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex max-w-full gap-1.5 overflow-x-auto pb-1",
		children: PROBES.map((p) => {
			const c = Math.cos(yaw);
			const s = Math.sin(yaw);
			const rgb = cpToRgb(flowAt(c * p.x + s * p.z, p.y, -s * p.x + c * p.z, yaw, u, void 0, windows).cp);
			const on = selected === p.id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onSelect(p.id),
				className: cn("flex h-11 shrink-0 items-center gap-2 rounded-md border px-2.5 text-left transition-colors", on ? "border-accent bg-surface-2" : "border-border bg-surface/95 hover:bg-surface-2"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "size-2.5 rounded-full",
					style: { background: rgbCss(rgb) },
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-fg",
					children: p.name
				})]
			}, p.id);
		})
	});
}
function Legend() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1.5 w-full rounded-full",
				style: { background: "linear-gradient(90deg, rgb(31 71 184), rgb(38 140 199), rgb(56 184 179), rgb(235 237 230), rgb(245 199 107), rgb(230 107 56), rgb(184 41 36))" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 flex justify-between font-mono text-[10px] tabular-nums text-subtle",
				children: CP_LEGEND.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: v > 0 ? `+${v.toFixed(1)}` : v.toFixed(1) }, v))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] text-subtle",
				children: "表面压力系数 Cp"
			})
		]
	});
}
var TunnelCanvas = (0, import_react.lazy)(() => import("./canvas-C-tPn25b.mjs"));
if (typeof window !== "undefined") import("./canvas-C-tPn25b.mjs");
function WindTunnelApp() {
	const [canvasOn, setCanvasOn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setCanvasOn(true), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-dvh w-full overflow-hidden bg-bg text-fg",
		children: [
			canvasOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TunnelCanvas, {})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 bg-bg",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntroOverlay, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TunnelHUD, {})
		]
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindTunnelApp, {});
}
//#endregion
export { XC90 as a, kmhToMs as c, TUNNEL as i, speedToRgb as l, useTunnel as n, cpToRgb as o, PROBES as r, flowAt as s, routes_exports as t, windowKey as u };
