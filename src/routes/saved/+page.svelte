<script>
  import SavedRecipes from '$lib/components/SavedRecipes.svelte';

  let mySaved = [
    {
      title: "Green Smoothie",
      description: "Healthy morning drink with kale and banana.",
      image: "https://source.unsplash.com/400x300/?green,smoothie",
      category: "Breakfast"
    },
    {
      title: "Grilled Veggie Sandwich",
      description: "Delicious sandwich with grilled vegetables and hummus.",
      image: "https://source.unsplash.com/400x300/?veggie,sandwich",
      category: "Lunch"
    }
  ];
</script>

<SavedRecipes savedRecipes={mySaved} />
