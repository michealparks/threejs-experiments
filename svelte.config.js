import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import vitePluginString from 'vite-plugin-string'

const dev = process.env.NODE_ENV === 'development'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		adapter: adapter(),

		vite: {
			plugins: [
				vitePluginString.default({
					exclude: 'node_modules/**',
				}),
			]
		}
	},
}

if (dev === false) {
	config.kit.paths = {
		base: '/threejs-experiments',
		assets: '/threejs-experiments'
	}
}

export default config
