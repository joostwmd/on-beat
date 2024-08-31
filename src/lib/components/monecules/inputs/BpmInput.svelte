<script lang="ts">
	import NumberInputScreen from '$lib/components/atoms/input/NumberInput.svelte';
	import VerticalSlider from '$lib/components/atoms/input/VerticalSlider.svelte';

	let minTempo: number = 100;
	let maxTempo: number = 120;
	let prevMinTempo: number = minTempo;
	let prevMaxTempo: number = maxTempo;

	function updateMinTempo() {
		if (minTempo > maxTempo) {
			minTempo = prevMinTempo;
		} else {
			prevMinTempo = minTempo;
		}
		minTempo = minTempo;
	}

	function updateMaxTempo() {
		if (maxTempo < minTempo) {
			maxTempo = prevMaxTempo;
		} else {
			prevMaxTempo = maxTempo;
		}
		maxTempo = maxTempo;
	}

	$: minTempo, updateMinTempo();
	$: maxTempo, updateMaxTempo();
</script>

<div class="flex items-center space-x-4 mt-8">
	<div class="flex flex-col items-center">
		<div class="mb-4">
			<h6 class="h6 text-surface-500 mb-2 text-center">MIN TEMPO</h6>
			<NumberInputScreen bind:value={minTempo} />
		</div>

		<VerticalSlider bind:value={minTempo} />
	</div>

	<div class="flex flex-col items-center">
		<div class="mb-4">
			<h6 class="h6 text-surface-500 mb-2">MAX TEMPO</h6>
			<NumberInputScreen bind:value={maxTempo} />
		</div>

		<VerticalSlider bind:value={maxTempo} />
	</div>
</div>
