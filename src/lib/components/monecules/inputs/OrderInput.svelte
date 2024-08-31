<script lang="ts">
	import TextCard from '$lib/components/monecules/cards/TextCard.svelte';

	export let bpmOrderVal: 'bpm-ascending' | 'bpm-descending';
	export let isEnabled: boolean = false;

	let displayValue: string;

	function handleClick(value: 'bpm-ascending' | 'bpm-descending') {
		console.log('handle click', value, isEnabled);
		if (isEnabled) {
			displayValue = value;
			value = bpmOrderVal;
			console.log('new value', bpmOrderVal);
		}
	}
</script>

<div class="flex space-x-4">
	<TextCard
		text="BPM ASC"
		isSelected={displayValue === 'bpm-ascending'}
		onClick={() => handleClick('bpm-ascending')}
	/>

	<TextCard
		text="BPM DESC"
		isSelected={displayValue === 'bpm-descending'}
		onClick={() => handleClick('bpm-descending')}
	/>
</div>
