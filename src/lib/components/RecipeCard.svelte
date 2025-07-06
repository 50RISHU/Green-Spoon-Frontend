<script>
	import api from '$lib/api';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition'; // Added fade import for transitions

	let selectedPost = null;

	let showCommentsModal = false;

	let newCommentText = '';
	let Loading = false;
	let recipes = [];

	async function toggleSave(post) { 
		try {
			const res = await api.post('/save_recipe', { "recipe_id": post.id });
			// Update local state based on response
			console.log(res.data);
		} catch (error) {
			console.error('Error toggling save:', error);
		}
	}

	function openComments(post) {
		selectedPost = post;
		showCommentsModal = true;
	}

	function closeCommentsModal() {
		showCommentsModal = false;
		selectedPost = null;
		newCommentText = ''; // Clear input when modal closes
	}

	async function addComment() {
		if (!newCommentText.trim() || !selectedPost) return;

		try {
			const res = await api.post('/create_comment', {
				recipe_id: selectedPost.id,
				content: newCommentText.trim()
			});

			// Optionally update UI with new comment
			if (!selectedPost.comment) selectedPost.comment = [];

			selectedPost.comment.push({
				User: { name: 'You' }, // Adjust if you can get real user name
				comment: newCommentText.trim()
			});

			recipes = [...recipes]; // Trigger reactivity
			newCommentText = '';
			console.log('Comment added successfully:', res.data);
		} catch (error) {
			console.error('Error adding comment:', error);
		}
	}

	onMount(async () => {
		try {
			Loading = true;
			const res = await api.get('/get_all_recipe');
			recipes = res.data.recipes.map((recipe) => ({
				...recipe,
				saved: false // Initialize 'saved' property for each fetched recipe
			}));

			console.log(recipes);
		} catch (error) {
			console.error('Error fetching recipes:', error);
		} finally {
			Loading = false;
		}
	});
</script>

{#if Loading}
	<div class="d-flex justify-content-center">
		<div class="spinner-border" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>
{:else}
	<div class="page-bg min-vh-100 d-flex flex-column">
		<section class="container py-5">
			<h1 class="text-success text-center fw-bold mb-3 animate__animated animate__fadeInDown">
				🥗 Welcome to Green Spoon
			</h1>
			<p class="text-center text-muted fs-5 mb-5 animate__animated animate__fadeInUp">
				Discover healthy, delicious, and easy-to-cook vegetarian recipes curated by food lovers!
			</p>

			<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">
				{#each recipes as post, i}
					<div class="col animate__animated animate__zoomIn" style="animation-delay: {i * 0.1}s">
						<div class="card h-100 shadow rounded-4 overflow-hidden">
							<img
								src={post.recipe_image_url || 'https://via.placeholder.com/300x200?text=No+Image'}
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
									<button
										class="btn btn-sm"
										on:click={() => toggleSave(post)}
									>
										🔖 Save
									</button>
									<button
										class="btn btn-sm btn-outline-primary"
										on:click={() => openComments(post)}
									>
										💬 Comment ({post.comment?.length || 0})
									</button>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>
	</div>
{/if}

{#if showCommentsModal && selectedPost}
	<div
		class="modal-backdrop show"
		transition:fade={{ duration: 150 }}
		on:click={closeCommentsModal}
	></div>
	<div
		class="modal d-block animate__animated animate__fadeInUp"
		tabindex="-1"
		role="dialog"
		aria-labelledby="commentsModalLabel"
		aria-hidden="true"
		style="display: block;"
	>
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
			<div class="modal-content rounded-4 shadow-lg">
				<div class="modal-header bg-success text-white border-0 rounded-top-4">
					<h5 class="modal-title fw-bold" id="commentsModalLabel">
						Comments for "{selectedPost.title}"
					</h5>
					<button
						type="button"
						class="btn-close btn-close-white"
						aria-label="Close"
						on:click={closeCommentsModal}
					></button>
				</div>
				<div class="modal-body p-4">
					{#if selectedPost.comment && selectedPost.comment.length > 0}
						<ul class="list-group list-group-flush mb-4">
							{#each selectedPost.comment as comm}
								<li class="list-group-item d-flex justify-content-between align-items-center">
									<div>
										<strong class="text-primary">{comm.User?.name || 'Unknown'}:</strong>
										{comm.comment}
									</div>
								</li>
							{/each}
						</ul>
					{:else}
						<p class="text-muted text-center">No comments yet. Be the first to comment!</p>
					{/if}

					<div class="mt-3 border-top pt-3">
						<h6 class="fw-bold mb-3">Add a Comment</h6>
						<div class="input-group">
							<textarea
								class="form-control rounded-start-pill"
								placeholder="Write your comment here..."
								rows="2"
								bind:value={newCommentText}
							></textarea>
							<button
								class="btn btn-success rounded-end-pill px-4"
								type="button"
								on:click={addComment}
							>
								Post
							</button>
						</div>
					</div>
				</div>
				<div class="modal-footer border-0 rounded-bottom-4">
					<button
						type="button"
						class="btn btn-outline-secondary rounded-pill px-4"
						on:click={closeCommentsModal}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

	:global(body) {
		background-color: #d1ffbd;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.page-bg {
		background-color: #d1ffbd; /* Ensure background consistency */
	}

	.recipe-image {
		height: 200px;
		object-fit: cover;
	}

	.card {
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		border: none; /* Remove default card border */
	}

	.card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important; /* Stronger shadow on hover */
	}

	.card-body {
		padding: 1rem;
	}

	.text-truncate {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100%; /* Ensure it truncates within its container */
	}

	/* Modal Specific Styles */
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1040;
	}

	.modal {
		z-index: 1050;
		overflow: hidden; /* Prevent body scroll when modal is open */
	}

	.modal-dialog {
		margin-top: 1.75rem; /* Adjust modal vertical position */
		margin-bottom: 1.75rem;
	}

	.modal-content {
		animation-duration: 0.3s; /* Shorter animation for modal */
	}

	.list-group-item:last-child {
		border-bottom-left-radius: 0.5rem;
		border-bottom-right-radius: 0.5rem;
	}

	.list-group-item:first-child {
		border-top-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
	}
</style>
