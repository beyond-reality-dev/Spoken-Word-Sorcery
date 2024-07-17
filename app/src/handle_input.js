module.exports = { allowInput, blockInput, closedInput, openInput, inputLoop, handleMovement, handleCombat };

const {
  addEntity,
  getValue,
  changeValue,
  calculateValue,
  updateUI,
} = require("./save_data");

const { toTitleCase, quickPrint, requireAnswer } = require("./general");

const { Rebel } = require("./class_collections/enemy_menagerie");

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
const { barracksMeeting } = require("./cutscenes/barracksMeeting/barracksMeeting");
const { militaryAnnex } = require("./cutscenes/militaryAnnex/militaryAnnex");

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
          } else if (clauses[i].substring(0, 6) == "equip ") {
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
          } else if (clauses[i].substring(0, 5) == "fight") {
            console.log("fight");
            handleCombat();
          } else if (clauses[i].substring(0, 6) == "attack") {
            console.log("attack");
            handleCombat();
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
    if (newLocation.hasOwnProperty("isLocked")) {
      if (newLocation.isLocked == true) {
        quickPrint(newLocation.lockedDescription);
        return;
      }
    }
    changeValue("location", newLocation.name);
    quickPrint(newLocation.description);
    if (newLocation.hasOwnProperty("isVisited")) {
      newLocation.isVisited = true;
      var playerData = JSON.parse(localStorage.getItem("playerData"));
      var locations = playerData["locations"];
      locations[currentLocation.name]["isVisited"] = true;
      localStorage.setItem("playerData", JSON.stringify(playerData));
    }
    if (newLocation.hasOwnProperty("cutscene")) {
        eval(newLocation.cutscene + "()");
    } else if (newLocation.hasOwnProperty("enemies")) {
      handleCombat();
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

function handleEquip(item) {
  var items = getValue("inventory");
  if (item.charAt(item.length - 1) == "s") {
    item = item.substring(0, item.length - 1);
  }
  for (let i = 0; i < items.length; i++) {
    if (items[i].name == toTitleCase(item)) {
      addEntity(items[i], "equipment");
      quickPrint(`You equipped ${item}.`);
      break;
    }
  }
}

function handleUnequip(item) {
  var equipment = getValue("equipment");
  if (item.charAt(item.length - 1) == "s") {
    item = item.substring(0, item.length - 1);
  }
  for (let i = 0; i < equipment.length; i++) {
    if (equipment[i].name == toTitleCase(item)) {
      var current = equipment[i].quantity;
      changeValue("itemQuantity", current - 1, i);
      quickPrint(`You unequipped ${item}.`);
      break;
    }
  }
}

async function handleCombat() {
  var currentLocation = getValue("location");
  currentLocation = eval(getValue(currentLocation, true));
  var enemies = currentLocation.enemies;
  while (getValue("currentHealth") > 0 && enemies.length > 0) {
    var playerSpeed = getValue("speed");
    var turnPlayed = false;
    for (let i = 0; i < enemies.length; i++) {
      console.log(enemies.length);
      var enemy = eval("new " + enemies[i]);
      var enemySpeed = enemy.speed;
      if (playerSpeed >= enemySpeed && turnPlayed == false) {
        await handlePlayerTurn(enemies, enemies.length);
        turnPlayed = true;
        if (enemies.length > 0) {
          await handleEnemyTurn(enemy);
        }
      } else {
        await handleEnemyTurn(enemy);
      }
    }
    if (turnPlayed == false) {
      await handlePlayerTurn();
      turnPlayed = true;
    }
  }
}

async function handlePlayerTurn(enemies, length) {
  quickPrint(`There are ${length} enemies remaining:`);
  for (let i = 0; i < length; i++) {
    var enemy = eval("new " + enemies[i]);
    quickPrint(`${i+1}. ${enemy.name} has ${enemy.health} health`);
  }
  quickPrint("Which enemy would you like to attack?");
  var validInput = false;
  while (validInput == false) {
    var enemyChoice = await closedInput();
    enemyChoice = enemyChoice - 1;
    if (enemyChoice >= 0 && enemyChoice <= enemies.length-1) {
      validInput = true;
    } else {
      quickPrint("That is not a valid target.");
    }
  }
  validInput = false;
  quickPrint("Would you like to attack with your equipped weapon or cast a spell?");
  while (validInput == false) {
    var response = await closedInput();
    if (response == "weapon" ||
      response == "use weapon" ||
      response == "equipped weapon" ||
      response == "use equipped weapon" ||
      response == "attack" ||
      response == "attack with weapon" ||
      response == "attack with equipped weapons"
    ) {
      var playerAttack = getRandomInt(getValue("attack"));
      var enemyHealth = enemy.health;
      var enemyDefense = getRandomInt(enemy.armor);
      var enemyDamage = Math.max(playerAttack - enemyDefense, 0);
      enemyHealth = Math.max(enemyHealth - enemyDamage, 0);
      enemies[enemyChoice].health = enemyHealth;
      quickPrint(`You dealt ${enemyDamage} damage to ${enemy.name}.`);
      if (enemyHealth <= 0) {
        quickPrint(`You have defeated the ${enemy.name}.`);
        var location = getValue("location");
        var enemies = getValue(location, true).enemies;
        var index = enemies.indexOf(enemy.name);
        enemies.splice(index, 1);
      }
      validInput = true;
    } else if (response == "cast" || 
      response == "spell" || 
      response == "cast a spell") {
      quickPrint("Cast the spell now by stating the element, spell, and direction.");
      var words = await closedInput();
      words = words.toLowerCase();
      validInput = false;
      while (validInput == false) {
        try {
          var spellPower = handleSpell(words);
          var enemyHealth = enemy.health;
          var enemyDefense = getRandomInt(enemy.armor);
          var enemyDamage = Math.max(playerAttack - enemyDefense, 0);
          enemyHealth = Math.max(enemyHealth - enemyDamage, 0);
          enemies[enemyChoice].health = enemyHealth;
          quickPrint(`You dealt ${spellPower} damage to ${enemy.name}.`);
          if (enemyHealth <= 0) {
            quickPrint(`You have defeated ${enemy.name}.`);
            var location = getValue("location");
            console.log(location);
            var enemies = getValue(location, true).enemies;
            console.log(enemies);
            var index = enemies.indexOf(enemy);
            console.log(index);
            enemies.splice(index, 1);
            console.log(enemies);
          }
          validInput = true;
        }
        catch (error) {
          quickPrint("That is not a valid spell.");
          words = await closedInput();
        }
      }
    } else {
      quickPrint("That is not a valid action.");
    }
  }
}

async function handleEnemyTurn(enemy) {
  var enemyHealth = enemy.health;
  var enemyAttack = getRandomInt(enemy.attack);
  console.log(enemyAttack);
  var playerHealth = getValue("currentHealth");
  var playerDefense = getRandomInt(getValue("armor"));
  var playerDamage = Math.max(enemyAttack - playerDefense, 0);
  calculateValue("currentHealth", "subtract", playerDamage);
  quickPrint(`${enemy.name} dealt ${playerDamage} damage.`);
  if (playerHealth <= 0) {
    quickPrint("You have been defeated.");
    var response = await requireAnswer(["Yes", "No"], "Would you like to restart from your last save?");
    if (response == "Yes") {
      var save = JSON.parse(localStorage.getItem("save"));
      localStorage.setItem("playerData", JSON.stringify(save));
      updateUI();
    }
  } else if (enemyHealth <= 0) {
    quickPrint(`You have defeated ${enemy.name}.`);
    var location = getValue("location");
    var enemies = getValue(location, true).enemies;
    var index = enemies.indexOf(enemy.name);
    enemies.splice(index, 1);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
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
      console.log(element);
    } catch (error) {
      var invalid = true;
      console.log(error);
    }
    try {
      var spell = eval("new " + toTitleCase(words[1]) + "()");
      console.log(spell);
    } catch (error) {
      invalid = true;
      console.log(error);
    }
    try {
      var direction = eval("new " + toTitleCase(words[2]) + "()");
      console.log(direction);
    } catch (error) {
      invalid = true;
      console.log(error);
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
      console.log(spell.power);
      return spell.power;
    }
  }
  document.getElementById("main-content").innerHTML += "<p>" + phrase + "</p>";
  document.getElementById("main-content").scrollTop =
    document.getElementById("main-content").scrollHeight;
}
