
varying vec2 vUv;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  float mag = 10.0;
  vec2 gridUv = vec2(floor(vUv.x * mag) / mag, floor(vUv.y * mag) / mag);
  float strength = random(gridUv);
  gl_FragColor = vec4(vec3(strength), 1.0);
}
