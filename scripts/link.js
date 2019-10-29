const fs = require('fs');
const path = require('path');
const ln = require('symlink-dir')

const PKGDIR = './packages';
const TPLDIR = './template';

fs.readdirSync(PKGDIR).forEach(pkg => {
    if(fs.existsSync( path.join(PKGDIR,pkg,'package.json')) ){
        ln(path.join(PKGDIR,pkg),path.join(TPLDIR,'node_modules',pkg));
    }
})

