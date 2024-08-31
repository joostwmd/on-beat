import { SPOTIFY_BASE_URL } from '$lib/spotifyClient/constants';
import { getAuthHeader } from '../auth/getAuthHeader';

export async function getUserPlaylists() {
	const header: Headers = await getAuthHeader();

	try {
		const res = await fetch(`${SPOTIFY_BASE_URL}/me/playlists`, {
			headers: header
		});

		const data = await res.json();
		console.log('getUserPlaylists', data);
		return data;
	} catch (error) {
		console.error(error);
	}
}
