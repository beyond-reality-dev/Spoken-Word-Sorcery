module.exports = { initializeData, saveGame, loadGame, updateUI, addEntity, removeEntity, getValue, changeValue, calculateValue };

const { inputLoop, handleMovement } = require("./handle_input");
const { trainingRoom, practiceYard, storageRoom, commonRoom, kitchen, barracks, grandHall } = require("./class_collections/locations/imperial_academy");

function initializeData() {
  var playerData = {
    name: "",
    level: 1,
    experience: 0,
    insanity: 0,
    maxHealth: 100,
    currentHealth: 100,
    maxMana: 50,
    currentMana: 50,
    gold: 0,
    direction: "North",
    location: "trainingRoom",
    gameSpeed: 1000,
  };
  var inventory = [];
  var equipment = {
    head: null,
    chest: null,
    legs: null,
    feet: null,
    mainHand: null,
    offHand: null,
    accessory: null,
  };
  var knownSpells = [];
  var spokenSpells = [];
  var memories = [];
  var locations = {
    trainingRoom: trainingRoom,
    practiceYard: practiceYard,
    storageRoom: storageRoom,
    commonRoom: commonRoom,
    kitchen: kitchen,
    barracks: barracks,
    grandHall: grandHall
  };
  playerData["knownSpells"] = knownSpells;
  playerData["spokenSpells"] = spokenSpells;
  playerData["memories"] = memories;
  playerData["equipment"] = equipment;
  playerData["inventory"] = inventory;
  playerData["locations"] = locations;
  localStorage.setItem("playerData", JSON.stringify(playerData));
  updateUI();
}

function saveGame() {
  var playerData = JSON.parse(localStorage.getItem("playerData"));
  var save = JSON.stringify(playerData);
  localStorage.setItem("save", save);
}

async function loadGame() {
  var save = localStorage.getItem("save");
  var playerData = JSON.parse(save);
  localStorage.setItem("playerData", JSON.stringify(playerData));
  updateUI();
  handleMovement("load");
  await inputLoop();
}

function updateUI() {
  updateTitleBar();
  updateSpellbook("knownSpells");
  updateSpellbook("spokenSpells");
  updateSpellbook("memories");
  updateInventory();
  updateEquipment();
}

function updateTitleBar() {
  document.getElementById("name-text").innerHTML = `Name: ${getValue("name")}`;
  document.getElementById("health-bar").value = getValue("currentHealth");
  document.getElementById("health-bar").max = getValue("maxHealth");
  document.getElementById("health-text").innerHTML = `Health: ${getValue("currentHealth")}/${getValue("maxHealth")}`;
  document.getElementById("level-text").innerHTML = `Level: ${getValue("level")}`;
  document.getElementById("mana-bar").value = getValue("currentMana");
  document.getElementById("mana-bar").max = getValue("maxMana");
  document.getElementById("mana-text").innerHTML = `Mana: ${getValue("currentMana")}/${getValue("maxMana")}`;
}

function updateSpellbook(target) {
  var spells = getValue(target);
  if (target == "knownSpells" || target == "spokenSpells") {
    if (target == "knownSpells") {
      targetElement = "known-spells";
    } else if (target == "spokenSpells") {
      targetElement = "spoken-spells";
    }
    for (let i = 0; i < spells.length; i++) {
      var spellName = spells[i]["name"];
      var spellDescription = spells[i]["description"];
      var spellType = spells[i]["type"];
      if (spellType == "Element" || spellType == "Direction") {
        if (document.getElementById(spellName)) { document.getElementById(spellName).remove(); }
        document.getElementById(targetElement).innerHTML += `<option id="${spellName}">${spellName} | ${spellType} | ${spellDescription}</option>`;
      } else if (spellType == "Spell") {
        var spellPower = spells[i]["power"];
        var spellRange = spells[i]["range"];
        var spellManaCost = spells[i]["manaCost"];
        var spellAttackIncrease = spells[i]["attackIncrease"];
        var spellHealthIncrease = spells[i]["healthIncrease"];
        var spellArmorIncrease = spells[i]["armorIncrease"];
        var spellSpeedIncrease = spells[i]["speedIncrease"];
        var spellRangeIncrease = spells[i]["rangeIncrease"];
        if (document.getElementById(spellName)) { document.getElementById(spellName).remove(); }
        if (spells[i]["isSupport"] == false) {
          document.getElementById(targetElement).innerHTML += `<option id="${spellName}">${spellName} | ${spellType} | ${spellDescription} | Power: ${spellPower} | Range: ${spellRange} | Mana Cost: ${spellManaCost}</option>`;
        } else if (spells[i]["isSupport"] == true) {
          document.getElementById(targetElement).innerHTML += `<option id="${spellName}">${spellName} | ${spellType} | ${spellDescription} | Atk↑: ${spellAttackIncrease} | HP↑: ${spellHealthIncrease} | Def↑: ${spellArmorIncrease} | Spd↑: ${spellSpeedIncrease} | Rng↑: ${spellRangeIncrease}</option>`;
        }
      }
    }
  } else if (target == "memories") {
    for (let i = 0; i < spells.length; i++) {
      var memory = spells[i];
      if (!document.getElementById(memory)) {
        document.getElementById("memories").innerHTML += `<option id="${memory}">${memory}</option>`;
      }
    }
  }
  sortList("known-spells");
  sortList("spoken-spells");
  sortList("memories");
}

function sortList(list) {
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById(list);
  switching = true;
  while (switching) {
    switching = false;
    b = list.getElementsByTagName("OPTION");
    for (i = 0; i < b.length - 1; i++) {
      shouldSwitch = false;
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}

function updateInventory() {
  var gold = getValue("gold");
  document.getElementById("gold-counter").innerHTML = `Gold: ${gold}`;
  var items = getValue("inventory");
  for (let i = 0; i < items.length; i++) {
    var itemName = items[i]["name"];
    var itemDescription = items[i]["description"];
    var itemGoldValue = items[i]["goldValue"];
    var itemWeight = items[i]["weight"];
    var itemQuantity = items[i]["quantity"];
    if (document.getElementById(itemName)) { document.getElementById(itemName).remove(); }
    if (itemQuantity == 0) {
      items.splice(i, 1);
      continue;
    }
    if (items[i]["type"] == "Weapon") {
      var itemAttackValue = items[i]["attackValue"];
      var itemRangeValue = items[i]["rangeValue"];
      document.getElementById("weapons").innerHTML += `<option id="${itemName}">${itemName} | ${itemDescription} | Atk: ${itemAttackValue} | Rng: ${itemRangeValue} | Wgt: ${itemWeight} | ${itemGoldValue} Gold | x${itemQuantity}</option>`;
    } else if (items[i]["type"] == "Armor") {
      var itemArmorValue = items[i]["armorValue"];
      document.getElementById("armor").innerHTML += `<option id="${itemName}">${itemName} | ${itemDescription} | Def: ${itemArmorValue} | Wgt: ${itemWeight} | ${itemGoldValue} Gold | x${itemQuantity}</option>`;
    } else if (items[i]["type"] == "Consumable") {
      var itemHealthValue = items[i]["healthValue"];
      var itemManaValue = items[i]["manaValue"];
      var itemSpeedValue = items[i]["speedValue"];
      document.getElementById("consumables").innerHTML += `<option id="${itemName}">${itemName} | ${itemDescription} | HP↑: ${itemHealthValue} | Mana↑: ${itemManaValue} | Spd↑: ${itemSpeedValue} | Wgt: ${itemWeight} | ${itemGoldValue} Gold | x${itemQuantity}</option>`;
    } else if (items[i]["type"] == "Miscellaneous") {
      document.getElementById("miscellaneous").innerHTML += `<option id="${itemName}">${itemName} | ${itemDescription} | Wgt: ${itemWeight} | ${itemGoldValue} Gold | x${itemQuantity}</option>`;
    }
  }
  sortList("weapons");
  sortList("armor");
  sortList("consumables");
  sortList("miscellaneous");
}

function updateEquipment() {
  var equipment = getValue("equipment");
  for (let i = 0; i < equipment.length; i++) {
    if (document.getElementById(itemName)) { document.getElementById(itemName).remove(); }
    var position = equipment[i]["position"];
    if (
      position == "head" ||
      position == "chest" ||
      position == "legs" ||
      position == "feet"
    ) {
      var itemName = equipment[i]["name"];
      var itemDescription = equipment[i]["description"];
      var itemArmorValue = equipment[i]["armorValue"];
      var itemWeight = equipment[i]["weight"];
      document.getElementById(position).innerHTML += `<option id="${itemName}">${itemName} | ${itemDescription} | Def: ${itemArmorValue} | Wgt: ${itemWeight}</option>`;
    } else if (
      position == "mainHand" ||
      position == "offHand" ||
      position == "accessory"
    ) {
      var itemName = equipment[i]["name"];
      var itemDescription = equipment[i]["description"];
      var itemAttackValue = equipment[i]["attackValue"];
      var itemRangeValue = equipment[i]["rangeValue"];
      var itemWeight = equipment[i]["weight"];
      document.getElementById(position).innerHTML += `<option id="${itemName}">${itemName} | ${itemDescription} | Atk: ${itemAttackValue} | Rng: ${itemRangeValue} | Wgt: ${itemWeight}</option>`;
    }
  }
}

function addEntity(entity, target) {
  var playerData = JSON.parse(localStorage.getItem("playerData"));
  if (target == "spokenSpells") {
    for (
      let i = 0;
      i < JSON.parse(localStorage.getItem("playerData"))["knownSpells"].length;
      i++
    ) {
      if (JSON.parse(localStorage.getItem("playerData"))["knownSpells"][i]["name"] == entity["name"]) {
        var matchKnown = true;
        var index = i;
        break;
      }
    }
    if (matchKnown == true) {
      playerData["knownSpells"].splice(index, 1);
    }
    playerData["spokenSpells"].push(entity);
  } else {
    playerData[target].push(entity);
  }
  localStorage.setItem("playerData", JSON.stringify(playerData));
  updateUI();
}

function removeEntity(entity, target) {
  var playerData = JSON.parse(localStorage.getItem("playerData"));
  var hits = 0;
  for (let i = 0; i < playerData[target].length; i++) {
    if (playerData[target][i]["name"] == entity) {
      if (hits == 0) {
        playerData[target].splice(i, 1);
      }
      hits = hits + 1;
    }
  }
  if (target == "inventory" && hits == 1) {
    for (let i = 0; i < playerData["equipment"].length; i++) {
      if (playerData["equipment"][i]["name"] == entity) {
        playerData["equipment"].splice(i, 1);
      }
    }
  }
  localStorage.setItem("playerData", JSON.stringify(playerData));
  updateUI();
}

function getValue(target, locations=false) {
  if (locations) {
    var playerData = JSON.parse(localStorage.getItem("playerData"));
    var locations = playerData["locations"];
    var value = locations[target];
    return value;
  }
  var playerData = JSON.parse(localStorage.getItem("playerData"));
  var value = playerData[target];
  return value;
}

function changeValue(target, newValue, i=0) {
  var playerData = JSON.parse(localStorage.getItem("playerData"));
  if (target == "itemQuantity") {
    playerData["inventory"][i]["quantity"] = newValue;
  } else {
    playerData[target] = newValue;
  }
  localStorage.setItem("playerData", JSON.stringify(playerData));
  updateUI();
}

function calculateValue(target, operation, amount) {
  var value = getValue(target);
  if (operation == "add") {
    value = value + amount;
  } else if (operation == "subtract") {
    value = value - amount;
  } else if (operation == "multiply") {
    value = value * amount;
  } else if (operation == "divide") {
    value = value / amount;
  }
  changeValue(target, value);
}