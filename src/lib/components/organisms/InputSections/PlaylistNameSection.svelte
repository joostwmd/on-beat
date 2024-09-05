<script lang="ts">
	import TextInput from '$lib/components/atoms/input/TextInput.svelte';
	import StatusLed from '$lib/components/atoms/StatusLed.svelte';
	import store from '$lib/spotifyClient/store';
	import { updateName } from '$lib/spotifyClient/store';
</script>

<div class="w-full mt-24">
	<div class="">
		<div class="w-full flex justify-between items-center mb-4">
			<h4 class="h4">NAME*</h4>
			<StatusLed status={$store.name ? 'success' : 'error'} />
		</div>

		<p class="p text-gray-400 mb-8">
			set the name of your playlist. you can change it later on spotify
		</p>

		<TextInput handleOnInput={updateName} value={$store.name} placeholder="Name" />
	</div>
</div>
