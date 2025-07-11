// src/lib/utils/validateAuth.js
import { accessToken, user } from '$lib/stores/store';
import api from '$lib/api';

export async function validateAuth() {
	let token = localStorage.getItem('access_token');
	if (!token) {
		user.set(null);
		return;
	}
	try {
		const res = await api.get('/validate_token', {
			headers: { Authorization: `Bearer ${token}` }
		});
		if (res.data.valid) {
			user.set(res.data.user);
			accessToken.set(token);
		} else {
			user.set(null);
			accessToken.set('');
		}
	} catch (e) {
		console.error('Auth validate failed:', e);
		user.set(null);
		accessToken.set('');
	}
}
