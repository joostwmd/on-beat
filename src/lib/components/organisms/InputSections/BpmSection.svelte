<script>
	import StatusLed from '$lib/components/atoms/StatusLed.svelte';
	import BpmInput from '$lib/components/monecules/inputs/BpmInput.svelte';
</script>

<div class="w-full flex flex-col items-center">
	<div class="">
		<div class="w-full flex justify-between items-center mb-4">
			<h4 class="h4">BPM *</h4>

			<StatusLed status="error" />
		</div>
		<p class="p text-gray-400">
			set your desired bpm range. your playlist will be filled with songs in that range
		</p>
	</div>

	<BpmInput />
</div>
