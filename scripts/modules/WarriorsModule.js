const WarriorsModule = (() => {
  // 1) Database
  const warriors = [
    {
      id: 1,
      name: "Snake",
      image: "warrior-1.jpg",
      priceGold: 200,
    },
    {
      id: 2,
      name: "Giant",
      image: "warrior-2.jpg",
      priceGold: 300,
    },
    {
      id: 3,
      name: "Big Axe",
      image: "warrior-3.jpg",
      priceGold: 220,
    },
    {
      id: 4,
      name: "Thief",
      image: "warrior-4.jpg",
      priceGold: 340,
    },
    {
      id: 5,
      name: "Tanks",
      image: "warrior-5.jpg",
      priceGold: 140,
    },
    {
      id: 6,
      name: "Berserker",
      image: "warrior-6.jpg",
      priceGold: 330,
    },
  ];

  const boughtWarriors = [];

  const buyWarrior = (id, goldCost) => {
    const warrior = warriors.find((warrior) => warrior.id === id);
    if (warrior) {
      const availableGold = parseInt(localStorage.getItem("gold")) || 0;
      if (availableGold >= goldCost) {
        localStorage.setItem("gold", availableGold - goldCost); // Deduct gold
        const getWarriors = JSON.parse(localStorage.getItem("boughtWarriors"));
        if (getWarriors) {
          getWarriors.push(warrior);
          localStorage.setItem("boughtWarriors", JSON.stringify(getWarriors)); // Deduct gold
        } else {
          localStorage.setItem("boughtWarriors", JSON.stringify([warrior])); // Deduct gold
        }
        return true;
      } else {
        alert(`Sorry you don't have enough Gold`);
        return;
      }
    }
    return false;
  };

  const getBoughtWarriors = () => {
    const storedBoughtWarriors = localStorage.getItem("boughtWarriors");
    return storedBoughtWarriors ? JSON.parse(storedBoughtWarriors) : [];
  };

  const isWarriorBought = (id) => {
    const boughtWarriors =
      JSON.parse(localStorage.getItem("boughtWarriors")) || [];
    const found = boughtWarriors.some((el) => el.id === id);
    return found;
  };

  const getAll = () => {
    return warriors.map((warrior) => ({ ...warrior })); // Return a copy to avoid modification
  };

  return {
    getAll,
    buyWarrior,
    getBoughtWarriors,
    isWarriorBought,
  };
})();

export default WarriorsModule;
