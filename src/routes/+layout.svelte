<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import 'bootstrap/dist/css/bootstrap.min.css';
</script>

<Navbar />

<main class="container my-4">
  <slot />
</main>

<Footer />
