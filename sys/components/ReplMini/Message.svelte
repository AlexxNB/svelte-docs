<script>
	import { getContext } from 'svelte';

	const { navigate } = getContext('REPL');

	export let kind;
	export let details = null;
	export let filename = null;

	let show = true;

	function message(details) {
		let str = details.message || '[missing message]';

		let loc = [];

		if (details.filename && details.filename !== filename) {
			loc.push(details.filename);
		}

		if (details.start) loc.push(details.start.line, details.start.column);

		return str + (loc.length ? ` (${loc.join(':')})` : ``);
	};
</script>

<style>
	.message {
		position: relative;
		color: white;
		padding: 3px 10px 3px 10px;
		font: 400 12px/1.7 var(--font);
		margin: 0;
		border-top: 1px solid white;
	}

	.navigable {
		cursor: pointer;
	}


	p {
		margin: 0;
	}

	.info {
		background-color: var(--playground-info);
	}

	.error {
		background-color: var(--playground-error);
	}

	.warning {
		background-color:var(--playground-warning);
	}
</style>

{#if show}
<div class="message {kind}" on:click={e => show=false}>
	{#if details}
		<p
			class:navigable={details.filename}
			on:click="{() => navigate(details)}"
		>{message(details)}</p>
	{:else}
		<slot></slot>
	{/if}
</div>
{/if}