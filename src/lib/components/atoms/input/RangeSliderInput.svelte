<script lang="ts">
	export let value;
	export let direction: 'rtl' | 'ltr' = 'ltr';
</script>

<div class="w-full">
	<input class="range-slider" type="range" {value} max="100" style="direction: {direction};" />
</div>

<style>
	.range-slider {
		width: 100%;
		border-radius: none !important;
	}

	.range-slider::-webkit-slider-thumb {
		border-radius: 50%;
		box-shadow: 0px 0px 10px black;
	}

	.range-slider::-moz-range-thumb {
		box-shadow: 0px 0px 10px black;
	}

	.range-slider::-ms-thumb {
		box-shadow: 0px 0px 10px black;
	}
</style>
