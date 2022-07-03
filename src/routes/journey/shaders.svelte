<script lang='ts'>

import * as THREE from 'three'
import { onMount } from 'svelte'
import { GL } from '$lib/gl'
import { OrbitControls } from '$lib/orbitControls'
import vertexShader from './shaders/shaders.vert.glsl'
import fragmentShader from './shaders/shaders.frag.glsl'

onMount(async () => {
  const gl = GL(undefined, 1)
  const controls = new OrbitControls(gl.camera, gl.canvas)

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader
  })

  const geometry = new THREE.BoxGeometry(1, 1, 1, 20, 20, 20 )

  const count = geometry.attributes.position.count
  const randoms = new Float32Array(count)

  for(let i = 0; i < count; i++) {
    randoms[i] = Math.random() * 3
  }

  geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

  const cube = new THREE.Mesh(geometry, material)
  gl.scene.add(cube)
  gl.camera.position.set(2,2,2)
  gl.camera.lookAt(cube.position)

  gl.setAnimationLoop((delta) => {
    cube.rotation.x += delta
    controls.update()
  })
})

</script>
