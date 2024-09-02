<script lang="ts">
	export let isEnabled: boolean = true;
	export let icon: 'back' | 'bin' | 'info' | 'plus';
	export let onClick: () => void;
	import arrowIcon from '$lib/icons/arrow.svg';
	import binIcon from '$lib/icons/bin.svg';
	import infoIcon from '$lib/icons/info.svg';
	import plusIcon from '$lib/icons/plus.svg';
	const iconMap = { back: arrowIcon, bin: binIcon, info: infoIcon, plus: plusIcon };
</script>

<button
	on:click={onClick}
	id="rect-button"
	class="w-12 h-8 flex flex-col items-center justify-center"
	disabled={!isEnabled}
>
	<img src={iconMap[icon]} alt="icon" />
</button>

<style>
	#rect-button {
		background-color: #222; /* Dark background */
		border: 2px solid #111; /* Darker border for embedded effect */
		border-radius: 4px; /* Rounded corners */
		box-shadow:
			inset 0 2px 4px rgba(255, 255, 255, 0.06),
			/* Less bright inner shadow for height */ inset 0 -2px 4px rgba(0, 0, 0, 0.7); /* Darker inner shadow for depth */
		transition: transform 0.1s; /* Smooth transition for click effect */
	}
	#rect-button:active {
		transform: translateY(2px); /* Simulate button press */
	}

	#rect-button:disabled {
		cursor: not-allowed; /* Change cursor to indicate the button is not clickable */
	}
</style>
