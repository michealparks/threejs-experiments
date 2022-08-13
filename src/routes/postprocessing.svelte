<script lang='ts'>

import { scene, camera, update, run } from 'three-kit'
import * as THREE from 'three'
import { Effect, BlendFunction } from 'postprocessing'
import { createCube } from '$lib/util-three'
import fragmentShader from './shaders/displacement.frag.glsl'

// const gl = GL(undefined, 1, [
//   new Effect('Displacement', fragmentShader, {
//     blendFunction: BlendFunction.NORMAL,
//     uniforms: new Map([
//       ['uStrength', new THREE.Uniform(new THREE.Vector2(500, 500))],
//       ['uResolution', new THREE.Uniform(new THREE.Vector2(innerWidth, innerHeight))]
//     ])
//   })
// ])

camera.position.set(2, 2, 2)

const cube = createCube()
scene.add(cube)
camera.lookAt(cube.position)

update((time: number) => {
  cube.rotation.x = time / 1000
})

run()

</script>
