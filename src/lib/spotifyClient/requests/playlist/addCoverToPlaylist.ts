import { SPOTIFY_BASE_URL, COVER_BASE_64 } from '$lib/spotifyClient/constants';
import { getAuthHeader } from '../auth/getAuthHeader';

export async function addCoverToPlaylist(playlistId: string) {
	const header: Headers = await getAuthHeader();

	const url = `${SPOTIFY_BASE_URL}/playlists/${playlistId}/images`;
	const payload = {
		method: 'PUT',
		headers: header,
		body: COVER_BASE_64
	};

	const response = await fetch(url, payload);

	console.log('response', response);

	if (!response.ok) {
		throw new Error(`Failed to add cover to playlist: ${response.statusText}`);
	}
}
