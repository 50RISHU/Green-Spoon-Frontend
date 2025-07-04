<script>
  import RecipeCard from '$lib/components/RecipeCard.svelte';

  let samplePosts = [
    {
      title: "Healthy Avocado Salad",
      desc: "A nutritious avocado-based salad with cherry tomatoes and lemon zest.",
      image: "https://cdn.loveandlemons.com/wp-content/uploads/2024/07/avocado-salad.jpg",
      author: "Priya Verma",
      time: "10 mins",
      category: "Salad"
    },
    {
      title: "Vegan Chickpea Bowl",
      desc: "Power-packed chickpeas with quinoa, greens, and tahini drizzle.",
      image:
        "https://bowlsarethenewplates.com/wp-content/uploads/2022/07/roasted-chickpea-salad-6.jpg",
      author: "Rahul Shah",
      time: "20 mins",
      category: "Lunch",
    },
    {
      title: "Green Smoothie Delight",
      desc: "Spinach, banana, and almond milk blended into a creamy delight.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDebEPnN6MRTF7Qo17Tv_3pPy3Di6bHTsrIQ&s",
      author: "Anita Joshi",
      time: "5 mins",
      category: "Beverage",
    },
    {
      title: "Zesty Lemon Pasta",
      desc: "Lemon zest, herbs, and olive oil tossed with spaghetti.",
      image:
        "https://samwood-wp-assets.s3.ap-southeast-2.amazonaws.com/wp-content/uploads/20200324121234/Zesty-Lemon-Ricotta-Pasta-500x500.jpg",
      author: "Amit Patel",
      time: "15 mins",
      category: "Dinner",
    },
    {
      title: "Stuffed Bell Peppers",
      desc: "Colorful bell peppers filled with spiced rice and veggies.",
      image:
        "https://cdn.loveandlemons.com/wp-content/uploads/2020/08/stuffed-peppers.jpg",
      author: "Kavita Rao",
      time: "25 mins",
      category: "Snack",
    },
    {
      title: "Cucumber Mint Cooler",
      desc: "A refreshing cucumber and mint drink to beat the heat.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_a2y2MtQP_JlJ6yNeSazopaXQSyc7wF7AGA&s",
      author: "Neha Desai",
      time: "5 mins",
      category: "Drink",
    },
  ];
</script>
<div class="page-bg min-vh-100 d-flex flex-column">
  <section class="container py-5">
    <h1 class="text-success text-center fw-bold mb-3">🥗 Welcome to Green Spoon</h1>
    <p class="text-center text-muted fs-5 mb-5">
      Discover healthy, delicious, and easy-to-cook vegetarian recipes curated by food lovers!
    </p>
    <div class="row">
      {#each samplePosts as post}
        <RecipeCard {...post} />
      {/each}
    </div>
  </section>
</div>

<style>
  :global(body),
  :global(html) {
    background-color: #d1ffbd;
    margin: 0;
    padding: 0;
  }
  .page-bg {
    background-color: #d1ffbd;
  }
  .card:hover {
    transform: scale(1.02);
    transition: 0.3s ease-in-out;
  }
</style>
