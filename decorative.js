// Add class to the button (or smth else) on hover
const onHover = function (item, className) {
	item.addEventListener('mouseenter', function (e) {
		e.target.classList.add(className)
	})
	item.addEventListener('mouseleave', function (e) {
		e.target.classList.remove(className)
	})
}
