<script>
	import { accessToken } from '$lib/stores/store';
	import { goto } from '$app/navigation';
	import api from '$lib/api';
	import { onMount } from 'svelte';
	import { toast } from '@zerodevx/svelte-toast';

	onMount(() => {
		if (!$accessToken || $accessToken.trim() === '') {
			goto('/login'); // Not logged in
		}
	});
	let recipes = [];
	let loading = false;
	let query = '';

	onMount(async () => {
		try {
			loading = true;
			const res = await api.get('/get_all_recipe');
			console.log(res.data);
			recipes = res.data.recipes;
		} catch (err) {
			console.error(err);
		} finally {
			loading = false;
		}
	});

	async function confirmDelete(recipeId) {
		const confirmed = confirm('Are Sure to delete Recipe');
		if (confirmed) {
			await deleteRecipe(recipeId);
		}
	}

	async function deleteRecipe(recipeId) {
		try {
			const res = await api.post('/delete_recipe', { recipe_id: recipeId });
			console.log(res.data);
			toast.push('Recipe deleted successfully');
			goto('/admin_dashboard');
		} catch (err) {
			console.error(err);
			toast.push('Error deleting recipe');
		}
	}

	async function searchRecipes() {
		loading = true;
		try {
			const res = await api.post(`/search_recipe`, { query: query });
			recipes = res.data.recipes;
			console.log('Search results:', recipes);
		} catch (error) {
			console.error('Error searching recipes:', error);
		} finally {
			loading = false;
		}
	}
</script>

<section class="container py-5 animate__animated animate__fadeIn">
	<div class="text-center mb-4">
		<h2 class="text-success fw-bold animate__animated animate__fadeInDown">Manage Recipes</h2>
		<p class="text-muted fs-5 animate__animated animate__fadeInUp">
			View and manage all Created recipes.
		</p>
	</div>

	<div class="container mt-5 py-2">
		<div class="input-group mb-3">
			<input
				type="text"
				class="form-control"
				placeholder="Search recipes..."
				bind:value={query}
				on:keydown={(e) => e.key === 'Enter' && searchRecipes()}
			/>
			<button class="btn btn-success z-0" on:click={searchRecipes}>Search</button>
		</div>
	</div>

	{#if loading}
		<div class="text-center">
			<p>Loading...</p>
		</div>
	{:else}
		<div class="card shadow-lg p-4 animate__animated animate__fadeInUp">
			<table class="table table-bordered table-hover align-middle">
				<thead class="table-success">
					<tr><th>Title</th><th>Author</th><th>Action</th></tr>
				</thead>
				<tbody>
					{#each recipes as recipe}
						<tr>
							<td>{recipe.title}</td>
							<td>{recipe.User.username}</td>
							<td>
								<button class="btn btn-danger btn-sm" on:click={() => confirmDelete(recipe.id)}>
									Delete
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</section>

<style>
	@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

	.card {
		background-color: #fff;
		border-radius: 1rem;
	}

	.btn-danger {
		transition: background-color 0.3s ease;
	}

	.btn-danger:hover {
		background-color: #c82333;
	}

	@media (max-width: 576px) {
		table {
			font-size: 0.9rem;
		}

		.btn {
			padding: 0.3rem 0.6rem;
		}
	}

	:global(body) {
		background-color: #d1ffbd;
	}
</style>
