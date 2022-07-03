<script lang='ts'>

import { createEventDispatcher, onMount } from 'svelte'
import { Pane } from 'tweakpane'
import type { InputParams } from 'tweakpane'

let container: HTMLDivElement

export let inputs: unknown = {}
export let parameters = {}

const dispatch = createEventDispatcher()

onMount(() => {
  const pane = new Pane({ container })

  for (const [name, options] of Object.entries(inputs as Record<string, unknown>)) {
    pane.addInput(parameters, name as never, options as InputParams)
  }

  pane.on('change', () => dispatch('change'))
})

</script>

<div class='pane' bind:this={container} />

<style>
  .pane {
    z-index: 100;
    position: fixed;
    top: 0;
    right: 0;
    margin: 10px;
  }
</style>
