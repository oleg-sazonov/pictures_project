'use strict';

const pictureSize = (imgSelector) => {
	const blocks = document.querySelectorAll(imgSelector);

	function showImg(block) {
		const img = block.querySelector('img');
		// img.src = img.src.slice(0, -4) + '-1.png';
		img.src = img.src.replace(/(sizes-\d)(\.png)/, '$1-1$2');
		block.querySelectorAll('p:not(.sizes-hit)').forEach(item => item.style.display = 'none');
	};

	function hideImg(block) {
		const img = block.querySelector('img');
		// img.src = img.src.slice(0, -6) + '.png';
		img.src = img.src.replace(/-1\.png$/, '.png');
		block.querySelectorAll('p:not(.sizes-hit)').forEach(item => item.style.display = 'block');
	};

	blocks.forEach(block => {
		block.addEventListener('mouseover', () => showImg(block));
	});

	blocks.forEach(block => {
		block.addEventListener('mouseout', () => hideImg(block));
	});

	
};

export default pictureSize;