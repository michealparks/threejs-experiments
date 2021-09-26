<script lang='ts'>

import * as THREE from 'three'
import { onMount } from 'svelte'
import { RGBELoader } from '../../../node_modules/three/examples/jsm/loaders/RGBELoader'
import { GL } from '$lib/gl'
import { assets } from '$lib/assets'
import { OrbitControls } from '$lib/orbitControls'

let canvas

const HDR = {
  overpass: 'https://threejs.org/examples/textures/equirectangular/pedestrian_overpass_1k.hdr',
  quarry: 'https://threejs.org/examples/textures/equirectangular/quarry_01_1k.hdr',
  spot: 'https://threejs.org/examples/textures/equirectangular/spot1Lux.hdr',
  sunset: 'https://threejs.org/examples/textures/equirectangular/venice_sunset_1k.hdr'
}

const randNum = (range: number) => {
  return Math.random() * range * 2 - range
}

const loadRGBE = (url: string): Promise<THREE.Texture> => {
  return new Promise((resolve) => {
    return new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .load(url, resolve)
  })
}

onMount(async () => {
  const gl = new GL(canvas)
  const orbitControls = new OrbitControls(gl.camera, document.body)
  orbitControls.autoRotate = true

  gl.ambientLight.intensity = 0.5

  const [texture] = await Promise.all([
    loadRGBE(HDR.sunset),
    assets.load('mug.glb'),
    gl.init()
  ])

  const pmremGenerator = new THREE.PMREMGenerator(gl.renderer)
  pmremGenerator.compileEquirectangularShader()
  const envMap = pmremGenerator.fromEquirectangular(texture).texture

  gl.scene.background = envMap
  gl.scene.environment = envMap

  texture.dispose()
  pmremGenerator.dispose()

  const n = 300
  const mesh = assets.get('mug.glb').scene.getObjectByName('Mug')
  const instancedMesh = new THREE.InstancedMesh(mesh.geometry, mesh.material, n)
  const matrix = new THREE.Matrix4()

  let i = 0
  while (i < n) {
    matrix.setPosition(randNum(4), randNum(4), randNum(4))
    instancedMesh.setMatrixAt(i, matrix)
    i += 1
  }

  gl.scene.add(instancedMesh)
  gl.camera.position.set(1, 0.8, 1)

  const frame = () => {
    orbitControls.update()
  }

  gl.setAnimationLoop(frame)
})

</script>

<canvas bind:this={canvas}></canvas>