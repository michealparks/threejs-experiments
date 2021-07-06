<script lang='ts'>
  import { 
    UniformsLib,
    Vector2,
    ShaderMaterial,
    Vector3,
    BoxGeometry,
    Mesh
  } from 'three'

  import { onMount } from 'svelte'
  import { GL } from '$lib/gl'
  import { assets } from '$lib/assets'
  import { createPointLight } from '$lib/util-three'

  let canvas

  onMount(async () => {
    const gl = new GL(canvas)

    await Promise.all([
      gl.init(),
      assets.load('hello-shader.frag.glsl')
    ])

    gl.camera.position.set(0, 0, 2)
    gl.scene.lookAt(new Vector3())

    const uniforms = {
      ...UniformsLib.lights,
      time: { value: 0 },
      resolution: { value: new Vector2() },
    }

    const cube = new Mesh(
      new BoxGeometry(0.5, 0.5, 0.5), 
      new ShaderMaterial({
        fragmentShader: assets.get('hello-shader.frag.glsl'),
        uniforms,
        fog: true,
        lights: true,
      })
    )

    gl.scene.add(cube)

    const light = createPointLight()
    light.position.set(-1, 2, 4)
    light.lookAt(new Vector3())
    gl.scene.add(light)

    const frame = (dt: number, elapsed: number) => {
      uniforms.resolution.value.set(gl.canvas.width, gl.canvas.height)
      uniforms.time.value = elapsed
      cube.rotation.x = elapsed
      cube.rotation.y = elapsed
    }

    gl.setAnimationLoop(frame)
  })
</script>

<canvas bind:this={canvas} />