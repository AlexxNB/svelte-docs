<script>
	import {current_page} from '@svelte-docs/get/routes';
	import maintitle from '@svelte-docs/get/maintitle';
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

	$: title = $current_page.title ? $current_page.title + ' — ' + maintitle : maintitle;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

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
	<main>
		<Document />
	</main>

{/if}
