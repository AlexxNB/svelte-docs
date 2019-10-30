const importCWD = require('import-cwd');
const ghPages = require('gh-pages');
const path = require('path');
const createGitinfo = require('gitinfo').default;
const chalk = require('chalk');

const config = importCWD('./svelte-docs.config.js');

console.log(chalk.bold('Publishing the documentation...'));



async function run() {
    const git = createGitinfo();
    if(!git) {
        Err('can\'t find .git folder in the parents directories');
    }

    const GITNAME = git.getName();
    const DIR = path.join(process.cwd(),config.pathes.build);

    if(GITNAME !== config.basepath) Err('you should set `basepath` option in `svelte-docs.config.js` as the name of your repository `'+ GITNAME +'`');

}

run();


function Err(message){
    console.log(chalk.red('[Error]', message));
    process.exit(1);
}






/*
ghPages.publish(DIR, function(err) {
    console.log(err);
});*/


