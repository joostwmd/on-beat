<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte';
	import Pad from '$lib/components/atoms/Pad.svelte';
	import type { TSpotifyItemCard } from '$lib/spotifyClient/types';
	export let data: TSpotifyItemCard | undefined;
	export let onClick: () => void;
	export let isSelected: boolean;
</script>

{#if data}
	<div class="w-full flex flex-col items-start">
		<div class="w-full flex items-center justify-between mb-4">
			<slot></slot>
		</div>

		<Pad {onClick} {isSelected}>
			<div class="w-full h-fit">
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
				</div>
			</div>
		</Pad>
	</div>
{/if}
