import { writable } from 'svelte/store';
import type { TSeed } from './types';

export type TStore = {
	name: string;
	description: string;
	minBpm: number;
	maxBpm: number;
	seeds: TSeed[];
	bpmOrder?: 'bpm-ascending' | 'bpm-descending';
};

const initialState: TStore = {
	name: '',
	description: '',
	minBpm: 0,
	maxBpm: 0,
	seeds: []
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
		return { ...state, minBpm: newMinBpm };
	});
}

export function updateMaxBpm(newMaxBpm: number) {
	store.update((state) => {
		return { ...state, maxBpm: newMaxBpm };
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

export function updateBpmOrder(order: 'bpm-ascending' | 'bpm-descending') {
	store.update((state) => {
		return { ...state, bpmOrder: order };
	});
}

export default store;
