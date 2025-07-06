<script>
  import DashboardCard from '$lib/components/DashboardCard.svelte';
</script>

<section class="dashboard-bg min-vh-100 py-5">
  <div class="container">
    <h1 class="text-success text-center display-4 fw-bold mb-3 animate__animated animate__fadeInDown">
      🥗 The Green Spoon Dashboard
    </h1>
    <p class="text-center text-secondary fs-5 mb-5 animate__animated animate__fadeInUp">
      Manage your recipes, explore suggestions and organize your cooking!
    </p>

    <div class="row g-4">
      <div class="col-md-4 animate__animated animate__fadeInUp">
        <DashboardCard
          icon="👨‍🍳"
          title="Add Your Recipe"
          description="Share your favorite vegetarian recipes with the Green Spoon community."
          actions={[
            { text: "Create Recipe", href: "/add-recipe", variant: "success" }
          ]}
        />
      </div>

      <div class="col-md-4 animate__animated animate__fadeInUp">
        <DashboardCard
          icon="💾"
          title="Saved Recipes"
          description="Access your bookmarked recipes anytime and cook with confidence."
          actions={[
            { text: "View Saved", href: "/saved", variant: "primary" }
          ]}
        />
      </div>

      <div class="col-md-4 animate__animated animate__fadeInUp">
        <DashboardCard
          icon="🤖"
          title=" Suggested Recipes"
          description="Let our AI inspire you with healthy and personalized vegetarian ideas."
          actions={[
            { text: "Explore Suggestions", href: "/suggestedrecipe", variant: "warning" }
          ]}
        />
      </div>
    </div>
  </div>
</section>

<style>
  @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
</style>
