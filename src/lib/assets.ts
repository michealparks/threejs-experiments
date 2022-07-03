import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const manager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader()
const audioLoader = new THREE.AudioLoader()
const gltfLoader = new GLTFLoader()
const rootPath = import.meta.env.MODE === 'development' ? '' : '/threejs-experiments'

textureLoader.setPath(`${rootPath}/textures/`)
audioLoader.setPath(`${rootPath}/audio/`)
gltfLoader.setPath(`${rootPath}/glb/`)

const cache = new Map()

const loadJSON = async (file: string) => {
  const response = await fetch(`${rootPath}/json/${file}`)
  const json = await response.json()
  cache.set(file, json)
  return json
}

const loadText = async (file: string, path: string) => {
  const response = await fetch(`${rootPath}/${path}/${file}`)
  const text = await response.text()
  cache.set(file, text)
  return text
}

const loadTexture = async (file: string) => {
  const texture = await textureLoader.loadAsync(file)
  cache.set(file, texture)
  return texture
}

const loadAudio = async (file: string) => {
  const audio = await audioLoader.loadAsync(file)
  cache.set(file, audio)
  return audio
}

const loadGLTF = async (file: string) => {
  const gltf = await gltfLoader.loadAsync(file)
  cache.set(file, gltf)
  return gltf
}

const loadSprite = async (file: string) => {
  const [data, tex] = await Promise.all([
    fetch(`${rootPath}/textures/${file.replace('sprite', 'json')}`).then((result) => result.json()),
    textureLoader.loadAsync(file.replace('sprite', 'png'))
  ])

  const sprite = {
    frames: data.frames,
    meta: data.meta,
    texture: tex
  }

  cache.set(file, sprite)

  return sprite
}

const get = (file: string): unknown => {
  return cache.get(file)
}

const loadOne = (file: string) => {
  switch (file.split('.').pop()) {
    case 'glb': return loadGLTF(file)
    case 'png': case 'jpg': return loadTexture(file)
    case 'mp3': return loadAudio(file)
    case 'json': return loadJSON(file)
    case 'sprite': return loadSprite(file)
    case 'obj': return loadText(file, 'obj')
    case 'glsl': return loadText(file, 'glsl')
  }
}

const load = (file: string): unknown => {
  return get(file) ?? loadOne(file)
}

export const assets = {
  cache,
  manager,
  get,
  load,
  loadOne
}
