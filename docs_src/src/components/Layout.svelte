<script>
	// import page components
	import Topbar from './Topbar.svelte';
	import Sections from './Sections.svelte';
	import Document from './Document.svelte';
</script>

<!-- top bar -->
<header>
	<Topbar />
</header>

<!-- side bar -->
<span class="showSidebar" tabindex="0"/>
<nav>
	<Sections />
</nav> 

<!-- content -->
<main>
	<Document />
</main>