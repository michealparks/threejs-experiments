<script lang='ts'>

import { scene, assets, lights, run, camera, update } from 'three-kit'
import * as THREE from 'three'

const init = async () => {
  camera.position.set(-6, 8, 6)
  camera.lookAt(0, 0, 0)

  const origin = new THREE.Vector3()

  const dirlight = lights.createDirectional()
  dirlight.shadow.normalBias = 0.01
  dirlight.position.set(3, 3, 3)
  dirlight.intensity = 5
  scene.add(dirlight)

  const spotlight = lights.createSpot()
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

  const mesh = await assets.loadGLTF('building-2.glb')
  console.log(mesh.animations)

  // Create an AnimationMixer, and get the list of AnimationClip instances
  const mixer = new THREE.AnimationMixer( mesh.scene );
  const clips = mesh.animations;

  // Play a specific animation
  const clip = THREE.AnimationClip.findByName( clips, 'CylinderAction' );
  const action = mixer.clipAction( clip );
  
  clips.forEach( function ( clip ) {
    mixer.clipAction( clip ).play();
  } );

  mesh.scene.position.y = 0.8
  mesh.scene.traverse(node => {
    node.castShadow = true
    node.receiveShadow = true
  })

  scene.add(mesh.scene)

  run()

  let then = performance.now()

  update(() => {
    let now = performance.now()
    let delta = now - then
    console.log(delta)
    mixer.update( delta / 1000 );
    then = now
  })
}

init()

</script>
