<script>
	import { writable } from 'svelte/store';
	import { tweened } from 'svelte/motion';
	import { current_page } from '@svelte-docs/get/routes';
	import maintitle from '@svelte-docs/get/maintitle';
	import Topbar from './Topbar.svelte';
	import Sections from './Sections.svelte';
	import Document from './Document.svelte';
	import { cubicOut } from 'svelte/easing';

	function slideH(node) {

		const delay = 10;
		const duration = 200;
		const easing = cubicOut;

		const style = getComputedStyle(node);
		const width = parseFloat(style.width);

		return {
			delay,
			duration,
			easing,
			css: t =>
				`overflow: hidden;` +
				`width: ${t * width}px;`
		};
	}

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

	function hide_sidebar(node){

		const handler = () => show_sidebar=false;
		document.body.addEventListener('click',handler);
		return{
			destroy(){
				document.body.removeEventListener('click',handler);
			}
		}
	}

	let window_width = 0;
	let show_sidebar = false;
	const mobile = writable(true);
	const rotate = tweened(0,{duration:200, easing:cubicOut});

	$: $mobile = window_width < 800;
	$: show_sidebar = $mobile ? show_sidebar : false;
	$: $rotate = show_sidebar ? 180 : 0;

	$: title = $current_page.title ? $current_page.title + ' — ' + maintitle : maintitle;
	$: layout = $current_page.meta.layout ? $current_page.meta.layout : 'default';

</script>

<svelte:window bind:innerWidth={window_width}/>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<!-- top bar -->
<header>
	<Topbar />
</header>

{#if layout === 'no_sidebar'}

	<!-- content -->
	<main class="fullscreen" class:mobile={$mobile}>
		<Document />
	</main>

{/if}

{#if layout === 'default'}

	{#if $mobile}
	<!-- side bar -->
	<button class="showNav" on:click|stopPropagation={()=>show_sidebar=!show_sidebar}>
		<img src="assets/burger.svg" alt="Open Menu" style="transform: rotate({$rotate}deg)"/>
	</button>
	{/if}
	
	{#if !$mobile || show_sidebar}
	<nav use:set_active_link use:hide_sidebar transition:slideH>
		<Sections />
	</nav> 
	{/if}

	<!-- content -->
	<main class:mobile={$mobile}>
		<Document />
	</main>

{/if}
