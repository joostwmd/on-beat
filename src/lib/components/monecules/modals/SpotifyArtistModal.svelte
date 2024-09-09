<script lang="ts">
	import Pad from '$lib/components/atoms/Pad.svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import spotifyIcon from '$lib/icons/spotify.svg';

	type TSpotifyArtistModalData = {
		title: string;
		img: string;
		genres: string[];
		followers: number;
		popularity: number;
	};

	const modalStore = getModalStore();
	const data: TSpotifyArtistModalData = $modalStore[0].meta;
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
				<h3 class="h3 text-surface-200" data-toc-ignore>{data.title}</h3>

				<div class="w-full flex-col items-start space-y-4 mt-12">
					{#if data.genres.length > 0}
						<div class="w-full flex justify-between items-center">
							<h6 class="h6">Genres</h6>
							<p class="p">{data.genres.join(', ')}</p>
						</div>
					{/if}

					<div class="w-full flex justify-between items-center">
						<h6 class="h6 text-surface-200">Followers</h6>
						<p class="p text-surface-200">{data.followers}</p>
					</div>

					<div class="w-full flex justify-between items-center">
						<h6 class="h6 text-surface-200">Popularity</h6>
						<p class="p text-surface-200">{data.popularity}</p>
					</div>
				</div>
			</footer>
		</div>
	</Pad>
</div>
