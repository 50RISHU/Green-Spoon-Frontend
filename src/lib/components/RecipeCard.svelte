<script> export let title = ""; export let desc = ""; export let image = ""; export let author = ""; export let time = ""; export let category = ""; let liked = false; let comment = ""; let comments = []; let showComments = false; function toggleLike() { liked = !liked; } function addComment() { if (comment.trim()) { comments = [...comments, comment.trim()]; comment = ""; } } </script> <div class="col-md-4 mb-4"> <div class="card shadow-sm h-100 d-flex flex-column"> <img src={image} class="card-img-top" alt={title} /> <div class="card-body d-flex flex-column"> <h5 class="card-title">{title}</h5> <p class="card-text">{desc}</p> <div class="mb-2"> <span class="badge bg-success me-2">{category}</span> <span class="text-muted small">⏱ {time}</span> </div> <p class="text-muted small">👩‍🍳 By {author}</p>
php-template
Copy
Edit
  <div class="mt-auto">
    <div class="d-flex gap-2">
      <button class="btn btn-sm btn-outline-danger" on:click={toggleLike}>
        {liked ? "❤️ Liked" : "🤍 Like"}
      </button>
      <button class="btn btn-sm btn-outline-primary" on:click={() => showComments = !showComments}>
        💬 Comment
      </button>
    </div>

    {#if showComments}
      <div class="mt-3">
        <input
          type="text"
          class="form-control form-control-sm mb-2"
          bind:value={comment}
          placeholder="Write your comment and press Enter"
          on:keydown={(e) => e.key === 'Enter' && addComment()}
        />
        <ul class="list-group list-group-flush small">
          {#each comments as c}
            <li class="list-group-item">{c}</li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</div>
</div> </div>