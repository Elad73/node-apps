//logging
const log = console.log;
const chalk = require('chalk');
const error = chalk.bold.red.inverse;
const warning = chalk.keyword('orange');
const txt = chalk.greenBright;

module.exports = {
    log: log,
    chalk: chalk,
    error: error,
    warning: warning,
    txt: txt
}