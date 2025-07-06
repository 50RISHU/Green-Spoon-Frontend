<script>
	import { accessToken } from '$lib/stores/store';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import logo from '$lib/green spoon.webp';

	// ✅ Reactive login state
	$: isLoggedIn = $accessToken && $accessToken.trim() !== '';

	function handleLogout() {
		accessToken.set('');
		goto('/login');
	}
</script>

<nav class="navbar navbar-expand-lg shadow-sm px-4 custom-navbar">
	<a class="navbar-brand fw-bold text-white" href="/"><img src={logo} alt="Bootstrap" width="35" > <span>The Green Spoon</span></a>

	<button
		class="navbar-toggler"
		type="button"
		data-bs-toggle="collapse"
		data-bs-target="#navbarNav"
		aria-controls="navbarNav"
		aria-expanded="false"
		aria-label="Toggle navigation"
	>
		<span class="navbar-toggler-icon"></span>
	</button>

	<div class="collapse navbar-collapse" id="navbarNav">
		<ul class="navbar-nav ms-auto align-items-center">
			{#if isLoggedIn}
				<li class="nav-item">
					<a class="nav-link text-white" href="/dashboard">Dashboard</a>
				</li>
				<li class="nav-item">
					<a class="nav-link text-white" href="/my-recipes">My Recipes</a>
				</li>
				<li class="nav-item">
					<a class="nav-link text-white" href="/recipes">Recipes</a>
				</li>
				<li class="nav-item">
					<a class="nav-link text-white" href="/profile">👤</a>
				</li>
			{:else}
				<li class="nav-item">
					<a class="nav-link text-white" href="/recipes">Recipes</a>
				</li>
				<li class="nav-item">
					<a class="nav-link text-white" href="/login">Login</a>
				</li>
				<li class="nav-item">
					<a class="nav-link text-white" href="/signup">Signup</a>
				</li>
			{/if}
		</ul>
	</div>
</nav>

<style>
	.custom-navbar {
		background-color: #53664b;
	}

	.navbar .nav-link {
		color: white !important;
	}

	.navbar .nav-link:hover {
		text-decoration: underline;
	}

	.navbar-toggler {
		border-color: rgba(255, 255, 255, 0.5);
	}

	.navbar-toggler-icon {
		filter: invert(100%);
	}

</style>
