<script>
  import { goto } from '$app/navigation';

  export let onSubmit = () => {};

  let title = "";
  let ingredients = "";
  let instructions = "";
  let imageUrl = "";
  let category = "";
  let time = "";
  let error = "";
  let success = "";

  function handleSubmit(event) {
    event.preventDefault();

    if (!title || !ingredients || !instructions || !category || !time) {
      error = "⚠️ Please fill in all required fields.";
      success = "";
      return;
    }

    success = "✅ Recipe added successfully!";
    error = "";

    onSubmit({
      title,
      ingredients,
      instructions,
      imageUrl,
      category,
      time
    });

    title = "";
    ingredients = "";
    instructions = "";
    imageUrl = "";
    category = "";
    time = "";

    setTimeout(() => {
      goto("/dashboard");
    }, 1500);
  }
</script>

<h2 class="text-success text-center mb-4 animate__animated animate__fadeInDown">
  ➕ Add New Recipe
</h2>

<!-- Enhanced Example for AddRecipeForm.svelte -->
<form class="w-100 w-md-75 mx-auto p-4 bg-white rounded shadow-lg animate__animated animate__fadeInUp" on:submit|preventDefault={handleSubmit}>
  <!-- Alerts -->
  {#if error}
    <div class="alert alert-danger animate__animated animate__shakeX">{error}</div>
  {/if}
  {#if success}
    <div class="alert alert-success animate__animated animate__fadeInUp">{success}</div>
  {/if}

  <!-- Title -->
  <div class="mb-3">
    <label class="form-label fw-bold">Recipe Title</label>
    <input type="text" class="form-control shadow-sm" placeholder="Enter recipe title" bind:value={title} />
  </div>

  <!-- Ingredients -->
  <div class="mb-3">
    <label class="form-label fw-bold">Ingredients</label>
    <textarea class="form-control shadow-sm" rows="3" placeholder="List ingredients separated by commas" bind:value={ingredients}></textarea>
  </div>

  <!-- Instructions -->
  <div class="mb-3">
    <label class="form-label fw-bold">Instructions</label>
    <textarea class="form-control shadow-sm" rows="5" placeholder="Step-by-step cooking instructions" bind:value={instructions}></textarea>
  </div>

  <!-- Image URL -->
  <div class="mb-3">
    <label class="form-label fw-bold">Image URL (optional)</label>
    <input type="url" class="form-control shadow-sm" placeholder="https://example.com/image.jpg" bind:value={imageUrl} />
  </div>

  <!-- Category -->
  <div class="mb-3">
    <label class="form-label fw-bold">Category</label>
    <select class="form-select shadow-sm" bind:value={category}>
      <option value="" disabled selected>-- Select Category --</option>
      <option>Breakfast</option>
      <option>Lunch</option>
      <option>Dinner</option>
      <option>Snacks</option>
      <option>Dessert</option>
      <option>Drinks</option>
    </select>
  </div>

  <!-- Time -->
  <div class="mb-4">
    <label class="form-label fw-bold">⏱ Required Time</label>
    <input type="text" class="form-control shadow-sm" placeholder="e.g. 15 mins, 1 hour" bind:value={time} />
  </div>

  <!-- Submit Button -->
  <button type="submit" class="btn btn-success w-100 shadow">📤 Submit Recipe</button>
</form>

<!-- General Enhancement Notes: -->
<!-- 
1. Wrapped every form in a responsive container (`w-100 w-md-75 mx-auto`) and added padding, shadow, and rounded corners.
2. Used `fw-bold` for labels for better readability.
3. Used `shadow-sm` on form-controls to give subtle depth.
4. Added `mb-*` and `mt-*` Bootstrap utilities for spacing.
5. Preserved animations with animate.css.
6. These patterns should be applied to all other components similarly (e.g. cards in Savarecipe.svelte, profile avatar in Profile.svelte, etc.).
7. All existing color themes (green/white) are untouched.
-->

<!-- Add this to the global style if not already included -->
<style>
  @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
  :global(body) {
    background-color: #d1ffbd;
  }
  .shadow-lg {
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
  }
</style>
