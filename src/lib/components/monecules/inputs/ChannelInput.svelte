<script lang="ts">
	import OnOffSetting from '$lib/components/atoms/OnOffSetting.svelte';
	import KnobInput from '../../atoms/input/KnobInput.svelte';
	import NumberInput from '../../atoms/input/NumberInput.svelte';
	export let channel: string;
	export let value: number;

	let isToggled = false;
</script>

<div class="flex flex-col items-center">
	<OnOffSetting bind:isToggled />

	<p class="p text-surface-400 mt-2">{channel.toUpperCase()}</p>

	<KnobInput bind:value isEnabled={isToggled} />
	<NumberInput bind:value isEnabled={isToggled} />
</div>
