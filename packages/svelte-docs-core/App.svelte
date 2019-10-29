<script>
	// import theme
	import '$CWD/theme/style.css';
	import Layout from '$CWD/components/Layout.svelte';
	import {initNavigation} from './navigation.js';
	import {onMount} from 'svelte';

	onMount(()=>{
		return initNavigation();
	})
</script>

<Layout />

