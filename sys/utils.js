import chalk from 'chalk';

export function ERR(text,comment) {
    console.log(chalk.bold.red('(!)',text));
    if(comment !== undefined) console.log(chalk.red(comment));
    process.exit(1);
}