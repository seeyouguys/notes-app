let notes = getNotes()

const filters = {
	searchTitle: '',
	sortBy: document.querySelector('#sortBy').value
}

renderNotes(notes, filters)

// Search field handler
document.querySelector('#searchField').addEventListener('input', function (e) {
	filters.searchTitle = e.target.value
	renderNotes(notes, filters)
})

// Add new note btn handler
const addBtn = document.querySelector('#addNote')
addBtn.addEventListener('click', function (e) {
	const newNote = {
		id: uuidv4(),
		title: 'Unnamed note',
		text: ''
	}
	notes.push(newNote)
	saveNotes(notes)
	location.assign(`/edit.html#${newNote.id}`)
})
// Recolor the add button on hover
onHover(addBtn, 'btn-primary')

// Listen for the dropdown "Sort by" changes
document.querySelector('#sortBy').addEventListener('change', function (e) {
	filters.sortBy = e.target.value
	renderNotes(notes, filters)
})

// Listen for the changes of localStorage
window.addEventListener('storage', function (e) {
	if (e.key === 'notesJSON') {
		notes = getNotes()
		renderNotes(notes, filters)
	}
})