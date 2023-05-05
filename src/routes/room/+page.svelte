<script lang='ts'>

import * as THREE from 'three'
import { three, loadGLTF } from 'trzy'

const { scene, camera, renderer } = three()

renderer.shadowMap.type = THREE.PCFSoftShadowMap

const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)
ambientLight.intensity = 0.5

camera.position.set(-1, 3, -5)
camera.lookAt(0, 0, 0)

{
  const light = new THREE.RectAreaLight(0xff0000)
  light.rotateY(Math.PI / 2)
  light.intensity = 5
  light.width = 1.6
  light.position.set(2, 1.9, -0.9)
  light.updateMatrix()
  scene.add(light)
}

{
  const light = new THREE.SpotLight(0x6f8eee)
  light.castShadow = true
  light.intensity = 3
  light.angle = 1.11
  light.decay = 0.16
  light.distance = 7.4
  light.penumbra = 1
  light.position.set(0.8, 1.3, -0.44)
  light.target.position.set(-4.8, -5.6, -1.8)
  light.shadow.normalBias = 0.1
  light.shadow.camera.near = 0.01
  scene.add(light)
}

const init = async () => {
  const { scene: room } = await loadGLTF('glb/room_1.glb')

  room.traverse((object) => {
    object.castShadow = true
    object.receiveShadow = true
  })

  scene.add(room)
}

init()

</script>
