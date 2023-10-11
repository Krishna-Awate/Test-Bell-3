import { gatherGoldOrMetal, gatherWood, updateResourceDisplay } from './modules/GettingResource.js';

const minesImg = document.querySelector('.mines-img');
const woodsImg = document.querySelector('.woods-img');

minesImg.addEventListener('click', gatherGoldOrMetal);
woodsImg.addEventListener('click', gatherWood);

// Update resource display when the page loads
updateResourceDisplay();
