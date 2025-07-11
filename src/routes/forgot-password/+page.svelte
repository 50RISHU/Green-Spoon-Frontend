<script>
	import api from '$lib/api';
	import { goto } from '$app/navigation';
	import { toast } from '@zerodevx/svelte-toast';

	let email = '';
	let loading = false;

	async function handleSubmit(event) {
		event.preventDefault();
		loading = true;

		try {
			const res = await api.post('/forgot_password', { email });
			toast.push(res.data.message);
			// goto("/login");
		} catch (error) {
			console.error('Error resetting password:', error);
			toast.push('Failed to reset password.');
		} finally {
			loading = false;
		}
	}
</script>

<div class="container mt-5">
	<h2 class="text-center text-success mb-4">Forgot Password</h2>
	<p class="text-center">Enter your email address to reset your password.</p>
	<form
		class="mx-auto mt-5 animate__animated animate__fadeInUp"
		style="max-width: 550px; width: 100%;"
		on:submit={handleSubmit}
	>
		<div class="mb-3">
			<label class="form-label">Email</label>
			<input bind:value={email} type="email" class="form-control" placeholder="Email" />
		</div>
		<button type="submit" class="btn btn-success w-100" disabled={loading}>
			{#if loading}
				Loading...
			{:else}
				Submit
			{/if}
		</button>
	</form>
</div>
