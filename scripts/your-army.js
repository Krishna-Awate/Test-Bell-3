import {
  gatherGoldOrMetal,
  gatherWood,
  updateResourceDisplay,
} from "./modules/GettingResource.js";

import WarriorsModule from "./modules/WarriorsModule.js";
import AnimalsWarMachinesModule from "./modules/AnimalsWarMachinesModule.js";

// Update resource display when the page loads
updateResourceDisplay();

const updateYourArmyDisplay = () => {
  // Fetch bought warriors, animals, and war machines
  const boughtWarriors = WarriorsModule.getBoughtWarriors();
  const boughtDefenses = AnimalsWarMachinesModule.getBoughtDefenses();

  const yourArmySection = document.getElementById("your-army-section");
  yourArmySection.innerHTML = ""; // Clear the existing content

  // Helper function to generate HTML for a bought item
  const generateItemHTML = (item) => {
    return `
            <div>
                <img src="images/${item.image}" alt="${item.name}" width="50" height="50">
                <p>${item.name}</p>
            </div>
        `;
  };

  // Display bought warriors
  yourArmySection.innerHTML = "Warriors";
  boughtWarriors.forEach((warrior) => {
    yourArmySection.innerHTML += generateItemHTML(warrior);
  });

  // Display bought animals and war machines
  yourArmySection.innerHTML += "War Machines and Animals";
  boughtDefenses.forEach((defense) => {
    yourArmySection.innerHTML += generateItemHTML(defense);
  });
};

// Call function to show data when my army page is loaded
updateYourArmyDisplay();
