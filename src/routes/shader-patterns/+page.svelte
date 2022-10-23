<script lang='ts'>

import { scene, camera, update, run } from 'three-kit'
import * as THREE from 'three'
import vertexShader from '$lib/shaders/patterns/vert.glsl'
import frag01 from '$lib/shaders/patterns/01.frag.glsl'
import frag03 from '$lib/shaders/patterns/03.frag.glsl'
import frag08 from '$lib/shaders/patterns/08.frag.glsl'
import frag20 from '$lib/shaders/patterns/20.frag.glsl'
import frag24 from '$lib/shaders/patterns/24.frag.glsl'
import frag29 from '$lib/shaders/patterns/29.frag.glsl'
import frag33 from '$lib/shaders/patterns/33.frag.glsl'
import frag46 from '$lib/shaders/patterns/46.frag.glsl'
import frag50 from '$lib/shaders/patterns/50.frag.glsl'

const frags = [
  frag01,
  frag03,
  frag08,
  frag20,
  frag24,
  frag29,
  frag33,
  frag46,
  frag50,
]

const cubes: THREE.Mesh[] = []
camera.position.set(0, 4, 4)

for (const [index, fragmentShader] of frags.entries()) {
  const material = new THREE.ShaderMaterial({
    uniforms: { time: { value: 1 } },
    vertexShader,
    fragmentShader,
    transparent: true,
  })

  const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)

  const cube = new THREE.Mesh(geometry, material)
  cube.rotation.x = index / 2
  cube.rotation.x += 0.5
  cube.rotation.y += 0.5
  cube.position.set(index * 2, 0, 0)
  scene.add(cube)
  cubes.push(cube)
}

camera.lookAt(cubes[0].position)

const keys = new Set()

let m = 0

update((time: number) => {
  for (const cube of cubes) {
    cube.rotation.x = time / 1000
    ;(cube.material as THREE.ShaderMaterial).uniforms.time.value += 0.01
  }

  for (const key of keys) {
    switch (key) {
      case 'a':
      case 'arrowleft':
        m = -0.15
        break
      case 'd':
      case 'arrowright':
        m = 0.15
        break
    }
  }

  m /= 1.1

  camera.position.x += m
})

window.addEventListener('keydown', (event) => {
  keys.add(event.key.toLowerCase())
})

window.addEventListener('keyup', (event) => {
  keys.delete(event.key.toLowerCase())
})

run()

</script>
