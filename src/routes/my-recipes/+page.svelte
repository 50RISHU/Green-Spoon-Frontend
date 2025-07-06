<script>
  import RecipeCard from '$lib/components/RecipeCard.svelte';

  let recipes = [
    {
      title: "Avocado Salad",
      description: "A refreshing and healthy salad with creamy avocado.",
      image: "https://natashaskitchen.com/wp-content/uploads/2021/12/Tomato-Avocado-Salad-SQ.jpg",
      category: "Lunch"
    },
    {
      title: "Green Smoothie",
      description: "A power-packed smoothie loaded with greens and fruits.",
      image: "https://simplegreensmoothies.com/wp-content/uploads/best-green-smoothie-recipe-simple-featured.jpg",
      category: "Breakfast"
    },
    {
      title: "Chickpea Bowl",
      description: "Vegan bowl with roasted chickpeas, quinoa, and veggies.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfEmTFlHHmengogHZh6JpP_vGKY7xX9LPSyg&s",
      category: "Dinner"
    }
  ];
</script>

<section class="container py-5">
  <h2 class="text-success text-center fw-bold mb-3">🥗 Explore Green Recipes</h2>
  <p class="text-muted text-center fs-5 mb-4">
    Healthy, plant-based meals curated by the community!
  </p>
  <hr class="mb-5" style="border-top: 2px dashed #28a745; width: 60%; margin: 0 auto;" />

  {#if recipes.length > 0}
    <div class="row">
      {#each recipes as r}
        <div class="col-md-6 col-lg-4 mb-4 d-flex align-items-stretch">
          <div class="card square-card shadow-sm w-100 animate__animated animate__zoomIn">
            <RecipeCard {...r} />
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="text-center mt-5">
      <p class="text-muted fs-4">No recipes found. Be the first to add one!</p>
      <a href="/add-recipe" class="btn btn-success px-4 py-2">➕ Add Recipe</a>
    </div>
  {/if}
</section>

<style>
  @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

  .row > div:hover .card {
    transform: scale(1.02);
    transition: transform 0.3s ease-in-out;
  }

  .square-card {
    aspect-ratio: 1 / 1;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    overflow: hidden;
    border-radius: 1rem;
  }
</style>
