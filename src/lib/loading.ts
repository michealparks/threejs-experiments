import * as THREE from 'three'
import vertexShader from './shaders/loading/vert.glsl'
import fragmentShader from './shaders/loading/frag.glsl'

export const loading = (scene: THREE.Scene): () => void => {
  let value = 1
  let ending = false
  let elapsed = 0

  const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
  const overlayMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uAlpha: { value },
      uTime: { value: elapsed },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthTest: false,
  })
  const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
  scene.add(overlay)

  const tick = (delta: number) => {
    if (value <= 0) {
      scene.remove(overlay)
      overlayGeometry.dispose()
      overlayMaterial.dispose()
      return
    }

    elapsed += delta

    if (ending) {
      value -= 0.01

      overlayMaterial.uniforms.uAlpha.value = value
    }

    overlayMaterial.uniforms.uTime.value = elapsed

    requestAnimationFrame(tick)
  }

  tick(0)

  return () => {
    ending = true
  }
}
