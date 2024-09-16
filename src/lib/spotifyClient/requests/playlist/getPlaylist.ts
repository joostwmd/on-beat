import { SPOTIFY_BASE_URL } from '$lib/spotifyClient/constants';
import { getAuthHeader } from '../auth/getAuthHeader';

export async function getPlaylistById(id: string) {
	const header: Headers = await getAuthHeader();

	try {
		const res = await fetch(`${SPOTIFY_BASE_URL}/playlists/${id}`, {
			headers: header
		});

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const data = await res.json();

		return data;
	} catch (error) {
		console.error('Error fetching playlist:', error);
	}
}
