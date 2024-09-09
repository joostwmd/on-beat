<script lang="ts">
	export let recommendedTracks: any;

	import Button from '$lib/components/atoms/Button.svelte';
	import Pad from '$lib/components/atoms/Pad.svelte';
	import SpotifyItemCardSmall from '$lib/components/monecules/cards/SpotifyItemCardSmall.svelte';
	import { getTrackAudioFeatures } from '$lib/spotifyClient/requests/track/getTrackAudioFeatures';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	let currentlyPlayedTrackId: string | null = null;
	let audio: HTMLAudioElement;

	function handlePlayPauseClick(previewUrl: string, trackId: string) {
		if (currentlyPlayedTrackId === trackId) {
			if (audio.paused) {
				audio.play();
			} else {
				audio.pause();
				currentlyPlayedTrackId = null;
			}
		} else {
			if (currentlyPlayedTrackId !== null) {
				audio.pause();
			}
			audio.src = previewUrl;
			audio.play();
			currentlyPlayedTrackId = trackId;
		}
	}

	const modalStore = getModalStore();

	async function handleInfoClick(track: any) {
		console.log('track', track);

		const audioFeatures = await getTrackAudioFeatures(track.id);

		console.log('audioFeatures', audioFeatures);

		const modal: ModalSettings = {
			type: 'component',
			component: 'trackModal',
			meta: {
				img: track.imageUrl,
				title: track.title,
				artist: track.subtitle,
				album: track.album,
				albumType: track.albumType,
				releaseDate: track.releaseDate,
				duration: `${Math.floor(audioFeatures.duration_ms / 60000)}:${Math.floor((audioFeatures.duration_ms % 60000) / 1000)}`,
				popularity: track.popularity,
				tempo: audioFeatures.tempo,
				liveness: audioFeatures.liveness,
				danceability: audioFeatures.danceability,
				energy: audioFeatures.energy
			}
		};

		modalStore.trigger(modal);
	}
</script>

<audio bind:this={audio} hidden></audio>

<div class="mt-24">
	<div class="space-y-8">
		{#each recommendedTracks as track}
			<div class="w-full flex justify-between items-center">
				<SpotifyItemCardSmall data={track} isSelected={true} onClick={() => console.log('clock')}>
					{#if track.previewUrl}
						<Button
							icon={currentlyPlayedTrackId === track.id && !audio.paused ? 'pause' : 'play'}
							onClick={() => handlePlayPauseClick(track.previewUrl, track.id)}
						/>
					{/if}

					<Button icon="bin" onClick={() => console.log('remove from list')} />

					<Button icon="info" onClick={() => console.log('click info')} />
				</SpotifyItemCardSmall>
			</div>
		{/each}
	</div>
</div>
