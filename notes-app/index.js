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
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }    
});

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
       notes.removeNote(argv.title);
    }    
});

//Create list command
yargs.command({
    command: 'list',
    describe: 'listing all notes',
    handler() {
        notes.listNotes();
    }    
});

//Create read command
yargs.command({
    command: 'read',
    describe: 'read a note',
    builder: {
        title: {
            describe: 'Note title to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler() {
        notes.readNote(title);
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







