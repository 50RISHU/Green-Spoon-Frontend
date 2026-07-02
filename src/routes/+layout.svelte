<script>
	// Import the main Navbar component and global styles
	import Navbar from '$lib/components/Navbar.svelte';
	import 'bootstrap/dist/css/bootstrap.min.css';
	
	// Import the toast notification component
	import { SvelteToast } from '@zerodevx/svelte-toast';
	
	// Import Svelte lifecycle hooks
	import { onMount } from 'svelte';

	// Load Bootstrap's JS bundle on the client side after the component mounts
	onMount(async () => {
		await import('bootstrap/dist/js/bootstrap.bundle.min.js');
	});
</script>

<!-- Render the Navigation Bar at the top of every page -->
<Navbar />

<!-- Main layout wrapper ensuring the footer stays at the bottom -->
<div class="d-flex flex-column min-vh-100">
	<!-- Toast container for displaying global notifications -->
	<SvelteToast />
	
	<!-- Main content area where child routes (slots) are injected -->
	<main class="flex-grow-1 my-4">
		<slot />
	</main>

	<!-- Global footer section -->
	<footer class="text-center text-white p-3 border-top">
		© 2025 Green Spoon | Made with 🥬 & ❤️
	</footer>
</div>

<style>
	/* Global resets and full height for HTML and Body */
	:global(html, body) {
		margin: 0;
		padding: 0;
		height: 100%;
		box-sizing: border-box;
	}
	/* Global background color theme */
	:global(body) {
		background-color: #d1ffbd;
	}
	/* Footer specific styling */
	footer {
		background-color: #53664b;
	}
</style>
