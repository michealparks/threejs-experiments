<script lang='ts'>

import { Matrix4, Object3D, Vector3 } from 'three'
import { GL } from '$lib/gl'
import { COLORS } from '$lib/constants'
import { createPointLight, createCube } from '$lib/util-three'

const gl = GL()

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
const numberCubes = 27
const cubes: Object3D[] = []
let index = 0

const cubeTranslation = (index_: number, n: number) => {
  const x = ((index_ % 3) * n) - n
  const y = (((index_ % 9) / 3 | 0) * n) - n
  const z = ((index_ / 9 | 0) * n) - n
  translateMatrix.makeTranslation(x, y, z)
}

while (index < numberCubes) {
  const cube = createCube(1, COLORS.lightBlue)
  cube.castShadow = true
  cube.receiveShadow = true
  cubes.push(cube)
  gl.scene.add(cube)

  cubeTranslation(index, 1)
  cube.applyMatrix4(translateMatrix)

  index += 1
}

let x = 0

gl.camera.position.set(0, 1, 10)
gl.camera.lookAt(new Vector3())

gl.setAnimationLoop(() => {
  x += 0.05
  gl.camera.applyMatrix4(rotationMatrix)

  for (const [index, cube] of cubes.entries()) {
    cubeTranslation(index, Math.sin(x / 2) * 0.01)
    cube.applyMatrix4(translateMatrix)
  }
})

</script>
