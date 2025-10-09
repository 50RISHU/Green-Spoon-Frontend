<script>
  import { onMount } from 'svelte';
  import { accessToken, clearToken } from '$lib/stores/store';
  import { goto } from '$app/navigation';
  import { get } from 'svelte/store';
  import { page } from '$app/stores';
  import api from '$lib/api';
  import logo from '$lib/img/green_spoon.webp';

  let isLoggedIn = false;
  let isTokenChecked = false;
  let isAdmin = false;
  let profile = '';

  // ✅ Validate token via backend
  async function validateToken(token) {
    try {
      const res = await api.get('/validate_token', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.valid) {
        const user = res.data.user;
        isLoggedIn = true;
        isAdmin = user.is_admin;
        profile =
          user.profile ||
          `https://api.dicebear.com/7.x/initials/svg?seed=${user.name || user.email}`;
      } else {
        handleInvalidToken();
      }
    } catch (e) {
      console.error('Token validation error:', e);
      handleInvalidToken();
    } finally {
      isTokenChecked = true;
    }
  }

  // ❌ Clear token and redirect to landing page
  function handleInvalidToken() {
    clearToken();
    isLoggedIn = false;
    isAdmin = false;
    profile = '';
    isTokenChecked = true;

    // Redirect only if not already on the landing page
    const currentPath = $page.url.pathname;
    if (currentPath !== '/') {
      goto('/');
    }
  }

  // 🔁 Check token on page mount
  onMount(async () => {
    const token = get(accessToken);

    if (!token) {
      handleInvalidToken(); // Redirect immediately
      return;
    }

    await validateToken(token);
  });

  // 🔄 React to token changes (e.g., after logout)
  accessToken.subscribe(async (token) => {
    if (isTokenChecked) {
      if (token) {
        await validateToken(token);
      } else {
        handleInvalidToken();
      }
    }
  });
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
