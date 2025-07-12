<script>
	import { accessToken } from '$lib/stores/store';
	import { goto } from '$app/navigation';
	import api from '$lib/api';
	import { onMount } from 'svelte';
	import { toast } from '@zerodevx/svelte-toast';

	let name = '';
	let username = '';
	let password = '';
	let profile_pic = '';

	let user = null;
	let profile = '';

	let error = '';
	let message = '';

	let Loading = false;

	async function handleUpdate(event) {
		event.preventDefault();

		const formData = new FormData();
		formData.append('name', name);
		formData.append('username', username);
		if (password) {
			formData.append('new_password', password);
		}
		if (profile_pic) {
			if(profile_pic.type.startsWith("image/")) {
				formData.append('profile_pic', profile_pic);
			} else {
				error = 'Invalid profile picture format. Please upload an image file.';
				profile_pic = null;
				return;
			}
		}

		try {
			Loading = true;
			const res = await api.put('/update_profile', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});

			// console.log('Profile updated successfully:', res.data);

			toast.push(res.data.message)
			goto('/profile');
		} catch (error) {
			console.error('Error updating profile:', error);
			error = "Failed to update profile.";
		} finally {
			Loading = false;
		}
	}

	onMount(async () => {
		try {
			const res = await api.get('/profile');
			user = res.data;

			if (user) {
				name = user.user.name;
				username = user.user.username;
			}

			profile = user.user.profile_picture_url
				? user.user.profile_picture_url
				: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`;

			console.log('User profile fetched successfully:', user);
		} catch (err) {
			console.error('Failed to fetch profile:', err);
		}
	});
</script>

<div class="squer page-wrapper d-flex flex-column min-vh-100 mt-5">
	<main class="flex-grow-1">
		<div class="card mx-auto shadow-sm animate__animated animate__zoomIn" style="max-width: 600px;">
			<div class="card-body">
				<h4 class="text-success text-center mb-3">Edit Profile</h4>

				{#if error}
					<div class="alert alert-danger">{error}</div>
				{/if}
				{#if message}
					<div class="alert alert-success">{message}</div>
				{/if}

				<form on:submit={handleUpdate}>
					<div class="text-center mb-3">
						<div class="avatar-square mx-auto d-flex justify-content-center align-items-center">
							<img
								src={profile}
								alt="Avatar"
								class="rounded-circle"
								style="width: 70px; height: 70px;"
							/>
						</div>
					</div>

					<div class="mb-3">
						<label class="form-label">Full Name</label>
						<input
							type="text"
							class="form-control"
							bind:value={name}
							placeholder="Enter full name"
						/>
					</div>

					<div class="mb-3">
						<label class="form-label">User name</label>
						<input
							type="text"
							class="form-control"
							bind:value={username}
							placeholder="Enter user name"
						/>
					</div>

					<div class="mb-3">
						<label class="form-label">Change password</label>
						<input
							type="text"
							class="form-control"
							bind:value={password}
							placeholder="Enter new password"
						/>
					</div>

					<div class="mb-3">
						<label class="form-label">Choose Profile Picture</label>
						<input
							type="file"
							class="form-control"
							accept="image/*"
							on:change={(e) => (profile_pic = e.target.files[0])}
						/>
					</div>

					<button type="submit" class="btn btn-success w-100" disabled={Loading}>
						{Loading ? 'Saving...' : '💾 Save Changes'}
					</button>

					<div class="text-center mt-3">
						<a href="/profile" class="text-decoration-none text-muted">← Back to Profile</a>
					</div>
				</form>
			</div>
		</div>
	</main>
</div>

<style>
	@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
	.avatar-square {
		width: 100px;
		height: 100px;
		border-radius: 1rem;
		background-color: #eaffd9;
		box-shadow: 0 0 8px rgba(0, 128, 0, 0.2);
	}

	:global(body) {
		background-color: #d1ffbd;
	}
</style>
