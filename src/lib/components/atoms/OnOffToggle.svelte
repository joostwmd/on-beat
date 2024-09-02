<script lang="ts">
	import onOffSwitchThumb from '$lib/icons/on-off-switch.svg';

	export let isToggled: boolean = false;
	export let handleOnToggle: () => void;
</script>

<div class="flex">
	<div class="w-16 flex flex-col items-center">
		<div class="w-5/6 flex justify-between mb-2">
			<p class="p text-xs {isToggled ? 'text-surface-600' : 'text-surface-300'}">OFF</p>
			<p class="p text-xs {isToggled ? 'text-surface-300' : 'text-surface-600'}">ON</p>
		</div>
		<button
			id="outline-toggle"
			class="rounded w-full h-6 flex items-center relative overflow-hidden"
			on:click={handleOnToggle}
		>
			<img
				src={onOffSwitchThumb}
				alt="On/Off switch"
				class="w-8 h-5 drop-shadow absolute transition-transform duration-300"
				style="transform: translateX({isToggled ? '100%' : '0%'});"
			/>
		</button>
	</div>
</div>

<style>
	#outline-toggle {
		box-shadow:
			inset -2px -2px 2px -2px rgba(255, 255, 255, 0.2),
			inset 2px 2px 4px -2px rgba(0, 0, 0, 0.3);
	}
</style>
