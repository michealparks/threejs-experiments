import * as THREE from 'three'
import { randNumInRange, randPointInCircle } from '$lib/util'

interface Ember {
  mesh: THREE.InstancedMesh
  p: Float32Array
  s: Float32Array
  pv: Float32Array
  sv: Float32Array
}

const num = 100
const dummy = new THREE.Object3D()
const embers: Ember[] = []

const init = (parent: THREE.Object3D, templates: THREE.Mesh[]) => {
  for (const template of templates) {
    template.matrixAutoUpdate = true
    template.position.set(0, 0, 0)

    if (Array.isArray(template.material)) {
      throw new Error()
    }

    const mesh = new THREE.InstancedMesh(template.geometry.clone(), template.material.clone(), num)

    const obj = {
      mesh,
      p: new Float32Array(num * 3),
      r: new Float32Array(num * 3),
      s: new Float32Array(num),
      pv: new Float32Array(num * 3),
      sv: new Float32Array(num * 3)
    }

    mesh.position.set(0, 0.5, 0)

    let i = 0
    while (i < num) {
      setPropsAtIndex(i, obj)
      i += 1
    }

    embers.push(obj)
    parent.add(mesh)
  }
}

const setPropsAtIndex = (i: number, ember: Ember) => {
  const ii = i * 3

  const [px, py] = randPointInCircle(1.25)

  ember.p[ii + 0] = px
  ember.p[ii + 1] = randNumInRange(0.1, 0.75)
  ember.p[ii + 2] = py

  ember.s[i] = 1.0
  ember.sv[i] = randNumInRange(-0.1, -0.03)

  ember.pv[ii + 0] = randNumInRange(-0.01, 0.05)
  ember.pv[ii + 1] = randNumInRange(0.01, 0.05)
  ember.pv[ii + 2] = randNumInRange(-0.01, 0.05)
}

const update = () => {
  for (const ember of embers) {
    const { mesh, p, s, pv, sv } = ember
    let i = 0
    while (i < num) {
      const ii = i * 3

      s[i] += sv[i]

      if (s[i] <= 0.0) {
        setPropsAtIndex(i, ember)
      }

      p[ii + 0] += pv[ii + 0]
      p[ii + 1] += pv[ii + 1]
      p[ii + 2] += pv[ii + 2]

      dummy.position.set(p[ii], p[ii + 1], p[ii + 2])
      dummy.scale.set(s[i], s[i], s[i])
      dummy.updateMatrix()

      mesh.setMatrixAt(i, dummy.matrix)
      i += 1
    }

    mesh.instanceMatrix.needsUpdate = true
  }
}

export const fire = {
  init,
  update,
}
