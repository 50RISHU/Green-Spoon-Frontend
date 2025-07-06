<script>
  import { goto } from "$app/navigation";
  export let initialName = "Chirag Prajapati";
  export let initialEmail = "chirag@example.com";
  let name = initialName;
  let email = initialEmail;
  let avatarSeed = name.split(" ")[0] || "user";
  let message = "";
  let error = "";
  function handleUpdate(event) {
    event.preventDefault();
    if (!name || !email) {
      error = "⚠️ Name and Email are required!";
      message = "";
      return;
    }
    avatarSeed = name.trim().split(" ")[0] || "user";
    message = "✅ Profile updated successfully!";
    error = "";
    setTimeout(() => {
      goto("/profile");
    }, 1500);
  }
</script>
<div class="squer page-wrapper d-flex flex-column min-vh-100">
  <main class="flex-grow-1">
    <div
      class="card mx-auto shadow-sm animate__animated animate__zoomIn"
      style="max-width: 600px;"
    >
      <div class="card-body">
        <h4 class="text-success text-center mb-3">Edit Profile</h4>
        
        {#if error}
          <div class="alert alert-danger">{error}</div>
        {/if}
        {#if message}
          <div class="alert alert-success">{message}</div>
        {/if}

        <form on:submit={handleUpdate}>
          <div class="text-center mb-3">
            <div
              class="avatar-square mx-auto d-flex justify-content-center align-items-center"
            >
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${avatarSeed}`}
                alt="Avatar"
                class="rounded-circle"
                style="width: 70px; height: 70px;"
              />
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Full Name</label>
            <input
              type="text"
              class="form-control"
              bind:value={name}
              placeholder="Enter full name"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              bind:value={email}
              placeholder="Enter email"
            />
          </div>

          <button type="submit" class="btn btn-success w-100"
            >💾 Save Changes</button
          >

          <div class="text-center mt-3">
            <a href="/profile" class="text-decoration-none text-muted"
              >← Back to Profile</a
            >
          </div>
        </form>
      </div>
    </div>
  </main>
 
</div>

<style>
  @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
  .avatar-square {
    width: 100px;
    height: 100px;
    border-radius: 1rem;
    background-color: #eaffd9;
    box-shadow: 0 0 8px rgba(0, 128, 0, 0.2);
  }
  .footer {
    border-top: 1px solid #c3e6cb;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
  }

  :global(body) {
    background-color: #d1ffbd;
  }
</style>
