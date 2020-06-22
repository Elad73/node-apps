//logging
const log = console.log;
const chalk = require('chalk');
const error = chalk.bold.red.inverse;
const warning = chalk.keyword('orange');
const txt = chalk.greenBright;

//apps parameters
const yargs = require('yargs');

const notes = require('./notes');

//Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body);
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



yargs.parse();

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







