<script lang="ts">
	import TextCard from '$lib/components/monecules/cards/TextCard.svelte';
	import store, { togglePlaylistPublicState } from '$lib/spotifyClient/store';
</script>

<div class="flex space-x-4">
	<TextCard text="PRIVATE" isSelected={!$store.isPublic} onClick={togglePlaylistPublicState} />

	<TextCard text="PUBLIC" isSelected={$store.isPublic} onClick={togglePlaylistPublicState} />
</div>
