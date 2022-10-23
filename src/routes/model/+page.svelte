<script lang='ts'>

import { scene, assets, lights, run, camera } from 'three-kit'
import * as THREE from 'three'

const init = async () => {
  camera.position.set(-6, 8, 6)
  camera.lookAt(0, 0, 0)

  const origin = new THREE.Vector3()

  const dirlight = lights.createDirectional()
  dirlight.shadow.normalBias = 0.01
  dirlight.position.set(3, 3, 3)
  dirlight.intensity = 1.9
  scene.add(dirlight)

  const spotlight = lights.createSpot()
  spotlight.shadow.normalBias = 0.01
  spotlight.position.set(3.5, 5, -3)
  spotlight.angle = 0.68
  spotlight.intensity = 32
  spotlight.penumbra = 0.97
  scene.add(spotlight)

  const mat = new THREE.MeshStandardMaterial()
  const geo = new THREE.PlaneGeometry(10, 10, 1, 1).rotateX(-Math.PI / 2)
  const floor = new THREE.Mesh(geo, mat)
  floor.name = 'Floor'
  floor.receiveShadow = true
  scene.add(floor)

  const burger = await assets.loadGLTF('burger.glb')

  burger.scene.position.y = 0.8
  burger.scene.traverse(node => {
    node.castShadow = true
    node.receiveShadow = true
  })

  scene.add(burger.scene)

  run()
}

init()

</script>
