<script>
	import AdminPanel from '$lib/components/AdminPanel.svelte';
	import { accessToken } from '$lib/stores/store';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!$accessToken || $accessToken.trim() === '') {
			goto('/login'); // Not logged in
		}
	});
</script>

<AdminPanel />
