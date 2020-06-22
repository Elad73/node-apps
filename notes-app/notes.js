const fs = require('fs');
const globals = require('../globals');

const notesFile = './notes-app/notes.json';


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
        globals.log(globals.txt('New note added successfuly.'));
    }
    else {
        globals.log(globals.warning('Note title taken!'));
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
        globals.log(globals.warning('No title found to remove!'));
    }
    else {
        saveNotes(newNotes);
        globals.log(globals.txt('Note title was removed!'));
    }
}

const listNotes = () => loadNotes().forEach( note => globals.log(globals.txt(note.title + ': ' + note.body)) );

const readNote = (title) => {
    const note = loadNotes().find( note => note.title === title);

    if (note) globals.log(globals.txt(note.title + ': ' + note.body));
    else globals.log(globals.warning("The title does not exist!"));
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}