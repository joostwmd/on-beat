<script lang="ts">
	import OnOffToggle from './OnOffToggle.svelte';
	import StatusLed from './StatusLed.svelte';

	export let isToggled = false;
	export let handleOnToggle: () => void;
</script>

<div class="w-24 flex justify-between items-end">
	<OnOffToggle bind:isToggled {handleOnToggle} />
	<StatusLed status={isToggled ? 'success' : 'warning'} />
</div>
