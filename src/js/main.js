'use strict';

import filter from './modules/filter';
import calc from './modules/calc';
import checkTextInputs from './modules/checkTextInputs';
import forms from './modules/forms';
import mask from './modules/mask';
import modals from './modules/modals';
import showMoreStyles from './modules/showMoreStyles';
import sliders from './modules/sliders';
import pictureSize from './modules/pictureSize';
import accordion from './modules/accordion';
import burger from './modules/burger';
import scrolling from './modules/scrolling';
import drop from './modules/drop';

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
	filter();
	pictureSize('.sizes-block');
	accordion('.accordion-heading');
	burger('.burger-menu', '.burger');
	scrolling('.pageup');
	drop();
});