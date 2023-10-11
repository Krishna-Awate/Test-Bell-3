import WarriorsModule from "./modules/WarriorsModule.js";
import AnimalsWarMachinesModule from "./modules/AnimalsWarMachinesModule.js";
import {
  gatherGoldOrMetal,
  gatherWood,
  updateResourceDisplay,
} from "./modules/GettingResource.js";

// Function to handle buying a warrior
function buyWarrior(id, goldCost) {
  const warrior = WarriorsModule.getAll().find((warrior) => warrior.id === id);
  WarriorsModule.buyWarrior(id, goldCost); // Buy the warrior
  const availableGold = parseInt(localStorage.getItem("gold")) || 0;
  if (availableGold < goldCost) {
    return;
  }
  const vowel = ["A", "E", "I", "O", "U"];
  let temp;
  if (vowel.includes(warrior.name[0])) {
    temp = "an";
  } else {
    temp = "a";
  }
  alert(`Congratulations you have bought ${temp} ${warrior.name}`);
}

const warriorSection = document.getElementById("warrior-section");
const animalsMachinesSection = document.getElementById(
  "animals-machines-section"
);
const yourArmySection = document.getElementById("your-army-section");
// const yourArmySection = document.querySelectorAll(".your-army-section");

// Show all warriors on home page
const showAllWarriors = () => {
  const warriors = WarriorsModule.getAll();

  let htmlTxt = "";
  warriors.forEach((warrior) => {
    htmlTxt += `
            <article class="col-12 col-md-6 col-lg-4">
                <div class="shadow border text-center">
                    <h3>${warrior.name}</h3>
                    <div class="image-container">
                        <img src="images/${warrior.image}" alt="${
      warrior.name
    }">
                    </div>
                    <button id='myBtn' class="btn btn-success m-3">
                        ${`Buy Warrior ${warrior.priceGold} <img src="images/gold-coin.png" style="width: 18px; height: 18px;">`}
                    </button>
                  
                </div>
            </article>
        `;
  });

  warriorSection.innerHTML = htmlTxt;

  // Call function when button is clicked to add warrior in your army
  const getWarriorButton = document.querySelectorAll(".btn-success");
  getWarriorButton.forEach((button, index) => {
    button.addEventListener("click", () => {
      buyWarrior(warriors[index].id, warriors[index].priceGold);
    });
  });
};

// Show all animals & machines on home page
const showAllAnimalsMachines = () => {
  const animalsMachines = AnimalsWarMachinesModule.getAll();
  let htmlTxt = "";

  animalsMachines.forEach((animalMachine) => {
    htmlTxt += `
            <article class="col-12 col-sm-6 col-lg-3">
                <div class="shadow border h-100 text-center">
                    <h3>${animalMachine.name}</h3>
                    <div class="image-container">
                        <img class="img-fluid" src="images/${
                          animalMachine.image
                        }">
                    </div>
                        <p>${
                          animalMachine.priceGold
                        }<img src="images/gold-coin.png" style="width: 18px; height: 18px;"></p>
                        <p>${
                          animalMachine.priceMetal
                        }<img src="images/metal.png" style="width: 18px; height: 18px;"></p>
                        <p>${
                          animalMachine.priceWood
                        }<img src="images/wood.png" style="width: 18px; height: 18px;"></p>
                    <button id='animal' class="btn btn-success animal m-3" 
                    >    
                    ${`Buy Defense`}
                 </button>
                </div>
            </article>
        `;
  });

  animalsMachinesSection.innerHTML = htmlTxt;

  // Call function when button is clicked to add animals & machines in your army
  const getMachineButton = document.querySelectorAll(".animal");
  getMachineButton.forEach((button, index) => {
    button.addEventListener("click", () => {
      buyAnimalMachine(animalsMachines[index].id);
    });
  });
};

// Function to handle buying an animal or war machine
const buyAnimalMachine = (id) => {
  const animalMachine = AnimalsWarMachinesModule.getAll().find(
    (defense) => defense.id === id
  );

  if (animalMachine) {
    // Check if the user has enough resources (gold, metal, wood)
    const availableGold = parseInt(localStorage.getItem("gold")) || 0;
    const availableMetal = parseInt(localStorage.getItem("metal")) || 0;
    const availableWood = parseInt(localStorage.getItem("wood")) || 0;

    if (
      availableGold >= animalMachine.priceGold &&
      availableMetal >= animalMachine.priceMetal &&
      availableWood >= animalMachine.priceWood
    ) {
      AnimalsWarMachinesModule.buyAnimalMachine(id); // Buy the animal or war machine
      localStorage.setItem("gold", availableGold - animalMachine.priceGold); // Deduct gold
      localStorage.setItem("metal", availableMetal - animalMachine.priceMetal); // Deduct metal
      localStorage.setItem("wood", availableWood - animalMachine.priceWood); // Deduct wood
      const vowel = ["A", "E", "I", "O", "U"];
      let temp;
      if (vowel.includes(animalMachine.name[0])) {
        temp = "an";
      } else {
        temp = "a";
      }
      alert(`Congratulations you have bought ${temp} ${animalMachine.name}`);
      return true;
    } else {
      let shortResource;
      if (availableGold < animalMachine.priceGold) {
        shortResource = "Gold";
      } else if (availableMetal < animalMachine.priceMetal) {
        shortResource = "Metal";
      } else if (availableWood < animalMachine.priceWood) {
        shortResource = "Wood";
      }
      alert(`Sorry you don't have enough ${shortResource}`);
    }
  }
  return false;
};

// Immediately Invoked Function Expression to show all data when home page is loaded
(() => {
  showAllWarriors();
  showAllAnimalsMachines();
  updateResourceDisplay();
})();

export { buyWarrior, buyAnimalMachine };
