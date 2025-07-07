<script>
	import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
	import { HumanMessage, SystemMessage } from '@langchain/core/messages';
	import { marked } from 'marked';

	let ingredients = '';
	let time = '';
	let showModal = false;
	let recipeTitle = '';
	let recipeSteps = '';
	let recipeHtml = '';
	let modalContent;
  let Loading = false;

	const model = new ChatGoogleGenerativeAI({
		apiKey: import.meta.env.VITE_GEMINI_API_KEY,
		model: 'gemini-2.0-flash',
		temperature: 0
	});

	async function handleSubmit() {
		const messages = [
			new SystemMessage(
				'You are a Professional Chef. User gives you some ingredients and a cooking time. You suggest a recipe and method.'
			),
			new HumanMessage(`Ingredients: ${ingredients}\nTime: ${time} minutes`)
		];

		try {
      Loading = true;
			const response = await model.invoke(messages);
			recipeSteps = response?.content || 'No response from AI.';
			recipeHtml = marked.parse(recipeSteps);
			recipeTitle = '🍳 AI Suggested Recipe';
			showModal = true;
		} catch (err) {
			console.error('AI Error:', err);
			recipeSteps = 'Failed to fetch recipe. Please try again.';
			recipeHtml = `<p>${recipeSteps}</p>`;
			recipeTitle = '❌ Error';
			showModal = true;
		} finally {
			Loading = false;
		}
	}

	function closeModal() {
		showModal = false;
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(recipeSteps).then(() => alert('✅ Copied to clipboard'));
	}

	function printRecipe() {
		window.print();
	}
</script>

<section class="container my-5 flex-grow-1">
	<h2 class="text-center text-success mb-4">🥗 Suggested Recipes</h2>
	<p class="text-muted text-center mb-5">
		Enter your available ingredients and desired cooking time. Let Green Spoon suggest something
		tasty!
	</p>
	<div class="row justify-content-center">
		<div class="col-md-8">
			<form
				class="bg-white shadow rounded p-4 animate__animated animate__fadeInUp"
				on:submit|preventDefault={handleSubmit}
			>
				<div class="mb-3">
					<label class="form-label fw-bold">Ingredients</label>
					<input
						type="text"
						class="form-control"
						bind:value={ingredients}
						placeholder="e.g. tomato, spinach, garlic"
						required
					/>
				</div>

				<div class="mb-3">
					<label class="form-label fw-bold">Time (in minutes)</label>
					<input
						type="number"
						min="1"
						class="form-control"
						bind:value={time}
						placeholder="e.g. 15"
						required
					/>
				</div>

				<button class="btn btn-success w-100" type="submit" disabled={Loading}>
					{Loading ? '🔄 Loading...' : '🔍 Find Recipes'}
				</button>
			</form>
		</div>
	</div>
</section>


{#if showModal}
	<div class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.5)">
		<div class="modal-dialog">
			<div class="modal-content animate__animated animate__zoomIn">
				<div class="modal-header">
					<h5 class="modal-title">{recipeTitle}</h5>
					<button type="button" class="btn-close" on:click={closeModal}></button>
				</div>
				<div class="modal-body">
					<pre>{@html recipeHtml}</pre>
				</div>
				<div class="modal-footer">
					<div class="modal-footer d-flex justify-content-between flex-wrap gap-2">
						<button class="btn btn-secondary" on:click={copyToClipboard}> Copy</button>
						<button class="btn btn-secondary" on:click={printRecipe}> Print</button>
						<button class="btn btn-danger ms-auto" on:click={closeModal}>Close</button>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

	:global(body) {
		background-color: #d1ffbd;
	}

	.modal-dialog {
		max-width: 900px;
		width: 90%;
	}
</style>
