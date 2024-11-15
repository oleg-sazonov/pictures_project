'use strict';

const filter = () => {
	const menu = document.querySelector('.portfolio-menu'),
		  items = menu.querySelectorAll('li'),
		  wrapper = document.querySelector('.portfolio-wrapper'),
		  markAll = wrapper.querySelectorAll('.all'),
		  no = document.querySelector('.portfolio-no');
	
	const typeFilter = (markType) => {
		markAll.forEach(item => {
			item.style.display = 'none';
			item.classList.remove('animated', 'fadeIn');

		});

		no.style.display = 'none';
		no.classList.remove('animated', 'fadeIn');

		console.log(markType);

		if (markType) {
			markType.forEach(item => {
				item.style.display = 'block';
				item.classList.add('animated', 'fadeIn');
			});
		}; 
		//markType is a NodeList, if it hasn't any element no-block will be shown
		if (markType.length == 0) {
			no.style.display = 'block';
			no.classList.add('animated', 'fadeIn');
		};
	};

	menu.addEventListener('click', (e) => {
		let target = e.target;
		let markClass = target.classList[0];
		let mark = wrapper.querySelectorAll(`.${markClass}`);

		if (target && target.tagName == "LI") {
			items.forEach(btn => btn.classList.remove('active'));
			target.classList.add('active');
			typeFilter(mark);
		};
	});
};

export default filter;