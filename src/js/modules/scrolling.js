'use strict';

const scrolling = (upSelector) => {
	const upElem = document.querySelector(upSelector);

	window.addEventListener('scroll', () => {
		if (document.documentElement.scrollTop > 1650) {
			upElem.classList.add('animated', 'fadeIn');
			upElem.classList.remove('fadeOut');
		} else {
			upElem.classList.add('fadeOut');
			upElem.classList.remove('fadeIn');
		}
	});

	// Scrolling with requestAnimationFrame

	let links = document.querySelectorAll('[href^="#"]'),
		speed = 0.15;

	links.forEach(link => {
		link.addEventListener('click', e => {
			e.preventDefault();

			let widthTop = document.documentElement.scrollTop,
				hash = e.currentTarget.hash,
				toBlock = document.querySelector(hash).getBoundingClientRect().top,
				start = null;

			requestAnimationFrame(step);

			function step(time) {
				if (start === null) {
					start = time;
				}

				let progress = time - start,
					r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));

				document.documentElement.scrollTo(0, r);

				if (r != widthTop + toBlock) {
					requestAnimationFrame(step);
				} else {
					location.hash = hash;
				}
			}
 		});
	});

	// Pure js scrolling
	// const element = document.documentElement,
	// 	body =document.body;

	// const calcScroll = () => {
	// 	upElem.addEventListener('click', function(e) {
	// 		let hash = e.currentTarget.hash,
	// 			scrollTop = Math.round(body.scrollTop || element.scrollTop);

	// 		console.log(hash);

	// 		if (hash !== '') {
	// 			e.preventDefault();
	// 			let hashElem = document.querySelector(hash);
	// 			let hashElemTop = 0;

	// 			while (hashElem.offsetParent) {
	// 				hashElemTop += hashElem.offsetTop;
	// 				hashElem = hashElem.offsetParent; 
	// 			}

	// 			hashElemTop = Math.round(hashElemTop);
	// 			smoothScroll(scrollTop, hashElemTop, hash);
	// 		}
	// 	});
	// };

	// const smoothScroll = (from, to, hash) => {
	// 	let timeInterval = 1,
	// 		prevScrollTop,
	// 		speed;

	// 	if (to > from) {
	// 		speed = 30;
	// 	} else {
	// 		speed = -30;
	// 	}

	// 	let move = setInterval(function() {
	// 		let scrollTop = Math.round(body.scrollTop || element.scrollTop);

	// 		if (
	// 			prevScrollTop === scrollTop ||
	// 			(to > from && scrollTop >= to) ||
	// 			(to < from && scrollTop <= to)
	// 		) {
	// 			clearInterval(move);
	// 			history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash) 
	// 		} else {
	// 			body.scrollTop += speed;
	// 			element.scrollTop += speed;
	// 			prevScrollTop = scrollTop;
	// 		}
	// 	}, timeInterval);
	// };

	// calcScroll();
};

export default scrolling;