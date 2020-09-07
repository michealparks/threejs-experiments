export const randNum = (range) => {
  return Math.random() * range * 2 - range
}

export const randNumInRange = (min, max) => {
  return Math.random() * (max - min) + min
}

export const randomPointInCircle = (R) => {
  const r = R * Math.sqrt(Math.random())
  const theta = Math.random() * 2 * Math.PI
  const x = r * Math.cos(theta)
  const y = r * Math.sin(theta)
  return [x, y]
}