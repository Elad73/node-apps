const fs = require('fs');
//logging
const log = console.log;
const chalk = require('chalk');
const error = chalk.bold.red.inverse;
const warning = chalk.keyword('orange');
const txt = chalk.greenBright;

const notesFile = './notes-app/notes.json';


const getNotes = () => "Your notes...!!!";

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find( note => note.title === title);

    if (!duplicateNote)
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

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync(notesFile, dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(notesFile);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch (e) {
        return [];
    }
}

const removeNote = title => {
    const notes = loadNotes(); 
    const newNotes = notes.filter ( note => note.title !== title );

    if (newNotes.length === notes.length){
        log(warning('No title found to remove!'));
    }
    else {
        saveNotes(newNotes);
        log(txt('Note title was removed!'));
    }
}

const listNotes = () => loadNotes().forEach( note => log(txt(note.title + ': ' + note.body)) );

const readNote = (title) => {
    const note = loadNotes().find( note.title === title);

    if (note) log(txt(note.title + ': ' + note.body));
    else log(warning("The title does not exist!"));
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}