<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from './atoms/Button.svelte';
	import TextInput from './atoms/input/TextInput.svelte';
	export let value: string;
</script>

<div class="w-full flex items-center fixed top-0 left-0 right-0 py-4 sm:px-4 px-12 bg-surface-900">
	<div class="mr-4">
		<Button icon="back" onClick={() => goto('/generateplaylist')} />
	</div>

	<TextInput bind:value placeholder="Search" />
</div>
