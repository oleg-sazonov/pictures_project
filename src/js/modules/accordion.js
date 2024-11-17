'use strict';

const accordion = (triggersSelector) => {
	const btns = document.querySelectorAll(triggersSelector);

	btns.forEach(btn => {
		btn.addEventListener('click', function() {

			//Hide every .accordion-block exluded active one
			btns.forEach(btn => {
				if (btn !== this) {
					btn.classList.remove('active-style');
					btn.nextElementSibling.classList.remove('active-content');
					btn.nextElementSibling.style.maxHeight = '0px';
				}
			});

			let blockElem = this.nextElementSibling;
			this.classList.toggle('active-style');
			blockElem.classList.toggle('active-content');

			if (this.classList.contains('active-style')) {
				blockElem.style.maxHeight = blockElem.scrollHeight + 80 + 'px';
			} else {
				blockElem.style.maxHeight = '0px';
			};
		});
	});
		//   blocks = document.querySelectorAll(itemsSelector);

	// blocks.forEach(block => block.classList.add('animated', 'fadeInUp'));

	// btns.forEach(btn => {
	// 	btn.addEventListener('click', function() {
	// 		if (this.classList.contains('active')) {
	// 			this.classList.remove('active', 'active-style');
	// 		} else {
	// 			btns.forEach(btn => btn.classList.remove('active', 'active-style'));
	// 		}
	// 		this.classList.add('active', 'active-style');
	// 	});
	// });
};

export default accordion;