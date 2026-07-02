<script>
  // Import necessary Svelte lifecycle hooks and stores
  import { onMount } from 'svelte';
  import { accessToken, clearToken } from '$lib/stores/store';
  import { goto } from '$app/navigation';
  import { get } from 'svelte/store';
  import { page } from '$app/stores';
  import api from '$lib/api';
  
  // Import static assets
  import logo from '$lib/img/green_spoon.webp';

  // Component state variables
  let isLoggedIn = false;
  let isTokenChecked = false; // Prevents UI flicker while checking auth
  let isAdmin = false;
  let profile = '';

  /**
   * Validates the token with the backend server.
   * If valid, updates user state (admin, profile).
   * If invalid, calls handleInvalidToken to log the user out.
   */
  async function validateToken(token) {
    try {
      // Send a request to validate the current access token
      const res = await api.get('/validate_token', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.valid) {
        // Token is valid; set user session data
        const user = res.data.user;
        isLoggedIn = true;
        isAdmin = user.is_admin;
        // Use user's profile image or generate a fallback avatar
        profile =
          user.profile ||
          `https://api.dicebear.com/7.x/initials/svg?seed=${user.name || user.email}`;
      } else {
        // Token is invalid
        handleInvalidToken();
      }
    } catch (e) {
      console.error('Token validation error:', e);
      handleInvalidToken();
    } finally {
      // Mark token check as complete to render the navbar
      isTokenChecked = true;
    }
  }

  /**
   * Clears the invalid/expired token and redirects to the home page
   * if the user is not already there.
   */
  function handleInvalidToken() {
    clearToken();
    isLoggedIn = false;
    isAdmin = false;
    profile = '';
    isTokenChecked = true;

    // Redirect to home only if not already on the landing page
    const currentPath = $page.url.pathname;
    if (currentPath !== '/') {
      goto('/');
    }
  }

  // Lifecycle hook: check the token when the component mounts
  onMount(async () => {
    const token = get(accessToken);

    if (!token) {
      handleInvalidToken(); // No token found, redirect immediately
      return;
    }

    // Validate existing token
    await validateToken(token);
  });

  // Reactive subscription to accessToken changes (e.g., when logging in/out from another tab or component)
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
