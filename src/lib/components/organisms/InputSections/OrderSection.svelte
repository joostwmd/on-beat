<script lang="ts">
	import OnOffSetting from '$lib/components/atoms/OnOffSetting.svelte';
	import OrderInput from '$lib/components/monecules/inputs/OrderInput.svelte';

	let isToggled: boolean = false;
	let bpmOrderVal: 'bpm-ascending' | 'bpm-descending';
</script>

<div class="mt-24 flex flex-col">
	<div class="">
		<div class="flex items-center justify-between">
			<h4 class="h4">ORDER</h4>
			<OnOffSetting bind:isToggled />
		</div>
		<p class="p text-gray-400 mt-4">will order the tracks in playlist by its bpm</p>
	</div>

	<div class="mt-8">
		<OrderInput bind:bpmOrderVal isEnabled={isToggled} />
	</div>
</div>
