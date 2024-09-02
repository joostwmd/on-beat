<script lang="ts">
	export let value: string;
	export let placeholder: string;
	export let disabled: boolean = false;
	export let handleOnInput: (val: string) => void;
</script>

<input
	on:input={(e) => handleOnInput(e.target.value)}
	class="input"
	type="text"
	{placeholder}
	bind:value
	{disabled}
/>

<style>
	.input {
		width: 100%;
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
</style>
