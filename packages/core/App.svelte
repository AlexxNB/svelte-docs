<script>
	// import theme
	import '@THEME/style.css';
	import Layout from '@THEME/components/Layout.svelte';
	import {initNavigation} from './navigation.js';
	import {onMount} from 'svelte';

	onMount(()=>{
		return initNavigation();
	})
</script>

<Layout />

