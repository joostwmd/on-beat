<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte';
	import Screen from '$lib/components/atoms/Screen.svelte';
	export let isEnabled: boolean;

	const SPOTIFY_KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	let currentKeyIndex = 0;

	function handleNextKeyClick() {
		currentKeyIndex = (currentKeyIndex + 1) % SPOTIFY_KEYS.length;
	}

	function handlePreviousKeyClick() {
		currentKeyIndex = (currentKeyIndex - 1 + SPOTIFY_KEYS.length) % SPOTIFY_KEYS.length;
	}
</script>

<div class="flex space-between">
	<Button {isEnabled} onClick={handlePreviousKeyClick} icon="back" />
	<div class="w-12">
		<Screen content={SPOTIFY_KEYS[currentKeyIndex]} />
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
