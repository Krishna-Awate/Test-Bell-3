const updateLocalStorage = (resource, amount) => {
    const currentCount = parseInt(localStorage.getItem(resource)) || 0;
    const newCount = currentCount + amount;
    localStorage.setItem(resource, newCount);
    return newCount;
};

const getRandomResourceAmount = () => {
    return Math.floor(Math.random() * 10) + 1;
};

const gatherGoldOrMetal = () => {
    const isMetal = Math.random() < 0.75;
    const amount = getRandomResourceAmount();

    if (isMetal) {
        updateLocalStorage('metal', amount);
    } else {
        updateLocalStorage('gold', amount);
    }
    updateResourceDisplay();
};

const gatherWood = () => {
    const amount = getRandomResourceAmount();
    updateLocalStorage('wood', amount);
    updateResourceDisplay();
};

const updateResourceDisplay = () => {
    const goldCount = localStorage.getItem('gold') || 0;
    const metalCount = localStorage.getItem('metal') || 0;
    const woodCount = localStorage.getItem('wood') || 0;

    document.getElementById('gold-count').textContent = goldCount;
    document.getElementById('metal-count').textContent = metalCount;
    document.getElementById('wood-count').textContent = woodCount;
};

export { gatherGoldOrMetal, gatherWood, updateResourceDisplay };
