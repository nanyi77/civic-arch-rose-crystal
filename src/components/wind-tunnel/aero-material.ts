import * as THREE from "three";

export const aeroUniforms = {
  uPressureMix: { value: 0 },
};

const COLORMAP_GLSL = /* glsl */ `
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

export function attachAeroShader(material: THREE.MeshPhysicalMaterial) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uPressureMix = aeroUniforms.uPressureMix;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <common>",
      `#include <common>
       varying vec3 vAeroNormal;`,
    );
    shader.vertexShader = shader.vertexShader.replace(
      "#include <beginnormal_vertex>",
      `#include <beginnormal_vertex>
       vAeroNormal = normalize(mat3(modelMatrix) * objectNormal);`,
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <common>",
      `#include <common>
       uniform float uPressureMix;
       varying vec3 vAeroNormal;
       ${COLORMAP_GLSL}`,
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <color_fragment>",
      `#include <color_fragment>
       if (uPressureMix > 0.001) {
         vec3 n = normalize(vAeroNormal);
         vec3 pc = aeroCpColor(aeroCp(n));
         diffuseColor.rgb = mix(diffuseColor.rgb, pc, uPressureMix);
       }`,
    );
  };
  material.customProgramCacheKey = () => "xc90-aero-paint-v1";
}

export function makePaintMaterial(color: string) {
  const mat = new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.76,
    roughness: 0.3,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    envMapIntensity: 0.85,
  });
  attachAeroShader(mat);
  return mat;
}
