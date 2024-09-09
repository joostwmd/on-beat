<script lang="ts">
	import spotifyIcon from '$lib/icons/spotify.svg';
	import type { TSpotifyItemCard } from '$lib/spotifyClient/types';
	export let data: TSpotifyItemCard | undefined;
</script>

{#if data}
	<div class="w-full h-12">
		<div class="w-full flex items-center">
			<img
				src={data.imageUrl}
				class="w-12 h-12 aspect-square object-cover rounded-sm"
				alt="track cover"
			/>

			<div class="w-full max-w-full flex flex-col items-start ml-4 inline-block min-w-0">
				{#if data.subtitle}
					<h6 class="h6 text-surface-200 truncate max-w-full overflow-hidden">
						{data.subtitle}
					</h6>
				{/if}

				<h3 class="h3 text-surface-200 truncate max-w-full overflow-hidden">
					{data.title}
				</h3>
			</div>

			<img src={spotifyIcon} class="w-10 h-10" alt="spotify icon" />
		</div>
	</div>
{/if}
