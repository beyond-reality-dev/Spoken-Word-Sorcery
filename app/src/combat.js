const {
  getValue,
  changeValue,
  calculateValue,
  addEntity,
  updateUI,
} = require("./save_data");
const { quickPrint, diceRoll, getRandomInt } = require("./general");
const { openInput } = require("./handle_input");

async function handleCombat() {
  changeValue("isCombat", true);
  var currentLocation = getValue("location");
  currentLocation = eval(getValue(currentLocation, true));
  var enemies = currentLocation.enemies;
  while (getValue("currentHealth") > 0 && enemies.length > 0) {
    var playerSpeed = getValue("speed");
    var turnPlayed = false;
    for (let i = 0; i < enemies.length; i++) {
      var enemy = eval(enemies[i]);
      var enemySpeed = enemy.speed;
      if (playerSpeed >= enemySpeed && turnPlayed == false) {
        enemies = await handlePlayerTurn(enemies, enemies.length);
        turnPlayed = true;
        if (enemies.length > 0) {
          await handleEnemyTurn(enemy, enemies);
        }
      } else {
        await handleEnemyTurn(enemy, enemies);
      }
    }
    if (turnPlayed == false) {
      enemies = await handlePlayerTurn(enemies, enemies.length);
      turnPlayed = true;
    }
  }
  playerHealth = getValue("currentHealth");
  if (playerHealth <= 0) {
    quickPrint("You have been defeated, loading last save.");
    var save = JSON.parse(localStorage.getItem("save"));
    localStorage.setItem("playerData", JSON.stringify(save));
    updateUI();
  }
  changeValue("tempHealth", 0);
  changeValue("tempMana", 0);
  changeValue("tempArmor", 0);
  changeValue("isCombat", false);
}

async function handlePlayerTurn(enemies, length) {
  quickPrint(`There are ${length} enemies remaining:`);
  for (let i = 0; i < length; i++) {
    var enemy = eval(enemies[i]);
    quickPrint(
      `${i + 1}. ${enemy.name} has ${
        enemy.health
      } health and is standing in the ${enemy.position} of the room.`
    );
  }
  quickPrint(
    `You are facing ${getValue(
      "direction"
    )}. What would you like to do? You may equip and unequip up to one time, change the direction you are facing one time, and attack or cast a spell one time.`
  );
  choiceInput = await openInput();
  var choice = choiceInput[0];
  if (choiceInput.length > 1) {
    if (choiceInput[1] == "0" && choiceInput[2] == "none") {
      return enemies;
    }
    var spellPower = choiceInput[1];
    var spellEffect = choiceInput[2];
    quickPrint(`You roll ${spellPower}.`);
    var rolledDice = diceRoll(spellPower);
    var rolls = rolledDice[0];
    for (let i = 0; i < rolls.length; i++) {
      quickPrint(`You rolled a ${rolls[i]}.`);
    }
    spellPower = rolledDice[1];
    var spellDirection = choiceInput[2];
  }
  if (choice == "weapon") {
    for (let i = 0; i < enemies.length; i++) {
      var enemy = eval(enemies[i]);
      if (enemy.position == getValue("direction")) {
        break;
      } else {
        enemy = null;
      }
    }
    if (enemy != null) {
      var playerAttack = getValue("attack");
      var equipment = getValue("equipment");
      var mainHand = equipment["mainHand"];
      var used = false;
      if (mainHand != null) {
        if (mainHand.hasOwnProperty("ammunition")) {
          var inventory = getValue("inventory");
          for (let i = 0; i < inventory.length; i++) {
            if (inventory[i].name == mainHand.ammunition) {
              var current = inventory[i].quantity;
              current = current - 1;
              changeValue("itemQuantity", current, i);
              var playerData = JSON.parse(localStorage.getItem("playerData"));
              playerData["inventory"] = inventory;
              localStorage.setItem("playerData", JSON.stringify(playerData));
              used = true;
              updateUI();
              break;
            }
          }
          if (used == false) {
            if (mainHand.ammunition.charAt(0).match(/[aeiou]/i)) {
              var ammo = mainHand.ammunition.toLowerCase();
              quickPrint(
                `You do not have an ${ammo} and therefore cannot attack.`
              );
            } else {
              quickPrint(
                `You do not have a ${ammo} and therefore cannot attack.`
              );
            }
            return enemies;
          }
        }
      }
      quickPrint(`You roll ${playerAttack}.`);
      var rolledDice = diceRoll(playerAttack);
      var rolls = rolledDice[0];
      for (let i = 0; i < rolls.length; i++) {
        quickPrint(`You rolled a ${rolls[i]}.`);
      }
      playerAttack = rolledDice[1];
      var enemyDefense = getRandomInt(enemy.armor);
      var enemyDamage = Math.max(playerAttack - enemyDefense, 0);
      enemy.health = Math.max(enemy.health - enemyDamage, 0);
      if (enemyDefense > 0) {
        quickPrint(
          `${enemy.name} resisted your attack, reducing the damage by ${enemyDefense}.`
        );
      }
      quickPrint(`You dealt ${enemyDamage} damage to ${enemy.name}.`);
      if (enemy.health <= 0) {
        quickPrint(`You have defeated ${enemy.name}.`);
        calculateValue("experiencePoints", "add", enemy.xp);
        if (enemy.gold > 0) {
          calculateValue("gold", "add", enemy.gold);
          quickPrint(`You picked up ${enemy.gold} gold from ${enemy.name}.`);
        }
        for (var i = 0; i < enemy.items.length; i++) {
          var item = enemy.items[i];
          addEntity(item, "inventory");
          if (itemName.charAt(0).match(/[aeiou]/i)) {
            quickPrint(`${enemy.name} dropped an ${item.name}.`);
          } else {
            quickPrint(`${enemy.name} dropped a ${item.name}.`);
          }
          var location = getValue("location");
          var primaryLocation = location.split(".")[0];
          var secondaryLocation = location.split(".")[1];
          var playerData = JSON.parse(localStorage.getItem("playerData"));
          var locations = playerData["locations"];
          locations[primaryLocation][secondaryLocation]["items"].push(item);
        }
        enemies.splice(0, 1);
      }
    } else {
      quickPrint("There is no enemy in that direction.");
    }
  } else if (choice == "spell") {
    for (let i = 0; i < enemies.length; i++) {
      var enemy = eval(enemies[i]);
      if (enemy.position == spellDirection) {
        break;
      } else {
        enemy = null;
      }
    }
    if (enemy != null) {
      if (spellEffect == "damage") {
        enemyDefense = getRandomInt(enemy.armor);
        enemyDamage = Math.max(spellPower - enemyDefense, 0);
        enemy.health = Math.max(enemy.health - enemyDamage, 0);
        if (enemyDefense > 0) {
          quickPrint(
            `${enemy.name} resisted your attack, reducing the damage by ${enemyDefense}.`
          );
        }
        quickPrint(`You dealt ${enemyDamage} damage to ${enemy.name}.`);
        if (enemy.health <= 0) {
          quickPrint(`You have defeated ${enemy.name}.`);
          calculateValue("experiencePoints", "add", enemy.xp);
          calculateValue("gold", "add", enemy.gold);
          for (var i = 0; i < enemy.items.length; i++) {
            var item = enemy.items[i];
            addEntity(item, "inventory");
          }
          var index = enemies.indexOf(enemy);
          enemies.splice(index, 1);
        }
      } else {
        quickPrint("There is no enemy in that direction.");
      }
    } else if (spellEffect == "healthIncrease") {
      var healthIncrease = spellPower;
      if (getValue("currentHealth") + healthIncrease > getValue("maxHealth")) {
        healthIncrease = getValue("maxHealth") - getValue("currentHealth");
      }
      calculateValue("currentHealth", "add", healthIncrease);
      quickPrint(`You healed yourself for ${healthIncrease} health.`);
    } else if (spellEffect == "tempHealth") {
      changeValue("tempHealth", spellPower);
      quickPrint(`You gained ${spellPower} temporary health.`);
    } else if (spellEffect == "manaIncrease") {
      var manaIncrease = spellPower;
      if (getValue("currentMana") + manaIncrease > getValue("maxMana")) {
        manaIncrease = getValue("maxMana") - getValue("currentMana");
      }
      calculateValue("currentMana", "add", manaIncrease);
      quickPrint(`You gained ${manaIncrease} mana.`);
    } else if (spellEffect == "tempMana") {
      changeValue("tempMana", spellPower);
      quickPrint(`You gained ${spellPower} temporary mana.`);
    } else if (spellEffect == "tempArmor") {
      changeValue("tempArmor", spellPower);
      quickPrint(`You gained ${spellPower} temporary armor.`);
    }
  }
  return enemies;
}

async function handleEnemyTurn(enemy, enemies) {
  var rolledDice = diceRoll(enemy.attack);
  var rolls = rolledDice[0];
  for (let i = 0; i < rolls.length; i++) {
    quickPrint(`${enemy.name} rolled a ${rolls[i]}.`);
  }
  var enemyAttack = rolledDice[1];
  var playerDefense = getRandomInt(getValue("armor"));
  if (playerDefense > 0) {
    quickPrint(
      `You resisted ${enemy.name}'s attack, reducing the damage by ${playerDefense}.`
    );
  }
  var playerDamage = Math.max(enemyAttack - playerDefense, 0);
  var tempHealth = getValue("tempHealth");
  if (tempHealth > 0) {
    var difference = playerDamage - tempHealth;
    if (difference > 0) {
      playerDamage = difference;
      tempHealth = 0;
    } else {
      tempHealth = tempHealth - playerDamage;
      playerDamage = 0;
    }
    changeValue("tempHealth", tempHealth);
  }
  calculateValue("currentHealth", "subtract", playerDamage);
  quickPrint(`${enemy.name} dealt ${playerDamage} damage.`);
  var enemyPosition = enemy.position;
  var playerPosition = getValue("direction");
  var leftOccupied = false;
  var rightOccupied = false;
  if (enemyPosition == playerPosition) {
    for (let i = 0; i < enemies.length; i++) {
      var currentEnemy = eval(enemies[i]);
      if (enemyPosition == "north" && currentEnemy.position == "northeast") {
        rightOccupied = true;
      } else if (
        enemyPosition == "north" &&
        currentEnemy.position == "northwest"
      ) {
        leftOccupied = true;
      } else if (
        enemyPosition == "northeast" &&
        currentEnemy.position == "east"
      ) {
        rightOccupied = true;
      } else if (
        enemyPosition == "northeast" &&
        currentEnemy.position == "north"
      ) {
        leftOccupied = true;
      } else if (
        enemyPosition == "east" &&
        currentEnemy.position == "southeast"
      ) {
        rightOccupied = true;
      } else if (
        enemyPosition == "east" &&
        currentEnemy.position == "northeast"
      ) {
        leftOccupied = true;
      } else if (
        enemyPosition == "southeast" &&
        currentEnemy.position == "south"
      ) {
        rightOccupied = true;
      } else if (
        enemyPosition == "southeast" &&
        currentEnemy.position == "east"
      ) {
        leftOccupied = true;
      } else if (
        enemyPosition == "south" &&
        currentEnemy.position == "southwest"
      ) {
        rightOccupied = true;
      } else if (
        enemyPosition == "south" &&
        currentEnemy.position == "southeast"
      ) {
        leftOccupied = true;
      } else if (
        enemyPosition == "southwest" &&
        currentEnemy.position == "west"
      ) {
        rightOccupied = true;
      } else if (
        enemyPosition == "southwest" &&
        currentEnemy.position == "south"
      ) {
        leftOccupied = true;
      } else if (
        enemyPosition == "west" &&
        currentEnemy.position == "northwest"
      ) {
        rightOccupied = true;
      } else if (
        enemyPosition == "west" &&
        currentEnemy.position == "southwest"
      ) {
        leftOccupied = true;
      } else if (
        enemyPosition == "northwest" &&
        currentEnemy.position == "north"
      ) {
        rightOccupied = true;
      } else if (
        enemyPosition == "northwest" &&
        currentEnemy.position == "west"
      ) {
        leftOccupied = true;
      }
    }
    if (leftOccupied != true && rightOccupied != true) {
      var direction = getRandomInt(2);
      if (direction == 0) {
        leftOccupied = true;
      } else {
        rightOccupied = true;
      }
    }
    if (leftOccupied != true) {
      if (enemyPosition == "north") {
        enemy.position = "northwest";
      } else if (enemyPosition == "northeast") {
        enemy.position = "north";
      } else if (enemyPosition == "east") {
        enemy.position = "northeast";
      } else if (enemyPosition == "southeast") {
        enemy.position = "east";
      } else if (enemyPosition == "south") {
        enemy.position = "southeast";
      } else if (enemyPosition == "southwest") {
        enemy.position = "south";
      } else if (enemyPosition == "west") {
        enemy.position = "southwest";
      } else if (enemyPosition == "northwest") {
        enemy.position = "west";
      }
      quickPrint(`${enemy.name} moved to the ${enemy.position}.`);
    } else if (rightOccupied != true) {
      if (enemyPosition == "north") {
        enemy.position = "northeast";
      } else if (enemyPosition == "northeast") {
        enemy.position = "east";
      } else if (enemyPosition == "east") {
        enemy.position = "southeast";
      } else if (enemyPosition == "southeast") {
        enemy.position = "south";
      } else if (enemyPosition == "south") {
        enemy.position = "southwest";
      } else if (enemyPosition == "southwest") {
        enemy.position = "west";
      } else if (enemyPosition == "west") {
        enemy.position = "northwest";
      } else if (enemyPosition == "northwest") {
        enemy.position = "north";
      }
      var playerData = JSON.parse(localStorage.getItem("playerData"));
      var locations = playerData["locations"];
      var primaryLocation = getValue("location").split(".")[0];
      var secondaryLocation = getValue("location").split(".")[1];
      for (
        let i = 0;
        i < locations[primaryLocation][secondaryLocation]["enemies"].length;
        i++
      ) {
        if (
          locations[primaryLocation][secondaryLocation]["enemies"][i]["name"] ==
          enemy.name
        ) {
          locations[primaryLocation][secondaryLocation]["enemies"][i][
            "position"
          ] = enemy.position;
        }
      }
      localStorage.setItem("playerData", JSON.stringify(playerData));
      quickPrint(`${enemy.name} moved to the ${enemy.position}.`);
    }
  }
}

module.exports = { handleCombat };
