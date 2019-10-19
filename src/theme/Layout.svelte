<script>
	// import page components
	import Topbar from './../components/Topbar.svelte';
	import Sections from './../components/Sections.svelte';
	import Document from './../components/Document.svelte';
</script>

<!-- top bar -->
<header>
	<Topbar />
</header>

<!-- side bar -->
<nav>
	<Sections />
</nav> 

<!-- content -->
<main>
	<Document />
</main>