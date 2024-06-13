<script lang="ts">
	import { page } from '$app/stores';
	export let closeDrawer: () => void;

	$: classesActive = (href: string) =>
		href === $page.url.pathname ? '!variant-filled-primary' : '';
</script>

<nav class="list-nav p-4">
	<ul>
		<li>
			<a on:click={closeDrawer} href="/newplaylist" class={classesActive('/newplaylist')}
				>New Playlist</a
			>
		</li>
		<li>
			<a on:click={closeDrawer} href="/filterplaylist" class={classesActive('/filterplaylist')}
				>Filter Playlist</a
			>
		</li>
	</ul>
</nav>
