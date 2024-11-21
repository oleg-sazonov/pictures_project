'use strict';

const updateUploadTextContent = (fileInput) => {
	let dots;
	const arr = fileInput.files[0].name.split('.');

	arr[0].length > 5 ? dots = '...' : dots = '.';
	const name = arr[0].substring(0, 6) + dots + arr[1];
	fileInput.previousElementSibling.textContent = name;
};

export default updateUploadTextContent;