<script lang='ts'>
  import { base } from '$app/paths'
  import { page } from '$app/stores'
  import { capitalize } from '$lib/util'
  export let pages = []

  $: routes = Object.keys(pages).map((page) => {
    const path = `${base}${page.slice(1).replace('.svelte', '')}`
    const name = capitalize(path.split('/').pop()).replace('-', ' ')
    return { path, name }
  })
</script>

<nav>
  <ul>
    {#each routes as { path, name } (path)}
      <li>
        <a href={path} class:underline={path === $page.path}>
          {name}
        </a>
      </li>
    {/each}
  </ul>
  
</nav>

<style>
  nav {
    display: inline-block;
    z-index: 1;
    margin: 10px;
    border-radius: 6px;
    background: rgba(255,255,255,0.5);
    box-shadow: 0px 2px 34px -14px rgb(0 0 0 / 43%);
    backdrop-filter: blur(10px);
  }

  ul {
    margin: 0;
    padding: 20px;
    list-style-type: none;
  }

  .underline {
    text-decoration: underline;
  }
</style>