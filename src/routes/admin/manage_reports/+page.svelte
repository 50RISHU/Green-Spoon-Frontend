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

	let reports = [];
	let loading = false;

	onMount(async () => {
		try {
			loading = true;
			const res = await api.get('/get_report_messages');
			console.log(res.data);
			reports = res.data;
		} catch (err) {
			console.error(err);
		} finally {
			loading = false;
		}
	});

	async function confirmDelete(reportId) {
		const confirmed = confirm('Are you sure you want to delete this report?');
		if (confirmed) {
			await deleteReport(reportId);
		}
	}

	async function deleteReport(reportId) {
		try {
			const res = await api.delete(`/remove_report/${reportId}`);
			console.log(res.data);
			toast.push(res.data.message);
			goto('/admin_dashboard');
		} catch (err) {
			console.error(err);
			toast.push('Error deleting report');
		}
	}
</script>

<section class="container py-5 animate__animated animate__fadeIn">
	<div class="text-center mb-4">
		<h2 class="text-success fw-bold animate__animated animate__fadeInDown">
			📊 Reports & Insights
		</h2>
		<p class="text-muted fs-5 animate__animated animate__fadeInUp">
			Get the latest analytics and performance updates.
		</p>
	</div>

	{#if loading}
		<div class="text-center">
			<p>Loading...</p>
		</div>
	{:else}
		<div class="card shadow-lg p-4 animate__animated animate__fadeInUp">
			<table class="table table-bordered table-hover align-middle">
				<thead class="table-success">
					<tr><th>Reported At</th><th>Reporter</th><th>Reported Recipe</th><th>Action</th></tr>
				</thead>
				<tbody>
					{#each reports as report}
						<tr>
							<td>{new Date(report.reported_at).toLocaleString()}</td>
							<td>{report.reporter.username}</td>
							<td>{report.recipe.title}</td>

							<td>
								<button class="btn btn-danger btn-sm" on:click={() => confirmDelete(report.id)}>
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

	.list-group-item {
		font-size: 1.05rem;
		transition: transform 0.2s ease;
	}

	.list-group-item:hover {
		background-color: #f1fdf1;
		transform: scale(1.01);
	}

	@media (max-width: 576px) {
		.list-group-item {
			font-size: 0.95rem;
		}
	}
	:global(body) {
		background-color: #d1ffbd;
	}
</style>
