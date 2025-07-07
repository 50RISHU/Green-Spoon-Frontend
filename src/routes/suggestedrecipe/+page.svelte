<script>
  import SuggestedRecipes from '$lib/components/SuggestedRecipes.svelte';
  import { accessToken } from '$lib/stores/store';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!$accessToken || $accessToken.trim() === '') {
			goto('/login'); // Not logged in
		}
	});

</script>

<div class="d-flex flex-column min-vh-100">
  <SuggestedRecipes  />
</div>
