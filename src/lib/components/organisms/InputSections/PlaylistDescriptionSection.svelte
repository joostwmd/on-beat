<script lang="ts">
	import TextInput from '$lib/components/atoms/input/TextInput.svelte';
	import StatusLed from '$lib/components/atoms/StatusLed.svelte';
	import store from '$lib/spotifyClient/store';
	import { updateDescription } from '$lib/spotifyClient/store';
</script>

<div class="w-full mt-24">
	<div class="mt-24">
		<div class="w-full flex justify-between items-center mb-4">
			<h4 class="h4">DESCRIPTION*</h4>
			<StatusLed status={$store.description ? 'success' : 'error'} />
		</div>

		<p class="p text-gray-400 mb-8">description of playlist</p>

		<TextInput
			handleOnInput={updateDescription}
			value={$store.description}
			placeholder="description"
		/>
	</div>
</div>
