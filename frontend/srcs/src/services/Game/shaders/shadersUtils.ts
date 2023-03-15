import { Color, ShaderMaterial, UniformsLib } from "three";

export const toonShaderMaterial = new ShaderMaterial({
  lights: true,
  uniforms: {
    ...UniformsLib.lights,
    uColor: { value: new Color("#6495ED") },
  },
  vertexShader: `
  varying vec3 vNormal;

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 clipPosition = projectionMatrix * viewPosition;
  
    vNormal = normalize(normalMatrix * normal);
  
    gl_Position = clipPosition;
  }
    `,
  fragmentShader: `
#include <common>
#include <lights_pars_begin>

uniform vec3 uColor;

varying vec3 vNormal;

void main() {
    float NdotL = dot(vNormal, directionalLights[0].direction);
    float lightIntensity = smoothstep(0.0, 0.01, NdotL);
    vec3 directionalLight = directionalLights[0].color * lightIntensity;
  
    gl_FragColor = vec4(uColor * directionalLight, 1.0);
}
    `,
});
