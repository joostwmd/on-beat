import { SPOTIFY_BASE_URL } from '$lib/spotifyClient/constants';
import { getAuthHeader } from '../auth/getAuthHeader';

export async function createPlaylist(name: string, description: string, isPublic: boolean) {
	const header: Headers = await getAuthHeader();
	const userId = localStorage.getItem('user_id');

	const response = await fetch(`${SPOTIFY_BASE_URL}/users/${userId}/playlists`, {
		method: 'POST',
		headers: header,
		body: JSON.stringify({
			name: name,
			description: description,
			public: isPublic
		})
	});

	const data: any = await response.json();
	console.log('createPlaylist', data);
	return data;
}
