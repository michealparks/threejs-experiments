<script lang='ts'>

import { GL } from '$lib/gl'
import { createCube } from '$lib/util-three'

const gl = GL()
const cube = createCube()
gl.scene.add(cube)
gl.camera.position.set(2, 2, 2)
gl.camera.lookAt(cube.position)

gl.setAnimationLoop((delta) => {
  cube.rotation.x += delta
})

</script>
