
export const capitalize = (str: string) => {
  return `${str[0].toUpperCase()}${str.toLowerCase().slice(1)}`
}

export const randNum = (range: number) => {
  return Math.random() * range * 2 - range
}

export const randNumInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

export const randPointInCircle = (R: number) => {
  const r = R * Math.sqrt(Math.random())
  const theta = Math.random() * 2 * Math.PI
  const x = r * Math.cos(theta)
  const y = r * Math.sin(theta)
  return [x, y]
}
