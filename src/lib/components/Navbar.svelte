<script>
  let isLoggedIn = false;
  let showProfileModal = false;

  function toggleProfileModal() {
    showProfileModal = !showProfileModal;
  }

  function handleLogout() {
    isLoggedIn = false;
    alert("Logged out!");
  }
</script>

<nav class="navbar navbar-expand-lg shadow-sm px-4 custom-navbar">
  <a class="navbar-brand fw-bold text-white" href="/">🥗 The Green Spoon</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ms-auto align-items-center">
      <li class="nav-item">
        <a class="nav-link text-white" href="/recipes"> Recipes</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white" href="/my-recipes"> My Recipes</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white" href="/login"> Login</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white" href="/signup"> Signup</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white" role="button" on:click={toggleProfileModal}> Profile</a>
      </li>
    </ul>
  </div>
</nav>

{#if showProfileModal}
  <div class="modal-backdrop" on:click={toggleProfileModal}></div>
  <div class="profile-modal shadow">
    <div class="text-end">
      <button class="btn-close" on:click={toggleProfileModal}></button>
    </div>
    <div class="text-center">
      <img
        src="https://api.dicebear.com/7.x/thumbs/svg?seed=User"
        alt="Profile Picture"
        class="rounded-circle mb-3 border border-2"
        width="100"
      />
      <h5 class="mb-0">John Doe</h5>
      <p class="text-muted small mb-3">johndoe@example.com</p>
      <div class="d-grid gap-2">
        <a href="/edit-profile" class="btn btn-outline-success"> Edit Profile</a>
        <a href="/change-password" class="btn btn-outline-warning"> Change Password</a>
        <a href="/upload-picture" class="btn btn-outline-info"> Change Profile Picture</a>
        <button class="btn btn-outline-danger" on:click={handleLogout}> Logout</button>
      </div>
    </div>
  </div>
{/if}


<style>
  .custom-navbar {
    background-color: #53664B;
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

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1040;
  }

  .profile-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    z-index: 1050;
    padding: 2rem;
    border-radius: 1rem;
    width: 320px;
    max-width: 90vw;
  }

  .btn-close {
    background: none;
    border: none;
    font-size: 1.2rem;
  }
</style>
