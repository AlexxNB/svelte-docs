<script>
	// import theme
	import '$CWD/src/theme/style.css';
	import Layout from '$CWD/src/theme/components/Layout.svelte';
	import {initNavigation} from './navigation.js';
	import {onMount} from 'svelte';

	onMount(()=>{
		return initNavigation();
	})
</script>

<Layout />

