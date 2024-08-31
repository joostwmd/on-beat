<script lang="ts">
	import spotifyIcon from '$lib/icons/spotify.svg';
	import type { TSpotifyItemCard } from '$lib/spotifyClient/types';
	export let data: TSpotifyItemCard | undefined;
</script>

{#if data}
	<div class="!bg-transparent max-w-[320px] p-0">
		<section class="p-0">
			<img
				src={data.imageUrl}
				class="w-full aspect-square object-cover rounded-sm"
				alt="track cover"
			/>
		</section>

		<footer class="card-footer flex items-center justify-between p-0 mt-4">
			<div class="flex flex-col items-start">
				{#if data.subtitle}
					<h6 class="h6 truncate text-surface-200" data-toc-ignore>
						{data.subtitle}
					</h6>
				{/if}

				<h3 class="h3 truncate text-surface-200" data-toc-ignore>{data.title}</h3>
			</div>

			<img src={spotifyIcon} class="w-10 h-10" alt="spotify icon" />
		</footer>
	</div>
{/if}
