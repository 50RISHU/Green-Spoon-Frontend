<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import api from '$lib/api';

	let recipe = null;
	let Loading = true;
	let error = '';

	$: recipeId = $page.params.id;

	onMount(async () => {
		try {
			Loading = true;
			const res = await api.get(`/get_recipe/${recipeId}`);
			recipe = res.data.recipe[0];
            console.log(recipe)
		} catch (err) {
			error = '⚠️ Failed to load recipe.';
			console.error(err);
		} finally {
			Loading = false;
		}
	});
</script>

{#if Loading}
    <div class="text-center my-5 animate__animated animate__fadeIn">
        <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2 text-success">Loading recipe details...</p>
    </div>
{:else if error}
    <div class="alert alert-danger text-center my-5 animate__animated animate__shakeX" role="alert">
        <i class="fas fa-exclamation-triangle me-2"></i> {error}
    </div>
{:else}
    <div class="container my-5 animate__animated animate__fadeInUp">
        <div class="row justify-content-center">
            <div class="col-lg-8 col-md-10">
                <div class="recipe-container">
                    <a href="/recipes" class="btn btn-outline-secondary mb-4 back-button animate__animated animate__fadeInLeft">
                        <i class="fas fa-arrow-left me-2"></i> Back to Recipes
                    </a>

                    <h2 class="text-center text-success mb-4 animate__animated animate__fadeInDown">{recipe.title}</h2>

                    <img
                        src={recipe.recipe_image_url || 'https://placehold.co/800x400/8bc34a/ffffff?text=Recipe+Image'}
                        alt="{recipe.title} Image"
                        class="img-fluid rounded shadow my-4 d-block mx-auto recipe-image animate__animated animate__zoomIn"
                    />

                    <div class="d-flex justify-content-between align-items-center mb-4 animate__animated animate__fadeIn">
                        <div class="d-flex align-items-center author-info">
                            <img src={recipe.User?.profile_picture_url || `https://api.dicebear.com/7.x/initials/svg?seed=${recipe.User?.username || 'Unknown'}`} alt="Author Profile" />
                            <div>
                                <h5 class="mb-0 text-muted">👨‍🍳 Author:</h5>
                                <p class="mb-0 fw-bold text-dark">{recipe.User?.username || 'Unknown'}</p>
                            </div>
                        </div>
                        <small class="text-muted">
                            <i class="far fa-calendar-alt me-1"></i> Created: {new Date(recipe.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </small>
                    </div>

                    <div class="section-content animate__animated animate__slideInUp">
                        <h5 class="section-heading"><i class="fas fa-info-circle me-2"></i> Description:</h5>
                        <p class="text-secondary">{recipe.description}</p>
                    </div>

                    <div class="section-content animate__animated animate__slideInUp animate__delay-1s">
                        <h5 class="section-heading"><i class="fas fa-carrot me-2"></i> Ingredients:</h5>
                        <p class="text-secondary">{recipe.ingredients}</p>
                    </div>

                    <div class="section-content animate__animated animate__slideInUp animate__delay-2s">
                        <h5 class="section-heading"><i class="fas fa-clipboard-list me-2"></i> Instructions:</h5>
                        <p class="text-secondary">{recipe.instructions}</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
{/if}



<style>
    
    .recipe-container {
        background-color: rgb(237, 255, 216); 
        border-radius: 15px; 
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); 
        padding: 30px; 
    }

    .recipe-image {
        max-height: 400px; 
        object-fit: cover;
        border-radius: 12px; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    }

    .section-heading {
        color: #28a745; 
        font-weight: 600;
        margin-bottom: 10px;
    }

    .section-content {
        background-color: #f8f9fa; 
        border-radius: 8px;
        padding: 15px 20px;
        margin-bottom: 20px;
        border: 1px solid #e9ecef;
    }

    .author-info img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 10px;
        border: 2px solid #28a745; 
    }
    .back-button {
        border-radius: 8px;
        padding: 10px 20px;
        font-size: 1rem;
        transition: transform 0.2s ease-in-out;
    }

    .back-button:hover {
        transform: translateX(-5px); 
    }


    :global(body) {
        background-color: #e9f5e9; 
    }
</style>
