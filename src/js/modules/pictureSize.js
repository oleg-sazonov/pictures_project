'use strict';

const pictureSize = (imgSelector) => {
	const blocks = document.querySelectorAll(imgSelector);

	function showImg(block) {
		const img = block.querySelector('img');
		img.src = img.src.replace(/(sizes-\d)(\.png)/, '$1-1$2');
		block.querySelectorAll('p:not(.sizes-hit)').forEach(item => item.style.display = 'none');
	};

	function hideImg(block) {
		const img = block.querySelector('img');
		img.src = img.src.replace(/-1\.png$/, '.png');
		block.querySelectorAll('p:not(.sizes-hit)').forEach(item => item.style.display = 'block');
	};

	let activeBlock = null;

	blocks.forEach(block => {
		const isTouchDevice = 'ontouchstart' in window;

		if (isTouchDevice) {
			block.addEventListener('touchstart', () => {
				if (activeBlock && activeBlock !== block) {
					hideImg(activeBlock); 
				}
				showImg(block); 
				activeBlock = block; 
			});
		} else {
			block.addEventListener('mouseover', () => showImg(block));
			block.addEventListener('mouseout', () => hideImg(block));
		}
	});
};

export default pictureSize;