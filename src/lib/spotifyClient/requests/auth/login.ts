import { SPOTIFY_SCOPES, SPOTIFY_REDIRECT_URI } from '../../constants';
import { PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';

export async function login() {
	const scope = SPOTIFY_SCOPES.join(' ');
	const authUrl = generateUrlWithSearchParams('https://accounts.spotify.com/authorize', {
		response_type: 'code',
		client_id: PUBLIC_SPOTIFY_CLIENT_ID,
		scope: scope,
		code_challenge_method: 'S256',
		redirect_uri: SPOTIFY_REDIRECT_URI,
		show_dialog: true
	});
	window.location.href = authUrl;
}

function generateUrlWithSearchParams(url: string, params: any): string {
	const urlObject = new URL(url);
	urlObject.search = new URLSearchParams(params).toString();
	return urlObject.toString();
}
