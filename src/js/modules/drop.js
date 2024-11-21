'use strict';

import { postData } from "../services/requests";
import updateUploadTextContent from "../services/updateUploadTextContent";

const drop = () => {

	const fileInputs = document.querySelectorAll('[name="upload"]');

	['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
		fileInputs.forEach(input => {
			input.addEventListener(eventName, preventDefaults, false);
		});
	});

	function preventDefaults(e) {
		e.preventDefault();
		e.stopPropagation();
	};

	function highlight(item) {
		const dropArea = item.closest('.file_upload');
		dropArea.style.backgroundColor = 'rgba(197, 26, 187, 0.2)'; 
		dropArea.style.borderRadius = '50px'; 
		dropArea.style.transition = 'background-color 0.3s ease, border 0.3s ease'; 
		dropArea.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; 
	};

	function unhighlight(item) {
		const dropArea = item.closest('.file_upload');
		dropArea.style.boxShadow = 'none';
		dropArea.style.borderRadius = 'none'; 

		if (item.closest('.calc_form')) {
			dropArea.style.backgroundColor = '#fff';
		} else if (item.closest('main')) {
			dropArea.style.backgroundColor = '#f7e7e6';
		}  else {
			dropArea.style.backgroundColor = '#ededed';
		}
	};

	['dragenter', 'dragover'].forEach(eventName => {
		fileInputs.forEach(input => {
			input.addEventListener(eventName, () => highlight(input), false);
		});
	});

	['dragleave', 'drop'].forEach(eventName => {
		fileInputs.forEach(input => {
			input.addEventListener(eventName, () => unhighlight(input), false);
		});
	});

	fileInputs.forEach(input => {
		input.addEventListener('drop', e => {
			input.files = e.dataTransfer.files;

			if (input.closest('main')) {
 
                const formData = new FormData();
                formData.append('file', input.files[0]);
                
                postData('assets/server.php', formData)
                    .then(res => {
						console.log(res);
						input.previousElementSibling.textContent = 'Файл не выбран';
					})
                    .catch(() => console.log('Ошибка'));
            }

			updateUploadTextContent(input);
		});
	});
};

export default drop;