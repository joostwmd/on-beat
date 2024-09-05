<script lang="ts">
	export let isEnabled = true;
	export let value: number;
	export let placeholder: string = '';
	export let handleOnInput: (val: number) => void;
	export let isError: boolean = false;
</script>

<input
	class={'input w-16 text-center' + (isError ? ' input-error' : '')}
	class:error={'input-error'}
	type="number"
	{placeholder}
	bind:value
	style="background-color: transparent !important"
	disabled={!isEnabled}
	on:input={(e) => handleOnInput(parseFloat(e.target?.value))}
/>

<style>
	.input {
		width: 88px;
		background: linear-gradient(
			to bottom right,
			#030303,
			#101010
		) !important; /* Darker linear gradient from top left to bottom right */
		color: white;
		font-family: 'Pixelify';
		padding: 10px;
		box-shadow:
			0 12px 24px rgba(0, 0, 0, 0.45),
			/* Stronger drop shadow for more elevation */ inset 0 -4px 8px rgba(0, 0, 0, 0.5),
			/* Darker first inner shadow for depth */ inset 4px 4px 8px rgba(255, 255, 255, 0.1); /* Darker second inner shadow for shine */
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		appearance: textfield;
		-moz-appearance: textfield;
	}
</style>
