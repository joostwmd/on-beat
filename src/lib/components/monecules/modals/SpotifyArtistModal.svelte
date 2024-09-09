<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';

	type TSpotifyArtistModalData = {
		title: string;
		img: string;
		genres: string[];
		followers: number;
		popularity: number;
	};

	const modalStore = getModalStore();
	const data: TSpotifyArtistModalData = $modalStore[0].meta;

	console.log('modal artist data', data);
</script>

<div class="w-full h-full flex flex-col items-center justify-center bg-black">
	<div
		class="w-full max-w-[800px] h-full bg-black rounded-lg shadow-lg flex flex-col items-center justify-center"
	>
		<div class="w-full h-1/2 flex flex-col items-center justify-center">
			<img class="w-1/2 h-1/2" src={data.img} alt="album cover" />
			<h1 class="text-2xl font-bold">{data.title}</h1>
			<h3 class="text-lg">Followers: {data.followers}</h3>
			<h3 class="text-lg">Popularity: {data.popularity}</h3>

			{#if data.genres.length > 0}
				<div class="flex flex-wrap space-x-2">
					{#each data.genres as genre}
						<span class="text-sm bg-gray-800 text-white px-2 py-1 rounded-full">{genre}</span>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
