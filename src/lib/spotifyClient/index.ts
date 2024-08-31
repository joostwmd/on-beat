import { goto } from '$app/navigation';
import { SPOTIFY_ERROR_MESSAGES } from './constants';
import { login } from './requests/auth/login';
import { refreshTokens } from './requests/auth/refresh';
import { getUserPlaylists } from './requests/playlist/getUserPlaylists';
import { getAvailableGenreSeeds } from './requests/recommendation/getAvailableGenreSeeds';
import { getRecommendationResults } from './requests/recommendation/getRecommendationResults';
import { getSearchResults } from './requests/search/getSearchResult';
import { getUser } from './requests/user/getUser';

async function middleware(func: () => Promise<any>) {
	try {
		const response = await func();
		//doesnt work yet
		if (response.error) {
			if (response.error.message === SPOTIFY_ERROR_MESSAGES.expiredToken) {
				goto('/');
				return;
				await refreshTokens();
				const response = await func();
				console.log('response', response);

				return response;
			} else if (response.error.message === SPOTIFY_ERROR_MESSAGES.invalidToken) {
				goto('/');
				return;
				await login();
			}
		} else {
			return response;
		}
	} catch (error) {
		throw error;
	}
}

export async function handleGetUser() {
	const userData = await middleware(async () => await getUser());
	return userData;
}

export async function handleGetSearchResult(query: string, type: string) {
	const market = localStorage.getItem('market');
	const searchResult = await middleware(async () => await getSearchResults(market!, query, type));
	return searchResult;
}

export async function handleGetUsersPlaylists() {
	const playlists = await middleware(async () => await getUserPlaylists());
	return playlists;
}

export async function handleGetRecommendationResults(
	minBpm: number,
	maxBpm: number,
	seedParams: any
) {
	const market = localStorage.getItem('user_market');

	const recommendationResults = await middleware(
		async () => await getRecommendationResults(market!, minBpm, maxBpm, seedParams)
	);
	return recommendationResults;
}

export async function handleGetAvailableGenreSeeds() {
	const genreSeeds = await middleware(async () => await getAvailableGenreSeeds());
	return genreSeeds;
}
