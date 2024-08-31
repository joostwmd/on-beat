import { SPOTIFY_BASE_URL } from '$lib/spotifyClient/constants';
import { getAuthHeader } from '../auth/getAuthHeader';

export async function getAvailableGenreSeeds(): Promise<any> {
	const header: Headers = await getAuthHeader();

	const url = new URL(`${SPOTIFY_BASE_URL}/recommendations/available-genre-seeds`);

	try {
		const res = await fetch(url, {
			headers: header
		});

		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}
