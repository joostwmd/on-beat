<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';

	type TSpotifyTrackModalData = {
		img: string;
		title: string;
		artist: string;
		album: string;
		albumType: string;
		releaseDate: string;
		duration: string;
		popularity: string;
		tempo: string;
		liveness: string;
		danceability: string;
		energy: string;
	};

	const modalStore = getModalStore();
	const data: TSpotifyTrackModalData = $modalStore[0].meta;

	console.log('modal track data', data);
</script>

<div class="w-full h-full flex flex-col items-center justify-center bg-black">
	<div
		class="w-full max-w-[800px] h-full bg-black rounded-lg shadow-lg flex flex-col items-center justify-center"
	>
		<div class="w-full h-1/2 flex flex-col items-center justify-center">
			<img class="w-1/2 h-1/2" src={data.img} alt="album cover" />
			<h1 class="text-2xl font-bold">{data.title}</h1>
			<h2 class="text-lg">{data.artist}</h2>
			<h3 class="text-lg">{data.album}</h3>
			<h3>album type {data.albumType}</h3>
			<h4 class="text-lg">{data.releaseDate}</h4>

			<h1>meta</h1>

			<p>duration: {data.duration}</p>
			<p>popularity: {data.popularity}</p>
			<p>tempo: {data.tempo}</p>
			<p>liveness: {data.liveness}</p>
			<p>danceability: {data.danceability}</p>
			<p>energy : {data.energy}</p>
		</div>
	</div>
</div>
