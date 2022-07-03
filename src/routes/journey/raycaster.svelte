<script lang='ts'>

import * as THREE from 'three'
import { onMount } from 'svelte'
import { GL } from '$lib/gl'
import { createSphere } from '$lib/util-three'

onMount(async () => {
  const gl = GL()
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
  gl.scene.add(s1, s2, s3)
  gl.camera.position.set(0, 0, 7)
  gl.camera.lookAt(s2.position)

  const mouse = new THREE.Vector2()

  gl.canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / innerWidth * 2 - 1
    mouse.y = - (event.clientY / innerHeight) * 2 + 1
  }, { passive: true })

  gl.setAnimationLoop((delta, elapsed) => {
    s1.position.y = Math.sin(elapsed * 0.3) * 1.5
    s2.position.y = Math.sin(elapsed * 0.8) * 1.5
    s3.position.y = Math.sin(elapsed * 1.4) * 1.5

    mousecaster.setFromCamera(mouse, gl.camera)

    const objectsToTest = [s1, s2, s3]
    const intersects = raycaster.intersectObjects(objectsToTest)
    const mouseIntersects = mousecaster.intersectObjects(objectsToTest)

    for (const object of objectsToTest) {
      object.material.color.set('orange')
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
})

</script>
