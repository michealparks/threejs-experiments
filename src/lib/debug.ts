import * as THREE from 'three'
import { three } from 'trzy'
import Inspector from 'three-inspect'

const { scene, camera, renderer } = three()

export const debug = new Inspector({ THREE, scene, camera, renderer })
