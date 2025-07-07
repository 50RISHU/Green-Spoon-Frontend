<script>
  let visitorCount = 52840; // example number, replace with real API later
</script>

<!-- Animate.css CDN -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
/>

<!-- Hero Section -->
<section class="hero-section d-flex flex-column justify-content-center align-items-center text-center text-dark px-3 z-0">
  <div class="container py-5">
    <h1 class="display-3 fw-bold text-success mb-3 animate__animated animate__fadeInDown ">
      🦬 Eat Green, Live Clean!
    </h1>
    <p class="lead text-dark mb-4 fs-5 animate__animated animate__fadeIn ">
      Discover delightful vegetarian recipes crafted with care & powered by community and AI. 
    </p>
    <div class="d-flex justify-content-center gap-3 flex-wrap">
      <a href="/signup" class="btn btn-success btn-lg px-5 py-2 shadow-sm animate__animated animate__fadeInLeft ">
        🌿 Get Started
      </a>
      <a href="/recipes" class="btn btn-outline-success btn-lg px-5 py-2 shadow-sm animate__animated animate__fadeInRight ">
        📖 Explore Recipes
      </a>
    </div>
  </div>
</section>

<!-- Features Section -->
<section class="container py-5 animate__animated animate__fadeInUp animate__slower">
  <h2 class="text-center text-success mb-4 fw-bold">🌟 Features</h2>
  <div class="row text-center">
    <div class="col-md-4 mb-4">
      <div class="p-4 shadow rounded bg-white h-100">
        <h5>🧠 AI Recipe Suggestions</h5>
        <p class="text-muted">Get personalized recipes based on your preferences and ingredients at home.</p>
      </div>
    </div>
    <div class="col-md-4 mb-4">
      <div class="p-4 shadow rounded bg-white h-100">
        <h5>📸 Add Your Recipes</h5>
        <p class="text-muted">Upload and share your favorite dishes with the community.</p>
      </div>
    </div>
    <div class="col-md-4 mb-4">
      <div class="p-4 shadow rounded bg-white h-100">
        <h5>💾 Save & Organize</h5>
        <p class="text-muted">Bookmark your favorite recipes and access them anytime, anywhere.</p>
      </div>
    </div>
  </div>
</section>

<!-- Benefits Section -->
<section class="container py-5 animate__animated animate__fadeInUp animate__delay-1s">
  <h2 class="text-center text-success mb-4 fw-bold">🏱 Why Choose Green Spoon?</h2>
  <div class="row g-4">
    <div class="col-md-6">
      <div class="bg-white p-4 shadow rounded d-flex gap-3 align-items-start">
        <div class="fs-3">🌱</div>
        <div>
          <h5 class="text-success mb-1">100% Plant-Based</h5>
          <p class="text-muted mb-0">All recipes are vegetarian and promote clean, sustainable eating.</p>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="bg-white p-4 shadow rounded d-flex gap-3 align-items-start">
        <div class="fs-3">⏰</div>
        <div>
          <h5 class="text-success mb-1">Time-Saving Ideas</h5>
          <p class="text-muted mb-0">Quick meals designed for busy schedules without sacrificing nutrition.</p>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="bg-white p-4 shadow rounded d-flex gap-3 align-items-start">
        <div class="fs-3">💪</div>
        <div>
          <h5 class="text-success mb-1">Boost Your Wellness</h5>
          <p class="text-muted mb-0">Enhance your energy, digestion, and overall health through better food choices.</p>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="bg-white p-4 shadow rounded d-flex gap-3 align-items-start">
        <div class="fs-3">🎨</div>
        <div>
          <h5 class="text-success mb-1">Creative Dishes</h5>
          <p class="text-muted mb-0">Discover innovative recipes from chefs and foodies around the world.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Usage Section -->
<section class="container py-5 animate__animated animate__fadeInUp animate__delay-2s">
  <h2 class="text-center text-success mb-4 fw-bold">📖 How It Works</h2>
  <div class="row text-center">
    <div class="col-md-3 mb-4">
      <div class="p-3 border rounded h-100 bg-white shadow-sm">
        <h6 class="text-success">1. Sign Up</h6>
        <p class="small">Create your free account in seconds.</p>
      </div>
    </div>
    <div class="col-md-3 mb-4">
      <div class="p-3 border rounded h-100 bg-white shadow-sm">
        <h6 class="text-success">2. Browse Recipes</h6>
        <p class="small">Explore curated and AI-generated recipes.</p>
      </div>
    </div>
    <div class="col-md-3 mb-4">
      <div class="p-3 border rounded h-100 bg-white shadow-sm">
        <h6 class="text-success">3. Save or Share</h6>
        <p class="small">Bookmark or share what you love.</p>
      </div>
    </div>
    <div class="col-md-3 mb-4">
      <div class="p-3 border rounded h-100 bg-white shadow-sm">
        <h6 class="text-success">4. Cook & Enjoy</h6>
        <p class="small">Start cooking healthy and tasty meals!</p>
      </div>
    </div>
  </div>
</section>

<!-- Visitors Section -->
<section class="container text-center py-5 animate__animated animate__fadeIn animate__delay-3s">
  <h2 class="text-success fw-bold mb-2">📊 Trusted by Food Lovers</h2>
  <p class="fs-4 text-muted mb-0">Over <strong>{visitorCount.toLocaleString()}</strong> visitors have joined the movement toward a healthier lifestyle!</p>
</section>

<style>
  :global(body),
  :global(html) {
    background-color: #d1ffbd;
    margin: 0;
    padding: 0;
    font-family: "Segoe UI", sans-serif;
  }

  .page-bg {
    background-color: #d1ffbd;
  }

  .card:hover,
  .p-4:hover,
  .p-3:hover {
    transform: scale(1.02);
    transition: 0.3s ease-in-out;
  }
  .hero-section {
    background-color: #D1FFBD;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }

  .hero-section::before,
  .hero-section::after {
    content: "";
    position: absolute;
    width: 200px;
    height: 200px;
    background: rgba(83, 102, 75, 0.2);
    border-radius: 50%;
    z-index: 0;
  }

  .hero-section::before {
    top: -60px;
    left: -60px;
  }

  .hero-section::after {
    bottom: -60px;
    right: -60px;
  }

  .hero-section > .container {
    z-index: 2;
    position: relative;
  }
</style>