<script lang="ts">
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import Nav from '$lib/components/Nav.svelte';

	import { initializeStores, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';

	initializeStores();

	const drawerStore = getDrawerStore();

	function drawerOpen(): void {
		drawerStore.open({});
	}

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<Drawer><Nav closeDrawer={drawerClose} /></Drawer>

<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4 w-0 lg:w-64">
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="btn btn-sm mr-4" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="trail"
				><strong class="text-xl uppercase">onbeat</strong></svelte:fragment
			>
		</AppBar>
	</svelte:fragment>

	<slot />
</AppShell>
