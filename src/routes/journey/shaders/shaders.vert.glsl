attribute float aRandom;

varying float vRandom;

void main() {
  vRandom = aRandom;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z += aRandom * 0.1;
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
