<svelte:options accessors />

<script lang="ts">
	import { MAX_BPM, MIN_BPM } from '$lib/spotifyClient/constants';
	export let value: number;
	export let handleOnInput: (val: number) => void;
</script>

<div id="vertical-slider-wrapper">
	<input
		id="vertical-slider"
		type="range"
		on:input={(e) => handleOnInput(Number(e.target?.value))}
		bind:value
		min={MIN_BPM}
		max={MAX_BPM}
		step="1"
	/>
</div>

<style>
	#vertical-slider-wrapper {
		width: 48px;
		height: 280px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	#vertical-slider {
		appearance: none;
		-webkit-appearance: none;
		background: transparent;
		direction: rtl;
		rotate: 90deg;
		width: 280px;
		transition: background-position 0.3s ease-in-out; /* Add transition for smooth animation */
	}
	/* Adjusted Style for WebKit-based browsers */
	#vertical-slider::-webkit-slider-thumb {
		appearance: none;
		-webkit-appearance: none;
		width: 60px;
		height: 28px;
		background-image: url('/src/lib/icons/slider-thumb.svg');
		cursor: pointer; /* Cursor on hover over the thumb */
		margin-top: -10px; /* Adjust this value to center the thumb on the track */
		rotate: 90deg;
		transition: transform 0.3s ease-in-out; /* Add transition for smooth animation */
	}
	/* Adjusted Style for Firefox */
	#vertical-slider::-moz-range-thumb {
		width: 60px; /* Width of the thumb */
		height: 28px; /* Height of the thumb */
		background-image: url('/src/lib/icons/slider-thumb.svg');
		cursor: pointer; /* Cursor on hover over the thumb */
		margin-top: -10px; /* Adjust this value to center the thumb on the track */
		rotate: 90deg;
		transition: transform 0.3s ease-in-out; /* Add transition for smooth animation */
	}
	/* Style for WebKit-based browsers */
	#vertical-slider::-webkit-slider-runnable-track {
		width: 100%; /* Track width (could be adjusted) */
		height: 8px; /* Track height */
		background: #1c1c1c linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)); /* Gradient with "outline" */
		border-radius: 2px; /* Makes the track have rounded corners */
		cursor: pointer; /* Cursor on hover over the track */
		box-shadow: 0 0 0 2px #000; /* Simulating outline with box-shadow */
	}
	/* Style for Firefox */
	#vertical-slider::-moz-range-track {
		width: 100%; /* Track width (could be adjusted) */
		height: 8px; /* Track height */
		background: #1c1c1c linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)); /* Gradient with "outline" */
		border-radius: 4px; /* Makes the track have rounded corners */
		cursor: pointer; /* Cursor on hover over the track */
		box-shadow: 0 0 0 2px #000; /* Simulating outline with box-shadow */
	}
</style>
