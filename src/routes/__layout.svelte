<script lang='ts'>

import * as debug from 'three-kit/debug'
import '../app.css'

const demos = import.meta.glob(['./*.svelte'])

const params = {
  demo: localStorage.getItem('threeExperiments.demo') ?? 'boxes',
}

const pane = debug.addPane('demos')

const entries = Object.keys(demos).filter(key => key.includes('index') === false).map(key => {
  const title = key.split('/')[1].replace('.svelte', '')
  return [title, title]
})

pane.addInput(params, 'demo', {
  options: Object.fromEntries(entries),
}).on('change', () => {
  window.localStorage.setItem('threeExperiments.demo', params.demo)
  window.location.assign(`${window.location.origin}${import.meta.env.APP_BASE}${params.demo}`)
})

</script>

<slot />
