module.exports = { initializeData, updateUI, addEntity, getValue, changeValue };

function initializeData(name) {
  var playerData = {
    "name": name,
    "level": 1,
    "experience": 0,
    "insanity": 0,
    "maxHealth": 100,
    "currentHealth": 100,
    "maxMana": 50,
    "currentMana": 50,
    "direction": "North",
    "checkPoint": "intro"
};
var inventory = {
    "gold": 0,
    "items": []
};
var equipment = {
    "head": null,
    "chest": null,
    "legs": null,
    "feet": null,
    "mainHand": null,
    "offHand": null
};
var knownSpells = [];
var spokenSpells = [];
var memories = [];
playerData["knownSpells"] = knownSpells;
playerData["spokenSpells"] = spokenSpells;
playerData["memories"] = memories;
playerData["equipment"] = equipment;
playerData["inventory"] = inventory;
localStorage.setItem("playerData", JSON.stringify(playerData));
updateUI();
}

function updateUI() {
  updateTitleBar();
  updateSpellbook("knownSpells");
  updateSpellbook("spokenSpells");
  updateSpellbook("memories");
}

function updateTitleBar() {
  document.getElementById("name-text").innerHTML = `Name: ${getValue("name")}`
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
    if (target == "knownSpells") { targetElement = "known-spells"; }
    else if (target == "spokenSpells") { targetElement = "spoken-spells"; }
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
    for (i = 0; i < (b.length - 1); i++) {
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
  var inventory = getValue("inventory");
  var items = inventory["items"];
  for (let i = 0; i < items.length; i++) {
    var itemName = items[i]["name"];
    var itemDescription = items[i]["description"];
    var itemGoldValue = items[i]["goldValue"];
    var itemHealthValue = items[i]["healthValue"];
    var itemArmorValue = items[i]["armorValue"];
    var itemAttackValue = items[i]["attackValue"];
    var itemSpeedValue = items[i]["speedValue"];
    var itemRangeValue = items[i]["rangeValue"];
    var itemManaValue = items[i]["manaValue"];
    var itemIsConsumable = items[i]["isConsumable"];
    if (document.getElementById(itemName)) { document.getElementById(itemName).remove(); }
    if (itemIsConsumable == false) {
      document.getElementById("inventory").innerHTML += `<option id="${itemName}">${itemName} | ${itemDescription} | Gold: ${itemGoldValue} | Def: ${itemArmorValue} | Atk: ${itemAttackValue} Rng: ${itemRangeValue} </option>`;
    } else if (itemIsConsumable == true) {
      document.getElementById("consumables").innerHTML += `<option id="${itemName}">${itemName} | ${itemDescription} | Gold: ${itemGoldValue} | HP↑: ${itemHealthValue} | Mana: ${itemManaValue} | Spd↑: ${itemSpeedValue}</option>`;
    }
  }
  sortList("inventory");
}

function addEntity(entity, target) {
  var playerData = JSON.parse(localStorage.getItem("playerData"));
  for (let i = 0; i < JSON.parse(localStorage.getItem("playerData"))["knownSpells"].length; i++) {
    if (JSON.parse(localStorage.getItem("playerData"))["knownSpells"][i]["name"] == entity["name"]) {
      var matchKnown = true;
      var index = i;
      break;
    }
  }
  if (target == "spokenSpells" && matchKnown == true) {
    playerData["knownSpells"].splice(index, 1);
    console.log(playerData["knownSpells"]);
  }
  playerData[target].push(entity);
  console.log(playerData[target]);
  localStorage.setItem("playerData", JSON.stringify(playerData));
  updateUI();
}

function getValue(target) {
  var playerData = JSON.parse(localStorage.getItem("playerData"));
  var value = playerData[target];
  return value;
}

function changeValue(target, newValue) {
  var playerData = JSON.parse(localStorage.getItem("playerData"));
  playerData[target] = newValue;
  localStorage.setItem("playerData", JSON.stringify(playerData));
}
