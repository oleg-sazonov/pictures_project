'use strict';

import {postData, message} from '../services/requests';

const forms = () => {
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

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.parentNode.append(statusMessage);

			item.style.display = 'none';

			let statusImg = document.createElement('img');
			statusImg.setAttribute('src', message.spinner);
			statusImg.classList.add('animated', 'fadeIn');
			statusMessage.append(statusImg);

			let textMessage = document.createElement('div');
			textMessage.textContent = message.loading;
			statusMessage.append(textMessage);

			const formData = new FormData(item);
			let api;
			item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
			console.log(api);

			postData(api, formData)
				.then(res => {
					console.log(res);
					statusImg.setAttribute('src', message.ok);
					textMessage.textContent = message.success;
				})
				.catch(() => {
					statusImg.setAttribute('src', message.fail);
					textMessage.textContent = message.failure;
				})
				.finally(() => {
					item.reset();
					upload.forEach(item => {
						item.previousElementSibling.textContent = 'Файл не выбран';
					});

					setTimeout(() => {
						statusMessage.remove();
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