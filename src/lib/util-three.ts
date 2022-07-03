import * as THREE from 'three'
import { COLORS, SHADOW_MAP } from './constants'

export const createCube = (size = 1, color = 0x44_AA_88): THREE.Mesh => {
  return new THREE.Mesh(
    new THREE.BoxGeometry(size, size, size), 
    new THREE.MeshPhongMaterial({ color }))
}

export const createSphere = (radius = 1, color = 0xFF_00_00): THREE.Mesh => {
  const widthSegments = 16
  const heightSegments = 16
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, widthSegments, heightSegments),
    new THREE.MeshBasicMaterial({ color })
  )
}

export const createPointLight = (): THREE.PointLight => {
  const intensity = 3
  const color = COLORS.warmLight
  const light = new THREE.PointLight(color, intensity)
  light.castShadow = true
  light.shadow.mapSize.width = SHADOW_MAP.width
  light.shadow.mapSize.height = SHADOW_MAP.height
  light.shadow.radius = 8
  light.shadow.bias = -0.0001
  return light
}

export const createSpotLight = (): THREE.SpotLight => {
  const intensity = 5
  const light = new THREE.SpotLight(COLORS.warmLight, intensity)
  light.castShadow = true
  light.angle = 50
  light.penumbra = 1
  light.shadow.mapSize.width = SHADOW_MAP.width
  light.shadow.mapSize.height = SHADOW_MAP.height
  light.shadow.radius = 8
  light.shadow.bias = -0.0001
  return light
}

export const createDirectionalLight = (): THREE.DirectionalLight => {
  const intensity = 1
  const light = new THREE.DirectionalLight(COLORS.white, intensity)
  light.castShadow = true
  light.shadow.bias = -0.001
  return light
}

export const createHemisphereLight = (): THREE.HemisphereLight => {
  const intensity = 0.3
  const light = new THREE.HemisphereLight(COLORS.white, intensity)
  return light
}

export const createSkySphere = (size = 80, segments = 12): THREE.Mesh => {
  const mat = new THREE.MeshPhongMaterial({ color: 0x29_B6_F6 })
  const geo = new THREE.SphereGeometry(size, segments, segments)

  mat.side = THREE.BackSide

  return new THREE.Mesh(geo, mat)
}

export const clearScene = (scene: THREE.Scene): void => {
  const toDelete = new Set<THREE.Object3D>()

  scene.traverse((object) => {
    toDelete.add(object)
  })

  for (const object of toDelete) {
    scene.remove(object)

    if (object instanceof THREE.Mesh) {
      object.geometry.dispose()

      if (Array.isArray(object.material)) {
        for (const m of object.material) {
          m.dispose()
        }
      } else {
        object.material.dispose()
      }
    }
  }
}
