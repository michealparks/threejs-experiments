import {
  Scene,
  Object3D,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  PointLight,
  SpotLight,
  HemisphereLight,
  DirectionalLight,
  SphereGeometry,
  BackSide,
  MeshBasicMaterial,
} from 'three'

import { COLORS, SHADOW_MAP } from './constants'

export const createCube = (size = 1, color = 0x44aa88): Mesh => {
  return new Mesh(
    new BoxGeometry(size, size, size), 
    new MeshPhongMaterial({ color }))
}

export const createSphere = (radius = 1, color = 0xff0000): Mesh => {
  const widthSegments = 16
  const heightSegments = 16
  return new Mesh(
    new SphereGeometry(radius, widthSegments, heightSegments),
    new MeshBasicMaterial({ color })
  )
}

export const createPointLight = (): PointLight => {
  const intensity = 3.0
  const color = COLORS.warmLight
  const light = new PointLight(color, intensity)
  light.castShadow = true
  light.shadow.mapSize.width = SHADOW_MAP.width
  light.shadow.mapSize.height = SHADOW_MAP.height
  light.shadow.radius = 8
  light.shadow.bias = -0.0001
  return light
}

export const createSpotLight = (): SpotLight => {
  const intensity = 5.0
  const light = new SpotLight(COLORS.warmLight, intensity)
  light.castShadow = true
  light.angle = 50
  light.penumbra = 1
  light.shadow.mapSize.width = SHADOW_MAP.width
  light.shadow.mapSize.height = SHADOW_MAP.height
  light.shadow.radius = 8
  light.shadow.bias = -0.0001
  return light
}

export const createDirectionalLight = (): DirectionalLight => {
  const intensity = 1.0
  const light = new DirectionalLight(COLORS.white, intensity)
  light.castShadow = true
  light.shadow.bias = -0.001
  return light
}

export const createHemisphereLight = (): HemisphereLight => {
  const intensity = 0.3
  const light = new HemisphereLight(COLORS.white, intensity)
  return light
}

export const createSkySphere = (size = 80, segments = 12): Mesh => {
  const mat = new MeshPhongMaterial({ color: 0x29B6F6 })
  const geo = new SphereGeometry(size, segments, segments)

  mat.side = BackSide

  return new Mesh(geo, mat)
}

export const clearScene = (scene: Scene): void => {
  const toDelete = new Set<Object3D>()

  scene.traverse((obj) => {
    toDelete.add(obj)
  })

  for (const obj of toDelete) {
    scene.remove(obj)

    if (obj instanceof Mesh) {
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
