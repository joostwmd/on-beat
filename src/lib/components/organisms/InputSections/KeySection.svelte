<script lang="ts">
	import OnOffSetting from '$lib/components/atoms/OnOffSetting.svelte';
	import KeyInput from '$lib/components/monecules/inputs/KeyInput.svelte';

	let isToggled: boolean = false;
</script>

<div class="mt-24 flex flex-col">
	<div class="">
		<div class="flex items-center justify-between">
			<h4 class="h4">KEY</h4>

			<OnOffSetting bind:isToggled />
		</div>
		<p class="p text-gray-400 mt-4">will impact the key of the recommended song</p>
	</div>

	<div class="mt-8">
		<KeyInput isEnabled={isToggled} />
	</div>
</div>
