<script>
	import { onMount } from 'svelte';
	import { accessToken } from '$lib/stores/store';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';
	import api from '$lib/api';
	import logo from '$lib/img/green_spoon.webp';
	import { toast } from '@zerodevx/svelte-toast';

	let isLoggedIn = false;
	let isTokenChecked = false;
	let isAdmin = false;
	let profile = '';

	accessToken.subscribe((token) => {
		if (isTokenChecked) {
			if (!token) {
				isLoggedIn = false;
				profile = '';
			} else {
				validateToken(token);
			}
		}
	});

	async function validateToken(token) {
		try {
			const res = await api.get('/validate_token', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			isLoggedIn = res.data.valid === true;
			isAdmin = res.data.user.is_admin === true;
			if (isLoggedIn) {
				profile = res.data.user.profile
					? res.data.user.profile
					: `https://api.dicebear.com/7.x/initials/svg?seed=${res.data.user.name || res.data.user.email}`;
			}
		} catch (e) {
			console.error('Token validation error:', e);
			// handleInvalidToken();
			if (e.response && (e.response.status === 401 || e.response.status === 403)) {
				handleInvalidToken();
			} else {
				isLoggedIn = true;
			}
		}
	}

	onMount(async () => {
		const token = accessToken;

		if (!token) {
			isLoggedIn = false;
			isTokenChecked = true;
			isAdmin = false;
			return;
		}

		await validateToken(token);
		isTokenChecked = true;
	});

	function handleInvalidToken() {
		accessToken.set('');
		if (typeof localStorage !== 'undefined') {
			localStorage.removeItem('access_token');
		}
		isLoggedIn = false;
		profile = '';
		isTokenChecked = true;
		isAdmin = false;
		if (!$page.url.pathname.startsWith('/reset-password')) {
			goto('/');
		}
	}
</script>

{#if isTokenChecked}
	<nav
		class="navbar navbar-expand-lg shadow-sm px-4 custom-navbar position-fixed top-0 start-0 w-100 z-1"
	>
		<a class="navbar-brand fw-bold text-white" href="/">
			<img src={logo} alt="img" width="35" />
			<span>The Green Spoon</span>
		</a>
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
					{#if isAdmin}
						<li class="nav-item">
							<a class="nav-link text-white" href="/admin_dashboard">Admin</a>
						</li>
					{:else}
						<div class="d-none">{goto('/dashboard')}</div>
					{/if}
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
						<a class="nav-link text-white" href="/aboutUs">About Us</a>
					</li>
					<li class="nav-item">
						<a class="nav-link text-white" href="/contactUs">Contact Us</a>
					</li>
					<li class="nav-item">
						<a class="nav-link text-white" href="/profile">
							<img
								src={profile}
								alt="Profile"
								class="rounded-circle"
								style="width: 30px; height: 30px;"
							/>
						</a>
					</li>
				{:else}
					<li class="nav-item">
						<a class="nav-link text-white" href="/recipes">Recipes</a>
					</li>
					<li class="nav-item">
						<a class="nav-link text-white" href="/aboutUs">About Us</a>
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
{/if}

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
