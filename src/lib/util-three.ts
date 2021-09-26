import * as THREE from 'three'
import { COLORS, SHADOW_MAP } from './constants'

export const createCube = (size = 1, color = 0x44aa88): THREE.Mesh => {
  return new THREE.Mesh(
    new THREE.BoxGeometry(size, size, size), 
    new THREE.MeshPhongMaterial({ color }))
}

export const createSphere = (radius = 1, color = 0xff0000): THREE.Mesh => {
  const widthSegments = 16
  const heightSegments = 16
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, widthSegments, heightSegments),
    new THREE.MeshBasicMaterial({ color })
  )
}

export const createPointLight = (): THREE.PointLight => {
  const intensity = 3.0
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
  const intensity = 5.0
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
  const intensity = 1.0
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
  const mat = new THREE.MeshPhongMaterial({ color: 0x29B6F6 })
  const geo = new THREE.SphereGeometry(size, segments, segments)

  mat.side = THREE.BackSide

  return new THREE.Mesh(geo, mat)
}

export const clearScene = (scene: THREE.Scene): void => {
  const toDelete = new Set<THREE.Object3D>()

  scene.traverse((obj) => {
    toDelete.add(obj)
  })

  for (const obj of toDelete) {
    scene.remove(obj)

    if (obj instanceof THREE.Mesh) {
      obj.geometry.dispose()

      if (Array.isArray(obj.material)) {
        for (const m of obj.material) {
          m.dispose()
        }
      } else {
        obj.material.dispose()
      }
    }
  }
}
