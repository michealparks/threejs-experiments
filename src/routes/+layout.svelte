<script lang='ts'>

import { debug } from '$lib/debug'
import { base } from '$app/paths'
import { assets } from 'three-kit'
import '../app.css'

if (base) {
  assets.audioLoader.setPath(`${base}/${kit__DIR_AUDIO}`)
  assets.fileLoader.setPath(`${base}/${kit__DIR_FILE}`)
  assets.gltfLoader.setPath(`${base}/${kit__DIR_GLB}`)
  assets.textureLoader.setPath(`${base}/${kit__DIR_TEXTURES}`)
}

const demos = import.meta.glob(['./**'])

console.log(demos)

const params = {
  demo: localStorage.getItem('threeExperiments.demo') ?? 'boxes',
}

const pane = debug.addPane('Demos')

const entries = Object.keys(demos)
  .map((key) => {
    const title = key.split('/')[1]
    return [title, title]
  })
  .filter((key) => key[0].startsWith('+') === false)

pane.addInput(params, 'demo', {
  options: Object.fromEntries(entries),
}).on('change', () => {
  window.localStorage.setItem('threeExperiments.demo', params.demo)

  const url = `${location.origin}${base}/${params.demo}`
  console.log(url)
  window.location.assign(url)
})

</script>

<slot />
