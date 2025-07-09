<script>
	import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
	import { HumanMessage, SystemMessage } from '@langchain/core/messages';
	import { marked } from 'marked';
	import Logo from '$lib/img/green_spoon.webp';
	

	let ingredients = '';
	let additional = '';
	let time = '';
	let showModal = false;
	let recipeTitle = '';
	let recipeSteps = '';
	let recipeHtml = '';
	let Loading = false;

	// Initialize the model without an API key here, Canvas will inject it at runtime.
	// Ensure you have the VITE_GEMINI_API_KEY set in your environment for local development.
	const model = new ChatGoogleGenerativeAI({
		apiKey: import.meta.env.VITE_GEMINI_API_KEY, // Removed as per Canvas instructions for runtime injection
		model: 'gemini-2.0-flash',
		temperature: 0
	});

	async function handleSubmit() {
		const messages = [
			new SystemMessage(
				'You are a Professional Chef. User gives you some ingredients, additional description(optional) and a cooking time. You suggest a recipe and method. Format the recipe clearly with a title, ingredients list, and step-by-step instructions using Markdown. Ensure the output is readable and well-structured. If you are not able to find recipe or generate recipe then return "No recipe found." or "I am sorry, I can not help you with that."'
			),
			new HumanMessage(`Ingredients: ${ingredients}\nAdditional Description: ${additional}\nTime: ${time} minutes`)
		];

		try {
			Loading = true;
			const response = await model.invoke(messages);
			recipeSteps = response?.content || 'No response from AI.';
			// Use marked.parse to convert Markdown to HTML
			recipeHtml = marked.parse(recipeSteps);
			recipeTitle = '🍳 AI Suggested Recipe';
			showModal = true;
		} catch (err) {
			console.error('AI Error:', err);
			recipeSteps = 'Failed to fetch recipe. Please try again.';
			recipeHtml = `<p class="text-danger">${recipeSteps}</p>`; // Added text-danger for error message
			recipeTitle = '❌ Error';
			showModal = true;
		} finally {
			Loading = false;
		}
	}

	function closeModal() {
		showModal = false;
	}

	// Use document.execCommand('copy') for better compatibility in iframes
	function copyToClipboard() {
		const el = document.createElement('textarea');
		el.value = recipeSteps;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
		// Using a custom message box instead of alert()
		showCustomAlert('✅ Copied to clipboard!');
	}

	function printRecipe() {
		const printContents = document.getElementById('print-area').innerHTML;
		const printWindow = window.open('', '', 'width=800,height=600');

		printWindow.document.write(`
									<html>
										<head>
											<title>Print Recipe</title>
											<style>
												body { font-family: sans-serif; padding: 20px; }
												h2 { color: #28a745; }
												img.logo { width: 50px; height: auto; margin-bottom: 10px; }
												.container { margin-bottom: 20px; display: flex; }
											</style>
										</head>
										<body>
											<div class="container"><img src="${Logo}" alt="Logo" class="logo" /><h2>Green Spoon</h2></div>
											<hr />
											${printContents}
										</body>
									</html>
								`);

		printWindow.document.close();
		printWindow.focus();

		printWindow.onload = () => {
			printWindow.print();
			printWindow.close();
		};
	}

	// Custom alert message state
	let customAlertMessage = '';
	let showCustomAlertState = false;

	function showCustomAlert(message) {
		customAlertMessage = message;
		showCustomAlertState = true;
		setTimeout(() => {
			showCustomAlertState = false;
			customAlertMessage = '';
		}, 3000); // Hide after 3 seconds
	}
</script>

<section class="container my-5 flex-grow-1">
	<h2 class="text-center text-success mb-4 animate__animated animate__fadeInDown">
		🥗 Suggested Recipes
	</h2>
	<p class="text-muted text-center mb-5 animate__animated animate__fadeIn">
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
					<label class="form-label fw-bold">Additional description (Optional)</label>
					<input
						type="text"
						class="form-control"
						bind:value={additional}
						placeholder="e.g. Make spicy or I need sweet taste"
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
					{#if Loading}
						<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"
						></span>
						Loading...
					{:else}
						🔍 Find Recipes
					{/if}
				</button>
			</form>
		</div>
	</div>
</section>

{#if showModal}
	<!-- Modal Backdrop -->
	<div class="modal-backdrop fade show"></div>

	<!-- Modal -->
	<div
		class="modal fade show d-block"
		tabindex="-1"
		role="dialog"
		aria-labelledby="recipeModalLabel"
	>
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
			<div class="modal-content animate__animated animate__zoomIn">
				<div class="modal-header">
					<h5 class="modal-title" id="recipeModalLabel">{recipeTitle}</h5>
					<button type="button" class="btn-close" aria-label="Close" on:click={closeModal}></button>
				</div>
				<div class="modal-body recipe-modal-body">
					<div class="recipe-content">{@html recipeHtml}</div>
				</div>
				<div class="modal-footer d-flex justify-content-between flex-wrap gap-2">
					<button class="btn btn-secondary" on:click={copyToClipboard}>
						<i class="fas fa-copy me-1"></i> Copy
					</button>
					<button class="btn btn-secondary" on:click={printRecipe}>
						<i class="fas fa-print me-1"></i> Print
					</button>
					<button class="btn btn-danger ms-auto" on:click={closeModal}>
						<i class="fas fa-times-circle me-1"></i> Close
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<div id="print-area" style="display: none;">
	<div style="padding: 2rem; font-family: sans-serif;">
		<div>{@html recipeHtml}</div>
	</div>
</div>

<!-- Custom Alert Message Box -->
{#if showCustomAlertState}
	<div class="custom-alert animate__animated animate__fadeInDown">
		{customAlertMessage}
	</div>
{/if}

<style>
	@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
	@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'; /* For icons */

	:global(body) {
		background-color: #d1ffbd;
	}

	/* Form styling */
	.form-control:focus {
		box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25);
		border-color: #28a745;
	}

	/* Modal specific styles */
	.modal-dialog {
		max-width: 90%; /* Max width for larger screens */
		width: auto; /* Allow content to dictate width up to max-width */
		margin: 1.75rem auto; /* Bootstrap default margin */
	}

	/* On smaller screens, make the modal take more width */
	@media (max-width: 767.98px) {
		.modal-dialog {
			max-width: 95%; /* Even wider on small screens */
			margin: 0.5rem auto; /* Reduce margin for more vertical space */
		}
	}

	.modal-body {
		/* Ensure content within modal body can scroll if it overflows */
		overflow-y: auto;
		max-height: 70vh; /* Limit height to prevent modal from going off-screen */
		padding: 1rem; /* Default padding */
	}

	/* New style for recipe content to ensure word wrap */
	.recipe-content {
		white-space: pre-wrap; /* Preserve whitespace but allow wrapping */
		word-wrap: break-word; /* Break long words */
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
			sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'; /* Standard font */
		font-size: 1rem;
		line-height: 1.6;
		color: #343a40; /* Darker text for readability */
	}

	/* Custom Alert Box Styling */
	.custom-alert {
		position: fixed;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		background-color: #28a745; /* Green background */
		color: white;
		padding: 15px 25px;
		border-radius: 8px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
		z-index: 1060; /* Above modal */
		font-weight: bold;
		text-align: center;
	}
</style>
