import { get } from 'svelte/store';
import { addItemsToPlaylist } from '../requests/playlist/addItemToPlaylist';
import { createPlaylist } from '../requests/playlist/createPlaylist';
import store from '../store';
import { getSeveralTracksAudioFeatures } from '../requests/track/getSeveralTracksAudioFeatures';
import { addCoverToPlaylist } from '../requests/playlist/addCoverToPlaylist';
import { getPlaylistById } from '../requests/playlist/getPlaylist';

export async function generatePlaylist(trackUris: string[], trackIds: string[]) {
	const state = get(store);

	let uris = trackUris;

	if (state.bpmOrder.active) {
		const tracksAudioFeatures = await getSeveralTracksAudioFeatures(trackIds);
		console.log('test', tracksAudioFeatures);

		if (state.bpmOrder.value === 'bpm-ascending') {
			uris = tracksAudioFeatures.sort((a, b) => a.tempo - b.tempo).map((track) => track.uri);
		} else if (state.bpmOrder.value === 'bpm-descending') {
			uris = tracksAudioFeatures.sort((a, b) => b.tempo - a.tempo).map((track) => track.uri);
		}
	}

	const name = state.name;
	const description = state.description;
	const playlistIsPublic = state.isPublic;

	const playlist = await createPlaylist(name, description, playlistIsPublic);

	await addItemsToPlaylist(playlist.id, uris);
	//await addCoverToPlaylist(playlist.id);

	//refetch info to get image
	const generatedPlaylist = await getPlaylistById(playlist.id);
	return generatedPlaylist;
}
