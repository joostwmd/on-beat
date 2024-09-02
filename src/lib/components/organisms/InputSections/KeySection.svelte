<script lang="ts">
	import OnOffSetting from '$lib/components/atoms/OnOffSetting.svelte';
	import KeyInput from '$lib/components/monecules/inputs/KeyInput.svelte';

	import store, { toggleKeyActiveState } from '$lib/spotifyClient/store';
</script>

<div class="mt-24 flex flex-col">
	<div class="">
		<div class="flex items-center justify-between">
			<h4 class="h4">KEY</h4>

			<OnOffSetting isToggled={$store.key.active} handleOnToggle={toggleKeyActiveState} />
		</div>
		<p class="p text-gray-400 mt-4">will impact the key of the recommended song</p>
	</div>

	<div class="mt-8">
		<KeyInput isEnabled={$store.key.active} />
	</div>
</div>
