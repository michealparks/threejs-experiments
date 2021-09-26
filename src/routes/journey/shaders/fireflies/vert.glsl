// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float random (in vec2 _st) {
  return fract(sin(dot(_st.xy,  vec2(12.9898,78.233))) * 43758.5453123);
}

float noise (in vec2 _st) {
  vec2 i = floor(_st);
  vec2 f = fract(_st);

  // Four corners in 2D of a tile
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
          (c - a)* u.y * (1.0 - u.x) +
          (d - b) * u.x * u.y;
}

uniform float uPixelRatio;
uniform float uBaseSize;
uniform float uTime;

void main () {
  float time = uTime * 0.1;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  modelPosition.x += noise(vec2(time, modelPosition.x)) + noise(uv) - noise(modelPosition.yz) - random(modelPosition.yz) * 0.005;
  modelPosition.y += noise(vec2(time, modelPosition.y)) + noise(uv) - noise(modelPosition.xz) - random(modelPosition.xz) * 0.005;
  modelPosition.z += noise(vec2(time, modelPosition.z)) + noise(uv) - noise(modelPosition.xy) - random(modelPosition.xy) * 0.005;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  gl_PointSize = uBaseSize * uPixelRatio;
  gl_PointSize *= (1.0 / - viewPosition.z);
}
