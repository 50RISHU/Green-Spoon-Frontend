<script>
	import ProfileCard from '$lib/components/ProfileCard.svelte';
	import { accessToken } from '$lib/stores/store';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!$accessToken || $accessToken.trim() === '') {
			goto('/login'); // Not logged in
		}
	});
</script>

<div class="container py-4"><ProfileCard /></div>
