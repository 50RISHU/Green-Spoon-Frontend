<script>
  import { onMount } from "svelte";
  export let onSubmit = (data) => {
    const queryType = data.useAI ? "AI" : "Community";
    alert(
      `🔍 Searching ${queryType} recipes with:\nIngredients: ${data.ingredients}\nTime: ${data.time} mins`,
    );
  };
  let ingredients = "";
  let time = "";
  let useAI = true;
  function handleSubmit() {
    onSubmit({ ingredients, time, useAI });
  }
</script>

<section class="container my-5 flex-grow-1">
  <h2 class="text-center text-success mb-4">🥗 Suggested Recipes</h2>
  <p class="text-muted text-center mb-5">
    Enter your available ingredients and desired cooking time. Let Green Spoon
    suggest something tasty!
  </p>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <form
        class="bg-white shadow rounded p-4 animate__animated animate__fadeInUp"
        on:submit|preventDefault={handleSubmit}
      >
        <div class="mb-3">
          <label class="form-label fw-bold">Ingredients</label>
          <input
            type="text"
            class="form-control"
            bind:value={ingredients}
            placeholder="e.g. tomato, spinach, garlic"
            required
          />
        </div>
        php-template Copy Edit
        <div class="mb-3">
          <label class="form-label fw-bold">Time (in minutes)</label>
          <input
            type="number"
            min="1"
            class="form-control"
            bind:value={time}
            placeholder="e.g. 15"
            required
          />
        </div>

        <div class="mb-4">
          <label class="form-label fw-bold">Choose Source</label>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              bind:checked={useAI}
              id="sourceToggle"
            />
            <label class="form-check-label" for="sourceToggle">
              {useAI ? "🤖 AI Suggested Recipes" : "👥 Community Recipes"}
            </label>
          </div>
        </div>

        <button class="btn btn-success w-100" type="submit"
          >🔍 Find Recipes</button
        >
      </form>
    </div>
  </div>
</section>

<style>
  @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
  :global(body) {
    background-color: #d1ffbd;
  }
</style>
