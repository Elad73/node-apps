const chalk = require('chalk');
const getNotes = require('./notes');
const log = console.log;
const error = chalk.bold.red.inverse;
const warning = chalk.keyword('orange');
const txt = chalk.greenBright;


const msg = getNotes();
log(txt(msg));
log(warning(msg));
log(error(msg));






