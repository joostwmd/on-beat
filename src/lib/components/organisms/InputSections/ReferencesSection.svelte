<script>
	export let seeds;

	import Button from '$lib/components/atoms/Button.svelte';
	import Pad from '$lib/components/atoms/Pad.svelte';
	import StatusLed from '$lib/components/atoms/StatusLed.svelte';
	import SpotifyItemCardSmall from '$lib/components/monecules/cards/SpotifyItemCardSmall.svelte';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();
	function openPickSeedTypeDrawer() {
		drawerStore.open({ position: 'bottom', id: 'choose-seed-type' });
	}

	let MAXIMUM_SEEDS = 5;
	let EMPTY_SEEDS = 5;
	$: {
		EMPTY_SEEDS = MAXIMUM_SEEDS - seeds.length;
	}
</script>

<div class="mt-24">
	<div class="">
		<div class="flex items-center justify-between">
			<h4 class="h4">REFERENCES *</h4>

			<div class="flex space-x-4">
				<div class="flex space-x-2">
					{#if seeds.length === 0}
						{#each [...Array(MAXIMUM_SEEDS).keys()] as seed}
							<StatusLed status="error" />
						{/each}
					{:else}
						{#each [...Array(MAXIMUM_SEEDS - EMPTY_SEEDS).keys()] as seed}
							<StatusLed status="success" />
						{/each}

						{#each [...Array(EMPTY_SEEDS).keys()] as seed}
							<StatusLed status="warning" />
						{/each}
					{/if}
				</div>

				<Button icon="plus" onClick={() => openPickSeedTypeDrawer()} />
			</div>

			<!-- <div class="flex items-center gap-x-4">
				<Button icon="plus" onClick={() => openPickSeedTypeDrawer()} />
				<h4 class="h4">{seeds.length}/5</h4>
			</div> -->
		</div>
		<p class="p text-gray-400 mt-4">
			set your favorite songs/artists/genres as seeds. your playlist will be filled with similar
			songs. one seed is required
		</p>
	</div>

	<div class="mt-8">
		<div class="flex flex-col items-center justify-between">
			<div class="flex flex-col w-full space-y-4">
				{#each seeds as seed, index}
					<div class="flex items-center">
						{#if seed.type === 'genre'}
							<Pad
								isSelected={true}
								onClick={() => {
									return;
								}}
							>
								<h2>{seed.value}</h2>
							</Pad>
						{:else}
							<Pad
								onClick={() => {
									return;
								}}
								isSelected={true}
							>
								<SpotifyItemCardSmall data={seed}></SpotifyItemCardSmall>
							</Pad>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
