let notes = [];

function addNote() {
    let noteTitleInput = document.getElementById('noteTitleInput');
    let noteInput = document.getElementById('noteInput');
    let noteText = noteInput.value.trim();
    let colorSelector = document.getElementById('colorSelector');
    let noteColor = colorSelector.value;
    let noteDateInput = document.getElementById('noteDateInput');
    let noteDate = noteDateInput.value;

    if (noteText !== '') {
        notes.push({
            title: noteTitleInput.value.trim(),
            text: noteText,
            color: noteColor,
            date: noteDate 
        });
        renderNotes();
        noteTitleInput.value = '';
        noteInput.value = '';
        noteDateInput.value = '';
    } else {
        alert('Please enter a note!');
    }
}

function renderNotes() {
    let notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = ''; 

    notes.forEach(function(note, index) {

        let noteElement = document.createElement('form');
        noteElement.className = 'note';
        noteElement.style.backgroundColor = note.color;

        let noteHeader = document.createElement('div');
        noteHeader.className = 'note-header';

        let titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.value = note.title || '';
        titleInput.placeholder = 'Enter title...';
        titleInput.addEventListener('change', function() {
            note.title = titleInput.value; 
            updateNote(index, note);
        });
        noteHeader.appendChild(titleInput);

        let countdown = document.createElement('div');
        countdown.className = 'countdown';
        let countdownDate = new Date(note.date).getTime();
        let now = new Date().getTime();
        let distance = countdownDate - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        countdown.textContent = 'Days left: ' + days;
        noteHeader.appendChild(countdown);

        let noteOptions = document.createElement('div');
        noteOptions.className = 'note-options';

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.style.backgroundColor = note.color; 
        deleteButton.style.color = '#000'; 
        deleteButton.onclick = function() { deleteNote(index); };
        noteOptions.appendChild(deleteButton);

        noteHeader.appendChild(noteOptions);

        let textArea = document.createElement('textarea');
        textArea.value = note.text;
        textArea.readOnly = true;
        textArea.style.width = '100%';
        textArea.style.height = '100px';
        textArea.style.resize = 'none'; 
        textArea.addEventListener('click', function() {
            textArea.readOnly = false;
        });
        
        textArea.addEventListener('change', function() {
            note.text = textArea.value; 
            updateNote(index, note);
        });

        noteElement.appendChild(noteHeader);
        noteElement.appendChild(textArea);

        notesContainer.appendChild(noteElement);
    });
}


function deleteNote(index) {
    if (confirm('Are you sure you want to delete this note?')) {
        notes.splice(index, 1);
        renderNotes(); 
    }
}

function updateNote(index, updatedNote) {
    notes[index] = updatedNote;
    renderNotes();
}

renderNotes();
