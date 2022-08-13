<script lang='ts'>

import { scene, assets, lights, run } from 'three-kit'
import * as THREE from 'three'
import { createSpotLight } from '$lib/util-three'

const origin = new THREE.Vector3()

const dirlight = lights.createDirectional()
dirlight.position.set(3, 3, 3)
dirlight.lookAt(origin)
dirlight.castShadow = true
dirlight.intensity = 2
scene.add(dirlight)

const spotlight = createSpotLight()
spotlight.position.set(-3, 3, -3)
spotlight.lookAt(origin)
spotlight.castShadow = true
spotlight.intensity = 2
scene.add(spotlight)

const init = async () => {
  await assets.load('burger.glb')

  const burger = assets.get<{ scene: THREE.Scene }>('burger.glb')

  burger.scene.traverse(node => {
    node.castShadow = true
    node.receiveShadow = true
  })

  scene.add(burger.scene)

  run()
}

init()

</script>
