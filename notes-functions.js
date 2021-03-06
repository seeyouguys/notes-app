// Get notes from localStorage
const getNotes = () => JSON.parse(localStorage.getItem('notesJSON')) || [{ id: uuidv4(), title: 'Hello!', text: 'It is a sample note, try to create another one!', createdAt: moment().valueOf(), updatedAt: moment().valueOf()}]


// Save notes to localStorage
const saveNotes = (notes) => localStorage.setItem('notesJSON', JSON.stringify(notes))


// Create DOM element for a single note
const generateNoteDOM = function (note) {
	// Root div
	const noteRoot = document.createElement('div')
	noteRoot.classList.add('card', 'note')

	// Note Header
	const noteHeader = document.createElement('div')
	noteHeader.classList.add('card-header')
	const rowWrapperHeader = document.createElement('div')
	rowWrapperHeader.classList.add('row')

	noteHeader.appendChild(rowWrapperHeader)
	noteRoot.appendChild(noteHeader)
		//Title 
	const titleEl = document.createElement('h4')
	titleEl.classList.add('col-sm-10')
	titleEl.textContent = note.title
	
	rowWrapperHeader.appendChild(titleEl)
	
		// Edit
	const editEl = document.createElement('div')
	editEl.classList.add('col-sm-1')
	
	editEl.appendChild(generateEditBtn(note))
	rowWrapperHeader.appendChild(editEl)
		// Remove
	const removeEl = document.createElement('div')
	removeEl.classList.add('col-sm-1')
	
	removeEl.appendChild(generateRemoveBtn(note))
	rowWrapperHeader.appendChild(removeEl)

	// Note Body
	const noteBody = document.createElement('div')
	noteBody.classList.add('card-body')
	const rowWrapperBody = document.createElement('div')
	rowWrapperBody.classList.add('row')
	

		// Note text
	noteBody.textContent = note.text
	
	
		// Time
	const timeEl = generateLastEditCaption(note)

	
	noteBody.appendChild(rowWrapperBody)
	noteRoot.appendChild(noteBody)
	rowWrapperBody.appendChild(timeEl)

	
	return noteRoot
}

// 
const generateLastEditCaption = function (note) {
	const caption = document.createElement('small')
	caption.classList.add('text-muted', 'col-sm-12')

	if (note.updatedAt !== note.createdAt) {
		caption.textContent = `Updated ${moment(note.updatedAt).fromNow()}`
	} else {
		caption.textContent = `Created ${moment(note.createdAt).fromNow()}`
	}

	return caption
}

// Sort notes order with one of three ways
const sortBy = function (notes, way) {
	if (way === 'byDate') {
		return notes.sort(function (a, b) {
			if (a.createdAt < b.createdAt) {
				return 1
			} else if (a.createdAt > b.createdAt) {
				return -1
			} else {
				return 0
			}
		})
	} else if (way === 'byLastEdited') {
		return notes.sort(function (a, b) {
			if (a.updatedAt < b.updatedAt) {
				return 1
			} else if (a.updatedAt > b.updatedAt) {
				return -1
			} else {
				return 0
			}
		})
	} else if (way === 'alphabetical') {
		return notes.sort(function (a, b) {
			if (a.title.toLowerCase() > b.title.toLowerCase()) {
				return 1
			} else if (a.title.toLowerCase() < b.title.toLowerCase()) {
				return -1
			} else {
				return 0
			}
		})
	}
}


// Render the notes via filters
const renderNotes = function (notes, filters) {
	const notesContainer = document.querySelector('#notes-container')
	notesContainer.innerHTML = ''

	// Filter the notes
	const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchTitle.toLowerCase()))

	// Sort the filtered notes and render it
	sortBy(filteredNotes, filters.sortBy).forEach(note => notesContainer.appendChild(generateNoteDOM(note)))
}

// Create the DOM element for a remove btn and add some functionality to it
const generateRemoveBtn = function (target) {
	btn = document.createElement('button')
	btn.classList.add('btn', 'btn-sm', 'btn-remove')
	btn.textContent = 'x'

	// Recolor the button on hover
	onHover(btn, 'btn-danger')

	// Remove note
	btn.addEventListener('click', function () {
		removeNote(target.id)
		saveNotes(notes)
		renderNotes(notes, filters)
	})

	return btn
}

// Remove a note
const removeNote = function (id) {
	const index = notes.indexOf(getNote(id))
	if (index > -1) {
		notes.splice(index, 1)
		saveNotes(notes)
	}
}

// Find and return note by ID
const getNote = id => notes.find(note => note.id === id)

// Create the DOM element for an edit btn and add some functionality to it
const generateEditBtn = function (target) {
	btn = document.createElement('button')
	btn.classList.add('btn', 'btn-sm', 'btn-remove')
	btn.textContent = 'Edit'

	// Recolor on hover
	onHover(btn, 'btn-warning')

	// Redirect to the edit page on click
	btn.addEventListener('click', function (e) {
		saveNotes(notes)
		location.assign(`edit.html#${target.id}`)
	})
	return btn
}