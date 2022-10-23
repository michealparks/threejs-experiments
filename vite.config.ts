import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite';
import ssl from '@vitejs/plugin-basic-ssl'
import vitePluginString from 'vite-plugin-string'
import define from './enviroment'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
    fs: {
      strict: true,
      allow: ['.'],
    },
  },
  plugins: [
    sveltekit(),
    ssl(),
    vitePluginString.default({
      exclude: 'node_modules/**',
    }),
  ],
  envPrefix: ['THREE', 'AMMO', 'APP'],
  build: {
    minify: 'terser',
  },
  define,
})
