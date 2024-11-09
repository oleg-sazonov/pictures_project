'use strict';

const message = {
	loading: 'Загрузка...',
	success: 'Спасибо! Скоро мы с Вами свяжемся!',
	failure: 'Что-то пошло не так...',
	spinner: 'assets/img/spinner.gif',
	ok: 'assets/img/ok.png',
	fail: 'assets/img/fail.png'
};

// let statusMessage = document.createElement('div');
// statusMessage.classList.add('status');

// let statusImg = document.createElement('img');
// let textMessage = document.createElement('div');

// const handleStatus = status => {
// 	switch (status) {
// 		case 'loading':
// 			statusImg.setAttribute('src', message.spinner);
// 			textMessage.textContent = message.loading;
// 			return {
// 				statusImg,
// 				textMessage
// 			}
// 		case 'idle': 
// 			statusImg.setAttribute('src', message.ok);
// 			textMessage.textContent = message.success;
// 			return {
// 				statusImg,
// 				textMessage
// 			}
// 		case 'error':
// 			statusImg.setAttribute('src', message.fail);
// 			textMessage.textContent = message.failure;
// 			return {
// 				statusImg,
// 				textMessage
// 			}
// 		default:
// 			console.log('Invalid data');
// 	}
// };

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

export {postData, getResource, message};