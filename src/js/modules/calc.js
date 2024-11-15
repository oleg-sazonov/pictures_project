'use strict';

import { getResource } from "../services/requests";

const calc = (size, material, options, promocode, result, state) => {
	const sizeBlock = document.querySelector(size),
		  materialBlock = document.querySelector(material),
		  optionsBlock = document.querySelector(options),
		  promocodeBlock = document.querySelector(promocode),
		  resultBlock = document.querySelector(result);

	let sum = 0;

	function getCalcData() {
		getResource('assets/calc-options.json')
			.then(data => {
				const sizeData = data.size;
				const materialData = data.material;
				const optionsData = data.options;

				// console.log('Size:', sizeData);
				// console.log('Material:', materialData);
				// console.log('Options:', optionsData);

				populateSelect(sizeBlock, sizeData, 'Выберите размер картины');
				populateSelect(materialBlock, materialData, 'Выберите материал картины');
				populateSelect(optionsBlock, optionsData, 'Дополнительные услуги');
			})
			.catch(error => {
				console.log(error);
			});
	}

	function populateSelect(selectElement, data, content) {
		selectElement.innerHTML = '';
	  
		const defaultOption = document.createElement("option");
		defaultOption.value = "";
		defaultOption.textContent = content;
		selectElement.appendChild(defaultOption);
	  
		data.forEach(item => {
		  const option = document.createElement("option");
		  option.value = item.value;
		  option.textContent = item.text;
		  option.title = item.title;
		  selectElement.appendChild(option);
		});
	}

	const calcFunc = () => {
		sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

		if (sizeBlock.value == '' || materialBlock.value == '') {
			resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';
		} else if (promocodeBlock.value === 'IWANTPOPART') {
			sum = Math.round(sum * 0.7);
			resultBlock.textContent = sum;
		} else {
			resultBlock.textContent = sum; 
		}
		state["result"] = sum;
	};

	getCalcData();

	sizeBlock.addEventListener('change', calcFunc);
	materialBlock.addEventListener('change', calcFunc);
	optionsBlock.addEventListener('change', calcFunc);
	promocodeBlock.addEventListener('input', calcFunc);
};

export default calc;