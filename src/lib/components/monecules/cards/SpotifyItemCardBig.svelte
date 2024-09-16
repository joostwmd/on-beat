<script lang="ts">
	import Pad from '$lib/components/atoms/Pad.svelte';
	import spotifyIcon from '$lib/icons/spotify.svg';
	import type { TSpotifyItemCard } from '$lib/spotifyClient/types';
	export let data: TSpotifyItemCard | undefined;
	export let isSelected: boolean = false;
	export let onClick: (item: any) => void = () => {};
</script>

{#if data}
	<div class="w-full flex flex-col items-start">
		<div class="w-full flex justify-between mb-4">
			<img src={spotifyIcon} class="w-8 h-8" alt="spotify icon" />

			<div class="flex space-x-2">
				<slot></slot>
			</div>
		</div>

		<Pad {onClick} {isSelected}>
			<div class="!bg-transparent max-w-[320px]">
				<section class="p-0">
					<img
						src={data.imageUrl}
						class="w-full aspect-square object-cover rounded-sm"
						alt="track cover"
					/>
				</section>

				<footer class="card-footer flex items-center justify-between p-0 mt-4">
					<div class="w-full flex flex-col items-start">
						{#if data.subtitle}
							<h6 class="h6 truncate text-surface-200 max-w-full" data-toc-ignore>
								{data.subtitle}
							</h6>
						{/if}

						<h3 class="h3 truncate text-surface-200 max-w-full" data-toc-ignore>{data.title}</h3>
					</div>
				</footer>
			</div>
		</Pad>
	</div>
{/if}
