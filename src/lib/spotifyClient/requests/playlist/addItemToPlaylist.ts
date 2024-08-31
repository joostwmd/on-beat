import { SPOTIFY_BASE_URL } from '$lib/spotifyClient/constants';
import { getAuthHeader } from '../auth/getAuthHeader';

export async function addItemsToPlaylist(playlistId: string, trackUris: string[]) {
	const header: Headers = await getAuthHeader();

	const url = `${SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`;
	const payload = {
		method: 'POST',
		headers: header,
		body: JSON.stringify({ uris: trackUris })
	};

	console.log('url', url);
	console.log('payload', payload);

	const response = await fetch(url, payload);

	console.log('response', response);

	if (!response.ok) {
		throw new Error(`Failed to add items to playlist: ${response.statusText}`);
	}

	const data: any = await response.json();

	console.log('addItemsToPlaylist', data);

	return data;
}
