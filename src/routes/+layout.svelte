<script lang='ts'>

import { debug } from '$lib/debug'
import { base } from '$app/paths'
import '../app.css'

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
