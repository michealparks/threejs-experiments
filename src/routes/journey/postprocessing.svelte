<script lang='ts'>

import * as THREE from 'three'
import { Effect, BlendFunction } from 'postprocessing'
import { GL } from '$lib/gl'
import { createCube } from '$lib/util-three'
import fragmentShader from './shaders/displacement.frag.glsl'

const gl = GL(undefined, 1, [
  new Effect('Displacement', fragmentShader, {
    blendFunction: BlendFunction.NORMAL,
    uniforms: new Map([
      ['uStrength', new THREE.Uniform(new THREE.Vector2(500, 500))],
      ['uResolution', new THREE.Uniform(new THREE.Vector2(innerWidth, innerHeight))]
    ])
  })
])
gl.camera.position.set(2, 2, 2)

const cube = createCube()
gl.scene.add(cube)
gl.camera.lookAt(cube.position)

gl.setAnimationLoop((delta: number) => {
  cube.rotation.x += delta
})

</script>
