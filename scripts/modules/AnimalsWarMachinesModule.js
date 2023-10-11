const AnimalsWarMachinesModule = (() => {
  const animalAndMachines = [
    {
      id: 1,
      name: "Cannon",
      image: "cannon.png",
      priceGold: 330,
      priceMetal: 150,
      priceWood: 100,
    },
    {
      id: 2,
      name: "Catapult",
      image: "catapult.png",
      priceGold: 400,
      priceMetal: 220,
      priceWood: 100,
    },
    {
      id: 3,
      name: "Elephant",
      image: "elephant.png",
      priceGold: 500,
      priceMetal: 380,
      priceWood: 200,
    },
    {
      id: 4,
      name: "Horse",
      image: "horse.png",
      priceGold: 300,
      priceMetal: 400,
      priceWood: 200,
    },
  ];

  const boughtDefenses = [];
  const buyAnimalMachine = (id) => {
    const defense = animalAndMachines.find((defense) => defense.id === id);
    const getDefense = JSON.parse(localStorage.getItem("boughtDefenses"));
    if (getDefense) {
      getDefense.push(defense);
      localStorage.setItem("boughtDefenses", JSON.stringify(getDefense)); // Deduct gold
    } else {
      localStorage.setItem("boughtDefenses", JSON.stringify([defense])); // Deduct gold
    }
  };

  const getBoughtDefenses = () => {
    const storedBoughtDefenses = localStorage.getItem("boughtDefenses");
    return storedBoughtDefenses ? JSON.parse(storedBoughtDefenses) : [];
  };

  const getAll = () => {
    return structuredClone(animalAndMachines);
  };

  const isMachineBought = (id) => {
    const boughtMachineIds =
      JSON.parse(localStorage.getItem("boughtDefenses")) || [];
    const found = boughtMachineIds.some((el) => el.id === id);
    return found;
  };

  return {
    getAll,
    buyAnimalMachine,
    getBoughtDefenses,
    isMachineBought,
  };
})();

export default AnimalsWarMachinesModule;
