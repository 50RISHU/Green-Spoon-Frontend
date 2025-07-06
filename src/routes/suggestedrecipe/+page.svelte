<script>
  import SuggestedRecipes from '$lib/components/SuggestedRecipes.svelte';

  function handleSearch(data) {
    console.log('User input:', data);
    // Call backend or AI function here
  }
</script>

<div class="d-flex flex-column min-vh-100">
  <SuggestedRecipes onSubmit={handleSearch} />
</div>
