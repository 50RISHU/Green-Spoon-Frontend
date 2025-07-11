<script>
  import { goto } from "$app/navigation";
</script>

<section class="container py-5 animate__animated animate__fadeIn">
  <div class="text-center mb-5">
    <h2 class="text-success fw-bold animate__animated animate__fadeInDown">
      Green Spoon Admin Dashboard
    </h2>
    <p class="text-muted fs-5 animate__animated animate__fadeInUp">
      Manage users, recipes, reports, and contact info.
    </p>
  </div>

  <div class="row g-4 justify-content-center">
    <!-- Users Card -->
    <div class="col-12 col-md-6 col-lg-3">
      <div
        class="card text-center p-4 shadow animate__animated animate__zoomIn"
        style="border-radius: 1rem; background-color: #e8f5e9;"
      >
        <h1 style="font-size: 2.2rem;">👥</h1>
        <h5 class="fw-bold mt-2">Manage Users</h5>
        <p class="text-muted small">View, edit, or remove registered users.</p>
        <button
          class="btn btn-success w-100 fw-semibold mt-2"
          on:click={() => goto("/admin/manage_users")}
        >
          Go to Users
        </button>
      </div>
    </div>

    <!-- Recipes Card -->
    <div class="col-12 col-md-6 col-lg-3">
      <div
        class="card text-center p-4 shadow animate__animated animate__zoomIn"
        style="border-radius: 1rem; background-color: #fff8e1;"
      >
        <h1 style="font-size: 2.2rem;">🍲</h1>
        <h5 class="fw-bold mt-2">Manage Recipes</h5>
        <p class="text-muted small">Review and update all posted recipes.</p>
        <button
          class="btn btn-warning w-100 fw-semibold mt-2"
          on:click={() => goto("/admin/manage_recipes")}
        >
          Go to Recipes
        </button>
      </div>
    </div>

    <!-- Reports Card -->
    <div class="col-12 col-md-6 col-lg-3">
      <div
        class="card text-center p-4 shadow animate__animated animate__zoomIn"
        style="border-radius: 1rem; background-color: #e3f2fd;"
      >
        <h1 style="font-size: 2.2rem;">📊</h1>
        <h5 class="fw-bold mt-2">Reports</h5>
        <p class="text-muted small">Track usage stats and performance.</p>
        <button
          class="btn btn-primary w-100 fw-semibold mt-2"
          on:click={() => goto("/admin/manage_reports")}
        >
          View Reports
        </button>
      </div>
    </div>

    <!-- Contact Messages Card -->
    <div class="col-12 col-md-6 col-lg-3">
      <div
        class="card text-center p-4 shadow animate__animated animate__zoomIn"
        style="border-radius: 1rem; background-color: #fff3e0;"
      >
        <h1 style="font-size: 2.2rem;">📨</h1>
        <h5 class="fw-bold mt-2">Contact Messages</h5>
        <p class="text-muted small">Read feedback and support messages.</p>
        <button
          class="btn btn-danger w-100 fw-semibold mt-2"
          on:click={() => goto("/admin/manage_contacts")}
        >
          View Messages
        </button>
      </div>
    </div>
  </div>
</section>

<style>
  @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

  .footer {
    border-top: 1px solid #c3e6cb;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
  }

  .card {
    transition: transform 0.3s ease;
  }

  .card:hover {
    transform: scale(1.05);
  }

  button {
    border-radius: 0.5rem;
  }
  :global(body) {
    background-color: #d1ffbd;
  }
</style>
