<script>
	import {current_page} from '@svelte-docs/get/routes';
	// import page components
	import Topbar from './Topbar.svelte';
	import Sections from './Sections.svelte';
	import Document from './Document.svelte';
</script>

<!-- top bar -->
<header>
	<Topbar />
</header>

{#if $current_page.meta.fullscreen}
<!-- content -->
<main class="fullscreen">
	<Document />
</main>
{:else}
<!-- side bar -->
<span class="showSidebar" tabindex="0"/>
<nav>
	<Sections />
</nav> 

<!-- content -->
<main class="with-sidebar">
	<Document />
</main>
{/if}