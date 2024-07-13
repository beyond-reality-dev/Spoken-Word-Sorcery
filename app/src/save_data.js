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
  for (let i = 0; i < getValue("knownSpells").length; i++) {
    var spellName = getValue("knownSpells")[i]["name"];
    var spellDescription = getValue("knownSpells")[i]["description"];
    console.log(i+" "+spellName+" "+spellDescription);
    console.log(getValue("knownSpells")[i]["type"]);
    if (getValue("knownSpells")[i]["type"] == "element" || getValue("knownSpells")[i]["type"] == "direction") {
      if (!document.getElementById(spellName)) {
        document.getElementById("known-spells").innerHTML += `<option id="${spellName}">${spellName} | ${spellDescription}</option>`;
      }
    } else if (getValue("knownSpells")[i]["type"] == "spell") {
      var spellPower = getValue("knownSpells")[i]["power"];
      var spellRange = getValue("knownSpells")[i]["range"];
      var spellManaCost = getValue("knownSpells")[i]["manaCost"];
      var spellAttackIncrease = getValue("knownSpells")[i]["attackIncrease"];
      var spellHealthIncrease = getValue("knownSpells")[i]["healthIncrease"];
      var spellArmorIncrease = getValue("knownSpells")[i]["armorIncrease"];
      var spellSpeedIncrease = getValue("knownSpells")[i]["speedIncrease"];
      var spellRangeIncrease = getValue("knownSpells")[i]["rangeIncrease"];
      if (!document.getElementById(spellName)) {
        if (getValue("knownSpells")[i]["isSupport"] == false) {
          document.getElementById("known-spells").innerHTML += `<option id="${spellName}">${spellName} | ${spellDescription} | Power: ${spellPower} | Range: ${spellRange} | Mana Cost: ${spellManaCost}</option>`;
        } else if (getValue("knownSpells")[i]["isSupport"] == true) {
          document.getElementById("known-spells").innerHTML += `<option id="${spellName}">${spellName} | ${spellDescription} | Atk↑: ${spellAttackIncrease} | HP↑: ${spellHealthIncrease} | Def↑: ${spellArmorIncrease} | Spd↑: ${spellSpeedIncrease} | Rng↑: ${spellRangeIncrease}</option>`;
        }
      }
    }
  }
  for (let i = 0; i < getValue("spokenSpells").length; i++) {
    var spellName = getValue("spokenSpells")[i]["name"];
    var spellDescription = getValue("spokenSpells")[i]["description"];
    if (getValue("spokenSpells")[i]["type"] == "element" || getValue("spokenSpells")[i]["type"] == "direction") {
      if (!document.getElementById(spellName)) {
        document.getElementById("spoken-spells").innerHTML += `<option id="${spellName}">${spellName} | ${spellDescription}</option>`;
      }
    } else if (getValue("spokenSpells")[i]["type"] == "spell") {
      var spellPower = getValue("spokenSpells")[i]["power"];
      var spellRange = getValue("spokenSpells")[i]["range"];
      var spellManaCost = getValue("spokenSpells")[i]["manaCost"];
      var spellAttackIncrease = getValue("spokenSpells")[i]["attackIncrease"];
      var spellHealthIncrease = getValue("spokenSpells")[i]["healthIncrease"];
      var spellArmorIncrease = getValue("spokenSpells")[i]["armorIncrease"];
      var spellSpeedIncrease = getValue("spokenSpells")[i]["speedIncrease"];
      var spellRangeIncrease = getValue("spokenSpells")[i]["rangeIncrease"];
      if (!document.getElementById(spellName)) {
        if (getValue("spokenSpells")[i]["isSupport"] == false) {
          document.getElementById("spoken-spells").innerHTML += `<option id="${spellName}">${spellName} | ${spellDescription} | Power: ${spellPower} | Range: ${spellRange} | Mana Cost: ${spellManaCost}</option>`;
        } else if (getValue("spokenSpells")[i]["isSupport"] == true) {
          document.getElementById("spoken-spells").innerHTML += `<option id="${spellName}">${spellName} | ${spellDescription} | Atk↑: ${spellAttackIncrease} | HP↑: ${spellHealthIncrease} | Def↑: ${spellArmorIncrease} | Spd↑: ${spellSpeedIncrease} | Rng↑: ${spellRangeIncrease}</option>`;
        }
      }
    }
  }
  for (let i = 0; i <getValue("memories").length; i++) {
    var memory = getValue("memories")[i];
    if (!document.getElementById(memory)) {
      document.getElementById("memories").innerHTML += `<option id="${memory}">${memory}</option>`;
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
