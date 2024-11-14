'use strict';

import calc from './modules/calc';
import checkTextInputs from './modules/checkTextInputs';
import forms from './modules/forms';
import mask from './modules/mask';
import modals from './modules/modals';
import showMoreStyles from './modules/showMoreStyles';
import sliders from './modules/sliders';

window.addEventListener('DOMContentLoaded', () => {

	let calcState = {};

	modals();
	sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
	sliders('.main-slider-item', 'vertical', '', '');
	calc('#size', '#material', '#options', '.promocode', '.calc-price', calcState);
	mask('[name="phone"]');
	checkTextInputs('[name="name"]');
	checkTextInputs('[name="message"]');
	showMoreStyles('.button-styles', '#styles .row');
	forms(calcState);
});