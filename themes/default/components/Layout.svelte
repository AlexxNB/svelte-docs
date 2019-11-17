<script>
	import {current_page} from '@svelte-docs/get/routes';
	// import page components
	import Topbar from './Topbar.svelte';
	import Sections from './Sections.svelte';
	import Document from './Document.svelte';

	function set_active_link(node){
      return {
			destroy: current_page.subscribe(page => {
					node.querySelectorAll('a').forEach(a => {
					if(a.getAttribute('href') === page.url)
						a.classList.add('active');
					else
						a.classList.remove('active')
					});
				})
			}
	  }
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
	<nav use:set_active_link>
		<Sections />
	</nav> 

	<!-- content -->
	<main class="with-sidebar">
		<Document />
	</main>

{/if}
