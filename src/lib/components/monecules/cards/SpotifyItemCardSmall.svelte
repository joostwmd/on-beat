<script lang="ts">
	import type { TSpotifyItemCard } from '$lib/spotifyClient/types';
	export let data: TSpotifyItemCard | undefined;
</script>

{#if data}
	<div class="w-full h-12 flex justify-between">
		<div class="flex items-center">
			<img
				src={data.imageUrl}
				class="w-12 h-12 aspect-square object-cover rounded-sm"
				alt="track cover"
			/>

			<div class="flex flex-col items-start ml-4">
				{#if data.subtitle}
					<h6 class="h6 truncate text-surface-200" data-toc-ignore>
						{data.subtitle}
					</h6>
				{/if}

				<h3 class="h3 truncate text-surface-200" data-toc-ignore>{data.title}</h3>
			</div>
		</div>
	</div>
{/if}
