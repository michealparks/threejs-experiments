import * as THREE from 'three'
import { camera, scene, renderer, composer } from 'three-kit'
import Debug from 'three-debug'

export const debug = new Debug(THREE, scene, camera, renderer, composer)
