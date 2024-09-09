<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte';
	import Pad from '$lib/components/atoms/Pad.svelte';
	import StatusLed from '$lib/components/atoms/StatusLed.svelte';
	import SpotifyItemCardSmall from '$lib/components/monecules/cards/SpotifyItemCardSmall.svelte';
	import { getDrawerStore, getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import store, { removeSeed } from '$lib/spotifyClient/store';
	import { getTrackAudioFeatures } from '$lib/spotifyClient/requests/track/getTrackAudioFeatures';
	import { handleInfoClick } from '$lib/spotifyClient/utils';

	const drawerStore = getDrawerStore();
	function openPickSeedTypeDrawer() {
		drawerStore.open({ position: 'bottom', id: 'choose-seed-type' });
	}

	let MAXIMUM_SEEDS = 5;
	let EMPTY_SEEDS = 5;
	$: {
		EMPTY_SEEDS = MAXIMUM_SEEDS - $store.seeds.length;
	}

	const modalStore = getModalStore();
</script>

<div class="mt-24">
	<div class="">
		<div class="flex items-center justify-between">
			<h4 class="h4">REFERENCES *</h4>

			<div class="flex space-x-4">
				<div class="flex space-x-2">
					{#if $store.seeds.length === 0}
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
		</div>
		<p class="p text-gray-400 mt-4">
			set your favorite songs/artists/genres as seeds. your playlist will be filled with similar
			songs. one seed is required
		</p>
	</div>

	<div class="mt-8">
		<div class="flex flex-col items-center justify-between">
			<div class="flex flex-col w-full space-y-4">
				{#each $store.seeds as seed, i}
					<div class="flex items-center justify-between w-full">
						{#if seed.type === 'genre'}
							<div class="w-5/6">
								<Pad
									isSelected={true}
									onClick={() => {
										return;
									}}
								>
									<h2>{seed.value}</h2>
								</Pad>
							</div>

							<Button icon="bin" onClick={() => removeSeed(i)} />
						{:else}
							<SpotifyItemCardSmall
								data={seed}
								onClick={() => console.log('Test')}
								isSelected={false}
							>
								<Button icon="info" onClick={() => handleInfoClick(seed.type, seed, modalStore)} />
								<Button icon="bin" onClick={() => removeSeed(i)} />
							</SpotifyItemCardSmall>

							<!-- <div class="h-full flex flex-col space-y-4 justify-center">
								<Button icon="bin" onClick={() => removeSeed(i)} />

								<Button icon="info" onClick={() => handleClickInfo(seed)} />
							</div> -->
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
