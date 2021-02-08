uniform vec2 resolution;
uniform float time;

void main() {
  // Normalized pixel coordinates (0 - 1)
  vec2 uv = gl_FragCoord.xy / resolution;

  // Time varying pixel color
  vec3 rgb = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0, 2, 4));

  gl_FragColor = vec4(rgb, 1.0);
}
