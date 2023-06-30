<script lang='ts'>

import * as THREE from 'three'
import { three, loadGLTF } from 'trzy'

const { scene, camera } = three()

const init = async () => {
  camera.current.position.set(-6, 8, 6)
  camera.current.lookAt(0, 0, 0)

  const origin = new THREE.Vector3()

  const dirlight = new THREE.DirectionalLight()
  dirlight.shadow.normalBias = 0.01
  dirlight.position.set(3, 3, 3)
  dirlight.intensity = 1.9
  scene.add(dirlight)

  const spotlight =  new THREE.SpotLight()
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

  const burger = await loadGLTF('glb/burger.glb')

  burger.scene.position.y = 0.8
  burger.scene.traverse((node) => {
    node.castShadow = true
    node.receiveShadow = true
  })

  scene.add(burger.scene)
}

init()

</script>
