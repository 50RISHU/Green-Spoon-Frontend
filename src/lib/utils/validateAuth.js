// src/lib/utils/validateAuth.js
import { accessToken, user } from '$lib/stores/store';
import api from '$lib/api';

/**
 * Validates the user's authentication token by making a request to the backend.
 * Updates the user and accessToken stores based on the validation result.
 */
export async function validateAuth() {
	// Retrieve the access token from localStorage
	let token = localStorage.getItem('access_token');
	
	// If no token is found, clear the user store and return early
	if (!token) {
		user.set(null);
		return;
	}
	
	try {
		// Send a request to the API to validate the token
		const res = await api.get('/validate_token', {
			headers: { Authorization: `Bearer ${token}` }
		});
		
		if (res.data.valid) {
			// If the token is valid, set the user data and update the access token store
			user.set(res.data.user);
			accessToken.set(token);
		} else {
			// If the token is invalid, clear both stores
			user.set(null);
			accessToken.set('');
		}
	} catch (e) {
		// Log the error and clear the stores if the request fails
		console.error('Auth validate failed:', e);
		user.set(null);
		accessToken.set('');
	}
}
