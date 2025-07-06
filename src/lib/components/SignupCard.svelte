<script>
  import { goto } from '$app/navigation';
  import api from '$lib/api';

  let name = "";
  let username = "";
  let email = "";
  let password = "";

  let error = "";
  let success = "";
  let loading = false

  async function handleSubmit(event) {
    event.preventDefault();

    if (!name || !username || !email || !password) {
      error = "⚠️ Please fill all the fields!";
      success = "";
    } else if(password.length < 6){
      error = "⚠️ Password must be at least 6 characters long!";
      success = "";
    } else {
      try {
        loading = true;
        const response = await api.post('/signup', {
          "name": name, "username": username, "email": email, "password": password
        });

        console.log(response.data);
        success = "✅ Registration successful!";
        error = "";

        goto('/login');
      } catch (err) {
        error = err.response?.data?.error || "❌ Registration failed. Please try again.";
        success = "";
        console.error(err);
      } finally {
        loading = false;
      }
    }
  }
</script>


<div class="container my-5">
  <h2 class="text-center text-success mb-4 animate__animated animate__fadeInDown">
    Sign Up
  </h2>

  <form class="w-50 mx-auto animate__animated animate__fadeInUp" on:submit={handleSubmit}>
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

    <button type="submit" class="btn btn-success w-100" disabled={loading}>
      {#if loading}
        Loading...
      {:else}
        Sign Up
      {/if}
    </button>

    <div class="text-center mt-3">
      <span class="text-muted">Already have an account? </span>
      <a href="/login" class="text-decoration-none text-success fw-bold">Login</a>
    </div>
  </form>
</div>

<style>
  @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

  .login-card {
    background-color: transparent !important; /* Remove white background */
    border: none; /* Optional: remove border if undesired */
  }

  .login-card input:focus {
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
    border-color: #28a745;
  }

  :global(body) {
    background-color: #d1ffbd;
  }
</style>
