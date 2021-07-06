<script lang='ts'>
  import {
    Vector3,
    SphereBufferGeometry,
    Object3D,
    MeshPhongMaterial,
    Mesh
  } from 'three'

  import { onMount } from 'svelte'
  import { GL } from '$lib/gl'
  import { COLORS } from '$lib/constants'
  import { createPointLight } from '$lib/util-three'

  let canvas

  const SIZES = { sun: 8 }
  const CAMERA_DISTANCE = 90

  const planets = [
    {
      name: 'Mercury',
      scale: 0.3,
      distance: 1.0,
      color: COLORS.lightGray,
      emissive: COLORS.darkGray
    }, {
      name: 'Venus',
      scale: 0.6,
      distance: 3.0,
      color: COLORS.lightOrange,
      emissive: COLORS.darkOrange
    }, {
      name: 'Earth',
      scale: 1.0,
      distance: 5.0,
      color: COLORS.lightBlue,
      emissive: COLORS.darkBlue,
      moons: [
        { name: 'Luna' }
      ]
    }, {
      name: 'Mars',
      scale: 0.9,
      distance: 8.0,
      color: COLORS.lightRed,
      emissive: COLORS.darkRed
    }, {
      name: 'Jupiter',
      scale: 2.5,
      distance: 14.0,
      color: COLORS.lightestPink,
      emissive: COLORS.salmon
    }, {
      name: 'Saturn',
      scale: 2.2,
      distance: 19.0,
      color: COLORS.warmLight,
      emissive: COLORS.warmestLight
    }, {
      name: 'Uranus',
      scale: 1.9,
      distance: 24.0,
      color: COLORS.lightCyan,
      emissive: COLORS.darkCyan
    }, {
      name: 'Neptune',
      scale: 1.5,
      distance: 28.0,
      color: COLORS.lightIndigo,
      emissive: COLORS.darkIndigo
    }
  ]

  onMount(async () => {
    const gl = new GL(canvas)

    await gl.init()

    gl.camera.position.set(0, 0, CAMERA_DISTANCE)
    gl.camera.lookAt(new Vector3())

    const light = createPointLight()
    light.intensity = 50
    light.shadow.radius = 16
    gl.scene.add(light)

    const objects: Object3D[] = []
    const radius = 1
    const segments = 40
    const geo = new SphereBufferGeometry(radius, segments, segments)

    const solarOrbit = new Object3D()
    gl.scene.add(solarOrbit)
    objects.push(solarOrbit)

    {
      const mat = new MeshPhongMaterial({ emissive: COLORS.yellow })
      const sun = new Mesh(geo, mat)
      sun.scale.multiplyScalar(SIZES.sun)
      solarOrbit.add(sun)
      objects.push(sun)
    }

    for (const { name, scale, color, emissive, distance, moons } of planets) {
      const orbit = new Object3D()
      orbit.rotation.y = Math.random() * Math.PI * 2
      gl.scene.add(orbit)
      objects.push(orbit)
    
      const mat = new MeshPhongMaterial({ color, emissive })
      const planet = new Mesh(geo, mat)
      planet.name = name
      
      planet.castShadow = true
      planet.receiveShadow = true
      planet.scale.multiplyScalar(scale)
    
      if (moons) {
        for (const { name } of moons) {
          const moonOrbit = new Object3D()
          orbit.add(moonOrbit)
          objects.push(moonOrbit)
          moonOrbit.add(planet)
          moonOrbit.position.x = SIZES.sun + distance
    
          const mat = new MeshPhongMaterial({ color: COLORS.lightGray, emissive: COLORS.darkGray })
          const moon = new Mesh(geo, mat)
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

    const frame = (dt: number) => {
      let i = 0
      let l = objects.length
    
      for (const mesh of objects) {
        mesh.rotation.y += dt * (1.1 - (i / l))
        i++
      }
    }

    let view = 'side'

    let id = setInterval(() => {
      if (view === 'side') {
        gl.camera.position.set(0, CAMERA_DISTANCE, 0)
        gl.camera.lookAt(0, 0, 0)
        view = 'top'
      } else {
        gl.camera.position.set(0, 0, CAMERA_DISTANCE)
        gl.camera.lookAt(0, 0, 0)
        view = 'side'
      }
    }, 5000)

    gl.setAnimationLoop(frame)
  })
</script>

<canvas bind:this={canvas} />