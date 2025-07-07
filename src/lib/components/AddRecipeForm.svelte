<script>
  import { goto } from '$app/navigation';
  import api from '$lib/api';
	import { toast } from '@zerodevx/svelte-toast';

  let title = "";
  let ingredients = "";
  let instructions = "";
  let imageFile = null;
  let category = "";
  let description = "";
  let Loading = false;
  let error = "";
  let success = "";

  async function handleSubmit() {

    if (!title || !ingredients || !instructions || !description) {
      error = "⚠️ Please fill in all required fields.";
      success = "";
      return;
    }

    success = "✅ Recipe added successfully!";
    error = "";

    try{
      Loading = true;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("ingredients", ingredients);
      formData.append("instructions", instructions);
      formData.append("image", imageFile);
      formData.append("description", description);

      const res = await api.post("/create_recipe", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log("Recipe added successfully:", res.data);

      toast.push("recipe added successfully.")
      goto('/dashboard')
    } catch (error) {
      console.error("Error adding recipe:", error);
      error = "⚠️ Failed to add recipe.";
      success = "";
    } finally {
      Loading = false;
    }
  }
</script>

<h2 class="text-success text-center mb-4 animate__animated animate__fadeInDown">
  ➕ Add New Recipe
</h2>

<!-- Enhanced Example for AddRecipeForm.svelte -->
<form class="w-100 w-md-75 mx-auto p-4 bg-white rounded shadow-lg animate__animated animate__fadeInUp" on:submit|preventDefault={handleSubmit} enctype="multipart/form-data">
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

  <div class="mb-3">
    <label class="form-label fw-bold">Description</label>
    <textarea class="form-control shadow-sm" rows="3" placeholder="Enter recipe description" bind:value={description}></textarea>
  </div>

  <!-- Instructions -->
  <div class="mb-3">
    <label class="form-label fw-bold">Instructions</label>
    <textarea class="form-control shadow-sm" rows="5" placeholder="Step-by-step cooking instructions" bind:value={instructions}></textarea>
  </div>

  <!-- Image URL -->
  <div class="mb-3">
    <label class="form-label fw-bold">Image (Optional)</label>
    <input type="file" class="form-control shadow-sm" accept="image/*" on:change={(e) => (imageFile = e.target.files[0])}>
  </div>

  <!-- Submit Button -->
  <button type="submit" class="btn btn-success w-100 shadow" disabled={Loading}>
    {Loading ? "⏳ Adding Recipe..." : "📤 Submit Recipe"}
  </button>
</form>

<style>
  @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
  :global(body) {
    background-color: #d1ffbd;
  }
  .shadow-lg {
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
  }
</style>
