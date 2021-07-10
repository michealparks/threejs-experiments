<script lang='ts'>
  import { base } from '$app/paths'
  import { capitalize } from '$lib/util'
  export let pages = []
</script>

<nav>
  <ul>
    {#each Object.keys(pages) as page (page)}
      <li>
        <a href={`${base}${page.slice(1, -7)}`}>
          {capitalize(page.slice(8, -7))}
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
</style>