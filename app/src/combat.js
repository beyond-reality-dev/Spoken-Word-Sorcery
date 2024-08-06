const {
  getValue,
  changeValue,
  calculateValue,
  addEntity,
  updateUI,
} = require("./save_data");
const { quickPrint, getRandomInt } = require("./general");
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
    var spellPower = choiceInput[1];
    spellPower = getRandomInt(spellPower);
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
      var playerAttack = getRandomInt(getValue("attack"));
      var enemyDefense = getRandomInt(enemy.armor);
      var enemyDamage = Math.max(playerAttack - enemyDefense, 0);
      enemy.health = Math.max(enemy.health - enemyDamage, 0);
      quickPrint(`You dealt ${enemyDamage} damage to ${enemy.name}.`);
      if (enemy.health <= 0) {
        quickPrint(`You have defeated ${enemy.name}.`);
        calculateValue("experiencePoints", "add", enemy.xp);
        calculateValue("gold", "add", enemy.gold);
        for (var i = 0; i < enemy.items.length; i++) {
          var item = enemy.items[i];
          addEntity(item, "inventory");
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
      enemyDefense = getRandomInt(enemy.armor);
      enemyDamage = Math.max(spellPower - enemyDefense, 0);
      enemy.health = Math.max(enemy.health - enemyDamage, 0);
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
  }
  return enemies;
}

async function handleEnemyTurn(enemy, enemies) {
  var enemyAttack = getRandomInt(enemy.attack);
  var playerDefense = getRandomInt(getValue("armor"));
  var playerDamage = Math.max(enemyAttack - playerDefense, 0);
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
