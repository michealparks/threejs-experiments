uniform float uAlpha;
uniform float uTime;

varying vec2 vUv;

void main() {
  float strength = clamp(distance(vUv, vec2(0.5)), 0.0, 1.0);
  gl_FragColor = vec4(0, 0, 0, uAlpha + strength * 0.9);
}
