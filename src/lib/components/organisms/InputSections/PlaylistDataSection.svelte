<script lang="ts">
	import TextInput from '$lib/components/atoms/input/TextInput.svelte';
	import store from '$lib/spotifyClient/store';
	import { updateName, updateDescription } from '$lib/spotifyClient/store';
</script>

<div class="w-full max-w-[400px] mt-24">
	<div class="mt-8">
		<div class="">
			<h4 class="h4">NAME*</h4>
			<p class="p text-gray-400">
				set the name of your playlist. you can change it later on spotify
			</p>

			<TextInput handleOnInput={updateName} value={$store.name} placeholder="Name" />
		</div>
	</div>

	<div class="mt-8">
		<div class="">
			<h4 class="h4">DESCRIPTION*</h4>
			<p class="p text-gray-400">
				set the description of your playlist. you can change it later on spotify
			</p>

			<TextInput
				handleOnInput={updateDescription}
				value={$store.description}
				placeholder="Description"
			/>
		</div>
	</div>
</div>
