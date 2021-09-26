<script lang='ts'>

import { onMount } from 'svelte'
import { Matrix4, Object3D, Vector3 } from 'three'
import { GL } from '$lib/gl'
import { COLORS } from '$lib/constants'
import { createPointLight, createCube } from '$lib/util-three'

let canvas

onMount(async () => {
  const gl = new GL(canvas)

  await gl.init()

  const light1 = createPointLight()
  light1.intensity = 100
  light1.position.set(0, 3, 0)

  const light2 = createPointLight()
  light2.intensity = 50
  light2.position.set(0, 3, 2)

  const light3 = createPointLight()
  light3.intensity = 10
  light3.position.set(2, 1, 2)
  
  gl.scene.add(light1, light2, light3)

  const rotationMatrix = new Matrix4()
    .makeRotationX(0.005)
    .multiply(new Matrix4().makeRotationY(0.005))
    .multiply(new Matrix4().makeRotationZ(0.005))

  const translateMatrix = new Matrix4()
  const numCubes = 27
  const cubes: Object3D[] = []
  let i = 0

  const cubeTranslation = (i: number, n: number) => {
    const x = ((i % 3) * n) - n
    const y = (((i % 9) / 3 | 0) * n) - n
    const z = ((i / 9 | 0) * n) - n
    translateMatrix.makeTranslation(x, y, z)
  }

  while (i < numCubes) {
    const cube = createCube(1, COLORS.lightBlue)
    cube.castShadow = true
    cube.receiveShadow = true
    cubes.push(cube)
    gl.scene.add(cube)

    cubeTranslation(i, 1)
    cube.applyMatrix4(translateMatrix)

    i += 1
  }

  let x = 0

  const frame = (dt: number, elapsed: number) => {
    x += 0.05
    gl.camera.applyMatrix4(rotationMatrix)

    for (const [i, cube] of cubes.entries()) {
      cubeTranslation(i, Math.sin(x / 2) * 0.01)
      cube.applyMatrix4(translateMatrix)
    }
  }
  
  gl.camera.position.set(0, 1, 10)
  gl.camera.lookAt(new Vector3())

  gl.setAnimationLoop(frame)
})

</script>

<canvas bind:this={canvas} />