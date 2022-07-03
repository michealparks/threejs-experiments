<script lang='ts'>

import * as THREE from 'three'
import { onMount } from 'svelte'
import { GL } from '$lib/gl'
import { assets } from '$lib/assets'
import { createPointLight } from '$lib/util-three'

onMount(async () => {
  const gl = GL()

  await assets.load('hello-shader.frag.glsl')

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
      fragmentShader: assets.get('hello-shader.frag.glsl') as string,
      uniforms,
      lights: true,
    })
  )

  gl.scene.add(cube)

  const light = createPointLight()
  light.position.set(-1, 2, 4)
  light.lookAt(new THREE.Vector3())
  gl.scene.add(light)

  const frame = (_dt: number, elapsed: number) => {
    uniforms.resolution.value.set(gl.canvas.width, gl.canvas.height)
    uniforms.time.value = elapsed
    cube.rotation.x = elapsed
    cube.rotation.y = elapsed
  }

  gl.setAnimationLoop(frame)
})

</script>
