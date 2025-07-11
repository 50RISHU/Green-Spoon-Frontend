<script>
	import { accessToken } from '$lib/stores/store';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import api from '$lib/api';
	import { toast } from '@zerodevx/svelte-toast';

	onMount(() => {
		if (!$accessToken || $accessToken.trim() === '') {
			goto('/login'); // Not logged in
		}
	});

	let users = [];
	let query = '';
	let loading = false;

	onMount(async () => {
		try {
			loading = true;
			const res = await api.get('/get_all_users');
			console.log(res.data);
			users = res.data;
		} catch (err) {
			console.error(err);
		} finally {
			loading = false;
		}
	});

	async function confirmDelete(userId) {
		const confirmed = confirm('Are Sure to delete User');
		if (confirmed) {
			await deleteUser(userId);
		}
	}

	async function deleteUser(userId) {
		try {
			const res = await api.delete(`/remove_user/${userId}`);
			console.log(res.data);
			toast.push('User deleted successfully');
			goto('/admin_dashboard');
		} catch (err) {
			console.error(err);
			toast.push('Error deleting user');
		}
	}

	async function searchUser() {
		try {
			loading = true;
			const res = await api.post(`/search_user`, { query: query });
			console.log(res.data);
			users = res.data;
		} catch (err) {
			console.error(err);
		} finally {
			loading = false;
		}
	}
</script>

<section class="container py-5 animate__animated animate__fadeIn">
	<div class="text-center mb-4">
		<h2 class="text-success fw-bold animate__animated animate__fadeInDown">Manage Users</h2>
		<p class="text-muted fs-5 animate__animated animate__fadeInUp">
			View and manage all registered users.
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
			<button class="btn btn-success z-0" on:click={searchUser}>Search</button>
		</div>
	</div>

	{#if loading}
		<div class="text-center">
			<p>Loading...</p>
		</div>
	{:else}
		<div class="card shadow-lg p-4 animate__animated animate__fadeInUp">
			<table class="table table-bordered table-hover align-middle">
				<thead class="table-success text-center">
					<tr>
						<th>Name</th>
						<th>Username</th>
						<th>Email</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{#each users as user, index}
						<tr class="text-center">
							<td>{user.name}</td>
							<td>{user.username}</td>
							<td>{user.email}</td>
							<td>
								<button class="btn btn-sm btn-danger" on:click={() => confirmDelete(user.id)}>
									🗑️ Delete
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
