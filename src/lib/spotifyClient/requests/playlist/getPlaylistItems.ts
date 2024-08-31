import { SPOTIFY_BASE_URL } from '$lib/spotifyClient/constants';
import { getAuthHeader } from '../auth/getAuthHeader';

export async function getPlaylistsItems(playlistId: string) {
	const header: Headers = await getAuthHeader();

	const response = await fetch(`${SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`, {
		headers: header
	});

	const data: any = await response.json();

	return data;
}
