<script lang="ts">
	import OnOffSetting from '$lib/components/atoms/OnOffSetting.svelte';
	import KnobInput from '../../atoms/input/KnobInput.svelte';
	import NumberInput from '../../atoms/input/NumberInput.svelte';
	import store, { toggleChannelActiveState, updateChannelValue } from '$lib/spotifyClient/store';
	import type { TChannelTypes } from '$lib/spotifyClient/types';
	export let channel: TChannelTypes;

	function handleOnToggle() {
		toggleChannelActiveState(channel);
	}

	function handleOnInput(value: number) {
		updateChannelValue(channel, value);
	}
</script>

<div class="flex flex-col items-center">
	<OnOffSetting isToggled={$store.channels[channel].active} {handleOnToggle} />

	<p class="p text-surface-400 mt-2">{channel.toUpperCase()}</p>

	<KnobInput
		{handleOnInput}
		value={$store.channels[channel].value}
		isEnabled={$store.channels[channel].active}
	/>

	<NumberInput
		value={$store.channels[channel].value}
		isEnabled={$store.channels[channel].active}
		{handleOnInput}
	/>
</div>
