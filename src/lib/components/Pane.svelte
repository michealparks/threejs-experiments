<script lang='ts'>

import { createEventDispatcher, onMount } from 'svelte'
import { Pane } from 'tweakpane'
import type { StringInputParams } from 'tweakpane'

let container: HTMLDivElement

type Inputs = Record<string, StringInputParams>

export let inputs: Inputs = {}
export let parameters = {}

const dispatch = createEventDispatcher()

onMount(() => {
  const pane = new Pane({ container })

  for (const [name, options] of Object.entries(inputs)) {
    pane.addInput(parameters, name, options)
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
