<script lang='ts'>
  import { Vector3 } from 'three'

  let canvas

  import { onMount } from 'svelte'
  import { GL } from '$lib/gl'
  import { assets } from '$lib/assets'
  import { OrbitControls } from '$lib/orbitControls'
  import { createPointLight } from '$lib/util-three'

  onMount(async () => {
    const gl = new GL(canvas)
    const orbitControls = new OrbitControls(gl.camera, document.body)

    gl.camera.position.set(-1, 3, -5)
    gl.camera.lookAt(new Vector3())

    await Promise.all([
      gl.init(),
      assets.load('room_1.glb')
    ])

    const room = assets.get('room_1.glb').scene

    gl.scene.add(room)

    const light = createPointLight()
    light.intensity = 3
    light.position.set(1, 4, 1)
    gl.scene.add(light)

    const frame = (dt: number) => {
      orbitControls.update()
    }

    gl.ambientLight.intensity = 0.5

    gl.setAnimationLoop(frame)
  })
</script>

<canvas bind:this={canvas} />