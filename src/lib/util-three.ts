import * as THREE from 'three'

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

export const createSkySphere = (size = 80, segments = 12): THREE.Mesh => {
  const mat = new THREE.MeshPhongMaterial({ color: 0x29_B6_F6 })
  const geo = new THREE.SphereGeometry(size, segments, segments)

  mat.side = THREE.BackSide

  return new THREE.Mesh(geo, mat)
}

