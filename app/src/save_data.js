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
  document.getElementById("name-text").innerHTML = `Name: ${getValue("name")}`
  document.getElementById("health-bar").value = getValue("currentHealth");
  document.getElementById("health-bar").max = getValue("maxHealth");
  document.getElementById("health-text").innerHTML = `Health: ${getValue("currentHealth")}/${getValue("maxHealth")}`;
  document.getElementById("level-text").innerHTML = `Level: ${getValue("level")}`;
  document.getElementById("mana-bar").value = getValue("currentMana");
  document.getElementById("mana-bar").max = getValue("maxMana");
  document.getElementById("mana-text").innerHTML = `Mana: ${getValue("currentMana")}/${getValue("maxMana")}`;
  var knownSpells = getValue("knownSpells");
  var spokenSpells = getValue("spokenSpells");
  var memories = getValue("memories");
  for (let i = 0; i < knownSpells.length; i++) {
    var spellName = knownSpells[i]["name"];
    var spellDescription = knownSpells[i]["description"];
    var spellType = knownSpells[i]["type"];
    if (spellType == "Element" || spellType == "Direction") {
      if (!document.getElementById(spellName)) {
        document.getElementById("known-spells").innerHTML += `<option id="${spellName}">${spellName} | ${spellType} | ${spellDescription}</option>`;
      }
    } else if (spellType == "Spell") {
      var spellPower = knownSpells[i]["power"];
      var spellRange = knownSpells[i]["range"];
      var spellManaCost = knownSpells[i]["manaCost"];
      var spellAttackIncrease = knownSpells[i]["attackIncrease"];
      var spellHealthIncrease = knownSpells[i]["healthIncrease"];
      var spellArmorIncrease = knownSpells[i]["armorIncrease"];
      var spellSpeedIncrease = knownSpells[i]["speedIncrease"];
      var spellRangeIncrease = knownSpells[i]["rangeIncrease"];
      if (!document.getElementById(spellName)) {
        if (knownSpells[i]["isSupport"] == false) {
          document.getElementById("known-spells").innerHTML += `<option id="${spellName}">${spellName} | ${spellType} | ${spellDescription} | Power: ${spellPower} | Range: ${spellRange} | Mana Cost: ${spellManaCost}</option>`;
        } else if (knownSpells[i]["isSupport"] == true) {
          document.getElementById("known-spells").innerHTML += `<option id="${spellName}">${spellName} | ${spellType} | ${spellDescription} | Atk↑: ${spellAttackIncrease} | HP↑: ${spellHealthIncrease} | Def↑: ${spellArmorIncrease} | Spd↑: ${spellSpeedIncrease} | Rng↑: ${spellRangeIncrease}</option>`;
        }
      }
    }
  }
  for (let i = 0; i < spokenSpells.length; i++) {
    var spellName = spokenSpells[i]["name"];
    var spellDescription = spokenSpells[i]["description"];
    var spellType = spokenSpells[i]["type"];
    if (spellType == "Element" || spellType == "Direction") {
      if (!document.getElementById(spellName)) {
        document.getElementById("spoken-spells").innerHTML += `<option id="${spellName}">${spellName} | ${spellType} | ${spellDescription}</option>`;
      }
    } else if (spellType == "Spell") {
      var spellPower = spokenSpells[i]["power"];
      var spellRange = spokenSpells[i]["range"];
      var spellManaCost = spokenSpells[i]["manaCost"];
      var spellAttackIncrease = spokenSpells[i]["attackIncrease"];
      var spellHealthIncrease = spokenSpells[i]["healthIncrease"];
      var spellArmorIncrease = spokenSpells[i]["armorIncrease"];
      var spellSpeedIncrease = spokenSpells[i]["speedIncrease"];
      var spellRangeIncrease = spokenSpells[i]["rangeIncrease"];
      if (!document.getElementById(spellName)) {
        if (spokenSpells[i]["isSupport"] == false) {
          document.getElementById("spoken-spells").innerHTML += `<option id="${spellName}">${spellName} | ${spellType} | ${spellDescription} | Power: ${spellPower} | Range: ${spellRange} | Mana Cost: ${spellManaCost}</option>`;
        } else if (spokenSpells[i]["isSupport"] == true) {
          document.getElementById("spoken-spells").innerHTML += `<option id="${spellName}">${spellName} | ${spellType} | ${spellDescription} | Atk↑: ${spellAttackIncrease} | HP↑: ${spellHealthIncrease} | Def↑: ${spellArmorIncrease} | Spd↑: ${spellSpeedIncrease} | Rng↑: ${spellRangeIncrease}</option>`;
        }
      }
    }
  }
  for (let i = 0; i < memories.length; i++) {
    var memory = memories[i];
    if (!document.getElementById(memory)) {
      document.getElementById("memories").innerHTML += `<option id="${memory}">${memory}</option>`;
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

function addEntity(entity, target) {
  var playerData = JSON.parse(localStorage.getItem("playerData"));
  if (target == "spokenSpells" && JSON.parse(localStorage.getItem("playerData"))["knownSpells"].includes(entity)) {
    playerData["knownSpells"].splice(playerData["knownSpells"].indexOf(entity), 1);
    localStorage.setItem("playerData", JSON.stringify(playerData));
  } else {
  playerData[target].push(entity);
  localStorage.setItem("playerData", JSON.stringify(playerData));
  }
  updateUI();
}

function removeEntity(entity, target) {
  var playerData = JSON.parse(localStorage.getItem("playerData"));
  playerData[target].splice(playerData[target].indexOf(entity), 1);
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
