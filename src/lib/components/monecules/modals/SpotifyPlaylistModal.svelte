<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';

	type TSpotifyPlaylistModalData = {
		isPublic: boolean;
		isCollaborative: boolean;
		name: string;
		description: string;
		followers: number;
		img: string;
		owner: string;
		nuberOfTracks: number;
	};

	const modalStore = getModalStore();
	const data: TSpotifyPlaylistModalData = $modalStore[0].meta;

	console.log('modal playllist data', data);
</script>

<div class="w-full h-full flex flex-col items-center justify-center bg-black">
	<div
		class="w-full max-w-[800px] h-full bg-black rounded-lg shadow-lg flex flex-col items-center justify-center"
	>
		<div class="w-full h-1/2 flex flex-col items-center justify-center">
			<img class="w-1/2 h-1/2" src={data.img} alt="album cover" />
			<h1 class="text-2xl font-bold">{data.name}</h1>
			<h2 class="text-lg">{data.description}</h2>
			<h3 class="text-lg">{data.followers}</h3>
			<h3>isCollaborative {data.isCollaborative}</h3>
			<h4 class="text-lg">owner : {data.owner}</h4>

			<p>is public: {data.isPublic}</p>
		</div>
	</div>
</div>
