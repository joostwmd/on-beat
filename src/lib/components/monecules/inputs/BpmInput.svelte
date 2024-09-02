<script lang="ts">
	import NumberInput from '$lib/components/atoms/input/NumberInput.svelte';
	import VerticalSlider from '$lib/components/atoms/input/VerticalSlider.svelte';
	import store, { updateMaxBpm, updateMinBpm } from '$lib/spotifyClient/store';
</script>

<div class="flex items-center space-x-4 mt-8">
	<div class="flex flex-col items-center">
		<div class="mb-4">
			<h6 class="h6 text-surface-500 mb-2 text-center">MIN TEMPO</h6>
			<NumberInput value={$store.bpm.min} handleOnInput={updateMinBpm} />
		</div>
		<VerticalSlider value={$store.bpm.min} handleOnInput={updateMinBpm} />
	</div>
	<div class="flex flex-col items-center">
		<div class="mb-4">
			<h6 class="h6 text-surface-500 mb-2">MAX TEMPO</h6>
			<NumberInput value={$store.bpm.max} handleOnInput={updateMaxBpm} />
		</div>
		<VerticalSlider value={$store.bpm.max} handleOnInput={updateMaxBpm} />
	</div>
</div>
