'use strict';

const accordion = (triggersSelector) => {
	const btns = document.querySelectorAll(triggersSelector);

	btns.forEach(btn => {
		btn.addEventListener('click', e => {

			let target = e.currentTarget;
			let blockElem = target.nextElementSibling;

			//Hide every .accordion-block exluded active one
			btns.forEach(btn => {
				if (btn !== target) {
					btn.classList.remove('active-style');
					btn.nextElementSibling.classList.remove('active-content');
					btn.nextElementSibling.style.maxHeight = '0px';
				}
			});

			target.classList.toggle('active-style');
			blockElem.classList.toggle('active-content');

			if (target.classList.contains('active-style')) {
				blockElem.style.maxHeight = blockElem.scrollHeight + 80 + 'px';
			} else {
				blockElem.style.maxHeight = '0px';
			};
		});
	});
};

export default accordion;