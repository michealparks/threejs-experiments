<script lang='ts'>

import { page } from '$app/stores'

interface Route {
  path: string
  name: string
}

export let routes: Route[] = []

</script>

<nav>
  <ul>
    {#each routes as { path, name } (path)}
      <li>
        <a href={path} class:underline={path === $page.url.pathname}>
          {name}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
nav {
  width: 6rem;
  z-index: 1;
  margin: 25% 0 10px 0;
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