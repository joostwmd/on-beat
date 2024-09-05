<script lang="ts">
	import PlaylistVisibilityInput from '$lib/components/monecules/inputs/PlaylistVisibilityInput.svelte';
</script>

<div class="mt-24 flex flex-col">
	<div class="">
		<div class="flex items-center justify-between">
			<h4 class="h4">VISIBILITY*</h4>
		</div>
		<p class="p text-gray-400 mt-4">will order the tracks in playlist by its bpm</p>
	</div>

	<div class="mt-8">
		<PlaylistVisibilityInput />
	</div>
</div>
