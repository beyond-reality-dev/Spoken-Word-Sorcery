module.exports = {
  allowInput,
  blockInput,
  closedInput,
  openInput,
  inputLoop,
  handleMovement,
};
const {
  addEntity,
  getValue,
  changeValue,
  calculateValue,
  updateUI,
  updateEquipment,
} = require("./save_data");
const { toTitleCase, quickPrint } = require("./general");
const { handleCombat } = require("./combat");
const { enemies } = require("./class_collections");
const { spells } = require("./class_collections");
const cutscenes = require("./cutscenes");

function allowInput() {
  document.getElementById("input-bar").style.backgroundColor = "#ffffff";
  document.getElementById("input-bar").setAttribute("contenteditable", "true");
}

function blockInput() {
  document.getElementById("input-bar").style.backgroundColor = "#d1d1d1";
  document.getElementById("input-bar").setAttribute("contenteditable", "false");
}

async function closedInput() {
  return new Promise(function (resolve) {
    const input = document.getElementById("input-bar");
    function handleKeyPress(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const text = input.innerText;
        document.getElementById("main-content").innerHTML +=
          "<span style='color: blue;'><p> " + text + "</p></span>";
        document.getElementById("main-content").scrollTop =
          document.getElementById("main-content").scrollHeight;
        input.innerText = "";
        input.removeEventListener("keypress", handleKeyPress);
        resolve(text);
      }
    }
    input.addEventListener("keypress", handleKeyPress);
  });
}

async function openInput(combatOverride = false) {
  return new Promise(function (resolve) {
    const input = document.getElementById("input-bar");
    function handleKeyPress(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        var text = input.innerText;
        document.getElementById("main-content").innerHTML +=
          "<span style='color: blue;'><p> " + text + "</p></span>";
        document.getElementById("main-content").scrollTop =
          document.getElementById("main-content").scrollHeight;
        input.innerText = "";
        input.removeEventListener("keypress", handleKeyPress);
        text = text.toLowerCase();
        text = text.replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ");
        if (text.substring(0, 2) == "i ") {
          text = text.substring(2);
        }
        var clauses = text.split(" and ");
        var hasTurned = false;
        var hasEquipped = false;
        var hasUnequipped = false;
        var hasActed = false;
        for (let i = 0; i < clauses.length; i++) {
          if (clauses[i].substring(0, 9) == "remember ") {
            var memory = clauses[i].substring(9);
            addEntity(memory, "memories");
          } else if (
            clauses[i].substring(0, 5) == "face " ||
            clauses[i].substring(0, 5) == "turn " ||
            clauses[i].substring(0, 5) == "look "
          ) {
            if (hasTurned == true) {
              quickPrint("You have already turned this turn.");
              continue;
            }
            hasTurned = true;
            var direction = getValue("direction");
            if (clauses[i].substring(5, 12) == "to the ") {
              var change = clauses[i].substring(12);
            } else {
              change = clauses[i].substring(5);
            }
            handleTurn(direction, change);
          } else if (clauses[i].substring(0, 3) == "go ") {
            if (getValue("isCombat") == true) {
              quickPrint("You cannot move during combat.");
              continue;
            }
            if (clauses[i].substring(3, 10) == "to the ") {
              direction = clauses[i].substring(10);
            } else {
              direction = clauses[i].substring(3);
            }
            handleMovement(direction);
          } else if (clauses[i].substring(0, 4) == "run") {
            if (getValue("isCombat") == true) {
              quickPrint("You cannot move during combat.");
              continue;
            }
            if (clauses[i].substring(4, 11) == "to the ") {
              direction = clauses[i].substring(11);
            } else {
              direction = clauses[i].substring(4);
            }
            handleMovement(direction);
          } else if (
            clauses[i].substring(0, 5) == "exit " ||
            clauses[i].substring(0, 5) == "move " ||
            clauses[i].substring(0, 5) == "walk "
          ) {
            if (getValue("isCombat") == true) {
              quickPrint("You cannot move during combat.");
              continue;
            }
            if (clauses[i].substring(5, 12) == "to the ") {
              direction = clauses[i].substring(12);
            } else {
              direction = clauses[i].substring(5);
            }
            handleMovement(direction);
          } else if (clauses[i].substring(0, 8) == "pick up ") {
            if (clauses[i].substring(8, 10) == "a ") {
              var item = clauses[i].substring(10);
            } else if (clauses[i].substring(8, 11) == "an ") {
              item = clauses[i].substring(11);
            } else if (clauses[i].substring(8, 12) == "the ") {
              item = clauses[i].substring(12);
            } else {
              item = clauses[i].substring(8);
            }
            handlePickup(item);
          } else if (clauses[i].substring(0, 5) == "drop ") {
            if (clauses[i].substring(5, 7) == "a ") {
              item = clauses[i].substring(7);
            } else if (clauses[i].substring(5, 8) == "an ") {
              item = clauses[i].substring(8);
            } else if (clauses[i].substring(5, 9) == "the ") {
              item = clauses[i].substring(9);
            } else {
              item = clauses[i].substring(5);
            }
            handleDrop(item);
          } else if (clauses[i].substring(0, 6) == "equip ") {
            if (hasEquipped == true) {
              quickPrint("You have already equipped this turn.");
              continue;
            }
            hasEquipped = true;
            if (clauses[i].substring(6, 8) == "a ") {
              item = clauses[i].substring(8);
            } else if (clauses[i].substring(6, 9) == "an ") {
              item = clauses[i].substring(9);
            } else if (clauses[i].substring(6, 10) == "the ") {
              item = clauses[i].substring(10);
            } else {
              item = clauses[i].substring(6);
            }
            handleEquip(item);
          } else if (clauses[i].substring(0, 7) == "put on ") {
            if (hasEquipped == true) {
              quickPrint("You have already equipped this turn.");
              continue;
            }
            hasEquipped = true;
            if (clauses[i].substring(7, 9) == "a ") {
              item = clauses[i].substring(9);
            } else if (clauses[i].substring(7, 10) == "an ") {
              item = clauses[i].substring(10);
            } else if (clauses[i].substring(7, 11) == "the ") {
              item = clauses[i].substring(11);
            } else {
              item = clauses[i].substring(7);
            }
            handleEquip(item);
          } else if (clauses[i].substring(0, 6) == "remove ") {
            if (hasUnequipped == true) {
              quickPrint("You have already unequipped this turn.");
              continue;
            }
            hasUnequipped = true;
            if (clauses[i].substring(6, 8) == "a ") {
              item = clauses[i].substring(8);
            } else if (clauses[i].substring(6, 9) == "an ") {
              item = clauses[i].substring(9);
            } else if (clauses[i].substring(6, 10) == "the ") {
              item = clauses[i].substring(10);
            } else {
              item = clauses[i].substring(6);
            }
            handleUnequip(item);
          } else if (clauses[i].substring(0, 8) == "unequip ") {
            if (hasUnequipped == true) {
              quickPrint("You have already unequipped this turn.");
              continue;
            }
            hasUnequipped = true;
            if (clauses[i].substring(8, 10) == "a ") {
              item = clauses[i].substring(10);
            } else if (clauses[i].substring(8, 11) == "an ") {
              item = clauses[i].substring(11);
            } else if (clauses[i].substring(8, 12) == "the ") {
              item = clauses[i].substring(12);
            } else {
              item = clauses[i].substring(8);
            }
            handleUnequip(item);
          } else if (clauses[i].substring(0, 9) == "take off ") {
            if (hasUnequipped == true) {
              quickPrint("You have already unequipped this turn.");
              continue;
            }
            hasUnequipped = true;
            if (clauses[i].substring(9, 11) == "a ") {
              item = clauses[i].substring(11);
            } else if (clauses[i].substring(9, 12) == "an ") {
              item = clauses[i].substring(12);
            } else if (clauses[i].substring(9, 13) == "the ") {
              item = clauses[i].substring(13);
            } else {
              item = clauses[i].substring(9);
            }
            handleUnequip(item);
          } else if (
            clauses[i].substring(0, 3) == "use " ||
            clauses[i].substring(0, 3) == "eat "
          ) {
            if (clauses[i].substring(3, 5) == "a ") {
              item = clauses[i].substring(5);
            } else if (clauses[i].substring(3, 6) == "an ") {
              item = clauses[i].substring(6);
            } else if (clauses[i].substring(3, 7) == "the ") {
              item = clauses[i].substring(7);
            } else {
              item = clauses[i].substring(3);
            }
            handleUse(item);
          } else if (clauses[i].substring(0, 6) == "drink ") {
            if (clauses[i].substring(6, 8) == "a ") {
              item = clauses[i].substring(8);
            } else if (clauses[i].substring(6, 9) == "an ") {
              item = clauses[i].substring(9);
            } else if (clauses[i].substring(6, 10) == "the ") {
              item = clauses[i].substring(10);
            } else {
              item = clauses[i].substring(6);
            }
            handleUse(item);
          } else if (clauses[i].substring(0, 8) == "consume ") {
            if (clauses[i].substring(8, 10) == "a ") {
              item = clauses[i].substring(10);
            } else if (clauses[i].substring(8, 11) == "an ") {
              item = clauses[i].substring(11);
            } else if (clauses[i].substring(8, 12) == "the ") {
              item = clauses[i].substring(12);
            } else {
              item = clauses[i].substring(8);
            }
            handleUse(item);
          } else if (clauses[i].substring(0, 5) == "fight") {
            if (getValue("isCombat") == false) {
              quickPrint("You are not in combat.");
            } else if (hasActed == true) {
              quickPrint("You have already acted this turn.");
            } else if (hasActed == false) {
              hasActed = true;
              text = ["weapon"];
            }
          } else if (
            clauses[i].substring(0, 6) == "attack" ||
            clauses[i].substring(0, 6) == "strike" ||
            clauses[i].substring(0, 6) == "slash " ||
            clauses[i].substring(0, 6) == "swing " ||
            clauses[i].substring(0, 6) == "thrust"
          ) {
            if (getValue("isCombat") == false) {
              quickPrint("You are not in combat.");
            } else if (hasActed == true) {
              quickPrint("You have already acted this turn.");
            } else if (hasActed == false) {
              hasActed = true;
              text = ["weapon"];
            }
          } else if (clauses[i].substring(0, 10) == "use weapon") {
            if (getValue("isCombat") == false) {
              quickPrint("You are not in combat.");
            } else if (hasActed == true) {
              quickPrint("You have already acted this turn.");
            } else if (hasActed == false) {
              hasActed = true;
              text = ["weapon"];
            }
          } else if (clauses[i].substring(0, 4) == "say ") {
            if (getValue("isCombat") == false && combatOverride == false) {
              quickPrint("You are not in combat.");
            } else if (hasActed == true) {
              quickPrint("You have already acted this turn.");
            } else if (hasActed == false) {
              hasActed = true;
              var words = clauses[i].substring(4);
              var spellInput = handleSpell(words);
              var spellPower = spellInput[0];
              var spellDirection = spellInput[1];
              text = ["spell", spellPower, spellDirection];
            }
          } else if (
            clauses[i].substring(0, 5) == "yell " ||
            clauses[i].substring(0, 5) == "cast "
          ) {
            if (getValue("isCombat") == false && combatOverride == false) {
              quickPrint("You are not in combat.");
            } else if (hasActed == true) {
              quickPrint("You have already acted this turn.");
            } else if (hasActed == false) {
              hasActed = true;
              var words = clauses[i].substring(5);
              var spellInput = handleSpell(words);
              var spellPower = spellInput[0];
              var spellDirection = spellInput[1];
              text = ["spell", spellPower, spellDirection];
            }
          } else if (
            clauses[i].substring(0, 6) == "chant " ||
            clauses[i].substring(0, 6) == "shout " ||
            clauses[i].substring(0, 6) == "speak " ||
            clauses[i].substring(0, 6) == "utter "
          ) {
            if (getValue("isCombat") == false && combatOverride == false) {
              quickPrint("You are not in combat.");
            } else if (hasActed == true) {
              quickPrint("You have already acted this turn.");
            } else if (hasActed == false) {
              hasActed = true;
              var words = clauses[i].substring(6);
              var spellInput = handleSpell(words);
              var spellPower = spellInput[0];
              var spellDirection = spellInput[1];
              text = ["spell", spellPower, spellDirection];
            }
          } else if (clauses[i].substring(0, 7) == "mutter ") {
            if (getValue("isCombat") == false && combatOverride == false) {
              quickPrint("You are not in combat.");
            } else if (hasActed == true) {
              quickPrint("You have already acted this turn.");
            } else if (hasActed == false) {
              hasActed = true;
              var words = clauses[i].substring(7);
              var spellInput = handleSpell(words);
              var spellPower = spellInput[0];
              var spellDirection = spellInput[1];
              text = ["spell", spellPower, spellDirection];
            }
          } else if (clauses[i].substring(0, 4) == "rest ") {
            if (getValue("isCombat") == true) {
              quickPrint("You cannot rest during combat.");
              continue;
            }
            handleRest();
            text = ["rest"];
          } else if (clauses[i].substring(0, 5) == "sleep") {
            if (getValue("isCombat") == true) {
              quickPrint("You cannot sleep during combat.");
              continue;
            }
            handleRest();
          }
        }
        resolve(text);
      }
    }
    input.addEventListener("keypress", handleKeyPress);
  });
}

async function inputLoop() {
  while (true) {
    await openInput();
  }
}

function handleTurn(direction, change) {
  switch (change) {
    case "left":
      if (direction == "north") {
        changeValue("direction", "northwest");
      } else if (direction == "northeast") {
        changeValue("direction", "north");
      } else if (direction == "east") {
        changeValue("direction", "northeast");
      } else if (direction == "southeast") {
        changeValue("direction", "east");
      } else if (direction == "south") {
        changeValue("direction", "southeast");
      } else if (direction == "southwest") {
        changeValue("direction", "south");
      } else if (direction == "west") {
        changeValue("direction", "southwest");
      } else if (direction == "northwest") {
        changeValue("direction", "west");
      }
      break;
    case "right":
      if (direction == "north") {
        changeValue("direction", "northeast");
      } else if (direction == "northeast") {
        changeValue("direction", "east");
      } else if (direction == "east") {
        changeValue("direction", "southeast");
      } else if (direction == "southeast") {
        changeValue("direction", "south");
      } else if (direction == "south") {
        changeValue("direction", "southwest");
      } else if (direction == "southwest") {
        changeValue("direction", "west");
      } else if (direction == "west") {
        changeValue("direction", "northwest");
      } else if (direction == "northwest") {
        changeValue("direction", "north");
      }
      break;
    default:
      break;
  }
  quickPrint("You are now facing " + getValue("direction") + ".");
}

function handleMovement(direction) {
  var currentLocation = getValue("location");
  currentLocation = eval(getValue(currentLocation, true));
  if (direction == "load") {
    quickPrint(currentLocation.description);
    return;
  }
  try {
    var newLocation = currentLocation.exits[direction];
    newLocation = eval(getValue(newLocation, true));
    if (newLocation.hasOwnProperty("isLocked")) {
      if (newLocation.isLocked == true) {
        if (newLocation.hasOwnProperty("key")) {
          var inventory = getValue("inventory");
          var hasKey = false;
          for (let i = 0; i < inventory.length; i++) {
            if (inventory[i].name == newLocation.key) {
              hasKey = true;
              var primaryLocation = currentLocation.id.split(".")[0];
              var secondaryLocation = currentLocation.id.split(".")[1];
              newLocation.isLocked = false;
              var playerData = JSON.parse(localStorage.getItem("playerData"));
              var locations = playerData["locations"];
              locations[primaryLocation][secondaryLocation]["isLocked"] = false;
              localStorage.setItem("playerData", JSON.stringify(playerData));
              quickPrint(newLocation.unlockMessage);
              break;
            }
          }
          if (hasKey == false) {
            quickPrint(newLocation.lockedDescription);
            return;
          }
        } else {
          quickPrint(newLocation.lockedDescription);
          return;
        }
      }
    }
    changeValue("location", newLocation.id);
    changeValue("direction", direction);
    quickPrint(newLocation.description);
    if (newLocation.hasOwnProperty("isVisited")) {
      var primaryLocation = currentLocation.id.split(".")[0];
      var secondaryLocation = currentLocation.id.split(".")[1];
      newLocation.isVisited = true;
      var playerData = JSON.parse(localStorage.getItem("playerData"));
      var locations = playerData["locations"];
      locations[primaryLocation][secondaryLocation]["isVisited"] = true;
      localStorage.setItem("playerData", JSON.stringify(playerData));
    }
    if (newLocation.hasOwnProperty("cutscene")) {
      if (newLocation.cutscenePlayed == false) {
        var cutsceneName = newLocation.cutscene;
        cutscenes[cutsceneName][cutsceneName]();
      }
    } else if (newLocation.hasOwnProperty("enemies")) {
      handleCombat();
    }
  } catch (error) {
    console.log(error);
    var newLocation = currentLocation.exits[direction];
    quickPrint("You cannot go that way.");
  }
}

function handlePickup(item) {
  var currentLocation = getValue("location");
  currentLocation = eval(getValue(currentLocation, true));
  var items = currentLocation.items;
  if (item.charAt(item.length - 1) == "s") {
    item = item.substring(0, item.length - 1);
  }
  if (items.hasOwnProperty(item)) {
    var itemEntity = items[item];
    addEntity(itemEntity, "inventory");
    delete items[item];
    var playerData = JSON.parse(localStorage.getItem("playerData"));
    var locations = playerData["locations"];
    var primaryLocation = currentLocation.id.split(".")[0];
    var secondaryLocation = currentLocation.id.split(".")[1];
    locations[primaryLocation][secondaryLocation]["items"] = items;
    localStorage.setItem("playerData", JSON.stringify(playerData));
    if (itemEntity.quantity == 1) {
      quickPrint(`You picked up a ${item}.`);
    } else {
      quickPrint(`You picked up ${itemEntity.quantity} ${item}s.`);
    }
  } else {
    quickPrint("There is no " + item + " here.");
  }
}

function handleDrop(item) {
  var items = getValue("inventory");
  if (item.charAt(item.length - 1) == "s") {
    item = item.substring(0, item.length - 1);
  }
  for (let i = 0; i < items.length; i++) {
    if (items[i].name == toTitleCase(item)) {
      var current = items[i].quantity;
      current = current - 1;
      changeValue("itemQuantity", current, i);
      var playerData = JSON.parse(localStorage.getItem("playerData"));
      var currentLocation = getValue("location");
      var locationItems = eval(getValue(currentLocation, true).items);
      locationItems[item] = items[i];
      var locations = playerData["locations"];
      var primaryLocation = currentLocation.split(".")[0];
      var secondaryLocation = currentLocation.split(".")[1];
      locations[primaryLocation][secondaryLocation]["items"] = locationItems;
      if (item.charAt(0).match(/[aeiou]/i)) {
        quickPrint(`You dropped an ${item}.`);
      } else {
        quickPrint(`You dropped a ${item}.`);
      }
      var equipment = getValue("equipment");
      var head = equipment["head"];
      if (head != null) {
        if (head.name == toTitleCase(item)) {
          handleUnequip(item);
        }
      }
      var chest = equipment["chest"];
      if (chest != null) {
        if (chest.name == toTitleCase(item)) {
          handleUnequip(item);
        }
      }
      var legs = equipment["legs"];
      if (legs != null) {
        if (legs.name == toTitleCase(item)) {
          handleUnequip(item);
        }
      }
      var feet = equipment["feet"];
      if (feet != null) {
        if (feet.name == toTitleCase(item)) {
          handleUnequip(item);
        }
      }
      var mainHand = equipment["mainHand"];
      if (mainHand != null) {
        if (mainHand.name == toTitleCase(item)) {
          handleUnequip(item);
        }
      }
      var offHand = equipment["offHand"];
      if (offHand != null) {
        if (offHand.name == toTitleCase(item)) {
          handleUnequip(item);
        }
      }
      var accessory = equipment["accessory"];
      if (accessory != null) {
        if (accessory.name == toTitleCase(item)) {
          handleUnequip(item);
        }
      }
      equipment = getValue("equipment");
      playerData["equipment"] = equipment;
      localStorage.setItem("playerData", JSON.stringify(playerData));
      updateUI();
      break;
    }
  }
}

function handleEquip(item) {
  var items = getValue("inventory");
  if (item.charAt(item.length - 1) == "s") {
    item = item.substring(0, item.length - 1);
  }
  for (let i = 0; i < items.length; i++) {
    if (items[i].name == toTitleCase(item)) {
      addEntity(items[i], "equipment");
      if (item.charAt(0).match(/[aeiou]/i)) {
        quickPrint(`You equipped an ${item}.`);
      } else {
        quickPrint(`You equipped a ${item}.`);
      }
      break;
    } else {
      if (item.charAt(0).match(/[aeiou]/i)) {
        quickPrint(`You do not have an ${item}.`);
      } else {
        quickPrint(`You do not have a ${item}.`);
      }
    }
  }
}

function handleUnequip(item) {
  var equipment = getValue("equipment");
  var playerData = JSON.parse(localStorage.getItem("playerData"));
  var unequipped = false;
  if (item.charAt(item.length - 1) == "s") {
    item = item.substring(0, item.length - 1);
  }
  if (equipment["head"] != null) {
    if (equipment["head"].name == toTitleCase(item)) {
      equipment["head"] = null;
      quickPrint(`You unequipped the ${item}.`);
      unequipped = true;
    }
  }
  if (equipment["chest"] != null) {
    if (equipment["chest"].name == toTitleCase(item)) {
      equipment["chest"] = null;
      quickPrint(`You unequipped the ${item}.`);
      unequipped = true;
    }
  }
  if (equipment["legs"] != null) {
    if (equipment["legs"].name == toTitleCase(item)) {
      equipment["legs"] = null;
      quickPrint(`You unequipped the ${item}.`);
      unequipped = true;
    }
  }
  if (equipment["feet"] != null) {
    if (equipment["feet"].name == toTitleCase(item)) {
      equipment["feet"] = null;
      quickPrint(`You unequipped the ${item}.`);
      unequipped = true;
    }
  }
  if (equipment["mainHand"] != null) {
    if (equipment["mainHand"].name == toTitleCase(item)) {
      equipment["mainHand"] = null;
      quickPrint(`You unequipped the ${item}.`);
      unequipped = true;
    }
  }
  if (equipment["offHand"] != null) {
    if (equipment["offHand"].name == toTitleCase(item)) {
      equipment["offHand"] = null;
      quickPrint(`You unequipped the ${item}.`);
      unequipped = true;
    }
  }
  if (equipment["accessory"] != null) {
    if (equipment["accessory"].name == toTitleCase(item)) {
      equipment["accessory"] = null;
      quickPrint(`You unequipped the ${item}.`);
      unequipped = true;
    }
  }
  if (unequipped == false) {
    if (item.charAt(0).match(/[aeiou]/i)) {
      quickPrint(`You do not have an ${item} equipped.`);
    } else {
      quickPrint(`You do not have a ${item} equipped.`);
    }
  }
  playerData["equipment"] = equipment;
  localStorage.setItem("playerData", JSON.stringify(playerData));
  updateEquipment();
}

function handleUse(item) {
  var items = getValue("inventory");
  if (item.charAt(item.length - 1) == "s") {
    item = item.substring(0, item.length - 1);
  }
  for (let i = 0; i < items.length; i++) {
    if (items[i].name == toTitleCase(item)) {
      var itemEntity = items[i];
      var healthValue = itemEntity.healthValue;
      var manaValue = itemEntity.manaValue;
      var speedValue = itemEntity.speedValue;
      var weight = itemEntity.weight;
      calculateValue("currentHealth", "add", healthValue);
      calculateValue("currentMana", "add", manaValue);
      calculateValue("currentSpeed", "add", speedValue);
      calculateValue("currentWeight", "add", weight);
      var current = items[i].quantity;
      current = current - 1;
      changeValue("itemQuantity", current, i);
      var playerData = JSON.parse(localStorage.getItem("playerData"));
      playerData["inventory"] = items;
      localStorage.setItem("playerData", JSON.stringify(playerData));
      if (item.charAt(0).match(/[aeiou]/i)) {
        quickPrint(`You used an ${item}.`);
      } else {
        quickPrint(`You used a ${item}.`);
      }
      break;
    } else {
      if (item.charAt(0).match(/[aeiou]/i)) {
        quickPrint(`You do not have an ${item}.`);
      } else {
        quickPrint(`You do not have a ${item}.`);
      }
    }
  }
}

function handleSpell(words) {
  words = words.split(" ");
  var phrase = "";
  var knownSpells = getValue("knownSpells");
  var spokenSpells = getValue("spokenSpells");
  if (words.length != 3) {
    phrase = "Nothing happens.";
  } else {
    try {
      var element = eval("new spells." + toTitleCase(words[0]) + "()");
    } catch (error) {
      var invalid = true;
    }
    try {
      var spell = eval("new spells." + toTitleCase(words[1]) + "()");
    } catch (error) {
      invalid = true;
    }
    try {
      var direction = eval("new spells." + toTitleCase(words[2]) + "()");
    } catch (error) {
      invalid = true;
    }
    if (
      invalid == true ||
      element["type"] != "Element" ||
      spell["type"] != "Spell" ||
      direction["type"] != "Direction"
    ) {
      phrase = "Nothing happens.";
    } else if (spell.manaCost > getValue("currentMana")) {
      phrase = "You don't have enough mana to cast this spell.";
    } else {
      var matchKnown = false;
      for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < knownSpells.length; j++) {
          var currentSpell = eval("new spells." + toTitleCase(words[i]) + "()");
          var spellName = knownSpells[j]["name"];
          if (spellName == currentSpell.name) {
            var matchKnown = true;
            addEntity(currentSpell, "spokenSpells");
            break;
          }
        }
        for (let j = 0; j < spokenSpells.length; j++) {
          spellName = spokenSpells[j]["name"];
          if (spellName == spell.name) {
            currentSpell = eval("new spells." + toTitleCase(words[i]) + "()");
            var matchSpoken = true;
            break;
          }
        }
        if (matchKnown == false && matchSpoken == false) {
          phrase = "Nothing happens.";
          break;
        }
      }
      phrase = `${element.descriptor}${spell.descriptor}${direction.descriptor}`;
      calculateValue("currentMana", "subtract", spell.manaCost);
      if (direction.name == "Away") {
        var spellDirection = getValue("direction");
      } else if (direction.name == "Left") {
        if (getValue("direction") == "North") {
          spellDirection = "West";
        } else if (getValue("direction") == "Northeast") {
          spellDirection = "Northwest";
        } else if (getValue("direction") == "East") {
          spellDirection = "North";
        } else if (getValue("direction") == "Southeast") {
          spellDirection = "Northeast";
        } else if (getValue("direction") == "South") {
          spellDirection = "East";
        } else if (getValue("direction") == "Southwest") {
          spellDirection = "Southeast";
        } else if (getValue("direction") == "West") {
          spellDirection = "South";
        } else if (getValue("direction") == "Northwest") {
          spellDirection = "Southwest";
        }
      } else if (direction.name == "Right") {
        if (getValue("direction") == "North") {
          spellDirection = "East";
        } else if (getValue("direction") == "Northeast") {
          spellDirection = "Southeast";
        } else if (getValue("direction") == "East") {
          spellDirection = "South";
        } else if (getValue("direction") == "Southeast") {
          spellDirection = "Southwest";
        } else if (getValue("direction") == "South") {
          spellDirection = "West";
        } else if (getValue("direction") == "Southwest") {
          spellDirection = "Northwest";
        } else if (getValue("direction") == "West") {
          spellDirection = "North";
        } else if (getValue("direction") == "Northwest") {
          spellDirection = "Northeast";
        }
      } else if (direction.name == "Behind") {
        if (getValue("direction") == "North") {
          spellDirection = "South";
        } else if (getValue("direction") == "Northeast") {
          spellDirection = "Southwest";
        } else if (getValue("direction") == "East") {
          spellDirection = "West";
        } else if (getValue("direction") == "Southeast") {
          spellDirection = "Northwest";
        } else if (getValue("direction") == "South") {
          spellDirection = "North";
        } else if (getValue("direction") == "Southwest") {
          spellDirection = "Northeast";
        } else if (getValue("direction") == "West") {
          spellDirection = "East";
        } else if (getValue("direction") == "Northwest") {
          spellDirection = "Northeast";
        }
      }
    }
  }
  document.getElementById("main-content").innerHTML += "<p>" + phrase + "</p>";
  document.getElementById("main-content").scrollTop =
    document.getElementById("main-content").scrollHeight;
  return [spell.power, spellDirection];
}

function handleRest() {
  var currentLocation = getValue("location");
  currentLocation = eval(getValue(currentLocation, true));
  if (currentLocation.hasOwnProperty("restArea")) {
    if (currentLocation.restArea == true) {
      var maxHealth = getValue("maxHealth");
      var maxMana = getValue("maxMana");
      changeValue("currentHealth", maxHealth);
      changeValue("currentMana", maxMana);
      quickPrint("You have fully rested.");
    } else {
      quickPrint("You cannot rest here.");
    }
  } else {
    quickPrint("You cannot rest here.");
  }
}
