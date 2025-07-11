<script>
	import { page } from '$app/stores';
	import api from '$lib/api';
	import { toast } from '@zerodevx/svelte-toast';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let newPassword = '';
	let loading = false;
	let access_token = '';

	onMount(() => {
		const hash = window.location.hash.substring(1);
		const params = new URLSearchParams(hash);
		access_token = params.get('access_token');
	});

	async function handleSubmit(event) {
		event.preventDefault();
		loading = true;

		if (!access_token) {
			toast.push('❌ Missing token in URL');
			return;
		}

		try {
			const res = await api.post(
				'/reset_password',
				{ new_password: newPassword },
				{
					headers: {
						Authorization: `Bearer ${access_token}`
					}
				}
			);
			toast.push(res.data.message || '✅ Password reset successful!');
			goto('/login');
		} catch (error) {
			console.error('Error resetting password:', error);
			toast.push('❌ Failed to reset password.');
		} finally {
			loading = false;
		}
	}
</script>

<div class="container mt-5">
	<form class="mx-auto mt-5" style="max-width: 550px;" on:submit={handleSubmit}>
		<h2 class="text-center text-success mb-4">Reset Password</h2>
		<div class="mb-3">
			<label class="form-label">New Password</label>
			<input
				bind:value={newPassword}
				type="password"
				class="form-control"
				placeholder="Enter your new password"
				required
			/>
		</div>

		<button type="submit" class="btn btn-success w-100" disabled={loading}>
			{#if loading}
				Loading...
			{:else}
				Reset Password
			{/if}
		</button>
	</form>
</div>
