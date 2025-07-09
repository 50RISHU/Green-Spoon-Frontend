<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';

	onMount(async () => {
		await import('bootstrap/dist/js/bootstrap.bundle.min.js');
	});
</script>

<Navbar />

<div class="d-flex flex-column min-vh-100">
	<SvelteToast />
	<main class="flex-grow-1 my-4">
		<slot />
	</main>

	<footer class="text-center text-white p-3 border-top">
		© 2025 Green Spoon | Made with 🥬 & ❤️
	</footer>
</div>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		height: 100%;
		box-sizing: border-box;
	}
	:global(body) {
		background-color: #d1ffbd;
	}
	footer {
		background-color: #53664b;
	}
</style>
