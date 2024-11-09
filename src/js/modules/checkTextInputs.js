'use strict';

const checkTextInputs = (selector) => {
    const textInputs = document.querySelectorAll(selector);

    textInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/[^а-яё 0-9]/ig, '');
        });
    });
};

export default checkTextInputs;