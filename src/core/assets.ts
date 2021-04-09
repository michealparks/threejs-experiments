import type { Listener } from './types'

import {
  LoadingManager,
  TextureLoader,
  AudioLoader
} from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const manager = new LoadingManager()
const textureLoader = new TextureLoader()
const audioLoader = new AudioLoader()
const gltfLoader = new GLTFLoader()

textureLoader.setPath('assets/textures/')
audioLoader.setPath('assets/mp3/')
gltfLoader.setPath('assets/glb/')

const queued = new Set<string>()
const listeners = new Set<Listener>()
const promises = new Set<Promise<void>>()
const cache = new Map<string, any>()

const loadJSON = async (file: string) => {
  const response = await fetch(`assets/json/${file}`)
  cache.set(file, await response.json())
}

const loadText = async (file: string, path: string) => {
  const response = await fetch(`assets/${path}/${file}`)
  cache.set(file, await response.text())
}

const loadTexture = async (file: string) => {
  cache.set(file, await textureLoader.loadAsync(file))
}

const loadAudio = async (file: string) => {
  cache.set(file, await audioLoader.loadAsync(file))
}

const loadGLTF = async (file: string) => {
  cache.set(file, await gltfLoader.loadAsync(file))
}

const loadSprite = async (file: string): Promise<void> => {
  const [data, tex] = await Promise.all([
    fetch(`assets/textures/${file.replace('sprite', 'json')}`).then((res) => res.json()),
    textureLoader.loadAsync(file.replace('sprite', 'png'))
  ])

  cache.set(file, {
    frames: data.frames,
    meta: data.meta,
    texture: tex
  })
}

const loadOne = (file: string): Promise<void> => {
  switch (file.split('.').pop()) {
    case 'glb': return loadGLTF(file)
    case 'png': case 'jpg': return loadTexture(file)
    case 'mp3': return loadAudio(file)
    case 'json': return loadJSON(file)
    case 'sprite': return loadSprite(file)
    case 'obj': return loadText(file, 'obj')
    case 'glsl': return loadText(file, 'glsl')
  }

  return Promise.reject()
}

const get = (file: string) => {
  return cache.get(file)
}

const queue = (...args: string[]) => {
  queueMany(args)

  return assets
}

const queueMany = (iterable: string[] | Set<string>) => {
  for (const file of iterable) {
    if (cache.has(file)) continue

    queued.add(file)
  }

  return assets
}

const on = (event: string, fn: Listener) => {
  switch (event) {
    case 'load': return listeners.add(fn)
  }
}

const load = () => {
  for (const file of queued) {
    promises.add(loadOne(file))
  }

  return Promise.all(promises).then(() => {
    for (const listener of listeners) {
      listener()
    }

    queued.clear()
    promises.clear()
  })
}

export const assets = {
  cache,
  manager,
  textureLoader,
  audioLoader,
  gltfLoader,
  get,
  queue,
  queueMany,
  on,
  load,
  loadOne
}
