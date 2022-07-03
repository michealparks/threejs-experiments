<script lang='ts'>

import '../app.css'
import { base } from '$app/paths'
import Menu from '$lib/components/Menu.svelte'

</script>

<Menu routes={[
	{ name: 'Alley', path: `${base}/tasks/alley` },
	{ name: 'Baked', path: `${base}/tasks/baked` },
	{ name: 'Campfire', path: `${base}/tasks/campfire` },
	{ name: 'Instanced meshes', path: `${base}/tasks/instanced` },
	{ name: 'Matrix', path: `${base}/tasks/matrix` },
	{ name: 'Planets', path: `${base}/tasks/planets` },
	{ name: 'Room', path: `${base}/tasks/room` },
	{ name: 'Shader', path: `${base}/tasks/shader` },
	{ name: 'Terrain', path: `${base}/tasks/terrain` },

	{ name: 'Galaxy', path: `${base}/journey/galaxy-particles` },
	{ name: 'Models', path: `${base}/journey/models` },
	{ name: 'Particles', path: `${base}/journey/particles` },
	{ name: 'Portal', path: `${base}/journey/portal` },
	{ name: 'Post', path: `${base}/journey/postprocessing` },
	{ name: 'Raycaster', path: `${base}/journey/raycaster` },
	{ name: 'Sea', path: `${base}/journey/sea` },
	{ name: 'Shader patterns', path: `${base}/journey/shader-patterns` },
	{ name: 'Shaders', path: `${base}/journey/shaders` },
	{ name: 'Sphere particles', path: `${base}/journey/sphere-particles` },
]} />

<slot />
