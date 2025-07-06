<script>
	import { goto } from '$app/navigation';
	let email = '';
	let error = '';
	let success = '';
	function handleSubmit(event) {
		event.preventDefault();
		if (!email || !email.includes('@')) {
			error = '❗ Please enter a valid email address.';
			success = '';
			return;
		}
		success = '✅ Password reset link sent!';
		error = '';
		email = '';
		setTimeout(() => {
			goto('/login');
		}, 2000);
	}
</script>

<div class="card shadow p-4" style="max-width: 500px; width: 100%;">
	<h4 class="text-success text-center mb-3">🔑 Forgot Password</h4>
	<p class="text-center text-muted mb-4">
		Enter your registered email to receive a password reset link.
	</p>
	{#if error}
		<div class="alert alert-danger">{error}</div>
	{/if}
	{#if success}
		<div class="alert alert-success">{success}</div>
	{/if}

	<form on:submit={handleSubmit}>
		<div class="mb-3">
			<label class="form-label fw-bold">Email Address</label>
			<input
				type="email"
				class="form-control"
				placeholder="you@example.com"
				bind:value={email}
				required
			/>
		</div>
		pgsql Copy Edit
		<button type="submit" class="btn btn-success w-100">📩 Send Reset Link</button>
	</form>
	<div class="text-center mt-3">
		<a href="/login" class="text-decoration-none text-muted">← Back to Login</a>
	</div>
</div>
