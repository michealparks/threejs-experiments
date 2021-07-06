<script lang='ts'>
  import type { Mesh, HSL } from 'three'
  import { MeshPhongMaterial, Object3D, InstancedMesh } from 'three'
  import { onMount } from 'svelte'
  import { GL } from '$lib/gl'
  import { assets } from '$lib/assets'
  import { OrbitControls } from '$lib/orbitControls'
  import { randNumInRange, randPointInCircle } from '$lib/util'
  import { createPointLight, createDirectionalLight, createHemisphereLight, createSkySphere } from '$lib/util-three'

  class Fire {
    N = 100
    dummy = new Object3D()
    embers: any = []
  
    constructor (parent: Object3D, templates: Mesh[]) {
      for (const template of templates) {
        template.matrixAutoUpdate = true
        template.position.set(0, 0, 0)

        if (Array.isArray(template.material)) {
          throw new Error()
        }

        const mesh = new InstancedMesh(template.geometry.clone(), template.material.clone(), this.N)

        const obj = {
          mesh,
          p: new Float32Array(this.N * 3),
          r: new Float32Array(this.N * 3),
          s: new Float32Array(this.N),
          pv: new Float32Array(this.N * 3),
          sv: new Float32Array(this.N * 3)
        }

        mesh.position.set(0, 0.5, 0)

        let i = 0
        while (i < this.N) {
          this.setPropsAtIndex(i, obj)
          i += 1
        }

        this.embers.push(obj)
        parent.add(mesh)
      }
    }

    setPropsAtIndex (i: number, ember: any) {
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

    update (dt: number) {
      for (const ember of this.embers) {
        const { mesh, p, s, pv, sv } = ember
        let i = 0
        while (i < this.N) {
          const ii = i * 3

          s[i] += sv[i]

          if (s[i] <= 0.0) {
            this.setPropsAtIndex(i, ember)
          }

          p[ii + 0] += pv[ii + 0]
          p[ii + 1] += pv[ii + 1]
          p[ii + 2] += pv[ii + 2]

          this.dummy.position.set(p[ii], p[ii + 1], p[ii + 2])
          this.dummy.scale.set(s[i], s[i], s[i])
          this.dummy.updateMatrix()

          mesh.setMatrixAt(i, this.dummy.matrix)
          i += 1
        }

        mesh.instanceMatrix.needsUpdate = true
      }
    }
  }

  let canvas

  onMount(async () => {
    const gl = new GL(canvas)
    const orbitControls = new OrbitControls(gl.camera, document.body)
  
    gl.camera.position.set(20.0, 4.0, 18.0)

    await Promise.all([
      gl.init(),
      assets.load('FloatingRockScene.glb')
    ])

    const { scene: rockScene } = assets.get('FloatingRockScene.glb')

    const fire = new Fire(rockScene.getObjectByName('Fire'),
      [
        rockScene.getObjectByName('Ember1'),
        rockScene.getObjectByName('Ember2'),
        rockScene.getObjectByName('Ember3')
      ])

    gl.scene.add(rockScene)

    const pointLight = createPointLight()
    pointLight.position.y = 1.4
    gl.scene.add(pointLight)

    const hemiLight = createHemisphereLight()
    hemiLight.color.setHSL(0.6, 1, 0.6)
    hemiLight.groundColor.setHSL(0.095, 1, 0.75)
    gl.scene.add(hemiLight)
    hemiLight.position.set(0, 50, 0)

    const dirLight = createDirectionalLight()
    dirLight.color.setHSL(0.1, 1, 0.95)
    dirLight.position.set(-1, 1.75, 1).multiplyScalar(30)
    gl.scene.add(dirLight)

    const sky = createSkySphere(undefined, 64)
    gl.scene.add(sky)

    const hsl: HSL = { h: 0, s: 0, l: 0 }

    if (sky.material instanceof MeshPhongMaterial) {
      sky.material.color.getHSL(hsl)
    }

    let { l } = hsl
    let idl = 0.0001
    let dl = 0.0001

    const frame = (dt: number) => {
      l -= dl
      if (l < 0.0 || l > 1.0) {
        idl = -idl
        dl = idl
        if (l <= 0.0) l = 0.0
        if (l >= 1.0) l = 1.0
      }

      gl.ambientLight.intensity = l

      if (sky.material instanceof MeshPhongMaterial) {
        sky.material.color.setHSL(hsl.h, hsl.s, l)
      }
      
      fire.update(dt)
      orbitControls.update()
    }

    gl.setAnimationLoop(frame)
  })
</script>

<canvas bind:this={canvas} />