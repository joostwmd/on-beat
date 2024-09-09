<script lang="ts">
	import Pad from '$lib/components/atoms/Pad.svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import spotifyIcon from '$lib/icons/spotify.svg';

	type TSpotifyTrackModalData = {
		img: string;
		title: string;
		artist: string;
		album: string;
		albumType: string;
		releaseDate: string;
		duration: string;
		popularity: string;
		tempo: string;
		liveness: string;
		danceability: string;
		energy: string;
	};

	const modalStore = getModalStore();
	const data: TSpotifyTrackModalData = $modalStore[0].meta;
</script>

<div class="w-full flex flex-col items-start">
	<Pad isDisabled={true} isSelected={true}>
		<div class="w-full flex justify-between mb-4">
			<h4 class="h4">Spotify</h4>
			<img src={spotifyIcon} class="w-8 h-8" alt="spotify icon" />
		</div>
		<div class="!bg-transparent max-w-[320px]">
			<section class="p-0">
				<img
					src={data.img}
					class="w-full aspect-square object-cover rounded-sm"
					alt="track cover"
				/>
			</section>

			<footer class="card-footer flex flex-col items-start justify-between p-0 mt-4">
				<h6 class="h6 text-surface-200 text-left" data-toc-ignore>
					{data.artist}
				</h6>
				<h3 class="h3 text-surface-200 text-left" data-toc-ignore>{data.title}</h3>

				<div class="w-full flex-col items-start space-y-4 mt-12">
					<div class="w-full flex justify-between items-center">
						<h6 class="h6">Album</h6>
						<p class="p text-right w-10/12 break-words">{data.album}</p>
					</div>

					<div class="w-full flex justify-between items-center">
						<h6 class="h6">Release Date</h6>
						<p class="p">{data.releaseDate}</p>
					</div>

					<div class="w-full flex justify-between items-center">
						<h6 class="h6">Duration</h6>
						<p class="p">{data.duration}</p>
					</div>

					<div class="w-full flex justify-between items-center">
						<h6 class="h6">Popularity</h6>
						<p class="p">{data.popularity}</p>
					</div>

					<div class="w-full flex justify-between items-center">
						<h6 class="h6">Tempo</h6>
						<p class="p">{data.tempo}</p>
					</div>

					<div class="w-full flex justify-between items-center">
						<h6 class="h6">Liveness</h6>
						<p class="p">{data.liveness}</p>
					</div>

					<div class="w-full flex justify-between items-center">
						<h6 class="h6">Danceability</h6>
						<p class="p">{data.danceability}</p>
					</div>

					<div class="w-full flex justify-between items-center">
						<h6 class="h6">Energy</h6>
						<p class="p">{data.energy}</p>
					</div>
				</div>
			</footer>
		</div>
	</Pad>
</div>
