import { SPOTIFY_BASE_URL } from '$lib/spotifyClient/constants';
import { getAuthHeader } from '../auth/getAuthHeader';

export async function getSearchResults(market: string, query: string, type: string): Promise<any> {
	const header: Headers = await getAuthHeader();

	const url = new URL(`${SPOTIFY_BASE_URL}/search`);
	url.searchParams.append('q', query);
	url.searchParams.append('type', type);
	url.searchParams.append('locale', market);

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
