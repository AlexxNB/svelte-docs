const fs = require('fs-extra');
const path = require('path');

const subjects = ['node_modules','package-lock.json','__DOCS__'];

function cleanDirectory(dir='.') { 
    fs.readdirSync(dir).forEach(file => {
        const filepath = path.join(dir,file);
        if(subjects.includes(file)) {
            console.log(filepath, 'removed');
            fs.removeSync(filepath)
        }else if(fs.statSync(filepath).isDirectory()){
            cleanDirectory(filepath)
        }
    })
}

cleanDirectory();
