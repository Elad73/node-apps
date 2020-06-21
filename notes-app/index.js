const chalk = require('chalk');
const getNotes = require('./notes');
const log = console.log;
const error = chalk.bold.red.inverse;
const warning = chalk.keyword('orange');
const txt = chalk.greenBright;

const command = process.argv[2];

switch (command) {
    case 'add':
        log(txt('this is an add command'));
        break;
    case 'remove':
        log(txt('this is a remove command'));
        break;
    default:
        log(txt('no command was eneterd'));
}







