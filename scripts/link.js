const fs = require('fs');
const path = require('path');
const ln = require('symlink-dir')

const PKGDIR = './packages';
const TPLDIR = './template';
const NMDIR = path.join(TPLDIR,'node_modules','@svelte-docs');

fs.readdirSync(PKGDIR).forEach(pkg => {
    if(fs.existsSync( path.join(PKGDIR,pkg,'package.json')) ){
        ln(path.join(PKGDIR,pkg),path.join(NMDIR,pkg));
    }
})

