<script>
	import { goto } from '$app/navigation';
	import api from '$lib/api';
	import { toast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let fetchUrl = '/get_all_recipe';
	export let showSave = true;
	export let unSave = false;
	export let isMyRecipe = false;
	export let isReport = false;
	export let searchRecipe = false;
	let selectedPost = null;
	let showCommentsModal = false;
	let newCommentText = '';
	let Loading = false;
	let recipes = [];
	let query = '';

	async function toggleSave(post) {
		try {
			const res = await api.post('/save_recipe', { recipe_id: post.id });
			console.log(res.data);
			toast.push(res.data.message);
		} catch (error) {
			console.error('Error save:', error);
			toast.push("Can't Save the recipe.");
		}
	}

	async function toggleUnsave(post) {
		try {
			const res = await api.post('/unsave_recipe', { recipe_id: post.id });
			console.log(res.data);
			toast.push(res.data.message);
			goto('/dashboard');
		} catch (error) {
			console.error('Error unsave:', error);
			toast.push("Can't Unsave the recipe.");
		}
	}

	function openComments(post) {
		selectedPost = post;
		showCommentsModal = true;
	}

	function closeCommentsModal() {
		showCommentsModal = false;
		selectedPost = null;
		newCommentText = '';
	}

	async function addComment() {
		if (!newCommentText.trim() || !selectedPost) return;

		try {
			const res = await api.post('/create_comment', {
				recipe_id: selectedPost.id,
				content: newCommentText.trim()
			});

			if (!selectedPost.comment) selectedPost.comment = [];
			selectedPost.comment.push({
				User: { name: 'You' },
				comment: newCommentText.trim()
			});

			recipes = [...recipes];
			newCommentText = '';
			console.log('Comment added:', res.data);
		} catch (error) {
			console.error('Error adding comment:', error);
			toast.push("Can't add comment.");
		}
	}

	async function confirmDelete(recipeId) {
		const confirmed = confirm('🗑️ Are you sure you want to delete this recipe?');
		if (confirmed) {
			await deleteRecipe(recipeId);
		}
	}

	async function deleteRecipe(id) {
		try {
			const res = await api.post('/delete_recipe', { recipe_id: id });
			console.log(res.data);
			toast.push(res.data.message);
			goto('/dashboard');
		} catch (error) {
			console.error('Error deleting recipe:', error);
		}
	}

	async function searchRecipes() {
		Loading = true;
		try {
			const res = await api.post(`/search_recipe`, { query: query });
			recipes = res.data.recipes;
			console.log('Search results:', recipes);
		} catch (error) {
			console.error('Error searching recipes:', error);
		} finally {
			Loading = false;
		}
	}

	onMount(async () => {
		try {
			Loading = true;
			const res = await api.get(fetchUrl);
			recipes = res.data.recipes.map((r) => ({ ...r, saved: false }));
		} catch (error) {
			console.error('Error fetching recipes:', error);
		} finally {
			Loading = false;
		}
	});
</script>

{#if searchRecipe}
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
{/if}

{#if Loading}
	<div class="text-center py-5">
		<p class="text-muted fs-4">Loading recipes...</p>
	</div>
{:else if recipes.length === 0}
	<div class="text-center py-5">
		<p class="text-muted fs-4">No recipes found.</p>
	</div>
{:else}
	<section class={`container py-5`}>
		<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">
			{#each recipes as post, i}
				<div class="col animate__animated animate__zoomIn" style="animation-delay: {i * 0.1}s">
					<div class="card h-100 shadow rounded-4 overflow-hidden">
						<img
							src={post.recipe_image_url ||
								'https://placehold.co/800x400/8bc34a/ffffff?text=No+Recipe+Image'}
							alt={post.title}
							class="card-img-top recipe-image"
						/>
						<div class="card-body d-flex flex-column justify-content-between p-3">
							<div>
								<h5 class="card-title text-success fw-bold mb-1">{post.title}</h5>
								<p class="card-text text-muted small mb-2 text-truncate">{post.description}</p>
							</div>
							<small class="text-muted mb-2 pt-2 border-top">
								👩‍🍳 {post.User?.name || 'Unknown'} | 🕒 {new Date(
									post.created_at
								).toLocaleDateString()}
							</small>
							<div class="d-flex justify-content-between mt-auto">
								{#if showSave}
									<button class="btn btn-sm" on:click={() => toggleSave(post)}>🔖 Save</button>
								{/if}
								{#if unSave}
									<button class="btn btn-sm" on:click={() => toggleUnsave(post)}>🔖 Unsave</button>
								{/if}
								<button class="btn btn-sm btn-outline-primary" on:click={() => openComments(post)}>
									💬 Comment ({post.comment?.length || 0})
								</button>
								<a class="btn btn-sm btn-outline-success" href={`/preview_recipe/${post.id}`}>
									🔍 Preview
								</a>
								{#if isReport}
									<a class="btn btn-sm btn-outline-danger" href={`/report_recipe/${post.id}`}>
										Report</a
									>
								{/if}
								{#if isMyRecipe}
									<a class="btn btn-sm btn-outline-secondary" href={`/edit-Recipe/${post.id}`}>
										Edit</a
									>
									<button
										class="btn btn-sm btn-outline-danger"
										on:click={() => confirmDelete(post.id)}
									>
										Delete</button
									>
								{/if}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>
{/if}

{#if showCommentsModal && selectedPost}
	<div class="modal-backdrop show" transition:fade on:click={closeCommentsModal}></div>
	<div class="modal d-block animate__animated animate__fadeInUp" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
			<div class="modal-content rounded-4 shadow-lg">
				<div class="modal-header bg-success text-white border-0 rounded-top-4">
					<h5 class="modal-title fw-bold">Comments for "{selectedPost.title}"</h5>
					<button class="btn-close btn-close-white" on:click={closeCommentsModal}></button>
				</div>
				<div class="modal-body p-4">
					{#if selectedPost.comment && selectedPost.comment.length > 0}
						<ul class="list-group list-group-flush mb-4">
							{#each selectedPost.comment as comm}
								<li class="list-group-item">
									<strong class="text-primary">{comm.User?.name || 'Unknown'}:</strong>
									{comm.comment}
								</li>
							{/each}
						</ul>
					{:else}
						<p class="text-muted text-center">No comments yet. Be the first!</p>
					{/if}
					<div class="mt-3 border-top pt-3">
						<h6 class="fw-bold mb-3">Add a Comment</h6>
						<div class="input-group">
							<textarea
								class="form-control"
								placeholder="Write your comment..."
								rows="2"
								bind:value={newCommentText}
							></textarea>
							<button class="btn btn-success px-4" on:click={addComment}>Post</button>
						</div>
					</div>
				</div>
				<div class="modal-footer border-0 rounded-bottom-4">
					<button class="btn btn-outline-secondary" on:click={closeCommentsModal}>Close</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
	.recipe-image {
		height: 200px;
		object-fit: cover;
	}
	.card {
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		border: none;
	}
	.card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
	}
</style>
