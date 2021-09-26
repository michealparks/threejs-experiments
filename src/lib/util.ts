
export const capitalize = (str: string): string => {
  return `${str[0].toUpperCase()}${str.toLowerCase().slice(1)}`
}

export const randNum = (range: number): number => {
  return Math.random() * range * 2 - range
}

export const randNumInRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

export const randPointInCircle = (R: number): [x: number, y: number] => {
  const r = R * Math.sqrt(Math.random())
  const theta = Math.random() * 2.0 * Math.PI
  const x = r * Math.cos(theta)
  const y = r * Math.sin(theta)
  return [x, y]
}

export const randPointInSphere = (R: number): [x: number, y: number, z: number] => {
  const u = Math.random()
  const v = Math.random()
  const theta = u * 2.0 * Math.PI
  const phi = Math.acos(2.0 * v - 1.0)
  const r = Math.cbrt(Math.random() * R)
  const sinTheta = Math.sin(theta)
  const cosTheta = Math.cos(theta)
  const sinPhi = Math.sin(phi)
  const cosPhi = Math.cos(phi)
  const x = r * sinPhi * cosTheta
  const y = r * sinPhi * sinTheta
  const z = r * cosPhi
  return [x, y, z]
}

export const randPointOnSphere = (R: number): [x: number, y: number, z: number] => {
  const u = Math.random()
  const v = Math.random()
  const theta = u * 2.0 * Math.PI
  const phi = Math.acos(2.0 * v - 1.0)
  const r = Math.cbrt(Math.random() + R)
  const sinTheta = Math.sin(theta)
  const cosTheta = Math.cos(theta)
  const sinPhi = Math.sin(phi)
  const cosPhi = Math.cos(phi)
  const x = r * sinPhi * cosTheta
  const y = r * sinPhi * sinTheta
  const z = r * cosPhi
  return [x, y, z]
}