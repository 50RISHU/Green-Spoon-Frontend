<script>
  import AddRecipeForm from '$lib/components/AddRecipeForm.svelte';
  import { accessToken } from '$lib/stores/store';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!$accessToken || $accessToken.trim() === '') {
			goto('/login'); // Not logged in
		}
	});
</script>

<AddRecipeForm />
