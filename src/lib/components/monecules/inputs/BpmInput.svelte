<script lang="ts">
	export let isError: boolean = false;
	import gsap from 'gsap';
	import NumberInput from '$lib/components/atoms/input/NumberInput.svelte';
	import VerticalSlider from '$lib/components/atoms/input/VerticalSlider.svelte';
	import store, { updateMaxBpm, updateMinBpm } from '$lib/spotifyClient/store';
	import { MAX_BPM, MIN_BPM } from '$lib/spotifyClient/constants';

	let minSlider: VerticalSlider;
	let maxSlider: VerticalSlider;

	function animateSlider(slider: VerticalSlider, fromVal: number, toVal: number) {
		if (toVal < MIN_BPM) {
			toVal = MIN_BPM;
		} else if (toVal > MAX_BPM) {
			toVal = MAX_BPM;
		} else if (!toVal) {
			toVal = MIN_BPM;
		}

		let animation: gsap.core.Tween = gsap
			.from(slider, {
				value: toVal,
				ease: 'power2.out',
				duration: 0.5,
				onUpdate: function () {
					if (this.progress() === 0) {
						slider.value = fromVal;
					}

					if (!toVal) {
						console.log('edgy');
					}

					if (fromVal < toVal) {
						slider.value = fromVal + (toVal - fromVal) * this.progress();
					} else {
						slider.value = fromVal - (fromVal - toVal) * this.progress();
					}
				}
			})
			.pause();
		animation.play(animation.progress() < 1 ? animation.time() : 0);
	}
</script>

<div class="flex items-center space-x-4 mt-8">
	<div class="flex flex-col items-center">
		<div class="mb-4">
			<h6 class="h6 text-surface-500 mb-2 text-center">MIN TEMPO</h6>
			<NumberInput
				{isError}
				value={$store.bpm.min}
				handleOnInput={(newVal) => {
					animateSlider(minSlider, $store.bpm.min, newVal);
					updateMinBpm(newVal);
				}}
			/>
		</div>
		<VerticalSlider bind:this={minSlider} value={$store.bpm.min} handleOnInput={updateMinBpm} />
	</div>
	<div class="flex flex-col items-center">
		<div class="mb-4">
			<h6 class="h6 text-surface-500 mb-2">MAX TEMPO</h6>
			<NumberInput
				{isError}
				value={$store.bpm.max}
				handleOnInput={(newVal) => {
					animateSlider(maxSlider, $store.bpm.max, newVal);
					updateMaxBpm(newVal);
				}}
			/>
		</div>
		<VerticalSlider bind:this={maxSlider} value={$store.bpm.max} handleOnInput={updateMaxBpm} />
	</div>
</div>
