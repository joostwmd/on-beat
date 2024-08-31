<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import FabButton from '$lib/components/FabButton.svelte';
	import { SPOTIFY_AVAILABLE_GENRE_SEEDS } from '$lib/spotifyClient/constants';
	import { addSeed } from '$lib/spotifyClient/store';
	import { goto } from '$app/navigation';
	import Pad from '$lib/components/atoms/Pad.svelte';
	import TextCard from '$lib/components/monecules/cards/TextCard.svelte';

	let query: string;
	let selectedGenre: string | null = null;

	$: filteredGenres = query
		? SPOTIFY_AVAILABLE_GENRE_SEEDS.filter((genre) =>
				genre.toLowerCase().includes(query.toLowerCase())
			)
		: SPOTIFY_AVAILABLE_GENRE_SEEDS;

	function handleGenreClick(genre: string) {
		selectedGenre = genre;
	}

	function handleAddGenreClick() {
		if (!selectedGenre) return;
		addSeed({ type: 'genre', value: selectedGenre });
		goto('/generateplaylist');
	}
</script>

<div class="w-screen h-screen flex flex-col overflow-auto">
	<SearchBar bind:value={query} />
	<div
		class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 items-center justify-items-center gap-y-8 gap-x-8 my-24 sm:px-4 px-12"
	>
		{#each filteredGenres as genre}
			<TextCard
				text={genre}
				isSelected={selectedGenre === genre}
				onClick={() => handleGenreClick(genre)}
			/>
		{/each}
	</div>
	<FabButton>
		<TextCard
			text="Add selected genre"
			isSelected={selectedGenre !== null}
			onClick={handleAddGenreClick}
		/>
	</FabButton>
</div>
