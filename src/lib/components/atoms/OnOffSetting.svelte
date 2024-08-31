<script lang="ts">
	import OnOffToggle from './OnOffToggle.svelte';
	import StatusLed from './StatusLed.svelte';

	export let isToggled = false;
</script>

<div class="w-24 flex justify-between items-end">
	<OnOffToggle bind:isToggled />
	<StatusLed status={isToggled ? 'success' : 'warning'} />
</div>
