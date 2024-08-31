<script lang="ts">
	import BpmInput from '$lib/components/monecules/inputs/BpmInput.svelte';
	import FabButton from '$lib/components/FabButton.svelte';
	//import PlaylistDataInput from '$lib/components/PlaylistDataInput.svelte';
	import SpotifyItemCard from '$lib/components/monecules/cards/SpotifyItemCardBig.svelte';
	import { handleGetUsersPlaylists } from '$lib/spotifyClient';
	import { transformSearchResultData } from '$lib/spotifyClient/constants';
	import { filterPlaylists } from '$lib/spotifyClient/methods/filterPlaylists';
	import { onMount } from 'svelte';

	let selectedPlaylists: string[] = [];
	let userPlaylists: any[] | null = null;
	let playlistGenerated: boolean = false;
	let playlistLink: string = '';

	onMount(async () => {
		const data = await handleGetUsersPlaylists();
		userPlaylists = data.items;
	});

	function handlePlaylistClick(playlist: any) {
		console.log('selectedPlaylists', selectedPlaylists);
		if (selectedPlaylists.includes(playlist.id)) {
			selectedPlaylists = selectedPlaylists.filter((id) => id !== playlist.id);
		} else {
			selectedPlaylists = [...selectedPlaylists, playlist.id];
		}
	}

	async function handleFilterPlaylistClick() {
		const generatePlaylistLink = await filterPlaylists(selectedPlaylists);
		setTimeout(() => {
			window.open(generatePlaylistLink, '_blank');
		}, 1000);
		return;
	}
</script>

{#if userPlaylists}
	<div
		class="w-screen h-screen bg-black overflow-y-scroll pt-8 px-8 pb-32 flex flex-col items-center"
	>
		<BpmInput />

		<h3 class="mt-8 text-center">pick one ore more playlist</h3>

		<div
			class="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-items-center gap-y-8"
		>
			{#each userPlaylists as playlist}
				<button on:click={() => handlePlaylistClick(playlist)}>
					<SpotifyItemCard
						data={transformSearchResultData(playlist, 'playlist')}
						isSelected={selectedPlaylists.includes(playlist.id)}
					/>
				</button>
			{/each}
		</div>

		<!-- <PlaylistDataInput /> -->

		<FabButton>
			<button class="btn variant-filled-primary" on:click={handleFilterPlaylistClick}>
				Filter Playlist
			</button>
		</FabButton>
	</div>
{/if}
