;(() => {
	'use strict'
	const initBreakpoints = () => {
		const breakpoints = {
			sm: '479.98',
			md: '766.98',
			lg: `991.98`,
			xl: '1119.98',
			xxl: '1439.98'
		}
		return breakpoints
	}
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
	const convertTo = (unit, px) => px / 16 + unit
	function getTransitionDuration(el) {
		const aDuration = window.getComputedStyle(el).transitionDuration
		return aDuration.includes('ms')
			? aDuration.replace('ms', '')
			: aDuration.replace('s', '') * 1e3
	}
	let pageLockStatus = true
	const pageLockToggle = (delay = 0, lock = true) => {
		const page = document.documentElement
		const scrollBarWidth = window.innerWidth - document.body.offsetWidth + 'px'
		if (pageLockStatus)
			if (!lock) {
				pageLockStatus = false
				setTimeout(() => {
					page.classList.remove('lock')
					page.style.removeProperty('--g-scrollbar-width')
					pageLockStatus = true
				}, delay)
			} else {
				page.classList.add('lock')
				page.style.setProperty('--g-scrollbar-width', `${scrollBarWidth}`)
				pageLockStatus = false
				setTimeout(() => {
					pageLockStatus = true
				}, delay)
			}
	}
	function menuInit(fullHeight = true) {
		const iconMenu = document.querySelector('.icon-menu')
		if (iconMenu) {
			iconMenu.addEventListener('click', toggleMenu)
			if (iconMenu.dataset.menu) {
				const breakpoints = initBreakpoints()
				let mdQuery = iconMenu.dataset.menu
				mdQuery in breakpoints
					? (mdQuery = convertTo('em', breakpoints[mdQuery]))
					: (mdQuery = convertTo('em', mdQuery))
				mdQuery = '(max-width: ' + mdQuery + ')'
				const matchMedia = window.matchMedia(mdQuery)
				matchMedia.addEventListener('change', function () {
					toggleMenu(false)
				})
				fontSizeListener(toggleMenu, [false])
			}
			function toggleMenu(open = true) {
				if (!document.documentElement.classList.contains('menu-open')) {
					if (fullHeight) {
						window.addEventListener('resize', fixHeight)
						fixHeight()
					}
					document.addEventListener('keydown', focusCatch)
					pageLockToggle()
				}
				if (document.documentElement.classList.contains('menu-open') || !open) {
					const timeOut = getTransitionDuration(document.querySelector('.menu'))
					pageLockToggle(timeOut, false)
					document.removeEventListener('keydown', focusCatch)
					iconMenu.focus()
					if (fullHeight) window.removeEventListener('resize', fixHeight)
				}
				document.documentElement.classList.toggle('menu-open')
			}
			function focusCatch(e) {
				if (e.which === 9) {
					const focusEl = [
						'a[href]',
						'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
						'button:not([disabled]):not([aria-hidden])',
						'select:not([disabled]):not([aria-hidden])',
						'textarea:not([disabled]):not([aria-hidden])',
						'area[href]',
						'iframe',
						'object',
						'embed',
						'[contenteditable]',
						'[tabindex]:not([tabindex^="-"])'
					]
					const focusable = document
						.querySelector('.menu')
						.querySelectorAll(focusEl)
					const focusArray = [...focusable, iconMenu]
					const focusedIndex = focusArray.indexOf(document.activeElement)
					if (e.shiftKey && focusedIndex === 0) {
						focusArray[focusArray.length - 1].focus()
						e.preventDefault()
					}
					if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
						focusArray[0].setAttribute('tabindex', '0')
						focusArray[0].focus()
						e.preventDefault()
					}
				}
			}
			function fixHeight() {
				let vh = window.innerHeight * 0.01
				document.documentElement.style.setProperty('--vh', `${vh}px`)
			}
		}
	}
	function fontSizeListener(func, params = false) {
		document.documentElement.addEventListener('transitionend', e => {
			if (e.target === document.documentElement)
				if (e.propertyName === 'font-size') params ? func(...params) : func()
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
			const url = '../files/sendmessage.php'
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
	menuInit()
})()
