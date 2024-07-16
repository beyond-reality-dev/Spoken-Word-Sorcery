module.exports = { allowInput, blockInput, closedInput, openInput, inputLoop, handleMovement };

const {
  addEntity,
  getValue,
  changeValue,
  calculateValue,
  updateUI,
} = require("./save_data");

const { toTitleCase, quickPrint } = require("./general");

const {
  Aether,
  Earth,
  Fire,
  Water,
  Spear,
  Shield,
  Away,
} = require("./class_collections/spellbook");

const { Arrow } = require("./class_collections/item_catalog");

const { grandHall } = require("./cutscenes/grandHall/grandHall");

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

async function openInput() {
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
        for (let i = 0; i < clauses.length; i++) {
          if (clauses[i].substring(0, 9) == "remember ") {
            var memory = clauses[i].substring(9);
            addEntity(memory, "memories");
          } else if (
            clauses[i].substring(0, 5) == "face " ||
            clauses[i].substring(0, 5) == "look " ||
            clauses[i].substring(0, 5) == "turn "
          ) {
            var direction = getValue("direction");
            if (clauses[i].substring(5, 12) == "to the ") {
              var change = clauses[i].substring(12);
            } else {
              change = clauses[i].substring(5);
            }
            handleTurn(direction, change);
          } else if (clauses[i].substring(0, 3) == "go ") {
            if (clauses[i].substring(3, 10) == "to the ") {
              direction = clauses[i].substring(10);
            } else {
              direction = clauses[i].substring(3);
            }
            handleMovement(direction);
          } else if (clauses[i].substring(0, 4) == "run") {
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
          } else if (clauses[i].substring(0, 4) == "say ") {
            var words = clauses[i].substring(4);
            handleSpell(words);
          } else if (
            clauses[i].substring(0, 5) == "yell " ||
            clauses[i].substring(0, 5) == "cast "
          ) {
            var words = clauses[i].substring(5);
            handleSpell(words);
          } else if (
            clauses[i].substring(0, 6) == "chant " ||
            clauses[i].substring(0, 6) == "shout " ||
            clauses[i].substring(0, 6) == "speak " ||
            clauses[i].substring(0, 6) == "utter "
          ) {
            var words = clauses[i].substring(6);
            handleSpell(words);
          } else if (clauses[i].substring(0, 7) == "mutter ") {
            var words = clauses[i].substring(7);
            handleSpell(words);
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
      if (direction == "North") {
        changeValue("direction", "West");
      } else if (direction == "East") {
        changeValue("direction", "North");
      } else if (direction == "South") {
        changeValue("direction", "East");
      } else if (direction == "East") {
        changeValue("direction", "South");
      }
      break;
    case "right":
      if (direction == "North") {
        changeValue("direction", "East");
      } else if (direction == "East") {
        changeValue("direction", "South");
      } else if (direction == "South") {
        changeValue("direction", "West");
      } else if (direction == "West") {
        changeValue("direction", "North");
      }
      break;
    case "forward":
      break;
    case "backward":
      if (direction == "North") {
        changeValue("direction", "South");
      } else if (direction == "East") {
        changeValue("direction", "West");
      } else if (direction == "South") {
        changeValue("direction", "North");
      } else if (direction == "West") {
        changeValue("direction", "East");
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
    changeValue("location", newLocation.name);
    quickPrint(newLocation.description);
    console.log(1);
    if (newLocation.hasOwnProperty("isVisited")) {
      newLocation.isVisited = true;
      console.log(2);
      var playerData = JSON.parse(localStorage.getItem("playerData"));
      console.log(3);
      var locations = playerData["locations"];
      console.log(4);
      locations[currentLocation.name]["isVisited"] = true;
      console.log(5);
      localStorage.setItem("playerData", JSON.stringify(playerData));
      console.log(6);
    }
    if (newLocation.hasOwnProperty("cutscene")) {
        console.log(7);
        console.log(newLocation.cutscene); 
        eval(newLocation.cutscene + "()");
        console.log(8);
    }
  } catch (error) {
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
    var itemClass = eval("new " + items[item])
    addEntity(itemClass, "inventory");
    delete items[item];
    var playerData = JSON.parse(localStorage.getItem("playerData"));
    var locations = playerData["locations"];
    locations[currentLocation.name]["items"] = items;
    localStorage.setItem("playerData", JSON.stringify(playerData));
    quickPrint(`You picked up ${itemClass.quantity} ${item}s.`);
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
      changeValue("itemQuantity", current - 1, i);
      quickPrint(`You dropped a ${item}.`);
      break;
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
      var element = eval("new " + toTitleCase(words[0]) + "()");
    } catch (error) {
      var invalid = true;
    }
    try {
      var spell = eval("new " + toTitleCase(words[1]) + "()");
    } catch (error) {
      invalid = true;
    }
    try {
      var direction = eval("new " + toTitleCase(words[2]) + "()");
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
    } else {
      var matchKnown = false;
      for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < knownSpells.length; j++) {
          var spell = eval("new " + toTitleCase(words[i]) + "()");
          var spellName = knownSpells[j]["name"];
          if (spellName == spell.name) {
            var descriptor = spell.descriptor;
            phrase = phrase.concat(descriptor);
            var matchKnown = true;
            addEntity(spell, "spokenSpells");
            break;
          }
        }
        for (let i = 0; i < spokenSpells.length; i++) {
          spellName = spokenSpells[i]["name"];
          if (spellName == spell.name) {
            descriptor = spell.descriptor;
            phrase = phrase.concat(descriptor);
            var matchSpoken = true;
            break;
          }
        }
        if (matchKnown == false && matchSpoken == false) {
          phrase = "Nothing happens.";
          break;
        }
      }
      calculateValue("currentMana", "subtract", spell.manaCost);
    }
  }
  document.getElementById("main-content").innerHTML += "<p>" + phrase + "</p>";
  document.getElementById("main-content").scrollTop =
    document.getElementById("main-content").scrollHeight;
}
