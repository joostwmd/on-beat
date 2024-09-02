import { writable } from 'svelte/store';
import type { TSeed, TChannels, TBpm, TBpmOrderSetting, TKeySetting } from './types';

export type TStore = {
	name: string;
	description: string;
	bpm: TBpm;
	seeds: TSeed[];
	playlists: string[];
	channels: TChannels;
	bpmOrder: TBpmOrderSetting;
	key: TKeySetting;
};

const initialState: TStore = {
	name: '',
	description: '',
	bpm: { min: 0, max: 0 },
	seeds: [],
	playlists: [],
	channels: {
		energy: { value: 0, active: false },
		danceability: { value: 0, active: false },
		liveness: { value: 0, active: false },
		popularity: { value: 0, active: false }
	},
	bpmOrder: { value: null, active: false },
	key: { value: 'C', active: false }
};

const store = writable(initialState);

export function updateName(newName: string) {
	store.update((state) => {
		return { ...state, name: newName };
	});
}

export function updateDescription(newDescription: string) {
	store.update((state) => {
		return { ...state, description: newDescription };
	});
}

export function updateMinBpm(newMinBpm: number) {
	store.update((state) => {
		return {
			...state,
			bpm: {
				...state.bpm,
				min: newMinBpm
			}
		};
	});
}

export function updateMaxBpm(newMaxBpm: number) {
	store.update((state) => {
		return {
			...state,
			bpm: {
				...state.bpm,
				max: newMaxBpm
			}
		};
	});
}

export function addSeed(seed: TSeed) {
	store.update((state) => {
		return { ...state, seeds: [...state.seeds, seed] };
	});
}

export function removeSeed(index: number) {
	store.update((state) => {
		const newSeeds = state.seeds.filter((_, i) => i !== index);
		return { ...state, seeds: newSeeds };
	});
}

export function addPlaylist(playlistId: string) {
	store.update((state) => {
		return { ...state, playlists: [...state.playlists, playlistId] };
	});
}

export function removePlaylist(playlistId: string) {
	store.update((state) => {
		const newPlaylists = state.playlists.filter((id) => id !== playlistId);
		return { ...state, playlists: newPlaylists };
	});
}

export function toggleChannelActiveState(channel: keyof TChannels) {
	store.update((state) => {
		const newChannels = { ...state.channels };
		newChannels[channel].active = !newChannels[channel].active;
		return { ...state, channels: newChannels };
	});
}

export function updateChannelValue(channel: keyof TChannels, value: number) {
	store.update((state) => {
		const newChannels = { ...state.channels };
		newChannels[channel].value = value;
		return { ...state, channels: newChannels };
	});
}

export function toggleBpmOrderActiveState() {
	store.update((state) => {
		return {
			...state,
			bpmOrder: {
				...state.bpmOrder,
				active: !state.bpmOrder.active
			}
		};
	});
}

export function updateBpmOrderValue(value: TBpmOrderSetting['value']) {
	store.update((state) => {
		return {
			...state,
			bpmOrder: {
				...state.bpmOrder,
				value
			}
		};
	});
}

export function toggleKeyActiveState() {
	store.update((state) => {
		return {
			...state,
			key: {
				...state.key,
				active: !state.key.active
			}
		};
	});
}

export function updateKeyValue(value: TKeySetting['value']) {
	store.update((state) => {
		return {
			...state,
			key: {
				...state.key,
				value
			}
		};
	});
}

export default store;
