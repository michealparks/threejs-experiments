<script lang='ts'>

import * as THREE from 'three'
import { three, loadGLTF } from 'trzy'
import { fire } from '$lib/fire'
import { createSkySphere } from '$lib/util-three'

const { scene, camera, update } = three()

const init = async () => {
  camera.current.position.set(20, 4, 18)
  camera.current.lookAt(0, 0, 0)

  const ambient = new THREE.AmbientLight(undefined, 1)
  scene.add(ambient)

  const hemiLight = new THREE.HemisphereLight()
  hemiLight.color.setHSL(0.6, 1, 0.6)
  hemiLight.groundColor.setHSL(0.095, 1, 0.75)
  scene.add(hemiLight)
  hemiLight.position.set(0, 50, 0)

  const directionalLight = new THREE.DirectionalLight()
  directionalLight.color.setHSL(0.1, 1, 0.95)
  directionalLight.position.set(-1, 1.75, 1).multiplyScalar(30)
  scene.add(directionalLight)

  const sky = createSkySphere(undefined, 64)
  scene.add(sky)

  const hsl: THREE.HSL = { h: 0, s: 0, l: 0 }

  if (sky.material instanceof THREE.MeshPhongMaterial) {
    sky.material.color.getHSL(hsl)
  }

  let { l } = hsl
  let idl = 0.0001
  let dl = 0.0001

  const { scene: rockScene } = await loadGLTF('glb/FloatingRockScene.glb')

  fire.init(rockScene.getObjectByName('Fire')!, [
    rockScene.getObjectByName('Ember1') as THREE.Mesh,
    rockScene.getObjectByName('Ember2') as THREE.Mesh,
    rockScene.getObjectByName('Ember3') as THREE.Mesh
  ])

  scene.add(rockScene)

  update(() => {
    l -= dl
    if (l < 0 || l > 1) {
      idl = -idl
      dl = idl
      if (l <= 0) l = 0
      if (l >= 1) l = 1
    }

    ambient.intensity = l

    if (sky.material instanceof THREE.MeshPhongMaterial) {
      sky.material.color.setHSL(hsl.h, hsl.s, l)
    }

    fire.update()
  })
}

init()

</script>
