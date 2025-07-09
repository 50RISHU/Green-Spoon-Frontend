<script>
  import ContactForm from '$lib/components/ContactForm.svelte';
  import { accessToken } from '$lib/stores/store';
  import { onMount } from 'svelte';

  onMount(() => {
		if (!$accessToken || $accessToken.trim() === '') {
			goto('/login');
		}
	});
</script>

<section class="container py-5 animate__animated animate__fadeIn">
  <h1 class="text-center text-success fw-bold display-5 mb-4 animate__animated animate__fadeInDown">
     Contact Us
  </h1>
  <p class="text-muted text-center mb-4 animate__animated animate__fadeInUp">
    Have a question, feedback, or issue? We'd love to hear from you!
  </p>

  <div class="row justify-content-center">
    <div class="col-md-8">
      <ContactForm  />
    </div>
  </div>
</section>

<style>

  section {
    background-color: #eaffd9;
    min-height: 100vh;
  }

  :global(body) {
    background-color: #d1ffbd;
  }
</style>
