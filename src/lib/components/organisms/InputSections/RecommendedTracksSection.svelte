<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte';
	import SpotifyItemCardSmall from '$lib/components/monecules/cards/SpotifyItemCardSmall.svelte';
	import { handleInfoClick } from '$lib/spotifyClient/utils';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import store, { removeRecommendedTrack } from '$lib/spotifyClient/store';
	import { SPOTIFY_KEYS } from '$lib/spotifyClient/constants';
	import Frame from '$lib/components/atoms/Frame.svelte';
	import spotifyIcon from '$lib/icons/spotify.svg';

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
</script>

<audio bind:this={audio} hidden></audio>

<div class="mt-24">
	<div class="space-y-8">
		{#each $store.recommendedTracks as track}
			<div class="w-full flex justify-between items-center">
				<SpotifyItemCardSmall data={track} isSelected={true} onClick={() => console.log('clock')}>
					<div class="w-fit h-fit flex items-center">
						<img src={spotifyIcon} class="w-8 h-8 mr-8" alt="spotify icon" />

						<p class="p text-gray-400 text-sm mr-2">{Math.floor(track.tempo)}</p>
						<p class="p text-gray-400 text-sm">{SPOTIFY_KEYS[track.key]}</p>
					</div>

					<div class="flex space-x-2 items-center">
						{#if track.previewUrl}
							<Button
								icon={currentlyPlayedTrackId === track.id && !audio.paused ? 'pause' : 'play'}
								onClick={() => handlePlayPauseClick(track.previewUrl, track.id)}
							/>
						{/if}

						<Button icon="bin" onClick={() => removeRecommendedTrack(track)} />

						<Button icon="info" onClick={() => handleInfoClick('track', track, modalStore)} />
					</div>
				</SpotifyItemCardSmall>
			</div>
		{/each}
	</div>
</div>
