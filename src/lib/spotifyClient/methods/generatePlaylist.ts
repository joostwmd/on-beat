import { get } from 'svelte/store';
import { handleGetRecommendationResults } from '..';
import { addItemsToPlaylist } from '../requests/playlist/addItemToPlaylist';
import { createPlaylist } from '../requests/playlist/createPlaylist';
import store from '../store';
import { transformSpotifySeedData } from '../constants';

export async function generatePlaylist() {
	const state = get(store);
	const name = state.name;
	const description = state.description;
	const minBpm = state.minBpm;
	const maxBpm = state.maxBpm;
	const seedParams = transformSpotifySeedData(state.seeds);
	const playlist = await createPlaylist(name, description);
	const playlistId = playlist.id;
	const playlistLink = playlist.external_urls.spotify;
	const recommendedTracks = await handleGetRecommendationResults(minBpm, maxBpm, seedParams);

	const trackUris = recommendedTracks.tracks.map((track) => {
		return `spotify:track:${track.id}`;
	});

	await addItemsToPlaylist(playlistId, trackUris);
	return playlistLink;
}
