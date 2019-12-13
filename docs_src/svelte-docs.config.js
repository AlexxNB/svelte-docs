module.exports = {
    // if you will serve docs in subderictory use '/subdir/'
    basepath: '/svelte-docs/',

    theme: 'default',

    title: {
        // constant part of page title
        main: 'Svelte-Docs Reference',

        // use first header's content in the window title 
        // looking for `# Header` and `## Header` on the current page
        header: true,
    },  

    // URL to your favicon
    favicon: 'static/favicon.png',

    // URL to your social link preview image (best is 1200×630)
    preview: 'static/social.png',
    
    pathes: {
        // directory for files, generated in development mode 
        dev: '__DOCS__/dev',

        // directory for builted documentaton
        build: '__DOCS__/dist',
    },
    
    aliases:{
        // Virtual packages in Examples
        // <virtual_package_name>: <local_path>,
        //
        // Ex1: './Button.svelte': './../dist/Button.svelte',
        // Ex2: 'mylib': './../dist/index.js', (don't miss `index` and `.js` at the end!)
        //
        //  Then you can use in Example:
        //  import Button from './Button.svelte';
        //  import { Input } from 'mylib';
        'svelte-chota': './exlibris/chota.js',
        './../mylib/Button.svelte': './exlibris/Button.svelte',
        './Button.svelte': './exlibris/Button.svelte',
        'my-button-package': './exlibris/Button.svelte',
    },
    
    preprocess: [
        // preprocessors for Svelte if needed in Examples
        // syntax same as for `preprocess` option in `rollup-plugin-svelte`
        // Ex:  Import preprocessor at top of the config file:
        //          import {markdown} from 'svelte-preprocess-markdown';
        //      Then add it here:
        //          markdown({filetype: 'svelte'}),

    ]

}