<script lang="ts">
	export let onClick: () => void;
	export let isSelected: boolean = false;
</script>

<button class="w-full h-fit" on:click={onClick}>
	<div class="{isSelected ? 'selected' : 'bg-surface-400'} w-full h-full rounded-sm p-[2px]">
		<div class="w-full h-full rounded-sm bg-black p-4 elevated">
			<slot></slot>
		</div>
	</div>
</button>

<style>
	.elevated {
		box-shadow:
			inset 0 5px 10px rgba(0, 0, 0, 0.25),
			inset 0 -5px 10px rgba(255, 255, 255, 0.1),
			0 5px 10px rgba(0, 0, 0, 0.4);
	}

	.selected {
		background: radial-gradient(circle, #e87757 0%, #ff3c06 100%);
	}
</style>
