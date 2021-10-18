<script lang='ts'>

  let canvas
  
  import * as THREE from 'three'
  // import { Effect } from 'postprocessing'
  import { onMount } from 'svelte'
  import { GL } from '$lib/gl'
  import { createCube } from '$lib/util-three'
  import fragmentShader from './shaders/displacement.frag.glsl'
  
  onMount(async () => {
    const gl = new GL(canvas)

    await gl.init({
      effects: [
        // new Effect('Displacement', fragmentShader, {
        //   uniforms: new Map([
        //     ['uStrength', new THREE.Uniform(new THREE.Vector2(500, 500))],
        //     ['uResolution', new THREE.Uniform(new THREE.Vector2(innerWidth, innerHeight))]
        //   ])
        // })
      ]
    })
  
    const cube = createCube()
    gl.scene.add(cube)
    gl.camera.position.set(2, 2, 2)
    gl.camera.lookAt(cube.position)
  
    gl.setAnimationLoop((delta) => {
      cube.rotation.x += delta
    })
  })
  
  </script>
  
  <canvas bind:this={canvas} />
  