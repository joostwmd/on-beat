import { get } from 'svelte/store';
import store from '../store';
import { getPlaylistsItems } from '../requests/playlist/getPlaylistItems';
import { getSeveralTracksAudioFeatures } from '../requests/track/getSeveralTracksAudioFeatures';
import { createPlaylist } from '../requests/playlist/createPlaylist';
import { addItemsToPlaylist } from '../requests/playlist/addItemToPlaylist';

export async function filterPlaylists(ids: string[]) {
	const state = get(store);
	const name = state.name;
	const description = state.description;
	const minBpm = state.minBpm;
	const maxBpm = state.maxBpm;

	const itemsOfPlaylists: any[] = [];

	for (const id of ids) {
		const playlist = await getPlaylistsItems(id);
		itemsOfPlaylists.push(...playlist.items);
	}

	const itemOfPlaylistChunks = itemsOfPlaylists.reduce((result, item, index) => {
		if (index % 100 === 0) {
			result.push(itemsOfPlaylists.slice(index, index + 100));
		}
		return result;
	}, []);

	console.log('itemOfPlaylistChunks', itemOfPlaylistChunks);

	const tracksAudioFeatures: any[] = [];

	for (let chunk of itemOfPlaylistChunks) {
		const ids = chunk.map((item) => item.track.id);
		const data = await getSeveralTracksAudioFeatures(ids);
		tracksAudioFeatures.push(...data.audio_features);
	}

	const filteredTracks = tracksAudioFeatures.filter((track) => {
		const bpm = track.tempo;
		return bpm >= minBpm && bpm <= maxBpm;
	});

	const filteredTracksUris = filteredTracks.map((track) => {
		return `spotify:track:${track.id}`;
	});

	console.log('filteredTracksUris', filteredTracksUris);

	const playlist = await createPlaylist(name, description);
	const playlistId = playlist.id;
	const playlistLink = playlist.external_urls.spotify;
	await addItemsToPlaylist(playlistId, filteredTracksUris);
	return playlistLink;
}
