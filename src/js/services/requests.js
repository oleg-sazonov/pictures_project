'use strict';

const message = {
	loading: 'Загрузка...',
	success: 'Спасибо! Скоро мы с Вами свяжемся!',
	failure: 'Что-то пошло не так...',
	spinner: 'assets/img/spinner.gif',
	ok: 'assets/img/ok.png',
	fail: 'assets/img/fail.png'
};

let statusMessage = document.createElement('div'),
	statusImg = document.createElement('img'),
	textMessage = document.createElement('div');

statusMessage.classList.add('status');
statusImg.classList.add('animated', 'fadeIn');

const handleStatus = (status = 'loading', selector = statusMessage, img = statusImg, msg = textMessage) => {

	switch (status) {
		case 'loading':
			img.setAttribute('src', message.spinner);
			msg.textContent = message.loading;
			break;
		case 'idle': 
			img.setAttribute('src', message.ok);
			msg.textContent = message.success;
			break;
		case 'error':
			img.setAttribute('src', message.fail);
			msg.textContent = message.failure;
			break;
	}

	selector.append(img);
	selector.append(msg);

	return selector;
};

const postData = async (url, data) => {
	let res = await fetch(url, {
		method: 'POST',
		body: data
	});

	return await res.text();
};

const getResource = async (url) => {
	let res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Could not fetch${url}, status: ${res.status}`);
	} 

	return await res.json();
};

export {postData, getResource, handleStatus};