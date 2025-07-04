<script>
  import { createEventDispatcher } from 'svelte';

  export let email = '';
  export let password = '';
  export let error = '';

  const dispatch = createEventDispatcher();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch('login', { email, password });
  }
</script>


  <h2 class="text-center text-success mb-4">Login</h2>

  {#if error}
    <div class="alert alert-danger">{error}</div>
  {/if}

  <form on:submit={handleSubmit}>
    <div class="mb-3">
      <label class="form-label">Email</label>
      <input bind:value={email} type="email" class="form-control" placeholder="Enter email" />
    </div>

    <div class="mb-3">
      <label class="form-label">Password</label>
      <input bind:value={password} type="password" class="form-control" placeholder="Password" />
    </div>

    <button type="submit" class="btn btn-success w-100">Login</button>

    <div class="text-center mt-3">
      <a href="/forgot" class="text-decoration-none text-muted me-3">Forgot Password?</a>
      <a href="/signup" class="text-decoration-none text-success fw-bold">Don't have an account?</a>
    </div>
  </form>


<style>
  .login-card input:focus {
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
    border-color: #28a745;
  }
</style>
