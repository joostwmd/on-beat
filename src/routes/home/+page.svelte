<script>
	import { goto } from '$app/navigation';
</script>

<div
	class="w-screen h-screen bg-black overflow-y-scroll pt-8 px-8 pb-32 flex flex-col items-center"
>
	<h1 class="text-4xl">welcome to on:beat</h1>
	<p class="text-lg mt-4">this tool allows you to filter or generate your playlists by BPM</p>
	<p class="text-lg mt-4">To get started, choose your use case</p>

	<div class="flex flex-col items-center mt-8">
		<button class="btn variant-ringed-primary" on:click={() => goto('/filterplaylist')}>
			filter playlist
		</button>
		<button class="btn variant-ringed-primary mt-4" on:click={() => goto('/generateplaylist')}>
			create playlist
		</button>
	</div>
</div>
