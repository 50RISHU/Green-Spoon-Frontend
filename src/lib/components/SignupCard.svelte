<script>
  import { goto } from '$app/navigation';
  export let name = "";
  export let username = "";
  export let email = "";
  export let password = "";

  let error = "";
  let success = "";

  function handleSubmit(event) {
    event.preventDefault();

    if (!name || !username || !email || !password) {
      error = "⚠️ Please fill all the fields!";
      success = "";
    } else {
      success = `✅ Welcome, ${username}! Registered successfully.`;
      error = "";

      setTimeout(() => {
        goto('/login');
      }, 1500);
    }
  }
</script>

<div class="container my-5">
  <h2 class="text-center text-success mb-4">Sign Up</h2>

  <form class="w-50 mx-auto" on:submit={handleSubmit}>
    {#if error}
      <div class="alert alert-danger">{error}</div>
    {/if}
    {#if success}
      <div class="alert alert-success">{success}</div>
    {/if}

    <div class="mb-3">
      <label class="form-label">Full Name</label>
      <input bind:value={name} type="text" class="form-control" placeholder="Full Name" />
    </div>

    <div class="mb-3">
      <label class="form-label">Username</label>
      <input bind:value={username} type="text" class="form-control" placeholder="Choose a Username" />
    </div>

    <div class="mb-3">
      <label class="form-label">Email</label>
      <input bind:value={email} type="email" class="form-control" placeholder="Email address" />
    </div>

    <div class="mb-3">
      <label class="form-label">Password</label>
      <input bind:value={password} type="password" class="form-control" placeholder="Password" />
    </div>

    <button type="submit" class="btn btn-success w-100">Create Account</button>

    <div class="text-center mt-3">
      <span class="text-muted">Already have an account? </span>
      <a href="/login" class="text-decoration-none text-success fw-bold">Login</a>
    </div>
  </form>
</div>

<style>
  :global(body) {
    background-color: #d1ffbd;
  }

  form input:focus {
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
    border-color: #28a745;
  }
</style>
