uniform float time;

varying vec2 vUv;

void main () {
  float ts = sin(time);
  float tc = cos(time);
  float tt = tan(time);
  float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
  strength *= 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
  gl_FragColor = vec4(ts * strength, tc * strength, tt * strength, 1.0);
}