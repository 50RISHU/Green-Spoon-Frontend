<script>
  import EditProfileCard from "$lib/components/EditProfileCard.svelte";
  import { accessToken } from '$lib/stores/store';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

  onMount(() => {
		if (!$accessToken || $accessToken.trim() === '') {
			goto('/login'); // Not logged in
		}
	});
</script>

<div
  class="container py-4"
  style="background-color: #d1ffbd;"
>
  <EditProfileCard />
</div>
