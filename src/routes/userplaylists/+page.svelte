<script lang="ts">
	import SpotifyItemCard from '$lib/components/SpotifyItemCard.svelte';
	import { handleGetUsersPlaylists } from '$lib/spotifyClient';
	import { transformSearchResultData } from '$lib/spotifyClient/constants';
	import { onMount } from 'svelte';

	let userPlaylists: any[] | null = null;
	onMount(async () => {
		const data = await handleGetUsersPlaylists();
		userPlaylists = data.items;
	});
</script>

{#if userPlaylists}
	<div
		class="w-screen h-screen bg-black overflow-y-scroll pt-8 pb-32 px-8 flex flex-col items-center"
	>
		{#each userPlaylists as playlist}
			<SpotifyItemCard data={transformSearchResultData(playlist, 'playlist')} />
		{/each}
	</div>
{/if}
