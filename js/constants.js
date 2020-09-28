export const COLORS = {
  black: 0x000000,
  darkGray: 0x616161,
  lightGray: 0xbdbdbd,

  coolLight: 0xFFFFFF,
  warmLight: 0xFFF5b6,
  warmerLight: 0xEFC070,
  warmestLight: 0xE47025,

  lightBlue: 0x00b0ff,
  darkBlue: 0x01579b,
  yellow: 0xffee58,

  lightRed: 0xff5252,
  darkRed: 0xb71c1c,

  lightOrange: 0xffb74d,
  darkOrange: 0xef6c00,

  lightestPink: 0xffebee,
  salmon: 0xe57373,

  lightCyan: 0x80DEEA,
  darkCyan: 0x0097A7,

  lightIndigo: 0x5C6BC0,
  darkIndigo: 0x303F9F,

  white: 0xFFFFFF
}

export const SHADOW_MAP = {
  width: 2 ** 10,
  height: 2 ** 10
}

export const CAMERA = {
  fov: 75,
  aspect: 2.0,
  near: 0.01,
  far: 10.0,
  position: { x: 1.0, y: 2.0, z: 2.5 }
}

export const LIGHTS = {
  ambient: { intensity: 0.6 }
}

export const HDR = {
  overpass: 'https://threejs.org/examples/textures/equirectangular/pedestrian_overpass_1k.hdr',
  quarry: 'https://threejs.org/examples/textures/equirectangular/quarry_01_1k.hdr',
  spot: 'https://threejs.org/examples/textures/equirectangular/spot1Lux.hdr',
  sunset: 'https://threejs.org/examples/textures/equirectangular/venice_sunset_1k.hdr'
}

export const VR_OPTIONS = {
  shadows: true
}
