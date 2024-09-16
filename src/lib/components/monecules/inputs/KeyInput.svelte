<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte';
	import { SPOTIFY_KEYS } from '$lib/spotifyClient/constants';
	import store, { updateKeyValue } from '$lib/spotifyClient/store';
	import TextCard from '../cards/TextCard.svelte';

	export let isEnabled: boolean;

	let currentKeyIndex = 0;

	function handleNextKeyClick() {
		currentKeyIndex = (currentKeyIndex + 1) % SPOTIFY_KEYS.length;
		updateKeyValue(currentKeyIndex);
	}

	function handlePreviousKeyClick() {
		currentKeyIndex = (currentKeyIndex - 1 + SPOTIFY_KEYS.length) % SPOTIFY_KEYS.length;
		updateKeyValue(currentKeyIndex);
	}
</script>

<div class="flex space-between">
	<Button {isEnabled} onClick={handlePreviousKeyClick} icon="arrowLeft" />
	<div class="w-16 aspect-square">
		<TextCard text={SPOTIFY_KEYS[$store.key.value]} isSelected={$store.key.active} />
	</div>
	<Button {isEnabled} onClick={handleNextKeyClick} icon="arrowRight" />
</div>

<style>
	.flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
