<script lang='ts'>

import '../app.css'
import { capitalize } from '$lib/util'
import { base } from '$app/paths'
import Menu from '$lib/components/Menu.svelte'

const routes = Object.keys({
	...import.meta.glob('./tasks/*.svelte'),
	...import.meta.glob('./journey/*.svelte')
})
	.filter((page) => page.startsWith('_') === false)
	.map((page) => {
		const path = `${base}${page.slice(1).replace('.svelte', '')}`
		const name = capitalize(path.split('/').pop()).replace('-', ' ')
		return { path, name }
	})

</script>

<Menu {routes} />

<slot />
