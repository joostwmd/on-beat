<script lang="ts">
	import ChooseSeedType from '$lib/components/ChooseSeedType.svelte';
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { getDrawerStore, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { initializeStores, Drawer } from '@skeletonlabs/skeleton';
	initializeStores();
	const drawerStore = getDrawerStore();
</script>

<slot />
<Drawer bgBackdrop="bg-transparent" blur="backdrop-blur">
	{#if $drawerStore.id === 'choose-seed-type'}
		<ChooseSeedType />
	{/if}
</Drawer>
