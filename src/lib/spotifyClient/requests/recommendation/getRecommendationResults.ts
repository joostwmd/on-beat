import { SPOTIFY_BASE_URL } from '$lib/spotifyClient/constants';
import { getAuthHeader } from '../auth/getAuthHeader';
import { get } from 'svelte/store';
import store from '$lib/spotifyClient/store';

type TRecommendationParams = {
	market: string;
	minBpm: number;
	maxBpm: number;
	seeds: {
		artists: string[];
		tracks: string[];
		genres: string[];
	};
	channels: {
		danceability?: number;
		energy?: number;
		liveness?: number;
		popularity?: number;
	};
	key?: string;
};

export async function getRecommendationResults(): Promise<any> {
	const storeData = get(store);

	const MARKET = 'DE';

	const header: Headers = await getAuthHeader();

	const url = new URL(`${SPOTIFY_BASE_URL}/recommendations`);
	const parameters: Record<string, any> = {
		limit: 50,
		market: MARKET,
		min_tempo: storeData.bpm.min,
		max_tempo: storeData.bpm.max,
		seed_artists: storeData.seeds
			.filter((seed) => seed.type === 'artist')
			.map((seed) => seed.id)
			.join(','),
		seed_tracks: storeData.seeds
			.filter((seed) => seed.type === 'track')
			.map((seed) => seed.id)
			.join(','),
		seed_genres: storeData.seeds
			.filter((seed) => seed.type === 'genre')
			.map((seed) => seed.value)
			.join(',')
	};

	if (storeData.channels.danceability.active) {
		parameters.target_danceability = storeData.channels.danceability.value;
	}

	if (storeData.channels.energy.active) {
		parameters.target_energy = storeData.channels.energy.value;
	}

	if (storeData.channels.liveness.active) {
		parameters.target_liveness = storeData.channels.liveness.value;
	}

	if (storeData.channels.popularity.active) {
		parameters.target_popularity = storeData.channels.popularity.value;
	}

	if (storeData.key.active) {
		parameters.min_key = storeData.key.value;
		parameters.max_key = storeData.key.value;
	}

	console.log('parameters', parameters);

	Object.entries(parameters).forEach(([key, value]) => {
		if (value) {
			url.searchParams.append(key, value);
		}
	});

	console.log('url', url.toString());

	try {
		const res = await fetch(url.toString(), {
			headers: header
		});

		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}
