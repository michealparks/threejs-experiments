<script lang='ts'>

import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { three, loadGLTF } from 'trzy'

const { scene, camera, renderer } = three()

const HDR = {
  overpass: 'https://threejs.org/examples/textures/equirectangular/pedestrian_overpass_1k.hdr',
  quarry: 'https://threejs.org/examples/textures/equirectangular/quarry_01_1k.hdr',
  spot: 'https://threejs.org/examples/textures/equirectangular/spot1Lux.hdr',
  sunset: 'https://threejs.org/examples/textures/equirectangular/venice_sunset_1k.hdr'
}

const init = async () => {
  const ambientLight = new THREE.AmbientLight()
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight()
  scene.add(directionalLight)

  camera.current.position.set(1, 0.8, 1)
  camera.current.lookAt(0, 0, 0)

  const [texture, mug] = await Promise.all([
    new RGBELoader().loadAsync(HDR.sunset),
    loadGLTF('glb/mug.glb'),
  ])

  const totalMugs = 300
  const mesh = mug.scene.getObjectByName('Mug') as THREE.Mesh
  const instancedMesh = new THREE.InstancedMesh(mesh.geometry, mesh.material, totalMugs)
  const matrix = new THREE.Matrix4()

  let index = 0
  while (index < totalMugs) {
    matrix.setPosition((Math.random() * 8) - 4, (Math.random() * 8) - 4, (Math.random() * 8) - 4)
    instancedMesh.setMatrixAt(index, matrix)
    index += 1
  }

  scene.add(instancedMesh)

  const pmremGenerator = new THREE.PMREMGenerator(renderer)
  pmremGenerator.compileEquirectangularShader()
  const environmentMap = pmremGenerator.fromEquirectangular(texture).texture

  scene.background = environmentMap
  scene.environment = environmentMap
}

init()

</script>
