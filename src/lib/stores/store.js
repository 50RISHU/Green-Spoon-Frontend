import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const accessToken = writable(
  browser ? localStorage.getItem('access_token') : ''
);

if (browser) {
  accessToken.subscribe((value) => {
    if (value) {
      localStorage.setItem('access_token', value);
    } else {
      localStorage.removeItem('access_token');
    }
  });
}
