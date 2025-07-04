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

    // Optional callback
    onSubmit({
      title,
      ingredients,
      instructions,
      imageUrl,
      category,
      time
    });

    // Reset fields
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

<h2 class="text-success text-center mb-4">➕ Add New Recipe</h2>

<form class="w-75 mx-auto" on:submit|preventDefault={handleSubmit}>
  {#if error}
    <div class="alert alert-danger">{error}</div>
  {/if}
  {#if success}
    <div class="alert alert-success">{success}</div>
  {/if}

  <div class="mb-3">
    <label class="form-label">Recipe Title</label>
    <input type="text" class="form-control" placeholder="Enter recipe title" bind:value={title} />
  </div>

  <div class="mb-3">
    <label class="form-label">Ingredients</label>
    <textarea class="form-control" rows="3" placeholder="List ingredients separated by commas" bind:value={ingredients}></textarea>
  </div>

  <div class="mb-3">
    <label class="form-label">Instructions</label>
    <textarea class="form-control" rows="5" placeholder="Step-by-step cooking instructions" bind:value={instructions}></textarea>
  </div>

  <div class="mb-3">
    <label class="form-label">Image URL (optional)</label>
    <input type="url" class="form-control" placeholder="https://example.com/image.jpg" bind:value={imageUrl} />
  </div>

  <div class="mb-3">
    <label class="form-label">Category</label>
    <select class="form-select" bind:value={category}>
      <option value="" disabled selected>-- Select Category --</option>
      <option>Breakfast</option>
      <option>Lunch</option>
      <option>Dinner</option>
      <option>Snacks</option>
      <option>Dessert</option>
      <option>Drinks</option>
    </select>
  </div>

  <div class="mb-3">
    <label class="form-label">⏱ Required Time</label>
    <input type="text" class="form-control" placeholder="e.g. 15 mins, 1 hour" bind:value={time} />
  </div>

  <button type="submit" class="btn btn-success w-100">📤 Submit Recipe</button>
</form>
