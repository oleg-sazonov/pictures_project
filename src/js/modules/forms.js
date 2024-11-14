'use strict';

import { postData, handleStatus } from '../services/requests';

const forms = (state) => {
	const form = document.querySelectorAll('form'),
		  upload = document.querySelectorAll('[name="upload"]');

	const path = {
		designer: 'assets/server.php',
		question: 'assets/question.php'
	};

	upload.forEach(item => {
		item.addEventListener('input', () => {
			console.log(item.files[0]);
			let dots;
			const arr = item.files[0].name.split('.');

			arr[0].length > 5 ? dots = '...' : dots = '.';
			const name = arr[0].substring(0, 6) + dots + arr[1];
			item.previousElementSibling.textContent = name;
		});
	});

	form.forEach(item => {
		item.addEventListener('submit', e => {
			e.preventDefault();

			const formData = new FormData(item);
			if (item.classList.contains('calc_form')) {
				for (let key in state) {
					formData.append(key, state[key]);
				}
			}

			for (let pair of formData.entries()) {
				console.log(pair[0], pair[1]);
			};

			item.parentNode.append(handleStatus('loading'));
			item.style.display = 'none';

			let api;
			item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
			console.log(api);

			postData(api, formData)
				.then(res => {
					console.log(res);
					handleStatus('idle');
					
					console.log(state.result);
				})
				.catch(() => {
					handleStatus('error');
				})
				.finally(() => {
					item.reset();
					document.querySelector('.calc-price').textContent = 'Для расчета нужно выбрать размер картины и материал картины';

					upload.forEach(item => {
						item.previousElementSibling.textContent = 'Файл не выбран';
					});

					setTimeout(() => {
						handleStatus().remove();
						item.style.display = 'block';
						document.body.style.marginRight = `0px`;

						if (item.classList.contains('calc_form') || item.classList.contains('consultation_form')) {
							item.classList.add('animated', 'fadeInUp');	
						}
						
						document.querySelectorAll('[data-modal]').forEach(item => {
							item.style.display = 'none';
						});
						document.body.style.overflow = '';
					}, 5000);
				});
		});
	});
}

export default forms;