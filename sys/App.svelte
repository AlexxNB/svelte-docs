<script>
	// import theme
	import './../src/theme/style.css';
	import Layout from './../src/theme/Layout.svelte';
	import {initNavigation} from './navigation.js';
	import {onMount} from 'svelte';

	onMount(()=>{
		return initNavigation();
	})
</script>

<Layout />

