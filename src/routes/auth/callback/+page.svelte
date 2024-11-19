<script lang="ts">
	import { goto } from '$app/navigation';
	import { SPOTIFY_REDIRECT_URI } from '$lib/spotifyClient/constants';
	import { getUserData } from '$lib/spotifyClient/methods/getUserMarket';
	import { onMount } from 'svelte';
	import { PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';

	async function exchangeTokenForSession(code: string, codeVerifier: string): Promise<any> {
		const body = new URLSearchParams({
			client_id: PUBLIC_SPOTIFY_CLIENT_ID,
			grant_type: 'authorization_code',
			code,
			redirect_uri: SPOTIFY_REDIRECT_URI,
			code_verifier: codeVerifier
		}).toString();

		const response = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			body
		});

		if (!response.ok) {
			console.log('error', await response.json());
			throw new Error('Failed to exchange token');
		}

		const data = await response.json();
		console.log('session data', data);

		return {
			access_token: data.access_token,
			refresh_token: data.refresh_token,
			expires_in: data.expires_in
		};
	}

	onMount(async () => {
		const code = new URLSearchParams(window.location.search).get('code');
		const codeVerifier = localStorage.getItem('code_verifier');

		if (code && codeVerifier) {
			const session = await exchangeTokenForSession(code, codeVerifier);
			localStorage.setItem('access_token', session.access_token);
			localStorage.setItem('refresh_token', session.refresh_token);
			const expiresAt = new Date();
			expiresAt.setSeconds(expiresAt.getSeconds() + session.expires_in - 60);
			localStorage.setItem('expires_at', expiresAt.toISOString());

			const userData = await getUserData();
			console.log('user data', userData);
			localStorage.setItem('user_market', userData.market);
			localStorage.setItem('user_id', userData.userId);

			if (session) {
				goto('/generateplaylist');
			} else {
				goto('/');
			}
		} else {
			goto('/');
		}
	});
</script>
