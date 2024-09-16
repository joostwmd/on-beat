<script lang="ts">
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
	import TextCard from '$lib/components/monecules/cards/TextCard.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import RecommendedTracksSection from '$lib/components/organisms/InputSections/RecommendedTracksSection.svelte';
	import SpotifyItemCardBig from '$lib/components/monecules/cards/SpotifyItemCardBig.svelte';

	import placeholderImage from '$lib/icons/spotify.svg';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { setRecommendedTracks } from '$lib/spotifyClient/store';
	import { getSeveralTracksAudioFeatures } from '$lib/spotifyClient/requests/track/getSeveralTracksAudioFeatures';
	import store from '$lib/spotifyClient/store';

	let canGetRecommendations: boolean = false;
	let canGeneratePlaylist: boolean = false;

	$: {
		if ($store.bpm.min < $store.bpm.max && $store.seeds.length > 0) {
			canGetRecommendations = true;
		} else {
			canGetRecommendations = false;
		}
	}

	$: {
		if ($store.recommendedTracks.length > 0 && $store.name.length > 0) {
			canGeneratePlaylist = true;
		} else {
			canGeneratePlaylist = false;
		}
	}

	let generatedPlaylist: any;
	async function handleGeneratePlaylist() {
		const recommendedTrackUris = $store.recommendedTracks.map((track) => track.uri);
		const trackIds = $store.recommendedTracks.map((track) => track.id);

		const playlist = await generatePlaylist(recommendedTrackUris, trackIds);

		generatedPlaylist = playlist;
		playlistGenerated = true;

		console.log('generatedPlaylist', generatedPlaylist);
	}

	function openSpotifPlaylistLink() {
		window.open(playlistLink, '_blank');
	}

	async function handleGetRecommendations() {
		const recommendations = await getRecommendationResults();
		console.log('recommendations', recommendations);
		const transformedTracks = recommendations.tracks.map((track) =>
			transformSearchResultData(track, 'track')
		);

		const trackIds = transformedTracks.map((track) => track.id);

		const audioFeatures = await getSeveralTracksAudioFeatures(trackIds);

		const tracksWithAudioFeatures = transformedTracks.map((track) => {
			const audioFeature = audioFeatures.find((audioFeature) => audioFeature.id === track.id);
			return { ...track, ...audioFeature };
		});

		setRecommendedTracks(tracksWithAudioFeatures);

		recommendationsFetched = true;
	}

	async function getAudioFeatures() {
		//const trackIds = recommendedTracks.map((track) => track.id);
		//const audioFeatures = await getSeveralTracksAudioFeatures(trackIds);
		//console.log('audioFeatures', audioFeatures);
	}

	let recommendationsFetched: boolean = false;
	let playlistGenerated: boolean = false;

	const modalStore = getModalStore();

	function handleGeneratedPlaylistInfoClick() {
		console.log('generatedPlaylist', generatedPlaylist);

		const modal: ModalSettings = {
			type: 'component',
			component: 'playlistModal',
			meta: {
				isPublic: generatedPlaylist.public,
				isCollaborative: generatedPlaylist.collaborative,
				name: generatedPlaylist.name,
				description: generatedPlaylist.description,
				followers: generatedPlaylist.followers.total,
				img: placeholderImage,
				owner: generatedPlaylist.owner.display_name,
				nuberOfTracks: generatedPlaylist.tracks.total
			}
		};

		modalStore.trigger(modal);
	}
</script>

<div class="w-screen h-screen overflow-y-scroll pt-8 pb-32 px-4 flex flex-col items-center">
	<div class="w-full max-w-[800px]">
		<!-- MUSIC RECOMMENDATIONS -->
		<div>
			<BpmSection />
			<ReferencesSection />
			<ChannelsSection />
			<KeySection />

			<div class="mt-12">
				<TextCard
					text={'get recommendations'}
					isSelected={canGetRecommendations}
					onClick={handleGetRecommendations}
				/>
			</div>
		</div>

		{#if recommendationsFetched}
			<!-- RECOMMENDED TRACKS -->

			<RecommendedTracksSection />

			<!-- PLAYLIST DATA SECTION -->

			<div>
				<PlaylistNameSection />
				<PlaylistDescriptionSection />
				<PlaylistVisibilitySection />
				<OrderSection />
			</div>

			<div class="mt-12">
				<TextCard
					text={'Create Playlist'}
					isSelected={canGeneratePlaylist}
					onClick={handleGeneratePlaylist}
				/>
			</div>
		{/if}

		{#if playlistGenerated}
			<!-- PLAYLIST PREVIEW SECTION -->

			<div>
				<h1>playlist rpeview component</h1>
				<button>listen on spotify</button>

				<SpotifyItemCardBig
					data={{
						imageUrl: placeholderImage,
						title: generatedPlaylist.name,
						subtitle: generatedPlaylist.description,
						type: 'playlist',
						id: generatedPlaylist.id,
						uri: generatedPlaylist.uri
					}}
				/>

				<Button icon="info" onClick={handleGeneratedPlaylistInfoClick} />

				<TextCard text={'Liston On Spotify'} isSelected={true} onClick={handleGeneratePlaylist} />
			</div>
		{/if}
	</div>
</div>
