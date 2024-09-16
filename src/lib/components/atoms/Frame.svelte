<script lang="ts">
	export let title: string = '';
</script>

<div class="w-fit h-fit rounded-lg p-2">
	{#if title}
		<p class="p text-gray-400 text-sm">{title}</p>
	{/if}
	<slot />
</div>
