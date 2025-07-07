<script>
  import { accessToken } from "$lib/stores/store";
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import { onMount } from "svelte";

  let user = null;
  let profile = '';

	onMount(async () => {
		try {
			const res = await api.get('/profile');
			user = res.data;
      if(user.user.profile_picture_url){
        profile = user.user.profile_picture_url;
        console.log(profile)
      } else {
        profile = user.user.name;
        profile = `https://api.dicebear.com/7.x/initials/svg?seed=${profile}`;
      }
      console.log('User profile fetched successfully:', user);
		} catch (err) {
			console.error('Failed to fetch profile:', err);
		}
	});

  function handleLogout() {
    accessToken.set(null);
    goto("/login");
  }

</script>


{#if user}
	<div
  class="card mx-auto shadow-sm profile-card animate__animated animate__zoomIn mt-5"
>
  <div class="card-body text-center">
    <img
      src={profile}
      alt="Profile"
      class="rounded-circle mb-3"
      style="width: 100px; height: 100px;"
    />
    <h4 class="mb-0">{user.user.name}</h4>
    <p class="text-muted">@{user.user.username}</p>
    <p class="text-muted">{user.user.email}</p>
    
    <div class="row mt-4">
      <div class="col">
        <h6>Total Recipes</h6>
        <p class="fw-bold text-success">{user.total_recipes}</p>
      </div>
      <div class="col">
        <h6>Saved Recipes</h6>
        <p class="fw-bold text-primary">{user.total_saved}</p>
      </div>
    </div>

    <div class="mt-4">
      <a href="/edit-profile" class="btn btn-outline-secondary me-2"
        >✏️ Edit Profile</a
      >
      <button class="btn btn-outline-danger" on:click={handleLogout}
        >🚪 Logout</button
      >
    </div>

    <div class="mt-3">
      <a href="/dashboard" class="btn btn-link text-decoration-none"
        >← Back to Dashboard</a
      >
    </div>
  </div>
</div>

{:else}
	<div class="text-center d-flex justify-content-center align-items-center mt-5">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
{/if}



<style>
  @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

  .profile-card {
    max-width: 600px;
    border-radius: 1rem;
    overflow: hidden;
  }

  .bottom-footer {
    position: buttom;          /* fixed to the bottom */               /* stick to the bottom */
    width: 100%;
    background-color: #eaffd9;
    border-top: 1px solid #c3e6cb;
    padding: 0.75rem 1rem;
    z-index: 999;
    text-align: center;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
  }

  :global(body) {
    background-color: #d1ffbd;
    padding-bottom: 80px; /* prevent card content from being hidden under footer */
  }
</style>
