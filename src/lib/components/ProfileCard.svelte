<script> export let user = { name: "Chirag Prajapati", username: "chiragp", email: "chirag@example.com", profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Chirag", totalRecipes: 12, saved: 5 }; export let onLogout = () => { alert("🔓 Logged out successfully!"); window.location.href = "/login"; }; </script> <div class="card mx-auto shadow-sm profile-card"> <div class="card-body text-center"> <img src={user.profileImage} alt="Profile" class="rounded-circle mb-3" style="width: 100px; height: 100px;" /> <h4 class="mb-0">{user.name}</h4> <p class="text-muted">@{user.username}</p> <p class="text-muted">{user.email}</p>
php-template
Copy
Edit
<div class="row mt-4">
  <div class="col">
    <h6>Total Recipes</h6>
    <p class="fw-bold text-success">{user.totalRecipes}</p>
  </div>
  <div class="col">
    <h6>Saved Recipes</h6>
    <p class="fw-bold text-primary">{user.saved}</p>
  </div>
</div>

<div class="mt-4">
  <a href="/edit-profile" class="btn btn-outline-secondary me-2">✏️ Edit Profile</a>
  <button class="btn btn-outline-danger" on:click={onLogout}>🚪 Logout</button>
</div>

<div class="mt-3">
  <a href="/dashboard" class="btn btn-link text-decoration-none">← Back to Dashboard</a>
</div>
</div> </div> <style> .profile-card { max-width: 600px; } </style>