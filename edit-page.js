const noteId = location.hash.substring(1)
const notes = getNotes()

const note = getNote(noteId)

if (note === undefined) {
	location.assign('index.html')
}

// Set default values for input and textarea
document.querySelector('#title').value = note.title
document.querySelector('#text').value = note.text


	// CANCEL BUTTON
// Recolor Cancel btn on hover
const btnCancel = document.querySelector('#cancel')
onHover(btnCancel, 'btn-danger')

btnCancel.addEventListener('click', function (e) {
	if (note.title === 'Unnamed note') {
		removeNote(noteId)
	} 
	location.assign('index.html')
})

	// FORM HANDLER
const editForm = document.querySelector('#edit-form')
editForm.addEventListener('submit', function (e) {
	e.preventDefault()
	
	editNote(noteId, editForm.title.value, editForm.text.value)
	saveNotes(notes)
	location.assign('index.html')
})
const editNote = function (id, title, text) {
	const note = getNote(id)
	note.title = title || 'Unnamed note'
	note.text = text || ''
	note.updatedAt = moment().valueOf()
}

	// SAVE BUTTON
// Recolor Save btn on fields change
const btnSave = document.querySelector('#save')
onHover(btnSave, 'btn-success')

editForm.addEventListener('input', function (e) {
	btnSave.classList.add('btn-success')
})






