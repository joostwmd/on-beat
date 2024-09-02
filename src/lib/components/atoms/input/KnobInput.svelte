<script lang="ts">
	import knob from '$lib/icons/knob.svg';
	import knobOutline from '$lib/icons/knob-outline.svg';

	// Define types for props
	export let isEnabled: boolean = true;
	export let value: number = 50;
	export let handleOnInput: (newValue: number) => void; // New prop for handling input

	let rotRange: number = 2 * Math.PI * 0.83;
	let pixelRange: number = 200;
	let startRotation: number = -Math.PI * 0.83;
	let min: number = 0;
	let max: number = 100;

	let knobImageEl: HTMLImageElement;
	let startY: number, startValue: number;
	let isInteracting: boolean = false;

	$: valueRange = max - min;
	$: rotation = startRotation + ((value - min) / valueRange) * rotRange;

	function clamp(num: number, min: number, max: number): number {
		return Math.round(Math.max(min, Math.min(num, max)));
	}

	function touchMove(event: TouchEvent): void {
		if (!isInteracting || !isEnabled) return;
		event.preventDefault();
		const clientY = event.touches[0].clientY;
		const valueDiff = (valueRange * (clientY - startY)) / pixelRange;
		const newValue = clamp(startValue - valueDiff, min, max);
		value = newValue;
		handleOnInput(newValue); // Call the handler with the new value
	}

	function touchStart(event: TouchEvent): void {
		if (!isEnabled) return;
		isInteracting = true;
		knobImageEl.classList.remove('knob-image-transition');
		const clientY = event.touches[0].clientY;
		startY = clientY;
		startValue = value;
		window.addEventListener('touchmove', touchMove, { passive: false });
		window.addEventListener('touchend', touchEnd);
	}

	function touchEnd(): void {
		isInteracting = false;
		window.removeEventListener('touchmove', touchMove);
		window.removeEventListener('touchend', touchEnd);
		knobImageEl.classList.add('knob-image-transition');
	}

	function pointerMove(event: PointerEvent): void {
		if (!isInteracting || !isEnabled) return;
		event.preventDefault();
		knobImageEl.classList.remove('knob-image-transition');
		const clientY = event.clientY;
		const valueDiff = (valueRange * (clientY - startY)) / pixelRange;
		const newValue = clamp(startValue - valueDiff, min, max);
		value = newValue;
		handleOnInput(newValue); // Call the handler with the new value
	}

	function pointerDown(event: PointerEvent): void {
		if (!isEnabled) return;
		isInteracting = true;
		knobImageEl.classList.remove('knob-image-transition');
		const clientY = event.clientY;
		startY = clientY;
		startValue = value;
		window.addEventListener('pointermove', pointerMove, { passive: false });
		window.addEventListener('pointerup', pointerUp);
	}

	function pointerUp(): void {
		isInteracting = false;
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
