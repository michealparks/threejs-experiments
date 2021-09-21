uniform float uPixelRatio;
uniform float uBaseSize;

void main () {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;
  gl_PointSize = uBaseSize * uPixelRatio;
  gl_PointSize *= (1.0 / - viewPosition.z);
}
