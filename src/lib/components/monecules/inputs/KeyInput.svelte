<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte';
	import store, { updateKeyValue } from '$lib/spotifyClient/store';
	import TextCard from '../cards/TextCard.svelte';

	export let isEnabled: boolean;

	const SPOTIFY_KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	let currentKeyIndex = 0;

	function handleNextKeyClick() {
		currentKeyIndex = (currentKeyIndex + 1) % SPOTIFY_KEYS.length;
		updateKeyValue(SPOTIFY_KEYS[currentKeyIndex]);
	}

	function handlePreviousKeyClick() {
		currentKeyIndex = (currentKeyIndex - 1 + SPOTIFY_KEYS.length) % SPOTIFY_KEYS.length;
		updateKeyValue(SPOTIFY_KEYS[currentKeyIndex]);
	}
</script>

<div class="flex space-between">
	<Button {isEnabled} onClick={handlePreviousKeyClick} icon="back" />
	<div class="w-16 aspect-square">
		<TextCard text={$store.key.value} isSelected={$store.key.active} />
	</div>
	<Button {isEnabled} onClick={handleNextKeyClick} icon="back" />
</div>

<style>
	.flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
