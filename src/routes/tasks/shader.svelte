<script lang='ts'>

import * as THREE from 'three'
import { GL } from '$lib/gl'
import { createPointLight } from '$lib/util-three'
import fragmentShader from './shaders/hello-shader.frag.glsl'

const gl = GL()

gl.camera.position.set(0, 0, 2)
gl.scene.lookAt(new THREE.Vector3())

const uniforms = {
  ...THREE.UniformsLib.lights,
  time: { value: 0 },
  resolution: { value: new THREE.Vector2() },
}

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 0.5), 
  new THREE.ShaderMaterial({
    fragmentShader,
    uniforms,
    lights: true,
  })
)
gl.scene.add(cube)

const light = createPointLight()
light.position.set(-1, 2, 4)
light.lookAt(new THREE.Vector3())
gl.scene.add(light)

gl.setAnimationLoop((_dt: number, elapsed: number) => {
  uniforms.resolution.value.set(gl.canvas.width, gl.canvas.height)
  uniforms.time.value = elapsed
  cube.rotation.x = elapsed
  cube.rotation.y = elapsed
})

</script>
