<script>
  import RecipeCard from '$lib/components/RecipeCard.svelte';
  import { accessToken } from '$lib/stores/store';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!$accessToken || $accessToken.trim() === '') {
			goto('/login'); // Not logged in
		}
	});
</script>

<RecipeCard fetchUrl="/get_save_recipe" showSave={false} unSave={true} isReport={true} searchRecipe={false}/>
