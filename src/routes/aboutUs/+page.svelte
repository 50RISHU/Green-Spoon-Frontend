<script>
  import AboutUsCard from '$lib/components/AboutUsCard.svelte';
  import logo from '$lib/img/green_spoon.webp';

  const missionPoints = [
    "🌿 Promote Healthy Eating: Inspire users to explore vegetarian options.",
    "🧠 Suggest Smart Recipes: Help users cook smarter using AI and preferences.",
    "👥 Foster Community: Encourage users to share, save, and try new recipes."
  ];

  const team = [
    {
      name: "Chirag Prajapati",
      role: "Frontend Developer",
      image: "https://api.dicebear.com/7.x/initials/svg?seed=Chirag+Prajapati",
      desc: "Loves building beautiful, responsive user interfaces and smooth recipe experiences."
    },
    {
      name: "Rishu Sheth",
      role: "Backend Developer",
      image: "https://api.dicebear.com/7.x/initials/svg?seed=Rishu+Sheth",
      desc: "Focuses on logic, storage, and serving data cleanly and securely to the users."
    }
  ];
</script>

<section class="container py-5 animate__animated animate__fadeIn">
  <h1 class="text-center text-success fw-bold display-5 mb-4 animate__animated animate__fadeInDown">
    🥗 About Green Spoon
  </h1>
  <p class="text-center text-muted fs-5 mb-5 animate__animated animate__fadeInUp">
    A modern recipe platform that makes plant-based cooking easier, smarter, and more delightful.
  </p>

  <div class="mb-4">
    <AboutUsCard title="Our Mission">
      <ul class="mt-3">
        {#each missionPoints as point}
          <li class="text-muted mb-2">{point}</li>
        {/each}
      </ul>
    </AboutUsCard>
  </div>

  <div class="mb-4">
    <AboutUsCard
      title="Who We Are"
      subtitle="Empowering Plant-Based Lifestyles"
      content="We’re a passionate duo combining design and tech to serve healthy, intelligent, and user-friendly recipes to everyone. From fresh cooks to pro chefs — Green Spoon supports you."
    />
  </div>

  <div class="mb-4">
    <AboutUsCard title="Meet the Team" content="Small but mighty! Here are the minds behind the magic:">
      <div class="row justify-content-center mt-4 g-4">
        {#each team as member}
          <div class="col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
            <div class="card team-card p-3 shadow-sm animate__animated animate__zoomIn">
              <img
                src={member.image}
                alt={member.name}
                class="rounded-circle mx-auto mb-3"
                style="width: 80px; height: 80px; object-fit: cover;"
              />
              <div class="text-center">
                <h6 class="fw-semibold text-success mb-1">{member.name}</h6>
                <p class="text-muted small mb-1">{member.role}</p>
                <p class="text-muted small">{member.desc}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </AboutUsCard>
  </div>
</section>

<style>
  @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

  section {
    background-color: #d1ffbd;
    min-height: 100vh;
  }

  .team-card {
    border-radius: 1rem;
    background-color: white;
    transition: transform 0.3s ease-in-out;
    height: 100%;
  }

  .team-card:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(40, 167, 69, 0.3);
  }

  :global(body) {
    background-color: #d1ffbd;
  }
</style>
