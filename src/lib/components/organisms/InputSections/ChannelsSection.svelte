<script lang="ts">
	import store from '$lib/spotifyClient/store';
	import ChannelInput from '$lib/components/monecules/inputs/ChannelInput.svelte';
	import type { TChannelTypes } from '$lib/spotifyClient/types';

	const CHANNELS: TChannelTypes[] = ['danceability', 'energy', 'liveness', 'speechiness'];
</script>

<div class="mt-24 flex flex-col w-full">
	<div class="">
		<div class="flex items-center justify-between">
			<h4 class="h4">CHANNELS</h4>
		</div>
		<p class="p text-gray-400 mt-4">
			will impact the sound of the recommended songs. you can use multiple channels
		</p>
	</div>

	<div class="mt-8">
		<div class="grid grid-cols-2 gap-x-4 gap-y-8">
			{#each CHANNELS as channel}
				<ChannelInput {channel} />
			{/each}
		</div>
	</div>
</div>
