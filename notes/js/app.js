var notes = loadNotes();
var noteForm = document.getElementById("note-form");
var noteTitle = document.getElementById("note-title");
var noteText = document.getElementById("note-text");
var characterCount = document.getElementById("character-count");
var noteList = document.getElementById("note-list");
var emptyMessage = document.getElementById("empty-message");

// Build one list item for a note.
function createNoteElement(note, index) {
  var item = document.createElement("li");
  var content = document.createElement("p");
  item.className = "note-item";
  content.className = "note-content";
  content.textContent = note.text;
  item.append(createNoteHeader(note, index), content);
  return item;
}

// Build the title and delete controls for a note.
function createNoteHeader(note, index) {
  var header = document.createElement("div");
  var title = document.createElement("h3");
  var deleteButton = document.createElement("button");
  header.className = "note-header";
  title.className = "note-title";
  title.textContent = note.title;
  deleteButton.className = "delete-button";
  deleteButton.dataset.index = index;
  deleteButton.textContent = "Delete";
  header.append(title, deleteButton);
  return header;
}

// Draw all notes and show the empty state when needed.
function renderNotes() {
  noteList.innerHTML = "";
  notes.forEach(function (note, index) {
    noteList.appendChild(createNoteElement(note, index));
  });
  emptyMessage.hidden = notes.length > 0;
}

// Add a new note from the form inputs.
function addNote(event) {
  event.preventDefault();
  var title = noteTitle.value.trim();
  var text = noteText.value.trim();
  if (!title || !text) { return; }
  notes.push({ title: title, text: text });
  saveNotes(notes);
  noteForm.reset();
  characterCount.textContent = "Characters: 0";
  renderNotes();
  noteTitle.focus();
}

// Delete one note and save the updated list.
function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes(notes);
  renderNotes();
}

// Handle delete clicks from the note list.
function handleNoteListClick(event) {
  if (event.target.className !== "delete-button") { return; }
  deleteNote(Number(event.target.dataset.index));
}

// Connect the form, list, and saved notes on page load.
function initializeApp() {
  noteForm.addEventListener("submit", addNote);
  noteList.addEventListener("click", handleNoteListClick);
  noteText.addEventListener("input", function () {
    characterCount.textContent = "Characters: " + noteText.value.length;
  });
  renderNotes();
}
initializeApp();