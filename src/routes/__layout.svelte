<script lang="ts">
	import '../app.css'
	import Menu from '$lib/components/Menu.svelte'
	const pages = import.meta.glob('./tasks/*.svelte')
</script>

<Menu {pages} />

<slot />

<style>

</style>
