<script lang="ts">
	import FabButton from '$lib/components/FabButton.svelte';
	import store from '$lib/spotifyClient/store';
	import { generatePlaylist } from '$lib/spotifyClient/methods/generatePlaylist';
	import ReferencesSection from '$lib/components/organisms/InputSections/ReferencesSection.svelte';
	import BpmSection from '$lib/components/organisms/InputSections/BpmSection.svelte';
	import ChannelsSection from '$lib/components/organisms/InputSections/ChannelsSection.svelte';
	import KeySection from '$lib/components/organisms/InputSections/KeySection.svelte';
	import OrderSection from '$lib/components/organisms/InputSections/OrderSection.svelte';
	import PlaylistNameSection from '$lib/components/organisms/InputSections/PlaylistNameSection.svelte';
	import PlaylistDescriptionSection from '$lib/components/organisms/InputSections/PlaylistDescriptionSection.svelte';
	import PlaylistVisibilitySection from '$lib/components/organisms/InputSections/PlaylistVisibilitySection.svelte';
	import { getRecommendationResults } from '$lib/spotifyClient/requests/recommendation/getRecommendationResults';
	import { transformSearchResultData } from '$lib/spotifyClient/constants';
	import SpotifyItemCardSmall from '$lib/components/monecules/cards/SpotifyItemCardSmall.svelte';
	import Pad from '$lib/components/atoms/Pad.svelte';

	let playlistLink: string = '';

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

	let recommendedTracks;
	async function handleGetRecommendations() {
		const recommendations = await getRecommendationResults();
		const transformedTracks = recommendations.tracks.map((track) =>
			transformSearchResultData(track, 'track')
		);
		recommendedTracks = transformedTracks;
		recommendationsFetched = true;
	}

	let recommendationsFetched: boolean = false;
	let playlistGenerated: boolean = false;
</script>

<div class="w-screen h-screen overflow-y-scroll pt-8 pb-32 px-8 flex flex-col items-center">
	<div class="w-full max-w-[400px]">
		<!-- MUSIC RECOMMENDATIONS -->
		<div>
			<BpmSection />
			<ReferencesSection />
			<ChannelsSection />
			<KeySection />

			<button on:click={handleGetRecommendations} class="btn variant-filled-primary"
				>get recommendations</button
			>
		</div>

		{#if recommendationsFetched}
			<!-- RECOMMENDED TRACKS -->

			<div>
				<h1>recommended tracks component</h1>

				<div class="space-y-4">
					{#each recommendedTracks as track}
						<Pad
							onClick={() => {
								return;
							}}
							isSelected={false}
						>
							<SpotifyItemCardSmall data={track} />
						</Pad>
					{/each}
				</div>
			</div>

			<!-- PLAYLIST DATA SECTION -->

			<div>
				<PlaylistNameSection />
				<PlaylistDescriptionSection />
				<PlaylistVisibilitySection />
				<OrderSection />

				<button>create playlist</button>
			</div>
		{/if}

		{#if playlistGenerated}
			<!-- PLAYLIST PREVIEW SECTION -->

			<div>
				<h1>playlist rpeview component</h1>
				<button>listen on spotify</button>
			</div>
		{/if}
	</div>
</div>
