<script>
  import LoginCard from '$lib/components/LoginCard.svelte';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let error = '';

  function handleLogin(event) {
    const { email: enteredEmail, password: enteredPassword } = event.detail;

    if (!enteredEmail || !enteredPassword) {
      error = "⚠️ Please enter both email and password!";
      return;
    }

    if (enteredEmail === "user@example.com" && enteredPassword === "123456") {
      error = "";
      goto('/dashboard');
    } else {
      error = "❌ Invalid email or password.";
    }
  }
</script>

<div class="d-flex flex-column min-vh-100 justify-content-between ">
  <main class="container my-5 w-50 mx-auto">
    <LoginCard bind:email bind:password {error} on:login={handleLogin} />
  </main>

 
</div>
