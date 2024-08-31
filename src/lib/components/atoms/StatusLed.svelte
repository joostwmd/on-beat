<script lang="ts">
	export let status: 'success' | 'warning' | 'error';
</script>

<div id="led-outline" class="flex flex-col items-center p-1">
	<div
		class="w-2 h-6 {status === 'success'
			? 'green-gradient'
			: status === 'warning'
				? 'orange-gradient'
				: 'red-gradient'}"
	></div>
</div>

<style>
	#led-outline {
		display: inline-block;
		padding: 4px;
		height: fit-content;
		box-shadow:
			inset -2px -2px 4px -2px rgba(255, 255, 255, 0.25),
			inset 2px 2px 4px -2px rgba(0, 0, 0, 0.3);
	}
	.green-gradient {
		background: radial-gradient(circle at center, #f3ff50, #abcb0f);
	}
	.red-gradient {
		background: radial-gradient(circle at center, #f83b43, #c73339);
	}
	.orange-gradient {
		background: radial-gradient(circle at center, #ffaf5d, #f89a3f);
	}
</style>
