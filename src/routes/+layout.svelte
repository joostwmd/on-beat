<script lang="ts">
	import ChooseSeedType from '$lib/components/ChooseSeedType.svelte';
	import SpotifyTrackModal from '$lib/components/monecules/modals/SpotifyTrackModal.svelte';
	import SpotifyArtistModal from '$lib/components/monecules/modals/SpotifyArtistModal.svelte';
	import SpotifyPlaylistModal from '$lib/components/monecules/modals/SpotifyPlaylistModal.svelte';
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { getDrawerStore, storePopup, type ModalComponent } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { initializeStores, Drawer, Modal } from '@skeletonlabs/skeleton';
	initializeStores();
	const drawerStore = getDrawerStore();

	const modalRegistry: Record<string, ModalComponent> = {
		trackModal: { ref: SpotifyTrackModal },
		artistModal: { ref: SpotifyArtistModal },
		playlistModal: { ref: SpotifyPlaylistModal }
	};
</script>

<slot />
<Drawer bgBackdrop="bg-transparent" blur="backdrop-blur">
	{#if $drawerStore.id === 'choose-seed-type'}
		<ChooseSeedType />
	{/if}
</Drawer>

<Modal components={modalRegistry} />
