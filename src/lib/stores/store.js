import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Initialize the token variable
let initialToken = '';

// Check if we are in the browser environment and localStorage is available
if (browser && typeof localStorage !== 'undefined') {
  // Retrieve the token from localStorage if it exists
  initialToken = localStorage.getItem('access_token') || '';
}

// Create a writable Svelte store for the access token
export const accessToken = writable(initialToken);

// Subscribe to changes in the accessToken store to sync with localStorage
accessToken.subscribe((token) => {
  if (browser && typeof localStorage !== 'undefined') {
    if (token) {
      // Save the token to localStorage if it is valid
      localStorage.setItem('access_token', token);
    } else {
      // Remove the token from localStorage if it is cleared
      localStorage.removeItem('access_token');
    }
  }
});

/**
 * Clears the access token from both the Svelte store and localStorage.
 */
export function clearToken() {
  accessToken.set('');
  if (browser && typeof localStorage !== 'undefined') {
    localStorage.removeItem('access_token');
  }
}