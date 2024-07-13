module.exports = { initializeData, loadData, saveData, addEntity, getDirection, changeDirection };

function initializeData(name) {
  var playerData = {
    "name": name,
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
}

function loadData() {
  var playerData = JSON.parse(localStorage.getItem("playerData"));
  return playerData;
}

function saveData(playerData) {
  localStorage.setItem("playerData", JSON.stringify(playerData));
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