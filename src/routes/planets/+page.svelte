<script lang='ts'>

import * as THREE from 'three'
import { three } from 'trzy'
import { COLORS } from '$lib/constants'

const { scene, camera, update } = three()

let id: number

const SIZES = { sun: 8 }
const CAMERA_DISTANCE = 90

const planets = [
  {
    name: 'Mercury',
    scale: 0.3,
    distance: 1,
    color: COLORS.lightGray,
    emissive: COLORS.darkGray
  }, {
    name: 'Venus',
    scale: 0.6,
    distance: 3,
    color: COLORS.lightOrange,
    emissive: COLORS.darkOrange
  }, {
    name: 'Earth',
    scale: 1,
    distance: 5,
    color: COLORS.lightBlue,
    emissive: COLORS.darkBlue,
    moons: [
      { name: 'Luna' }
    ]
  }, {
    name: 'Mars',
    scale: 0.9,
    distance: 8,
    color: COLORS.lightRed,
    emissive: COLORS.darkRed
  }, {
    name: 'Jupiter',
    scale: 2.5,
    distance: 14,
    color: COLORS.lightestPink,
    emissive: COLORS.salmon
  }, {
    name: 'Saturn',
    scale: 2.2,
    distance: 19,
    color: COLORS.warmLight,
    emissive: COLORS.warmestLight
  }, {
    name: 'Uranus',
    scale: 1.9,
    distance: 24,
    color: COLORS.lightCyan,
    emissive: COLORS.darkCyan
  }, {
    name: 'Neptune',
    scale: 1.5,
    distance: 28,
    color: COLORS.lightIndigo,
    emissive: COLORS.darkIndigo
  }
]

camera.position.set(0, 0, CAMERA_DISTANCE)
camera.lookAt(new THREE.Vector3())

const light = new THREE.PointLight()
light.intensity = 50
light.shadow.radius = 16
scene.add(light)

const objects: THREE.Object3D[] = []
const radius = 1
const segments = 40
const geo = new THREE.SphereGeometry(radius, segments, segments)

const solarOrbit = new THREE.Object3D()
scene.add(solarOrbit)
objects.push(solarOrbit)

{
  const mat = new THREE.MeshPhongMaterial({ emissive: COLORS.yellow })
  const sun = new THREE.Mesh(geo, mat)
  sun.scale.multiplyScalar(SIZES.sun)
  solarOrbit.add(sun)
  objects.push(sun)
}

for (const { name, scale, color, emissive, distance, moons } of planets) {
  const orbit = new THREE.Object3D()
  orbit.rotation.y = Math.random() * Math.PI * 2
  scene.add(orbit)
  objects.push(orbit)

  const mat = new THREE.MeshPhongMaterial({ color, emissive })
  const planet = new THREE.Mesh(geo, mat)
  planet.name = name
  planet.castShadow = true
  planet.receiveShadow = true
  planet.scale.multiplyScalar(scale)

  if (moons) {
    for (const { name } of moons) {
      const moonOrbit = new THREE.Object3D()
      orbit.add(moonOrbit)
      objects.push(moonOrbit)
      moonOrbit.add(planet)
      moonOrbit.position.x = SIZES.sun + distance

      const mat = new THREE.MeshPhongMaterial({ color: COLORS.lightGray, emissive: COLORS.darkGray })
      const moon = new THREE.Mesh(geo, mat)
      moon.name = name
      moon.castShadow = true
      moon.receiveShadow = true
      moon.scale.multiplyScalar(0.2)
      moon.position.x = 1.5
      moonOrbit.add(moon)
    }
  } else {
    planet.position.x = SIZES.sun + distance
    orbit.add(planet)
  }
}  

let view = 'side'

id = setInterval(() => {
  if (view === 'side') {
    camera.position.set(0, CAMERA_DISTANCE, 0)
    camera.lookAt(0, 0, 0)
    view = 'top'
  } else {
    camera.position.set(0, 0, CAMERA_DISTANCE)
    camera.lookAt(0, 0, 0)
    view = 'side'
  }
}, 5000)

update((time: number) => {
  let index = 0
  let l = objects.length

  for (const mesh of objects) {
    mesh.rotation.y = (time / 1000) * (1.1 - (index / l))
    index++
  }
})

</script>
