<script>
    export let title;
    export let subtitle = "";
    export let content = "";
</script>

<div class="card animate__animated animate__fadeInUp">
    <div class="card-header bg-success text-white fw-bold">{title}</div>
    <div class="card-body">
        {#if subtitle}
            <h5 class="card-title fw-semibold text-success">{subtitle}</h5>
        {/if}
        <p class="card-text text-muted">{content}</p>
        <slot />
    </div>
</div>

<style>
    .card {
        border-radius: 0.75rem;
        box-shadow: 0 2px 8px rgba(0, 128, 0, 0.1);
    }
</style>
