'use strict';
import { calcScroll } from "./modals";

// import checkNumInputs from "./checkNumInputs";

const forms = () => {
	const form = document.querySelectorAll('form'),
		  upload = document.querySelectorAll('[name="upload"]'),
		  scroll = calcScroll();

	// checkNumInputs('input[name="user_phone"]');

	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с Вами свяжемся!',
		failure: 'Что-то пошло не так...',
		spinner: 'assets/img/spinner.gif',
		ok: 'assets/img/ok.png',
		fail: 'assets/img/fail.png'
	};

	const path = {
		designer: 'assets/server.php',
		question: 'assets/question.php'
	};

	const postData = async (url, data) => {
		let res = await fetch(url, {
			method: 'POST',
			body: data
		});

		return await res.text();
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

			item.classList.add('animated', 'fadeOutUp');
			setTimeout(() => {
				item.style.display = 'none';
			}, 400);

			let statusImg = document.createElement('img');
			statusImg.setAttribute('src', message.spinner);
			statusImg.classList.add('animated', 'fadeInUp');
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
					item.parentNode.style.height = getComputedStyle(item.parentNode).height;
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
						item.classList.remove('fadeOutUp');
						item.parentNode.style.removeProperty('height');
						document.body.style.marginRight = `0px`;

						if (item.classList.contains('calc_form') || item.classList.contains('consultation_form')) {
							item.classList.add('fadeInUp');	
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