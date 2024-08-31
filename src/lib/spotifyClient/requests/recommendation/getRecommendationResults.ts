import { SPOTIFY_BASE_URL } from '$lib/spotifyClient/constants';
import { getAuthHeader } from '../auth/getAuthHeader';
import store from '$lib/spotifyClient/store';
import { get } from 'svelte/store';

export async function getRecommendationResults(
	market: string,
	minBpm: number,
	maxBpm: number,
	seedParams: any
): Promise<any> {
	console.log('getRecommendationResults market', market);

	const header: Headers = await getAuthHeader();

	const url = new URL(`${SPOTIFY_BASE_URL}/recommendations`);
	const parameters = {
		limit: 100,
		market: market,
		min_tempo: minBpm,
		max_tempo: maxBpm,
		...seedParams
	};

	Object.keys(parameters).forEach((key) =>
		// @ts-ignore
		url.searchParams.append(key, parameters[key])
	);

	console.log('url', url);

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
