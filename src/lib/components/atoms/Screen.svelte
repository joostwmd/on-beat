<script lang="ts">
	export let content: string;
</script>

<div class="screen">
	<h1 class="text">{content}</h1>
</div>

<style>
	.screen {
		width: 100%;
		background: linear-gradient(
			to bottom right,
			#030303,
			#101010
		) !important; /* Darker linear gradient from top left to bottom right */
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px;
		box-shadow:
			0 12px 24px rgba(0, 0, 0, 0.45),
			inset 0 -4px 8px rgba(0, 0, 0, 0.5),
			inset 4px 4px 8px rgba(255, 255, 255, 0.1);
	}

	.text {
		color: white;
		font-family: 'Pixelify';
	}
</style>
