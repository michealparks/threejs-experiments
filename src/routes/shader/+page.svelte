<script lang='ts'>

import * as THREE from 'three'
import { three } from 'trzy'
import fragmentShader from '$lib/shaders/hello-shader.frag.glsl'

const { scene, camera, renderer, update } = three()

camera.position.set(0, 0, 2)
scene.lookAt(new THREE.Vector3())

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

scene.add(cube)

const light = new THREE.PointLight()
light.position.set(-1, 2, 4)
light.lookAt(new THREE.Vector3())
scene.add(light)

update((time: number) => {
  uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height)
  uniforms.time.value = time / 100
  cube.rotation.x = time / 1000
  cube.rotation.y = time / 1000
})

</script>
