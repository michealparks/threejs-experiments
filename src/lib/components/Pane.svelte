<script lang='ts'>

import { createEventDispatcher, onMount } from 'svelte'
import { Pane, StringInputParams } from 'tweakpane'

let container: HTMLDivElement

type Inputs = Record<string, StringInputParams>

export let inputs: Inputs = {}
export let parameters = {}

const dispatch = createEventDispatcher()

onMount(() => {
  const pane = new Pane({ container })

  for (const [name, opts] of Object.entries(inputs)) {
    pane.addInput(parameters, name, opts)
  }

  pane.on('change', () => dispatch('change'))
})

</script>

<div class='pane' bind:this={container} />