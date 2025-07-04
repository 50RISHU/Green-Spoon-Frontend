<script>
  export let savedRecipes = [
    {
      title: "Vegan Buddha Bowl",
      description: "A colorful bowl with quinoa, veggies, and tahini dressing.",
      image: "https://source.unsplash.com/400x300/?buddha,bowl",
      category: "Lunch"
    },
    {
      title: "Kale Chips",
      description: "Crunchy, salty, and healthy homemade kale chips.",
      image: "https://source.unsplash.com/400x300/?kale,chips",
      category: "Snacks"
    }
  ];
</script>

<div class="d-flex flex-column min-vh-100 justify-content-between">
  <main class="container my-5">
    <h2 class="text-primary text-center mb-4">🔖 Your Saved Recipes</h2>
    <p class="text-muted text-center mb-4">
      You’ve saved {savedRecipes.length} recipes for later!
    </p>

    <div class="row">
      {#each savedRecipes as recipe}
        <div class="col-md-4 mb-4">
          <div class="card shadow-sm h-100">
            <img src={recipe.image} class="card-img-top" alt={recipe.title} />
            <div class="card-body">
              <h5 class="card-title">{recipe.title}</h5>
              <p class="card-text">{recipe.description}</p>
              <span class="badge bg-info">{recipe.category}</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </main>
</div>
