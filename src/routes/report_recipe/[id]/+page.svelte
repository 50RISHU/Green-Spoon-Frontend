<script>
	import { goto } from '$app/navigation';
	import api from '$lib/api';
	import { toast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	$: recipeId = $page.params.id;
	let message = '';
    let loading = false;

    async function handleSubmit(event) {
		event.preventDefault();

		try {
			const res = await api.post(`/report_recipe/${recipeId}`, { "reason": message });
			toast.push('Recipe reported successfully!', { theme: 'success' });
			goto('/recipes');
		} catch (error) {
            console.error(error);
			toast.push('Failed to report recipe.', { theme: 'error' });
		}
	}
</script>

<div class="container mt-5">
	<h2 class="text-center text-success mb-4">Report Recipe</h2>
	<p class="text-center">Write a Reason For reporting a recipe</p>
	<form class="mx-auto mt-5" style="max-width: 550px;" on:submit={handleSubmit}>
		<div class="mb-3">
			<label class="form-label">Reason</label>
			<input
				bind:value={message}
				type="text"
				class="form-control"
				placeholder="Enter your reason"
				required
			/>
		</div>

		<button type="submit" class="btn btn-success w-100" disabled={loading}>
			{#if loading}
				Loading...
			{:else}
				Report
			{/if}
		</button>
	</form>
</div>
