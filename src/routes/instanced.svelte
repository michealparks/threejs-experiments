<script lang='ts'>

import { renderer, camera, lights, scene, assets, run } from 'three-kit'
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

const HDR = {
  overpass: 'https://threejs.org/examples/textures/equirectangular/pedestrian_overpass_1k.hdr',
  quarry: 'https://threejs.org/examples/textures/equirectangular/quarry_01_1k.hdr',
  spot: 'https://threejs.org/examples/textures/equirectangular/spot1Lux.hdr',
  sunset: 'https://threejs.org/examples/textures/equirectangular/venice_sunset_1k.hdr'
}

const init = async () => {
  const ambientLight = lights.createAmbient()
  scene.add(ambientLight)

  camera.position.set(1, 0.8, 1)

  const [texture] = await Promise.all([
    new RGBELoader().loadAsync(HDR.sunset),
    assets.load('mug.glb'),
  ])

  const totalMugs = 300
  const mug = assets.get<{ scene: THREE.Scene }>('mug.glb')
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

  texture.dispose()
  pmremGenerator.dispose()

  run()
}

init()

</script>
