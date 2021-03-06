# Introducing

## Features

Svelte-Docs is a rapid way to write documentation for your [Svelte](https://svelte.dev) components.

> **<div class="red">It is an early alpha version of the Svelte-Docs so probably buggy and unstable. It also means that future versions may include breakable changes.</div>**

* Based on [MDSv](writing/mdsv) format, which allows writing documentation in Markdown mixed with Svelte's features.

* Import and use any Svelte components right inside a markup

* Documentation building as static files, so you can publish it everywhere

* Customizable [themes](theming)

* Built-in [deploy](publishing/ghpages) on Github Pages

## Zero-config

Just run:

```bash
npm init svelte-docs
```

Then [write](writing/mdsv) the documentation and [build](start) it into static site.


## Built-ins

### Examples

Example block shows how your components work. It provides an encapsulated CSS environment, virtual imports and ability to use any Svelte preprocessor.

```example
<button>My button</button>
```

### Properties

Properties block provides a simple way to document properties of your components. It can be written manually or *auto-generated*  from the component's `*.svelte` file.

```properties
type | Type of the button | 'default','error','warning'('default')
disabled | Should the button be disabled | bool(false)
```

<style>
    .red{
        color: var(--primary);
    }
</style>
