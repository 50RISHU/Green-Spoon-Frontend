<script>
	import { goto } from '$app/navigation';
	import api from '$lib/api';
	import { accessToken } from '$lib/stores/store';
	import { toast } from '@zerodevx/svelte-toast';

	let loading = false;
	let email = '';
	let password = '';

	let error = '';
	let success = '';

	async function handleSubmit(event) {
		event.preventDefault();

		if (!email || !password) {
			error = '⚠️ Please fill all the fields!';
			success = '';
		} else {
			try {
				loading = true;
				const response = await api.post('/login', {
					email: email,
					password: password
				});

				console.log(response.data);
				success = '✅ Login successful!';
				error = '';
				toast.push('login successfull.');
				accessToken.set(response.data.access_token);
				goto('/dashboard');
			} catch (err) {
				error = err.response?.data?.error || '❌ Login failed. Please try again.';
				success = '';
				console.error(err);
				toast.push('login failed.');
			} finally {
				loading = false;
			}
		}
	}
</script>

<div class="container my-5">
	<h2 class="text-center text-success mb-4 animate__animated animate__fadeInDown">Login</h2>

	{#if error}
		<div class="alert alert-danger animate__animated animate__shakeX">
			{error}
		</div>
	{/if}

	<form
		class="mx-auto animate__animated animate__fadeInUp"
		style="max-width: 550px; width: 100%;"
		on:submit={handleSubmit}
	>
		<div class="mb-3">
			<label class="form-label">Email</label>
			<input bind:value={email} type="email" class="form-control" placeholder="Enter email" />
		</div>

		<div class="mb-3">
			<label class="form-label">Password</label>
			<input bind:value={password} type="password" class="form-control" placeholder="Password" />
		</div>

		<button type="submit" class="btn btn-success w-100" disabled={loading}>
			{#if loading}
				Loading...
			{:else}
				Login
			{/if}
		</button>

		<div class="text-center mt-3">
			<span>Don't have an account?</span>
			<a href="/signup" class="text-decoration-none text-success fw-bold">Sign Up</a>
		</div>
	</form>
</div>

<style>
	@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

	input:focus {
		box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
		border-color: #28a745;
	}

	:global(body) {
		background-color: #d1ffbd;
	}
</style>
