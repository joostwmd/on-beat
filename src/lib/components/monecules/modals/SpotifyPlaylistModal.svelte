<script lang="ts">
	import Pad from '$lib/components/atoms/Pad.svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import spotifyIcon from '$lib/icons/spotify.svg';

	type TSpotifyPlaylistModalData = {
		title: string;
		description: string;
		img: string;
		owner: string;
		numberOfTracks: number;
		totalDuration: number;
		followers: number;
	};

	const modalStore = getModalStore();
	const data: TSpotifyPlaylistModalData = $modalStore[0].meta;

	function msToTime(duration: number) {
		let seconds: string | number = Math.floor((duration / 1000) % 60);
		let minutes: string | number = Math.floor((duration / (1000 * 60)) % 60);
		let hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24);

		hours = hours < 10 ? '0' + hours : hours;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;

		return hours + ':' + minutes + ':' + seconds;
	}
</script>

<div class="w-full flex flex-col items-start">
	<Pad isDisabled={true} isSelected={false}>
		<div class="w-full flex flex-col items-center">
			<div class="max-w-[320px]">
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
						<!-- <h6 class="h6 text-surface-200 text-left" data-toc-ignore>
							{data.title}
						</h6> -->
						<h3 class="h3 text-surface-200 text-left" data-toc-ignore>{data.description}</h3>

						<div class="w-full flex-col items-start space-y-4 mt-12">
							<div class="w-full flex justify-between items-center">
								<h6 class="h6">Owner</h6>
								<p class="p text-right w-10/12 break-words">{data.owner}</p>
							</div>

							<!-- <div class="w-full flex justify-between items-center">
								<h6 class="h6">Number of Tracks</h6>
								<p class="p">{data.numberOfTracks}</p>
							</div>

							<div class="w-full flex justify-between items-center">
								<h6 class="h6">Duration</h6>
								<p class="p">{msToTime(data.totalDuration)}</p>
							</div> -->

							<div class="w-full flex justify-between items-center">
								<h6 class="h6">Followers</h6>
								<p class="p">{data.followers}</p>
							</div>
						</div>
					</footer>
				</div>
			</div>
		</div>
	</Pad>
</div>
