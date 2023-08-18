;(() => {
	'use strict'
	function isWebp() {
		function testWebP(callback) {
			let webP = new Image()
			webP.onload = webP.onerror = function () {
				callback(webP.height == 2)
			}
			webP.src =
				'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
		}
		testWebP(function (support) {
			let className = support === true ? 'webp' : 'no-webp'
			document.documentElement.classList.add(className)
		})
	}
	let addWindowScrollEvent = false
	setTimeout(() => {
		if (addWindowScrollEvent) {
			let windowScroll = new Event('windowScroll')
			window.addEventListener('scroll', function (e) {
				document.dispatchEvent(windowScroll)
			})
		}
	}, 0)
	const script_form = document.querySelector('.form')
	script_form.addEventListener('submit', function (e) {
		e.preventDefault()
		sendMessage(script_form)
	})
	async function sendMessage(form) {
		const formData = new FormData(form)
		if (formData) {
			const url = 'sendmessage.php'
			const response = await fetch(url, {
				method: 'POST',
				body: formData
			})
			if (response.ok) {
				form.reset()
				alert('form sent')
			} else alert('error')
		}
	}
	isWebp()
})()
