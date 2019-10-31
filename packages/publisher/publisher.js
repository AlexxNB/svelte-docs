const importCWD = require('import-cwd');
const ghPages = require('gh-pages');
const path = require('path');
const createGitinfo = require('gitinfo').default;
const chalk = require('chalk');
const prompts = require('prompts');

const config = importCWD('./svelte-docs.config.js');

console.log(chalk.bold('Publishing the documentation...'));


async function run() {
    const git = createGitinfo();

    if(!git) Err('can\'t find .git folder in the parents directories');

    const GITURL = git.getGithubUrl();
    const GITUSER = git.getUsername();
    const GITNAME = git.getName();
    const DIR = path.join(process.cwd(),config.pathes.build,config.basepath);

    if(!GITURL.startsWith('https://github.com')) Err('Can publish in Github repository only, but `'+GITURL+'` was found.');

    if(`/${GITNAME}/` !== config.basepath) Err('you should set `basepath` option in `svelte-docs.config.js` as the name of your repository `'+ GITNAME +'`');

    const result = await prompts([
        {
            type: 'confirm',
            name: 'confirm',
            message: 'Publish documents in `gh-pages` branch of the `'+GITURL+'` repository?',
            initial: true
        }
    ]);

    if(result.confirm){
        ghPages.publish(DIR, function(err) {
            if(err) Err('Fail on publishing:',err);
            console.log(chalk.bold('Done!'));
            console.log(chalk.green(`You can open it at https://${GITUSER.toLowerCase()}.github.com/${GITNAME}`));
            process.exit(0);
        });
    }else{
        Err('Publishing canceled');
    }
}

run();


function Err(message){
    console.log(chalk.red('[Error]', message));
    process.exit(1);
}



