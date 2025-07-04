<script>
  import ProfileCard from "$lib/components/ProfileCard.svelte";
  let user = {
    name: "Chirag Prajapati",
    username: "chiragp",
    email: "chirag@example.com",
    profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Chirag",
    totalRecipes: 12,
    saved: 5,
  };
</script>

<div class="container py-4"><ProfileCard {user} /></div>
