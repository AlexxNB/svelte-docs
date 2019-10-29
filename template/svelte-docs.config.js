module.exports = {
    // if you will serve docs in subderictory use '/subdir/'
    basepath: '/',

    // page title
    title: 'Svelte thing Documentation',
    
    pathes: {
        // directory for files, generated in development mode 
        dev: '__DOCS__/dev',

        // directory for builted documentaton
        build: '__DOCS__/dist',
    },
    
    incPKG:{
        // Virtual packages in Examples
        // <virtual_package_name>: <local_path>,
        //
        // Ex1: './Button.svelte': './../dist/Button.svelte',
        // Ex2: 'mylib': './../dist/index.js', (don't miss `index` and `.js` at the end!)
        //
        //  Then you can use in Example:
        //  import Button from './Button.svelte';
        //  import { Input } from 'mylib';
        './Button.svelte': './mylib/Button.svelte',
    },

    incCSS: [
        // CSS file with styles for Examples
        // [ <local_path_to_css_file> ]
        //
        // Ex1: './mylib/theme.css',
        // Ex2: './node_modules/chota/chota.css,
    ],
    
    preprocess: [
        // preprocessors for Svelte if needed in Examples
        // syntax same as for `preprocess` option in `rollup-plugin-svelte`
        // Ex:  Import preprocessor at top of the config file:
        //          import {markdown} from 'svelte-preprocess-markdown';
        //      Then add it here:
        //          markdown({filetype: 'svelte'}),

    ]

}