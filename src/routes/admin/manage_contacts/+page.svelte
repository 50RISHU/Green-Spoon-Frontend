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
	let contacts = [];
	let loading = false;

	onMount(async () => {
		try {
			loading = true;
			const res = await api.get('/get_contact_messages');
			console.log(res.data);
			contacts = res.data;
		} catch (err) {
			console.error(err);
		} finally {
			loading = false;
		}
	});

	async function confirmDelete(contactId) {
		const confirmed = confirm('Are you sure you want to delete this contact?');
		if (confirmed) {
			await deleteContact(contactId);
		}
	}

	async function deleteContact(contactId) {
		try {
			const res = await api.delete(`/remove_contact/${contactId}`);
			console.log(res.data);
			toast.push('Contact deleted successfully');
			goto('/admin_dashboard');
		} catch (err) {
			console.error(err);
			toast.push('Error deleting contact');
		}
	}
</script>

<section class="container py-5 animate__animated animate__fadeIn">
	<div class="text-center mb-4">
		<h2 class="text-success fw-bold animate__animated animate__fadeInDown">View Contacts</h2>
	</div>

	{#if loading}
		<div class="text-center">
			<p>Loading...</p>
		</div>
	{:else}
		<div class="card shadow-lg p-4 animate__animated animate__fadeInUp">
			<table class="table table-bordered table-hover">
				<thead class="table-success">
					<tr><th>Name</th><th>Email</th><th>Phone</th><th>Message</th><th>Action</th></tr>
				</thead>
				<tbody>
					{#each contacts as contact}
						<tr>
							<td>{contact.name}</td>
							<td>{contact.email}</td>
							<td>{contact.phone}</td>
							<td>{contact.message}</td>
							<td>
								<button class="btn btn-danger btn-sm" on:click={() => confirmDelete(contact.id)}>
									Remove
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
