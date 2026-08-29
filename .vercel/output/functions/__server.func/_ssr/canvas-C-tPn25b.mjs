import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Line, c as useThree, d as Color, f as MeshBasicMaterial, g as Vector3, h as SphereGeometry, i as OrbitControls, m as Object3D, n as RoundedBox, o as Canvas, p as MeshPhysicalMaterial, r as Grid, s as useFrame, t as ContactShadows, u as BoxGeometry } from "../_libs/@react-three/drei+[...].mjs";
import { a as XC90, c as kmhToMs, i as TUNNEL, l as speedToRgb, n as useTunnel, o as cpToRgb, r as PROBES, s as flowAt, u as windowKey } from "./routes-KVHLF1Gt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/canvas-C-tPn25b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var aeroUniforms = { uPressureMix: { value: 0 } };
var COLORMAP_GLSL = `
vec3 aeroCpColor(float cp) {
  float t = clamp((cp + 1.2) / 2.2, 0.0, 1.0);
  vec3 c;
  if (t < 0.18) {
    float f = t / 0.18;
    c = mix(vec3(0.12, 0.28, 0.72), vec3(0.15, 0.55, 0.78), f);
  } else if (t < 0.36) {
    float f = (t - 0.18) / 0.18;
    c = mix(vec3(0.15, 0.55, 0.78), vec3(0.22, 0.72, 0.70), f);
  } else if (t < 0.50) {
    float f = (t - 0.36) / 0.14;
    c = mix(vec3(0.22, 0.72, 0.70), vec3(0.92, 0.93, 0.90), f);
  } else if (t < 0.62) {
    float f = (t - 0.50) / 0.12;
    c = mix(vec3(0.92, 0.93, 0.90), vec3(0.96, 0.78, 0.42), f);
  } else if (t < 0.78) {
    float f = (t - 0.62) / 0.16;
    c = mix(vec3(0.96, 0.78, 0.42), vec3(0.90, 0.42, 0.22), f);
  } else {
    float f = (t - 0.78) / 0.22;
    c = mix(vec3(0.90, 0.42, 0.22), vec3(0.72, 0.16, 0.14), f);
  }
  return c;
}

float aeroCp(vec3 n) {
  vec3 uhat = vec3(1.0, 0.0, 0.0);
  float facing = dot(n, -uhat);
  float tang = length(cross(n, uhat));
  float cp = 1.0 - 1.28 * tang * tang;
  if (facing < -0.12) {
    cp = mix(cp, -0.34, smoothstep(-0.12, -0.62, facing));
  }
  if (n.y > 0.42) cp -= 0.24 * n.y;
  if (n.y < -0.35) cp -= 0.14;
  if (abs(n.z) > 0.5 && n.y > 0.12) cp -= 0.28 * abs(n.z);
  return clamp(cp, -1.6, 1.05);
}
`;
function attachAeroShader(material) {
	material.onBeforeCompile = (shader) => {
		shader.uniforms.uPressureMix = aeroUniforms.uPressureMix;
		shader.vertexShader = shader.vertexShader.replace("#include <common>", `#include <common>
       varying vec3 vAeroNormal;`);
		shader.vertexShader = shader.vertexShader.replace("#include <beginnormal_vertex>", `#include <beginnormal_vertex>
       vAeroNormal = normalize(mat3(modelMatrix) * objectNormal);`);
		shader.fragmentShader = shader.fragmentShader.replace("#include <common>", `#include <common>
       uniform float uPressureMix;
       varying vec3 vAeroNormal;
       ${COLORMAP_GLSL}`);
		shader.fragmentShader = shader.fragmentShader.replace("#include <color_fragment>", `#include <color_fragment>
       if (uPressureMix > 0.001) {
         vec3 n = normalize(vAeroNormal);
         vec3 pc = aeroCpColor(aeroCp(n));
         diffuseColor.rgb = mix(diffuseColor.rgb, pc, uPressureMix);
       }`);
	};
	material.customProgramCacheKey = () => "xc90-aero-paint-v1";
}
function makePaintMaterial(color) {
	const mat = new MeshPhysicalMaterial({
		color,
		metalness: .76,
		roughness: .3,
		clearcoat: 1,
		clearcoatRoughness: .1,
		envMapIntensity: .85
	});
	attachAeroShader(mat);
	return mat;
}
function MovingGlass({ size, closed, open, dropped }) {
	const ref = (0, import_react.useRef)(null);
	const from = (0, import_react.useRef)(new Vector3(...closed));
	const to = (0, import_react.useRef)(new Vector3(...open));
	from.current.set(...closed);
	to.current.set(...open);
	useFrame((_, rawDt) => {
		const mesh = ref.current;
		if (!mesh) return;
		const k = 1 - Math.exp(-10 * Math.min(rawDt, .05));
		mesh.position.lerp(dropped ? to.current : from.current, k);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		ref,
		position: closed,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: size }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
			color: "#0c141c",
			metalness: .1,
			roughness: .06,
			transparent: true,
			opacity: .42
		})]
	});
}
function Wheel({ x, z }) {
	const r = XC90.wheelRadius;
	const w = XC90.wheelWidth;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			x,
			r,
			z
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					r,
					r,
					w,
					28
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#121214",
					roughness: .92,
					metalness: .08
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					r * .68,
					r * .68,
					w * .55,
					24
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#2a3038",
					roughness: .28,
					metalness: .82
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					r * .18,
					r * .18,
					w * .7,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0d0e10",
					roughness: .4,
					metalness: .5
				})]
			})
		]
	});
}
function ThorHammer({ z }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			-2.34,
			.74,
			z
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			.05,
			.045,
			.42
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#e8f2ff",
			emissive: "#c8dcf0",
			emissiveIntensity: 1.6,
			toneMapped: false
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.01,
				-.1,
				-(Math.sign(z) || 1) * .12
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.04,
				.18,
				.045
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#e8f2ff",
				emissive: "#c8dcf0",
				emissiveIntensity: 1.6,
				toneMapped: false
			})]
		})]
	});
}
function XC90Model() {
	const yawDeg = useTunnel((s) => s.yawDeg);
	const setInspect = useTunnel((s) => s.setInspect);
	const windKmh = useTunnel((s) => s.windKmh);
	const windows = useTunnel((s) => s.windows);
	const paint = (0, import_react.useMemo)(() => makePaintMaterial("#16191e"), []);
	const paintSoft = (0, import_react.useMemo)(() => makePaintMaterial("#1b2026"), []);
	(0, import_react.useEffect)(() => {
		return () => {
			paint.dispose();
			paintSoft.dispose();
		};
	}, [paint, paintSoft]);
	const yaw = yawDeg * Math.PI / 180;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		rotation: [
			0,
			yaw,
			0
		],
		onClick: (e) => {
			e.stopPropagation();
			const u = kmhToMs(windKmh);
			const s = flowAt(e.point.x, e.point.y, e.point.z, yaw, u, void 0, windows);
			setInspect({
				x: e.point.x,
				y: e.point.y,
				z: e.point.z,
				cp: s.cp,
				speed: s.speed
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
				args: [
					4.42,
					.78,
					1.88
				],
				radius: .12,
				smoothness: 4,
				position: [
					.08,
					.68,
					0
				],
				material: paint,
				castShadow: true,
				receiveShadow: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
				args: [
					4.36,
					.12,
					1.92
				],
				radius: .04,
				smoothness: 3,
				position: [
					.1,
					.98,
					0
				],
				material: paintSoft,
				castShadow: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
				args: [
					1.7,
					.1,
					1.7
				],
				radius: .04,
				smoothness: 3,
				position: [
					-1.28,
					1.02,
					0
				],
				rotation: [
					0,
					0,
					.07
				],
				material: paint,
				castShadow: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
				args: [
					.42,
					.7,
					1.86
				],
				radius: .08,
				smoothness: 3,
				position: [
					-2.28,
					.55,
					0
				],
				material: paint,
				castShadow: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
				args: [
					.62,
					.86,
					1.86
				],
				radius: .1,
				smoothness: 3,
				position: [
					2.16,
					.72,
					0
				],
				material: paint,
				castShadow: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
				args: [
					2.55,
					.72,
					1.5
				],
				radius: .1,
				smoothness: 4,
				position: [
					.42,
					1.34,
					0
				],
				material: paint,
				castShadow: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
				args: [
					2.2,
					.08,
					1.48
				],
				radius: .03,
				smoothness: 3,
				position: [
					.38,
					1.72,
					0
				],
				material: paint,
				castShadow: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.4,
					1.28,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.2,
					.52,
					1.42
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#07080a",
					roughness: .95
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.35,
					1.78,
					.58
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.05,
					.03,
					.035
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#3a4048",
					metalness: .7,
					roughness: .3
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.35,
					1.78,
					-.58
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.05,
					.03,
					.035
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#3a4048",
					metalness: .7,
					roughness: .3
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.55,
					1.38,
					0
				],
				rotation: [
					0,
					0,
					.55
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.08,
					.62,
					1.5
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
					color: "#0c141c",
					metalness: .15,
					roughness: .05,
					transparent: true,
					opacity: .42,
					envMapIntensity: 1.2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MovingGlass, {
				size: [
					.88,
					.46,
					.035
				],
				closed: [
					.02,
					1.42,
					.825
				],
				open: [
					.02,
					1.02,
					.825
				],
				dropped: windows.frontR
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MovingGlass, {
				size: [
					.88,
					.46,
					.035
				],
				closed: [
					.02,
					1.42,
					-.825
				],
				open: [
					.02,
					1.02,
					-.825
				],
				dropped: windows.frontL
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MovingGlass, {
				size: [
					.72,
					.42,
					.035
				],
				closed: [
					.92,
					1.4,
					.825
				],
				open: [
					.92,
					1.02,
					.825
				],
				dropped: windows.rearR
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MovingGlass, {
				size: [
					.72,
					.42,
					.035
				],
				closed: [
					.92,
					1.4,
					-.825
				],
				open: [
					.92,
					1.02,
					-.825
				],
				dropped: windows.rearL
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					1.58,
					1.4,
					0
				],
				rotation: [
					0,
					0,
					-.4
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.08,
					.52,
					1.42
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
					color: "#0c141c",
					metalness: .1,
					roughness: .06,
					transparent: true,
					opacity: .38
				})]
			}),
			windows.sunroof && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.32,
					1.735,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.05,
					.02,
					.72
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#050608",
					roughness: .9
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MovingGlass, {
				size: [
					1.02,
					.03,
					.68
				],
				closed: [
					.32,
					1.765,
					0
				],
				open: [
					1.05,
					1.78,
					0
				],
				dropped: windows.sunroof
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.4,
					1.14,
					.83
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.2,
					.025,
					.03
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#c5ccd4",
					metalness: .95,
					roughness: .18
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.4,
					1.14,
					-.83
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.2,
					.025,
					.03
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#c5ccd4",
					metalness: .95,
					roughness: .18
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-2.48,
					.72,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.08,
					.38,
					1.12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0e1014",
					roughness: .55,
					metalness: .2
				})]
			}),
			Array.from({ length: 9 }, (_, i) => {
				const z = (i - 4) * .115;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-2.5,
						.72,
						z
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.04,
						.3,
						.022
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#c8d0d8",
						metalness: .92,
						roughness: .2
					})]
				}, i);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-2.54,
					.72,
					0
				],
				rotation: [
					0,
					Math.PI / 2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.078,
					.011,
					8,
					28
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#d4dbe2",
					metalness: .95,
					roughness: .16
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-2.54,
					.72,
					0
				],
				rotation: [
					.55,
					0,
					.15
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.03,
					.02,
					.17
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#d4dbe2",
					metalness: .95,
					roughness: .16
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-2.46,
					.34,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.12,
					.22,
					1.28
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0a0c0f",
					roughness: .7
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThorHammer, { z: .78 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThorHammer, { z: -.78 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-2.38,
					.4,
					.78
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.08,
					.06,
					.16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#dce6f0",
					emissive: "#9aa8b8",
					emissiveIntensity: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-2.38,
					.4,
					-.78
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.08,
					.06,
					.16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#dce6f0",
					emissive: "#9aa8b8",
					emissiveIntensity: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
				args: [
					.18,
					.14,
					.22
				],
				radius: .03,
				smoothness: 3,
				position: [
					-.52,
					1.08,
					1.08
				],
				material: paint,
				castShadow: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
				args: [
					.18,
					.14,
					.22
				],
				radius: .03,
				smoothness: 3,
				position: [
					-.52,
					1.08,
					-1.08
				],
				material: paint,
				castShadow: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					2.46,
					.92,
					.86
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.05,
					.42,
					.08
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#c45a4e",
					emissive: "#a83830",
					emissiveIntensity: .85,
					toneMapped: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					2.46,
					.92,
					-.86
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.05,
					.42,
					.08
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#c45a4e",
					emissive: "#a83830",
					emissiveIntensity: .85,
					toneMapped: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					2.4,
					1.08,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.04,
					.03,
					1.72
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#c45a4e",
					emissive: "#a83830",
					emissiveIntensity: .5,
					toneMapped: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					2.42,
					.28,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.28,
					.16,
					1.5
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0d0f12",
					roughness: .8
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					.1,
					.24,
					.94
				],
				material: paintSoft,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					3.6,
					.12,
					.08
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					.1,
					.24,
					-.94
				],
				material: paintSoft,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					3.6,
					.12,
					.08
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
				x: XC90.frontAxle,
				z: XC90.track / 2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
				x: XC90.frontAxle,
				z: -XC90.track / 2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
				x: XC90.rearAxle,
				z: XC90.track / 2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
				x: XC90.rearAxle,
				z: -XC90.track / 2
			})
		]
	});
}
var DENSITY_COUNT = {
	low: 1600,
	med: 3800,
	high: 6400
};
function spawnParticle(x, y, z, life, i, smoke) {
	const tight = Math.random() < .62;
	x[i] = TUNNEL.inletX + Math.random() * 1.4;
	y[i] = tight ? .12 + Math.random() * (smoke ? 1.5 : 2.05) : .08 + Math.random() * 2.9;
	z[i] = (Math.random() - .5) * (tight ? smoke ? 2.2 : 2.6 : smoke ? 3.2 : 6.4);
	life[i] = Math.random();
}
function FlowParticles({ smoke = false }) {
	const meshRef = (0, import_react.useRef)(null);
	const density = useTunnel((s) => s.density);
	const playing = useTunnel((s) => s.playing);
	const yawDeg = useTunnel((s) => s.yawDeg);
	const windKmh = useTunnel((s) => s.windKmh);
	const windows = useTunnel((s) => s.windows);
	const mobile = typeof window !== "undefined" && window.innerWidth < 640 ? .45 : 1;
	const n = Math.max(400, Math.floor(DENSITY_COUNT[density] * (smoke ? .55 : 1) * mobile));
	const sim = (0, import_react.useMemo)(() => {
		const x = new Float32Array(n);
		const y = new Float32Array(n);
		const z = new Float32Array(n);
		const life = new Float32Array(n);
		for (let i = 0; i < n; i++) spawnParticle(x, y, z, life, i, smoke);
		return {
			x,
			y,
			z,
			life
		};
	}, [n, smoke]);
	const dummy = (0, import_react.useMemo)(() => new Object3D(), []);
	const color = (0, import_react.useMemo)(() => new Color(), []);
	const zAxis = (0, import_react.useMemo)(() => new Vector3(0, 0, 1), []);
	const dir = (0, import_react.useMemo)(() => new Vector3(), []);
	const sample = (0, import_react.useMemo)(() => ({
		vx: 0,
		vy: 0,
		vz: 0,
		speed: 0,
		cp: 0
	}), []);
	const geom = (0, import_react.useMemo)(() => {
		if (smoke) return new SphereGeometry(.07, 6, 6);
		return new BoxGeometry(.038, .038, .22);
	}, [smoke]);
	const mat = (0, import_react.useMemo)(() => new MeshBasicMaterial({
		vertexColors: true,
		transparent: true,
		opacity: smoke ? .28 : .95,
		depthWrite: !smoke,
		blending: smoke ? 2 : 1,
		toneMapped: false
	}), [smoke]);
	(0, import_react.useEffect)(() => {
		return () => {
			geom.dispose();
			mat.dispose();
		};
	}, [geom, mat]);
	useFrame((_, rawDt) => {
		const mesh = meshRef.current;
		if (!mesh || !playing) return;
		const dt = Math.min(rawDt, .05);
		const yaw = yawDeg * Math.PI / 180;
		const u = kmhToMs(windKmh);
		const { x, y, z, life } = sim;
		for (let i = 0; i < n; i++) {
			flowAt(x[i], y[i], z[i], yaw, u, sample, windows);
			const speed = sample.speed;
			if (speed < .08) spawnParticle(x, y, z, life, i, smoke);
			else {
				const k = smoke ? .72 : 1;
				x[i] += sample.vx * dt * k;
				y[i] += sample.vy * dt * k;
				z[i] += sample.vz * dt * k;
				if (smoke) {
					z[i] += Math.sin(i * 12.9898 + x[i] * .4) * .35 * dt;
					y[i] += .12 * dt;
				}
				life[i] += dt * (smoke ? .12 : .18);
			}
			if (x[i] > TUNNEL.outletX - .6 || y[i] < .03 || y[i] > 4.8 || Math.abs(z[i]) > 4.6 || life[i] > 1) spawnParticle(x, y, z, life, i, smoke);
			dummy.position.set(x[i], y[i], z[i]);
			dir.set(sample.vx, sample.vy, sample.vz);
			if (dir.lengthSq() > 1e-6) {
				dir.normalize();
				dummy.quaternion.setFromUnitVectors(zAxis, dir);
			}
			const len = smoke ? 1.1 : Math.min(2.4, .55 + speed / (u + .001));
			const fat = smoke ? 2.4 : 1;
			dummy.scale.set(fat, fat, len);
			dummy.updateMatrix();
			mesh.setMatrixAt(i, dummy.matrix);
			const [r, g, b] = smoke ? [
				.72,
				.78,
				.84
			] : speedToRgb(speed, u);
			color.setRGB(r, g, b);
			mesh.setColorAt(i, color);
		}
		mesh.instanceMatrix.needsUpdate = true;
		if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("instancedMesh", {
		ref: meshRef,
		args: [
			geom,
			mat,
			n
		],
		frustumCulled: false
	});
}
function makeStreamlines(yaw, uInf, dense, windows) {
	const ny = dense ? 7 : 5;
	const nz = dense ? 9 : 7;
	const lines = [];
	const sample = {
		vx: 0,
		vy: 0,
		vz: 0,
		speed: 0,
		cp: 0
	};
	for (let iy = 0; iy < ny; iy++) for (let iz = 0; iz < nz; iz++) {
		const y0 = .14 + iy / Math.max(ny - 1, 1) * 2.5;
		const z0 = -2.35 + iz / Math.max(nz - 1, 1) * 4.7;
		const pts = [];
		const colors = [];
		let x = TUNNEL.inletX + .8;
		let y = y0;
		let z = z0;
		for (let s = 0; s < 110; s++) {
			pts.push([
				x,
				y,
				z
			]);
			flowAt(x, y, z, yaw, uInf, sample, windows);
			colors.push(speedToRgb(sample.speed, uInf));
			const step = .05;
			x += sample.vx * step;
			y += sample.vy * step;
			z += sample.vz * step;
			if (x > TUNNEL.outletX - 1 || y < .04 || y > 4.6 || sample.speed < .15) break;
		}
		if (pts.length > 4) lines.push({
			pts,
			colors
		});
	}
	return lines;
}
function Streamlines() {
	const yawDeg = useTunnel((s) => s.yawDeg);
	const windKmh = useTunnel((s) => s.windKmh);
	const density = useTunnel((s) => s.density);
	const windows = useTunnel((s) => s.windows);
	const yaw = yawDeg * Math.PI / 180;
	const u = kmhToMs(windKmh);
	const key = windowKey(windows);
	const lines = (0, import_react.useMemo)(() => makeStreamlines(yaw, u, density !== "low", windows), [
		yaw,
		u,
		density,
		key,
		windows
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: lines.map((ln, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
		points: ln.pts,
		vertexColors: ln.colors,
		lineWidth: 1.35,
		transparent: true,
		opacity: .85
	}, i)) });
}
function ProbeMarkers() {
	const show = useTunnel((s) => s.showProbes);
	const selected = useTunnel((s) => s.selectedProbe);
	const setSelected = useTunnel((s) => s.setSelectedProbe);
	const yawDeg = useTunnel((s) => s.yawDeg);
	const windKmh = useTunnel((s) => s.windKmh);
	const inspect = useTunnel((s) => s.inspect);
	const windows = useTunnel((s) => s.windows);
	const yaw = yawDeg * Math.PI / 180;
	const u = kmhToMs(windKmh);
	const key = windowKey(windows);
	const samples = (0, import_react.useMemo)(() => {
		return PROBES.map((p) => {
			const c = Math.cos(yaw);
			const s = Math.sin(yaw);
			const wx = c * p.x + s * p.z;
			const wz = -s * p.x + c * p.z;
			const f = flowAt(wx, p.y, wz, yaw, u, void 0, windows);
			return {
				probe: p,
				wx,
				wy: p.y,
				wz,
				...f
			};
		});
	}, [
		yaw,
		u,
		key,
		windows
	]);
	if (!show) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [samples.map(({ probe, wx, wy, wz, cp }) => {
		const active = selected === probe.id;
		const [r, g, b] = cpToRgb(cp);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				wx,
				wy,
				wz
			],
			onClick: (e) => {
				e.stopPropagation();
				setSelected(probe.id);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				active ? .075 : .05,
				16,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: new Color(r, g, b),
				toneMapped: false
			})]
		}, probe.id);
	}), inspect && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			inspect.x,
			inspect.y,
			inspect.z
		],
		rotation: [
			-Math.PI / 2,
			0,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
			.05,
			.08,
			24
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			color: "#e8eaed",
			toneMapped: false,
			side: 2
		})]
	})] });
}
var PRESETS = {
	threeQuarter: {
		pos: [
			7.2,
			2.9,
			7.8
		],
		target: [
			.2,
			.72,
			0
		]
	},
	side: {
		pos: [
			.3,
			1.55,
			9.4
		],
		target: [
			.1,
			.7,
			0
		]
	},
	front: {
		pos: [
			-9.2,
			1.5,
			.15
		],
		target: [
			0,
			.7,
			0
		]
	},
	rear: {
		pos: [
			8.6,
			1.7,
			.35
		],
		target: [
			.2,
			.75,
			0
		]
	},
	top: {
		pos: [
			.4,
			13.2,
			.15
		],
		target: [
			0,
			0,
			0
		]
	}
};
function CameraRig() {
	const controls = (0, import_react.useRef)(null);
	const preset = useTunnel((s) => s.cameraPreset);
	const tick = useTunnel((s) => s.presetTick);
	const camera = useThree((s) => s.camera);
	const goalPos = (0, import_react.useRef)(new Vector3());
	const goalTarget = (0, import_react.useRef)(new Vector3());
	const blending = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const p = PRESETS[preset];
		goalPos.current.set(...p.pos);
		goalTarget.current.set(...p.target);
		blending.current = 1;
	}, [preset, tick]);
	useFrame((_, rawDt) => {
		const ctrl = controls.current;
		if (blending.current <= 0 || !ctrl) return;
		const dt = Math.min(rawDt, .05);
		const k = 1 - Math.exp(-5.5 * dt);
		camera.position.lerp(goalPos.current, k);
		ctrl.target.lerp(goalTarget.current, k);
		ctrl.update();
		blending.current -= dt;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
		ref: controls,
		makeDefault: true,
		enableDamping: true,
		dampingFactor: .08,
		minDistance: 4.2,
		maxDistance: 20,
		maxPolarAngle: Math.PI / 2 - .05,
		target: [
			.2,
			.72,
			0
		]
	});
}
function TunnelShell() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				1,
				-.01,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [TUNNEL.length, TUNNEL.width] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#0e1218",
				roughness: .92,
				metalness: .04
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, {
			position: [
				1,
				.002,
				0
			],
			args: [TUNNEL.length, TUNNEL.width],
			cellSize: .5,
			cellThickness: .6,
			cellColor: "#24303a",
			sectionSize: 2,
			sectionThickness: 1.1,
			sectionColor: "#3a4a58",
			fadeDistance: 24,
			fadeStrength: 1.4,
			infiniteGrid: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				1,
				2.5,
				TUNNEL.width / 2
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [TUNNEL.length, 5] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
				color: "#152028",
				transparent: true,
				opacity: .14,
				roughness: .05,
				metalness: .2,
				side: 2
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				1,
				2.5,
				-TUNNEL.width / 2
			],
			rotation: [
				0,
				Math.PI,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [TUNNEL.length, 5] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
				color: "#152028",
				transparent: true,
				opacity: .14,
				roughness: .05,
				metalness: .2,
				side: 2
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				1,
				TUNNEL.height,
				0
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [TUNNEL.length, TUNNEL.width] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#12181f",
				roughness: .85
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				TUNNEL.inletX - .2,
				2.55,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.4,
				5.1,
				TUNNEL.width - .2
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#151c24",
				metalness: .35,
				roughness: .55
			})]
		}),
		Array.from({ length: 11 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				TUNNEL.inletX + .05,
				.35 + i * .46,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.08,
				.06,
				TUNNEL.width - .6
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#9ec4d8",
				emissive: "#6aa0bc",
				emissiveIntensity: .35,
				toneMapped: false
			})]
		}, i)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				TUNNEL.outletX,
				2.55,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.5,
				5.1,
				TUNNEL.width - .2
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#10161c",
				metalness: .4,
				roughness: .5
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				TUNNEL.outletX - .2,
				2.2,
				0
			],
			rotation: [
				0,
				Math.PI / 2,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [1.35, 40] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1a222c",
				metalness: .6,
				roughness: .3
			})]
		}),
		[
			-4,
			-1,
			2,
			5
		].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				x,
				TUNNEL.height - .08,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				2.4,
				.04,
				.18
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#e8eef4",
				emissive: "#d0dce8",
				emissiveIntensity: 1.4,
				toneMapped: false
			})]
		}, x))
	] });
}
function AeroSync() {
	const mix = useTunnel((s) => s.showPressure);
	useFrame(() => {
		const target = mix ? 1 : 0;
		const cur = aeroUniforms.uPressureMix.value;
		aeroUniforms.uPressureMix.value = cur + (target - cur) * .08;
	});
	return null;
}
function TunnelScene() {
	const viz = useTunnel((s) => s.vizMode);
	const started = useTunnel((s) => s.started);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#090b0e"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#090b0e",
				14,
				34
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#8aa0b4",
			"#1a1512",
			.45
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .22 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				-8,
				8,
				4
			],
			intensity: 1.55,
			castShadow: true,
			"shadow-mapSize-width": 1024,
			"shadow-mapSize-height": 1024,
			"shadow-camera-far": 30,
			"shadow-camera-left": -8,
			"shadow-camera-right": 8,
			"shadow-camera-top": 8,
			"shadow-camera-bottom": -8
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				6,
				4,
				-6
			],
			intensity: .45,
			color: "#9bb4c8"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				-6,
				3.2,
				0
			],
			intensity: 18,
			distance: 16,
			color: "#8eb4cc"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraRig, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TunnelShell, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XC90Model, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactShadows, {
			position: [
				0,
				.01,
				0
			],
			opacity: .45,
			scale: 12,
			blur: 2.2,
			far: 4
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AeroSync, {}),
		viz === "particles" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowParticles, {}),
		viz === "smoke" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowParticles, { smoke: true }),
		viz === "streamlines" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Streamlines, {}),
		started && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProbeMarkers, {})
	] });
}
function TunnelCanvas() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
		className: "absolute inset-0 touch-none",
		shadows: true,
		dpr: [1, 1.6],
		gl: {
			antialias: true,
			alpha: false,
			powerPreference: "high-performance"
		},
		camera: {
			position: [
				7.2,
				2.9,
				7.8
			],
			fov: 34,
			near: .1,
			far: 80
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TunnelScene, {})
		})
	});
}
//#endregion
export { TunnelCanvas as default };
