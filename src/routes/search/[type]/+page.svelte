<script lang="ts">
	import { handleGetSearchResult } from '$lib/spotifyClient';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import FabButton from '$lib/components/FabButton.svelte';

	import type { TSpotifyItemCard, TSpotifyItems } from '$lib/spotifyClient/types';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { transformSearchResultData } from '$lib/spotifyClient/constants';
	import { addSeed } from '$lib/spotifyClient/store';
	import Pad from '$lib/components/atoms/Pad.svelte';
	import SpotifyItemCardBig from '$lib/components/monecules/cards/SpotifyItemCardBig.svelte';
	import TextCard from '$lib/components/monecules/cards/TextCard.svelte';

	const type = $page.params.type as TSpotifyItems;

	let isFetchingResults: boolean = false;
	let query: string = '';
	let timeout: ReturnType<typeof setTimeout>;
	let searchResults: any[] | null = null;
	let selectedItem: TSpotifyItemCard | null = null;

	function handleAddItemClick() {
		if (selectedItem) {
			const data = transformSearchResultData(selectedItem, type);
			if (data) {
				addSeed(data);
				goto('/generateplaylist');
			}
		}
	}

	function handleItemClick(item: any) {
		if (selectedItem && selectedItem.id === item.id) {
			selectedItem = null;
		} else {
			selectedItem = item;
		}
	}

	$: {
		if (query.length > 2) {
			clearTimeout(timeout);
			timeout = setTimeout(async () => {
				isFetchingResults = true;
				const data = await handleGetSearchResult(query, type);
				console.log('data', data);

				if (type === 'track') {
					searchResults = data.tracks.items;
				} else if (type === 'artist') {
					searchResults = data.artists.items;
				} else if (type === 'album') {
					searchResults = data.albums.items;
				} else if (type === 'playlist') {
					searchResults = data.playlists.items;
				} else {
					searchResults = null;
				}

				isFetchingResults = false;
			}, 300);
		}
	}
</script>

<div class="w-full h-screen flex flex-col items-center relative">
	<SearchBar bind:value={query} />

	{#if isFetchingResults}
		<div class="flex items-center justify-center h-screen">
			<ProgressRadial value={undefined} stroke={22} width="w-24" />
		</div>
	{/if}

	<div
		class="w-full h-full overflow-y-auto py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-items-center gap-y-8"
	>
		{#if searchResults}
			{#each searchResults as result}
				<div class="m-auto">
					<Pad
						onClick={() => handleItemClick(result)}
						isSelected={selectedItem && selectedItem.id === result.id}
					>
						<SpotifyItemCardBig data={transformSearchResultData(result, result.type)} />
					</Pad>
				</div>
			{/each}
		{/if}
	</div>

	<FabButton>
		<TextCard
			text="Add selected item"
			isSelected={selectedItem ? true : false}
			onClick={handleAddItemClick}
		/>
	</FabButton>
</div>
