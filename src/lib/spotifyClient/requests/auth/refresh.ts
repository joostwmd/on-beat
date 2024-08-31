import { SPOTIFY_CLIENT_ID } from '$lib/spotifyClient/constants';
export async function refreshTokens() {
	const refreshToken = localStorage.getItem('refresh_token');
	const url = 'https://accounts.spotify.com/api/token';

	const payload = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: refreshToken!,
			client_id: SPOTIFY_CLIENT_ID
		})
	};

	const body = await fetch(url, payload);
	const response = await body.json();

	localStorage.setItem('access_token', response.accessToken);
	localStorage.setItem('refresh_token', response.refreshToken);
}
