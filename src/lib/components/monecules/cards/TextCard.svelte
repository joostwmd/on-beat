<script lang="ts">
	export let isSelected: boolean;
	export let onClick: () => void = () => {};
	export let text: string;
	import Pad from '$lib/components/atoms/Pad.svelte';
</script>

<Pad {isSelected} {onClick}>
	<p class="p {isSelected ? 'text-[#e87757]' : 'text-surface-400'}">{text.toUpperCase()}</p>
</Pad>
