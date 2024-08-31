<script lang="ts">
	import FabButton from '$lib/components/FabButton.svelte';
	import store, {
		updateMinBpm,
		updateMaxBpm,
		removeSeed,
		updateDescription,
		updateName
	} from '$lib/spotifyClient/store';
	import { generatePlaylist } from '$lib/spotifyClient/methods/generatePlaylist';

	import ReferencesSection from '$lib/components/organisms/InputSections/ReferencesSection.svelte';
	import BpmSection from '$lib/components/organisms/InputSections/BpmSection.svelte';
	import ChannelsSection from '$lib/components/organisms/InputSections/ChannelsSection.svelte';
	import KeySection from '$lib/components/organisms/InputSections/KeySection.svelte';
	import OrderSection from '$lib/components/organisms/InputSections/OrderSection.svelte';
	import PlaylistDataSection from '$lib/components/organisms/InputSections/PlaylistDataSection.svelte';
	import StatusLed from '$lib/components/atoms/StatusLed.svelte';
	import OnOffToggle from '$lib/components/atoms/OnOffToggle.svelte';

	let playlistGenerated: boolean = false;
	let playlistLink: string = '';

	let name = $store.name;
	let description = $store.description;
	let minBpm = $store.minBpm;
	let maxBpm = $store.maxBpm;
	let seeds = $store.seeds;

	$: updateMinBpm(minBpm);
	$: updateMaxBpm(maxBpm);
	$: seeds = $store.seeds;

	async function handleGeneratePlaylist() {
		const generatePlaylistLink = await generatePlaylist();
		setTimeout(() => {
			window.open(generatePlaylistLink, '_blank');
		}, 1000);
		return;

		console.log('generatePlaylistLink', generatePlaylistLink);
		playlistLink = generatePlaylistLink;
		playlistGenerated = true;
	}

	function openSpotifPlaylistLink() {
		window.open(playlistLink, '_blank');
	}
</script>

<div class="w-screen h-screen overflow-y-scroll pt-8 pb-32 px-8 flex flex-col items-center">
	<div class="w-full max-w-[400px]">
		<BpmSection />

		<ReferencesSection {seeds} />

		<ChannelsSection />

		<KeySection />

		<OrderSection />

		<h2 class="h2 mt-16">[2] PLAYLIST</h2>

		<PlaylistDataSection />
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
