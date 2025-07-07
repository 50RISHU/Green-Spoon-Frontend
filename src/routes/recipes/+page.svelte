<script>
  import RecipeCard from '$lib/components/RecipeCard.svelte';
</script>

<RecipeCard fetchUrl="/get_all_recipe" showSave={true} />
