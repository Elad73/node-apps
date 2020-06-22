const fs = require('fs');
//logging
const log = console.log;
const chalk = require('chalk');
const error = chalk.bold.red.inverse;
const warning = chalk.keyword('orange');
const txt = chalk.greenBright;

const notesFile = './notes-app/notes.json';


const getNotes = function() {
    return "Your notes...!!!";
}

const addNote = function (title, body) {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title;
    })

    if (duplicateNotes.length === 0)
    {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes);
        log(txt('New note added successfuly.'));
    }
    else {
        log(warning('Note title taken!'));
    }
}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync(notesFile, dataJSON);
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync(notesFile);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch (e) {
        return [];
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote
}