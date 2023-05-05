<script lang='ts'>

import * as THREE from 'three'
import { three } from 'trzy'
import { createSphere } from '$lib/util-three'

const { scene, camera, update } = three()

camera.position.set(0, 0, 7)

const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

const raycaster = new THREE.Raycaster()
const mousecaster = new THREE.Raycaster()
const rayOrigin = new THREE.Vector3(-3, 0, 0)
const rayDirection = new THREE.Vector3(10, 0, 0)
rayDirection.normalize()
raycaster.set(rayOrigin, rayDirection)

const s1 = createSphere(0.5)
const s2 = createSphere(0.5)
const s3 = createSphere(0.5)
s1.position.x = -2
s3.position.x = +2
scene.add(s1, s2, s3)

camera.lookAt(s2.position)

const mouse = new THREE.Vector2()

document.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX / innerWidth * 2 - 1
  mouse.y = - (event.clientY / innerHeight) * 2 + 1
}, { passive: true })

update((time: number) => {
  s1.position.y = Math.sin(time / 1000 * 0.3) * 1.5
  s2.position.y = Math.sin(time / 1000 * 0.8) * 1.5
  s3.position.y = Math.sin(time / 1000 * 1.4) * 1.5

  mousecaster.setFromCamera(mouse, camera)

  const objectsToTest = [s1, s2, s3]
  const intersects = raycaster.intersectObjects(objectsToTest)
  const mouseIntersects = mousecaster.intersectObjects(objectsToTest)

  for (const object of objectsToTest) {
    (object.material as THREE.MeshBasicMaterial).color.set('orange')
  }

  for (const intersect of intersects) {
    if (intersect.object instanceof THREE.Mesh) {
      intersect.object.material.color.set('crimson')
    }
  }

  for (const intersect of mouseIntersects) {
    if (intersect.object instanceof THREE.Mesh) {
      intersect.object.material.color.set('hotpink')
    }
  }
})

</script>
  