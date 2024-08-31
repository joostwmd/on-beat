<script>
	import ChannelInput from '$lib/components/monecules/inputs/ChannelInput.svelte';

	const CHANNELS = [
		{ channel: 'danceability', value: 50 },
		{ channel: 'energy', value: 50 },
		{ channel: 'liveness', value: 50 },
		{ channel: 'speechiness', value: 50 }
	];
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
			{#each CHANNELS as { channel, value }, i}
				<ChannelInput {channel} {value} />
			{/each}
		</div>
	</div>
</div>
