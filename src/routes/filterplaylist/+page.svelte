<script lang="ts">
	import BpmInput from '$lib/components/monecules/inputs/BpmInput.svelte';
	import FabButton from '$lib/components/FabButton.svelte';
	//import PlaylistDataInput from '$lib/components/PlaylistDataInput.svelte';
	import SpotifyItemCard from '$lib/components/monecules/cards/SpotifyItemCardBig.svelte';
	import { handleGetUsersPlaylists } from '$lib/spotifyClient';
	import { transformSearchResultData } from '$lib/spotifyClient/constants';
	import { filterPlaylists } from '$lib/spotifyClient/methods/filterPlaylists';
	import { onMount } from 'svelte';
	import BpmSection from '$lib/components/organisms/InputSections/BpmSection.svelte';
	import ChannelsSection from '$lib/components/organisms/InputSections/ChannelsSection.svelte';
	import KeySection from '$lib/components/organisms/InputSections/KeySection.svelte';
	import OrderSection from '$lib/components/organisms/InputSections/OrderSection.svelte';
	import PlaylistDataSection from '$lib/components/organisms/InputSections/PlaylistDataSection.svelte';
	import Pad from '$lib/components/atoms/Pad.svelte';
	import SpotifyItemCardSmall from '$lib/components/monecules/cards/SpotifyItemCardSmall.svelte';
	import { goto } from '$app/navigation';
	import store, { addPlaylist, removePlaylist } from '$lib/spotifyClient/store';

	let userPlaylists: any[] | null = null;
	let playlistGenerated: boolean = false;
	let playlistLink: string = '';

	onMount(async () => {
		const data = await handleGetUsersPlaylists();
		userPlaylists = data.items;
	});

	function handlePlaylistClick(playlist: any) {
		if ($store.playlists.includes(playlist.id)) {
			console.log('remove');
			removePlaylist(playlist.id);
		} else {
			console.log('add');
			addPlaylist(playlist.id);
		}

		// if (selectedPlaylists.includes(playlist.id)) {
		// 	selectedPlaylists = selectedPlaylists.filter((id) => id !== playlist.id);
		// } else {
		// 	selectedPlaylists = [...selectedPlaylists, playlist.id];
		// }
	}

	async function handleFilterPlaylistClick() {
		const generatePlaylistLink = await filterPlaylists(selectedPlaylists);
		setTimeout(() => {
			window.open(generatePlaylistLink, '_blank');
		}, 1000);
		return;
	}

	function test() {
		console.log('test', $store.playlists);
	}
</script>

<button on:click={() => goto('/generateplaylist')}>Create Playlist</button>

{#if userPlaylists}
	<div class="w-screen h-screen overflow-y-scroll pt-8 pb-32 px-8 flex flex-col items-center">
		<div class="w-full max-w-[400px]">
			<BpmSection />

			<div class="mb-8 mt-8">
				<div class="flex items-center justify-between">
					<h4 class="h4">PLAYLISTS *</h4>
				</div>
				<p class="p text-gray-400 mt-4">select one or more playlists to filter out the music</p>
			</div>

			<div class="flex flex-col space-y-2">
				{#each userPlaylists as playlist}
					<Pad
						onClick={() => handlePlaylistClick(playlist)}
						isSelected={$store.playlists.includes(playlist.id)}
					>
						<SpotifyItemCardSmall data={transformSearchResultData(playlist, 'playlist')} />
					</Pad>
				{/each}
			</div>

			<ChannelsSection />

			<KeySection />

			<OrderSection />

			<h2 class="h2 mt-16">[2] PLAYLIST</h2>

			<PlaylistDataSection />

			<button class="btn variant-filled-primary mt-8" on:click={test}> test </button>
		</div>

		<!-- <PlaylistDataInput /> -->

		<!-- <FabButton>
		{#if !playlistGenerated}
			<button class="btn variant-filled-primary" on:click={handleGeneratePlaylist}>
				Generate Playlist
			</button>
		{:else if playlistGenerated}
			<button class="btn variant-filled-primary" on:click={openSpotifPlaylistLink}>
				Listen on Spotify
			</button>
		{/if}
	</FabButton> -->
	</div>
{/if}
