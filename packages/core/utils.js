import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';
import config from './config';

export function ERR(text,comment) {
    console.log(chalk.bold.red('(!)',text));
    if(comment !== undefined) console.log(chalk.red(comment));
    process.exit(1);
}

export function getRealImportedPath(filepath){
//0. is path exists
    if(fs.pathExistsSync(filepath)) return filepath;

    let pieces = config.incPKG[filepath].split('/');
    let mdl = pieces[0];
    let rel = pieces

//1. plain search in virtual modules
    if(config.incPKG[filepath] !== undefined){
      filepath = path.resolve(config.incPKG[filepath]);
      if(fs.pathExistsSync(filepath)) return filepath;
    }
//2. relative search in virtual modules
    if(config.incPKG[mdl] !== undefined) {
        filepath = path.resolve(path.join(config.incPKG[mdl],rel));
        if(fs.pathExistsSync(filepath)) return filepath;
    }

//3. relative search in nodemodules
    const nodepath = path.resolve(path.join('.','node_modules',filepath))
    if(fs.pathExistsSync(nodepath)) return nodepath;

    return undefined;
}