<script lang='ts'>

import * as THREE from 'three'
import { onMount } from 'svelte'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GL } from '$lib/gl'
import { assets } from '$lib/assets'
import { OrbitControls } from '$lib/orbit-controls'

const HDR = {
  overpass: 'https://threejs.org/examples/textures/equirectangular/pedestrian_overpass_1k.hdr',
  quarry: 'https://threejs.org/examples/textures/equirectangular/quarry_01_1k.hdr',
  spot: 'https://threejs.org/examples/textures/equirectangular/spot1Lux.hdr',
  sunset: 'https://threejs.org/examples/textures/equirectangular/venice_sunset_1k.hdr'
}

const randomNumber = (range: number) => {
  return Math.random() * range * 2 - range
}

onMount(async () => {
  const gl = GL()
  const orbitControls = new OrbitControls(gl.camera, document.body)
  orbitControls.autoRotate = true

  gl.ambientLight.intensity = 0.5

  const [texture] = await Promise.all([
    new RGBELoader().loadAsync(HDR.sunset),
    assets.load('mug.glb'),
  ])

  const pmremGenerator = new THREE.PMREMGenerator(gl.renderer)
  pmremGenerator.compileEquirectangularShader()
  const environmentMap = pmremGenerator.fromEquirectangular(texture).texture

  gl.scene.background = environmentMap
  gl.scene.environment = environmentMap

  texture.dispose()
  pmremGenerator.dispose()

  const n = 300
  const mug = assets.get('mug.glb') as { scene: THREE.Scene }
  const mesh = mug.scene.getObjectByName('Mug') as THREE.Mesh
  const instancedMesh = new THREE.InstancedMesh(mesh.geometry, mesh.material, n)
  const matrix = new THREE.Matrix4()

  let index = 0
  while (index < n) {
    matrix.setPosition(randomNumber(4), randomNumber(4), randomNumber(4))
    instancedMesh.setMatrixAt(index, matrix)
    index += 1
  }

  gl.scene.add(instancedMesh)
  gl.camera.position.set(1, 0.8, 1)

  const frame = () => {
    orbitControls.update()
  }

  gl.setAnimationLoop(frame)
})

</script>
