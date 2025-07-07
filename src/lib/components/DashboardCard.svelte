<script>
  export let icon = "📦";
  export let title = "Card Title";
  export let description = "Card description goes here.";
  export let actions = []; 
</script>

<div class="glass p-4 h-100 shadow animate__animated animate__fadeInUp">
  <div class="text-center fs-1 mb-3">{icon}</div>
  <h4 class="text-center fw-bold">{title}</h4>
  <p class="text-muted text-center">{description}</p>
  <div class="d-grid gap-2">
    {#each actions as btn}
      <a
        href={btn.href}
        class={`btn btn-${btn.variant || "secondary"} ${btn.outline ? "btn-outline-" + btn.variant : ""}`}
      >
        {btn.text}
      </a>
    {/each}
  </div>
</div>

<style>
  :global(body),
  :global(html) {
    background-color: #d1ffbd;
    margin: 0;
    padding: 0;
    font-family: "Segoe UI", sans-serif;
  }
  .glass {
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(16px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.25);
  }
</style>
