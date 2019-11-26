const fs = require('fs-extra');
const path = require('path');
const { pour } = require('std-pour');
const ln = require('symlink-dir')

const PKGDIR = './packages';
const TPLDIR = './template';

const DEVDIR = './__DEV__'

const NMDIR = path.join(DEVDIR,'node_modules','@svelte-docs');

async function run(){

    console.log('1. Symlink template to the Dev dir');
    ln(TPLDIR,DEVDIR);


    console.log('2. Do `npm i` in the Dev dir.');
    await npm('install',TPLDIR);


    console.log('3. Do `npm i` in all packages and symlinking it in template.');

    fs.mkdirpSync(NMDIR);
    fs.readdirSync(PKGDIR).forEach(async pkg => {
        if(fs.existsSync( path.join(PKGDIR,pkg,'package.json')) ){
            await npm('install',path.join(PKGDIR,pkg));
            ln(path.join(PKGDIR,pkg),path.join(NMDIR,pkg));
        }
    })

    console.log('Ready!');
}

async function exec(command){
    let ar = command.split(' ').map(e => e.trim()).filter(e => e !== '');
    try{
        await pour(ar.shift(), ar);
    }catch(err){
        throw new Error(err);
    }
}

async function npm(command,dir){
    if(dir)
        await exec(`npm --prefix ${dir} ${command}`);
    else
        await exec(`npm ${command}`);
}

run();