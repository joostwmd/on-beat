<script lang="ts">
	import { goto } from '$app/navigation';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import TextCard from './monecules/cards/TextCard.svelte';
	const drawerStore = getDrawerStore();

	function handleArtistClick() {
		drawerStore.close();
		goto('/search/artist');
	}

	function handleSongClick() {
		drawerStore.close();
		goto('/search/track');
	}

	function handleGenreClick() {
		drawerStore.close();
		goto('/genres');
	}
</script>

<div class="w-full h-full bg-neutral-950 flex flex-col items-center justify-center rounded-lg">
	<h2 class="h2 mb-12">what do you want to add</h2>

	<div class="max-x-88 space-y-4">
		<TextCard text="an artist" onClick={handleArtistClick} isSelected={true} />

		<TextCard text="a track" onClick={handleSongClick} isSelected={true} />

		<TextCard text="a genre" onClick={handleGenreClick} isSelected={true} />
	</div>
</div>
