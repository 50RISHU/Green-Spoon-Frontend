<script> import { goto } from '$app/navigation'; export let initialName = "Chirag Prajapati"; export let initialEmail = "chirag@example.com"; let name = initialName; let email = initialEmail; let avatarSeed = name.split(" ")[0] || "user"; let message = ""; let error = ""; function handleUpdate(event) { event.preventDefault(); if (!name || !email) { error = "⚠️ Name and Email are required!"; message = ""; return; } avatarSeed = name.trim().split(" ")[0] || "user"; message = "✅ Profile updated successfully!"; error = ""; setTimeout(() => { goto("/profile"); }, 1500); } </script> <div class="card mx-auto shadow-sm" style="max-width: 600px;"> <div class="card-body"> <h4 class="text-success text-center mb-3">Edit Profile</h4>
php-template
Copy
Edit
{#if error}
  <div class="alert alert-danger">{error}</div>
{/if}
{#if message}
  <div class="alert alert-success">{message}</div>
{/if}

<form on:submit={handleUpdate}>
  <div class="text-center mb-3">
    <img
      src={`https://api.dicebear.com/7.x/initials/svg?seed=${avatarSeed}`}
      alt="Avatar"
      class="rounded-circle"
      style="width: 80px; height: 80px;"
    />
  </div>

  <div class="mb-3">
    <label class="form-label">Full Name</label>
    <input type="text" class="form-control" bind:value={name} placeholder="Enter full name" />
  </div>

  <div class="mb-3">
    <label class="form-label">Email</label>
    <input type="email" class="form-control" bind:value={email} placeholder="Enter email" />
  </div>

  <button type="submit" class="btn btn-success w-100">💾 Save Changes</button>

  <div class="text-center mt-3">
    <a href="/profile" class="text-decoration-none text-muted">← Back to Profile</a>
  </div>
</form>
</div> </div>