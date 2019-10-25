

export default {
    //basepath
    
    incPKG:{
        // Virtual packages in Examples
        // <virtual_package_name>: <local_path>
        //
        // Ex1: './Button.svelte': './../dist/Button.svelte',
        // Ex2: 'mylib': './../dist/index.js', (don't miss `.js` at the end!)
        //
        //  Then you can use in Example:
        //  import Button from './Button.svelte';
        //  import { Input } from 'mylib';
        
        './Button.svelte': './mylib/Button.svelte',
                  'mylib': './mylib/index.js',
    },

    incCSS: [
        // CSS file with styles for Examples
        // [ <local_path_to_css_file> ]
        //
        // Ex1: './mylib/theme.css',
        // Ex2: './node_modules/chota/chota.css,

        './mylib/theme.css'
    ],
    
    preprocess: [

    ]

}