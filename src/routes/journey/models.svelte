<script lang='ts'>
  let canvas

  import * as THREE from 'three'
  import { onMount } from 'svelte'
  import { GL } from '$lib/gl'
  import { assets } from '$lib/assets'
  import { OrbitControls } from '$lib/orbitControls'
  import { createDirectionalLight, createSpotLight } from '$lib/util-three'
  import { loading } from '$lib/loading'; 

  onMount(async () => {
    const origin = new THREE.Vector3()
    const gl = new GL(canvas)
    const loadEnd = loading(gl.scene)
    const controls = new OrbitControls(gl.camera, canvas)
    
    await gl.init()
    await assets.load('burger.glb')

    const burger = assets.get('burger.glb')
  
    const dirlight = createDirectionalLight()
    dirlight.position.set(3, 3, 3)
    dirlight.lookAt(origin)
    dirlight.castShadow = true
    dirlight.intensity = 2
    gl.scene.add(dirlight)
    
    const spotlight = createSpotLight()
    spotlight.position.set(-3, 3, -3)
    spotlight.lookAt(origin)
    spotlight.castShadow = true
    spotlight.intensity = 2
    // gl.scene.add(spotlight)

    burger.scene.traverse(node => {
      node.castShadow = true
      node.receiveShadow = true
    })
    gl.scene.add(burger.scene)

    gl.setAnimationLoop((delta) => {
      controls.update()
    })
    loadEnd()
  })
</script>

<canvas bind:this={canvas} />
