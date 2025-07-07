import { writable } from 'svelte/store';
import { browser } from '$app/environment';

let initialToken = '';

if (browser && typeof localStorage !== 'undefined') {
  initialToken = localStorage.getItem('access_token') || '';
}

export const accessToken = writable(initialToken);

accessToken.subscribe((token) => {
  if (browser && typeof localStorage !== 'undefined') {
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  }
});

export function clearToken() {
  accessToken.set('');
  if (browser && typeof localStorage !== 'undefined') {
    localStorage.removeItem('access_token');
  }
}