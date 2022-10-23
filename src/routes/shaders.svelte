<script lang='ts'>

import { camera, scene, update, run } from 'three-kit'
import * as THREE from 'three'
import vertexShader from '$lib/shaders/shaders.vert.glsl'
import fragmentShader from '$lib/shaders/shaders.frag.glsl'

camera.position.set(2,2,2)

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader
})

const geometry = new THREE.BoxGeometry(1, 1, 1, 20, 20, 20)

const count = geometry.attributes.position.count
const randoms = new Float32Array(count)

for(let index = 0; index < count; index++) {
  randoms[index] = Math.random() * 3
}

geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.lookAt(cube.position)

update((time: number) => {
  cube.rotation.x = time / 1000
})

run()

</script>
