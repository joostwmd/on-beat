<script lang="ts">
	import knob from '$lib/icons/knob.svg';
	import knobOutline from '$lib/icons/knob-outline.svg';
	export let isEnabled = true;

	export let rotRange = 2 * Math.PI * 0.83;
	export let pixelRange = 200;
	export let startRotation = -Math.PI * 0.83;
	export let min = 0;
	export let max = 100;
	export let value = 50;
	let knobImageEl: HTMLImageElement;
	let startY, startValue;
	let isInteracting = false; // Flag to track active interaction

	$: valueRange = max - min;
	$: rotation = startRotation + ((value - min) / valueRange) * rotRange;

	function clamp(num, min, max) {
		return Math.round(Math.max(min, Math.min(num, max)));
	}

	function touchMove(event) {
		if (!isInteracting || !isEnabled) return; // Only proceed if actively interacting and enabled
		event.preventDefault(); // Prevent default scroll behavior
		const clientY = event.touches[0].clientY;
		const valueDiff = (valueRange * (clientY - startY)) / pixelRange;
		value = clamp(startValue - valueDiff, min, max);
	}

	function touchStart(event) {
		if (!isEnabled) return; // Only proceed if enabled
		isInteracting = true; // Set interaction flag
		knobImageEl.classList.remove('knob-image-transition');
		const clientY = event.touches[0].clientY;
		startY = clientY;
		startValue = value;
		window.addEventListener('touchmove', touchMove, { passive: false });
		window.addEventListener('touchend', touchEnd);
	}

	function touchEnd() {
		isInteracting = false; // Clear interaction flag
		window.removeEventListener('touchmove', touchMove);
		window.removeEventListener('touchend', touchEnd);
		knobImageEl.classList.add('knob-image-transition');
	}

	function pointerMove(event) {
		if (!isInteracting || !isEnabled) return; // Only proceed if actively interacting and enabled
		event.preventDefault(); // Prevent default scroll behavior
		knobImageEl.classList.remove('knob-image-transition');
		const clientY = event.clientY;
		const valueDiff = (valueRange * (clientY - startY)) / pixelRange;
		value = clamp(startValue - valueDiff, min, max);
	}

	function pointerDown(event) {
		if (!isEnabled) return; // Only proceed if enabled
		isInteracting = true; // Set interaction flag
		knobImageEl.classList.remove('knob-image-transition');
		const clientY = event.clientY;
		startY = clientY;
		startValue = value;
		window.addEventListener('pointermove', pointerMove, { passive: false });
		window.addEventListener('pointerup', pointerUp);
	}

	function pointerUp() {
		isInteracting = false; // Clear interaction flag
		window.removeEventListener('pointermove', pointerMove);
		window.removeEventListener('pointerup', pointerUp);
		knobImageEl.classList.add('knob-image-transition');
	}
</script>

<div
	class="p-4 knob-container"
	on:touchstart={touchStart}
	on:pointerdown={pointerDown}
	on:pointerup={pointerUp}
	on:scroll={(e) => e.stopPropagation()}
	class:disabled={!isEnabled}
>
	<div class="w-24 h-24 relative select-none flex items-center justify-center">
		<div class="z-10 absolute">
			<img src={knobOutline} alt="knob" class="pointer-events-none w-24 h-24" />
		</div>
		<div class="z-10 absolute">
			<img
				src={knob}
				bind:this={knobImageEl}
				alt="knob"
				class="pointer-events-none w-24 h-24 knob-image-transition"
				style="transform: rotate({rotation}rad); filter: drop-shadow(0px 0px 10px black);"
			/>
		</div>
	</div>
</div>

<style>
	.knob-container {
		touch-action: none;
	}
	.knob-image-transition {
		transition: transform 0.3s ease-in-out;
	}
	.disabled {
		opacity: 0.5; /* Visual indication of disabled state */
	}
</style>
