module.exports = { initializeData, updateUI, addEntity, getValue, changeValue, getDirection, changeDirection };

function initializeData(name) {
  var playerData = {
    "name": name,
    "level": 1,
    "experience": 0,
    "maxHealth": 100,
    "currentHealth": 100,
    "maxMana": 50,
    "currentMana": 50,
    "direction": "North"
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
}

function removeEntity(entity, target) {
  var playerData = JSON.parse(localStorage.getItem("playerData"));
  playerData[target].splice(playerData[target].indexOf(entity), 1);
  localStorage.setItem("playerData", JSON.stringify(playerData));
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

function getDirection() {
  var playerData = JSON.parse(localStorage.getItem("playerData"));
  var direction = playerData["direction"];
  return direction;
}

function changeDirection(newDirection) {
  var playerData = JSON.parse(localStorage.getItem("playerData"));
  playerData["direction"] = newDirection;
  localStorage.setItem("playerData", JSON.stringify(playerData));
}