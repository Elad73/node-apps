//logging
const log = console.log;
const chalk = require('chalk');
const error = chalk.bold.red.inverse;
const warning = chalk.keyword('orange');
const txt = chalk.greenBright;

//apps parameters
const yargs = require('yargs');

const getNotes = require('./notes');

//Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: function () {
        log(txt('Adding a new note!'))
    }    
});

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function () {
        log(txt('Remove a new note!'))
    }    
});

//Create list command
yargs.command({
    command: 'list',
    describe: 'listing all notes',
    handler: function () {
        log(txt('Listing all notes!'))
    }    
});

//Create read command
yargs.command({
    command: 'read',
    describe: 'read a note',
    handler: function () {
        log(txt('Read a note!'))
    }    
});



log(warning(yargs.argv));
console.log(yargs.argv);

// // add, remove, read, list
// switch (command) {
//     case 'add':
//         log(txt('this is an add command'));
//         break;
//     case 'remove':
//         log(txt('this is a remove command'));
//         break;
//     default:
//         log(txt('no command was eneterd'));
// }







