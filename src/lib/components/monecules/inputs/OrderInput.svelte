<script lang="ts">
	import TextCard from '$lib/components/monecules/cards/TextCard.svelte';
	import store, { updateBpmOrderValue } from '$lib/spotifyClient/store';

	let displayValue: string;
	function handleClick(value: 'bpm-ascending' | 'bpm-descending') {
		if ($store.bpmOrder.active) {
			displayValue = value;
			updateBpmOrderValue(value);
		}
	}
</script>

<div class="flex space-x-4">
	<TextCard
		text="BPM ASC"
		isSelected={displayValue === 'bpm-ascending' && $store.bpmOrder.active}
		onClick={() => handleClick('bpm-ascending')}
	/>

	<TextCard
		text="BPM DESC"
		isSelected={displayValue === 'bpm-descending' && $store.bpmOrder.active}
		onClick={() => handleClick('bpm-descending')}
	/>
</div>
