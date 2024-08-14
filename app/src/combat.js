const {
  getValue,
  changeValue,
  calculateValue,
  addEntity,
  updateUI,
  levelScaling,
} = require("./save_data");
const { quickPrint, diceRoll, getRandomInt, addDice } = require("./general");
const { openInput } = require("./handle_input");
const {
  imperialAcademy,
  imperialMarket,
  imperialNexus,
  imperialPalace,
  imperialPort,
} = require("./class_collections/locations/index");

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
          await handleEnemyTurn(enemy, enemies, i);
        }
      } else {
        await handleEnemyTurn(enemy, enemies, i);
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

async function handlePlayerTurn() {
  changeValue("movementPoints", 4);
  var currentLocation = getValue("location");
  currentLocation = eval(getValue(currentLocation, true));
  var enemies = currentLocation.enemies;
  var length = enemies.length;
  quickPrint(`There are ${length} enemies remaining:`);
  for (let i = 0; i < length; i++) {
    var enemy = enemies[i];
    var enemyPosition = enemy.position;
    var playerPosition = getValue("position");
    var relationship = calculateRelationship(enemyPosition, playerPosition);
    var enemyDirection = relationship[0];
    var enemyDistance = relationship[1];
    quickPrint(
      `${i + 1}. ${enemy.name} has ${
        enemy.health
      } health and is standing ${enemyDistance} feet away to the ${enemyDirection}.`
    );
  }
  quickPrint(
    `You are facing ${getValue(
      "direction"
    )}. What would you like to do? You may equip and unequip up to one time, change the direction you are facing one time, use each of your weapons once, and cast a spell once. If you need help, type "help" for a list of commands.`
  );
  var helpAsked = true;
  while (helpAsked == true) {
    var choiceInput = await openInput();
    var choice = choiceInput[0];
    if (choice != "help" && choice != "info" && choice != "instructions") {
      helpAsked = false;
    }
  }
  if (choiceInput[1] == "0" && choiceInput[2] == "none") {
    return enemies;
  } else if (choiceInput[1] == "none") {
    return enemies;
  }
  if (choice == "weapon") {
    for (let i = 0; i < enemies.length; i++) {
      enemy = enemies[i];
      var enemyPosition = enemy.position;
      enemyDirection = calculateRelationship(enemy.position, playerPosition)[0];
      enemyDistance = calculateRelationship(enemy.position, playerPosition)[1];
      if (enemyDirection == getValue("direction")) {
        break;
      } else {
        enemy = null;
      }
    }
    if (enemy != null) {
      var weaponType = choiceInput[1];
      var hand = choiceInput[2];
      var equipment = getValue("equipment");
      var weapon = equipment[hand];
      if (weaponType == "melee") {
        var playerAttack = weapon.attackValue;
        var playerRange = 7.5;
        if (enemyDistance <= playerRange) {
          distance = "inRange";
        } else if (enemyDistance < playerRange) {
          distance = "outOfRange";
        }
      } else if (weaponType == "ranged") {
        try {
          var ammoCheck = checkAmmo(weapon, enemies);
        } catch (error) {
          quickPrint("You do not have any ammunition for that weapon.");
          return enemies;
        }
        enemies = ammoCheck[0];
        if (ammoCheck[1] == false) {
          return enemies;
        }
        playerAttack = weapon.rangedAttackValue;
        var minRange = weapon.minRange;
        var effectiveRange = weapon.effectiveRange;
        var maxRange = weapon.maxRange;
        if (enemyDistance < minRange) {
          distance = "tooClose";
        } else if (enemyDistance > maxRange) {
          distance = "outOfRange";
        } else if (enemyDistance <= effectiveRange) {
          distance = "inRange";
        } else if (enemyDistance > effectiveRange) {
          distance = "barelyInRange";
        }
      }
      try {
        playerAttack = levelScaling(playerAttack);
      } catch (error) {
        quickPrint("You do not have a weapon equipped.");
        return enemies;
      }
      if (distance == "outOfRange") {
        quickPrint("The enemy is out of range.");
        return enemies;
      } else if (distance == "tooClose") {
        quickPrint("You are too close to the enemy, move back to attack.");
        return enemies;
      } else if (distance == "barelyInRange") {
        quickPrint(
          "The enemy is barely in range, the attack's power will be reduced."
        );
        var reducedRange = true;
      } else if (distance == "inRange") {
        quickPrint("The enemy is range.");
      }
      quickPrint(`You roll ${playerAttack}.`);
      var rolledDice = diceRoll(playerAttack);
      var rolls = rolledDice[0];
      for (let i = 0; i < rolls.length; i++) {
        quickPrint(`You rolled a ${rolls[i]}.`);
      }
      if (reducedRange == true) {
        playerAttack = Math.floor(rolledDice[1] / 2);
        quickPrint(`The attack's power is reduced to ${reducedPower}.`);
      } else {
        playerAttack = rolledDice[1];
      }
      var enemyDefense = getRandomInt(enemy.armor);
      var enemyDamage = Math.max(playerAttack - enemyDefense, 0);
      enemy.health = Math.max(enemy.health - enemyDamage, 0);
      if (enemyDefense > 0) {
        quickPrint(
          `${enemy.name} resisted your attack, reducing the damage by ${enemyDefense}.`
        );
      }
      quickPrint(`You dealt ${enemyDamage} damage to ${enemy.name}.`);
      var location = getValue("location");
      var primaryLocation = location.split(".")[0];
      var secondaryLocation = location.split(".")[1];
      var playerData = JSON.parse(localStorage.getItem("playerData"));
      var locations = playerData["locations"];
      locations[primaryLocation][secondaryLocation]["enemies"] = enemies;
      localStorage.setItem("playerData", JSON.stringify(playerData));
      if (enemy.health <= 0) {
        quickPrint(`You have defeated ${enemy.name}.`);
        quickPrint(`You gained ${enemy.xp} experience points, and the enemy dropped ${enemy.gold}.`);
        calculateValue("experiencePoints", "add", enemy.xp);
        calculateValue("gold", "add", enemy.gold);
        for (var i = 0; i < enemy.items.length; i++) {
          if (itemName.charAt(0).match(/[aeiou]/i)) {
            quickPrint(`${enemy.name} dropped an ${item.name}.`);
          } else {
            quickPrint(`${enemy.name} dropped a ${item.name}.`);
          }
          locations[primaryLocation][secondaryLocation]["items"].push(item);
        }
        var index = enemies.indexOf(enemy);
        enemies.splice(index, 1);
        locations[primaryLocation][secondaryLocation]["enemies"] = enemies;
        playerData["gold"] = getValue("gold");
        playerData["experiencePoints"] = getValue("experiencePoints");
        localStorage.setItem("playerData", JSON.stringify(playerData));
      }
    } else {
      quickPrint("There is no enemy in that direction.");
    }
  } else if (choice == "spell") {
    var spellPower = choiceInput[1];
    var spellEffect = choiceInput[3];
    var spellRange = choiceInput[4];
    spellPower = levelScaling(spellPower);
    quickPrint(`You roll ${spellPower}.`);
    var rolledDice = diceRoll(spellPower);
    var rolls = rolledDice[0];
    for (let i = 0; i < rolls.length; i++) {
      quickPrint(`You rolled a ${rolls[i]}.`);
    }
    spellPower = rolledDice[1];
    var spellDirection = choiceInput[2];
    for (let i = 0; i < enemies.length; i++) {
      enemy = enemies[i];
      var enemyPosition = enemy.position;
      enemyDirection = calculateRelationship(enemy.position, playerPosition)[0];
      enemyDistance = calculateRelationship(enemy.position, playerPosition)[1];
      if (enemyDirection == spellDirection) {
        break;
      } else {
        enemy = null;
      }
    }
    if (enemy != null) {
      if (enemyDistance <= spellRange) {
        distance = "inRange";
        quickPrint("The enemy is in range.");
      } else if (enemyDistance > spellRange) {
        distance = "outOfRange";
        quickPrint("The enemy is out of range.");
        return enemies;
      }
      if (spellEffect == "damage") {
        playerRange = spellRange;
        enemyDefense = getRandomInt(enemy.armor);
        enemyDamage = Math.max(spellPower - enemyDefense, 0);
        enemy.health = Math.max(enemy.health - enemyDamage, 0);
        if (enemyDefense > 0) {
          quickPrint(
            `${enemy.name} resisted your attack, reducing the damage by ${enemyDefense}.`
          );
        }
        quickPrint(`You dealt ${enemyDamage} damage to ${enemy.name}.`);
        var location = getValue("location");
        var primaryLocation = location.split(".")[0];
        var secondaryLocation = location.split(".")[1];
        var playerData = JSON.parse(localStorage.getItem("playerData"));
        var locations = playerData["locations"];
        locations[primaryLocation][secondaryLocation]["enemies"] = enemies;
        localStorage.setItem("playerData", JSON.stringify(playerData));
        if (enemy.health <= 0) {
          quickPrint(`You have defeated ${enemy.name}.`);
          quickPrint(`You gained ${enemy.xp} experience points, and the enemy dropped ${enemy.gold}.`);
          calculateValue("experiencePoints", "add", enemy.xp);
          calculateValue("gold", "add", enemy.gold);
          for (var i = 0; i < enemy.items.length; i++) {
            var item = enemy.items[i];
            var itemName = item.name;
            if (itemName.charAt(0).match(/[aeiou]/i)) {
              quickPrint(`${enemy.name} dropped an ${item.name}.`);
            } else {
              quickPrint(`${enemy.name} dropped a ${item.name}.`);
            }
            locations[primaryLocation][secondaryLocation]["items"].push(item);
          }
          var index = enemies.indexOf(enemy);
          enemies.splice(index, 1);
          playerData["gold"] = getValue("gold");
          playerData["experiencePoints"] = getValue("experiencePoints");
          locations[primaryLocation][secondaryLocation]["enemies"] = enemies;
          localStorage.setItem("playerData", JSON.stringify(playerData));
        }
      }
    } else if (spellEffect == "healthIncrease") {
      if (spellDirection != "Within") {
        quickPrint("You cannot heal an enemy.");
        return enemies;
      }
      var healthIncrease = spellPower;
      if (getValue("currentHealth") + healthIncrease > getValue("maxHealth")) {
        healthIncrease = getValue("maxHealth") - getValue("currentHealth");
      }
      calculateValue("currentHealth", "add", healthIncrease);
      quickPrint(`You healed yourself for ${healthIncrease} health.`);
    } else if (spellEffect == "tempHealth") {
      if (spellDirection != "Within") {
        quickPrint("You cannot grant temporary health to an enemy.");
        return enemies;
      }
      changeValue("tempHealth", spellPower);
      quickPrint(`You gained ${spellPower} temporary health.`);
    } else if (spellEffect == "manaIncrease") {
      if (spellDirection != "Within") {
        quickPrint("You cannot grant mana to an enemy.");
        return enemies;
      }
      var manaIncrease = spellPower;
      if (getValue("currentMana") + manaIncrease > getValue("maxMana")) {
        manaIncrease = getValue("maxMana") - getValue("currentMana");
      }
      calculateValue("currentMana", "add", manaIncrease);
      quickPrint(`You gained ${manaIncrease} mana.`);
    } else if (spellEffect == "tempMana") {
      if (spellDirection != "Within") {
        quickPrint("You cannot grant temporary mana to an enemy.");
        return enemies;
      }
      changeValue("tempMana", spellPower);
      quickPrint(`You gained ${spellPower} temporary mana.`);
    } else if (spellEffect == "tempArmor") {
      if (spellDirection != "Within") {
        quickPrint("You cannot grant temporary armor to an enemy.");
        return enemies;
      }
      changeValue("tempArmor", spellPower);
      quickPrint(`You gained ${spellPower} temporary armor.`);
    } else {
      quickPrint("There is no enemy in that direction.");
    }
  }
  return enemies;
}

function calculateRelationship(enemyPosition, playerPosition) {
  var enemyX = enemyPosition[0];
  var enemyY = enemyPosition[1];
  var playerX = playerPosition[0];
  var playerY = playerPosition[1];
  var xDistance = Math.abs(enemyX - playerX);
  xDistance = xDistance * 5;
  var yDistance = Math.abs(enemyY - playerY);
  yDistance = yDistance * 5;
  var totalDistance = Math.sqrt(xDistance ** 2 + yDistance ** 2);
  totalDistance = Math.floor(totalDistance);
  if (enemyX == playerX && enemyY == playerY) {
    return ["within", totalDistance];
  } else if (enemyX == playerX && enemyY < playerY) {
    return ["north", totalDistance];
  } else if (enemyX > playerX && enemyY < playerY) {
    return ["northeast", totalDistance];
  } else if (enemyX > playerX && enemyY == playerY) {
    return ["east", totalDistance];
  } else if (enemyX > playerX && enemyY > playerY) {
    return ["southeast", totalDistance];
  } else if (enemyX == playerX && enemyY > playerY) {
    return ["south", totalDistance];
  } else if (enemyX < playerX && enemyY > playerY) {
    return ["southwest", totalDistance];
  } else if (enemyX < playerX && enemyY == playerY) {
    return ["west", totalDistance];
  } else if (enemyX < playerX && enemyY < playerY) {
    return ["northwest", totalDistance];
  }
}

function checkAmmo(position, enemies) {
  var used = false;
  var inventory = getValue("inventory");
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].name == position.ammunition) {
      var current = inventory[i].quantity;
      current = current - 1;
      changeValue("itemQuantity", current, i);
      var playerData = JSON.parse(localStorage.getItem("playerData"));
      playerData["inventory"] = inventory;
      localStorage.setItem("playerData", JSON.stringify(playerData));
      used = true;
      updateUI();
      return [enemies, used];
    }
  }
  if (used == false) {
    if (position.ammunition.charAt(0).match(/[aeiou]/i)) {
      var ammo = position.ammunition.toLowerCase();
      var weapon = position.name.toLowerCase();
      quickPrint(
        `You do not have an ${ammo} and therefore cannot attack with your ${weapon}.`
      );
    } else {
      quickPrint(
        `You do not have a ${ammo} and therefore cannot attack with your ${weapon}.`
      );
    }
    return [enemies, used];
  }
}

async function handleEnemyTurn(enemy, enemies, i) {
  var playerPosition = getValue("position");
  var playerX = playerPosition[0];
  var playerY = playerPosition[1];
  var enemyPosition = enemy.position;
  var enemyX = enemyPosition[0];
  var enemyY = enemyPosition[1];
  var relationship = calculateRelationship(playerPosition, enemyPosition);
  var playerDistance = relationship[1];
  var location = getValue("location");
  location = eval(location, true);
  var locationWidth = location.width;
  locationWidth = Math.floor(locationWidth);
  horizontalTiles = locationWidth / 5;
  var locationHeight = location.height;
  locationHeight = Math.floor(locationHeight);
  verticalTiles = locationHeight / 5;
  var enemyRange = enemy.range;
  if (playerDistance <= enemyRange) {
    var playerDefense = getRandomInt(getValue("armor"));
    var enemyAttack = diceRoll(enemy.attack);
    var rolls = enemyAttack[0];
    for (let i = 0; i < rolls.length; i++) {
      quickPrint(`${enemy.name} rolled a ${rolls[i]}.`);
    }
    if (playerDefense > 0) {
      quickPrint(
        `You resisted ${enemy.name}'s attack, reducing the damage by ${playerDefense}.`
      );
    }
    var playerDamage = Math.max(enemyAttack[1] - playerDefense, 0);
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
  } else if (playerDistance > enemyRange) {
    tryToMoveAndAttack(
      playerX,
      playerY,
      enemyX,
      enemyY,
      enemy,
      enemyRange,
      i,
      enemies
    );
  }
  return enemies;
}

function tryToMoveAndAttack(
  playerX,
  playerY,
  enemyX,
  enemyY,
  enemy,
  enemyRange,
  i,
  enemies
) {
  var differenceX = playerX - enemyX;
  differenceX = differenceX - 1;
  if (differenceX > 0) {
    var multiplierX = 1;
  } else {
    var multiplierX = -1;
  }
  differenceX = Math.abs(differenceX);
  var differenceY = playerY - enemyY;
  differenceY = differenceY - 1;
  if (differenceY > 0) {
    var multiplierY = 1;
  } else {
    var multiplierY = -1;
  }
  differenceY = Math.abs(differenceY);
  var originalDifferenceX = differenceX;
  var originalDifferenceY = differenceY;
  var budget = 4; // Enemies can move up to 4 tiles per turn, the equivalent of 20 ft.
  while (budget >= 1) {
    if (differenceX == 0 && differenceY == 0) {
      budget = 0;
    } else if (differenceX > 0 && differenceY > 0 && budget >= 1.5) {
      enemyX = enemyX + multiplierX;
      enemyY = enemyY + multiplierY;
      differenceX = differenceX - 1;
      differenceY = differenceY - 1;
      var cost = 1.5;
      var direction = "diagonal";
      budget = budget - cost;
    } else if (differenceX > 0 && budget >= 1) {
      enemyX = enemyX + multiplierX;
      differenceX = differenceX - 1;
      cost = 1;
      direction = "horizontal";
      budget = 1;
    } else if (differenceY > 0 && budget >= 1) {
      enemyY = enemyY + multiplierY;
      differenceY = differenceY - 1;
      cost = 1;
      direction = "vertical";
      budget = budget - cost;
    }
    for (let j = 0; j < enemies.length; j++) {
      if (j != i) {
        var playerData = JSON.parse(localStorage.getItem("playerData"));
        var locations = playerData["locations"];
        var primaryLocation = getValue("location").split(".")[0];
        var secondaryLocation = getValue("location").split(".")[1];
        var enemies = locations[primaryLocation][secondaryLocation]["enemies"];
        var otherEnemy = enemies[j];
        var otherEnemyPosition = otherEnemy.position;
        var otherEnemyX = otherEnemyPosition[0];
        var otherEnemyY = otherEnemyPosition[1];
        if (
          (enemyX == otherEnemyX && enemyY == otherEnemyY) ||
          (enemyX == playerX && enemyY == playerY)
        ) {
          if (direction == "diagonal") {
            if (multiplierX > 0 && multiplierY > 0) {
              enemyX = enemyX - 1;
              enemyY = enemyY - 1;
            } else if (multiplierX > 0 && multiplierY < 0) {
              enemyX = enemyX - 1;
              enemyY = enemyY + 1;
            } else if (multiplierX < 0 && multiplierY > 0) {
              enemyX = enemyX + 1;
              enemyY = enemyY - 1;
            } else if (multiplierX < 0 && multiplierY < 0) {
              enemyX = enemyX + 1;
              enemyY = enemyY + 1;
            }
          } else if (direction == "horizontal") {
            if (multiplierX > 0) {
              enemyX = enemyX - 1;
            } else if (multiplierX < 0) {
              enemyX = enemyX + 1;
            }
          } else if (direction == "vertical") {
            if (multiplierY > 0) {
              enemyY = enemyY - 1;
            } else if (multiplierY < 0) {
              enemyY = enemyY + 1;
            }
          }
        }
      }
    }
  }
  enemyPosition = [enemyX, enemyY];
  if (originalDifferenceX > 0 && originalDifferenceY > 0) {
    var distanceTraveled = Math.sqrt(
      (originalDifferenceX * 5) ** 2 + (originalDifferenceX * 5) ** 2
    );
    distanceTraveled = Math.floor(distanceTraveled);
  } else if (originalDifferenceX > 0) {
    distanceTraveled = originalDifferenceX * 5;
  } else if (originalDifferenceY > 0) {
    distanceTraveled = originalDifferenceY * 5;
  }
  var playerPosition = getValue("position");
  var relationship = calculateRelationship(enemyPosition, playerPosition);
  var enemyDirection = relationship[0];
  var enemyDistance = relationship[1];
  quickPrint(
    `${enemy.name} moved ${distanceTraveled} ft. to be ${enemyDistance} ft. from you, to your ${enemyDirection}.`
  );
  var playerData = JSON.parse(localStorage.getItem("playerData"));
  var locations = playerData["locations"];
  var primaryLocation = getValue("location").split(".")[0];
  var secondaryLocation = getValue("location").split(".")[1];
  locations[primaryLocation][secondaryLocation]["enemies"][i]["position"] =
    enemyPosition;
  localStorage.setItem("playerData", JSON.stringify(playerData));
  if (enemyDistance <= enemyRange) {
    var playerDefense = getRandomInt(getValue("armor"));
    var enemyAttack = diceRoll(enemy.attack);
    var rolls = enemyAttack[0];
    var attackDescription = enemy.attackDescription;
    quickPrint(attackDescription);
    for (let i = 0; i < rolls.length; i++) {
      quickPrint(`${enemy.name} rolled a ${rolls[i]}.`);
    }
    if (playerDefense > 0) {
      quickPrint(
        `You resisted ${enemy.name}'s attack, reducing the damage by ${playerDefense}.`
      );
    }
    var playerDamage = Math.max(enemyAttack[1] - playerDefense, 0);
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
  } else {
    quickPrint("You are still out of range of the enemy's attack.");
  }
}

function handleCombatMovement(direction, magnitude) {
  var playerPosition = getValue("position");
  var playerDirection = getValue("direction");
  var combinedDirection = findDirection(playerDirection, direction);
  var playerX = playerPosition[0];
  var playerY = playerPosition[1];
  var location = getValue("location");
  location = eval(location, true);
  var locationWidth = location.width;
  locationWidth = Math.floor(locationWidth);
  horizontalTiles = locationWidth / 5;
  var locationHeight = location.height;
  locationHeight = Math.floor(locationHeight);
  verticalTiles = locationHeight / 5;
  var newPosition = [];
  var budget = getValue("movementPoints");
  var magnitude = magnitude / 5;
  switch (combinedDirection) {
    case "north":
      budget = budget - magnitude;
      if (budget < 0) {
        quickPrint("You cannot move more than 20 feet in one turn.");
        return;
      } else if (playerY - magnitude < 0) {
        quickPrint("You cannot move out of bounds.");
        return;
      } else {
        newPosition = [playerX, playerY - magnitude];
        if (findEnemiesInCell(newPosition) == true) {
          quickPrint("You cannot move into a cell with an enemy.");
          return;
        } else {
          changeValue("position", newPosition);
          changeValue("movementPoints", budget);
          magnitude = magnitude * 5;
          quickPrint(`You moved ${magnitude} ft. north.`);
        }
      }
      break;
    case "northeast":
      budget = budget - magnitude;
      if (budget < 0) {
        quickPrint("You cannot move more than 20 feet in one turn.");
        return;
      } else if (
        playerY - magnitude < 0 ||
        playerX + magnitude > horizontalTiles
      ) {
        quickPrint("You cannot move out of bounds.");
        return;
      } else {
        newPosition = [playerX + magnitude, playerY - magnitude];
        if (findEnemiesInCell(newPosition) == true) {
          quickPrint("You cannot move into a cell with an enemy.");
          return;
        } else {
          changeValue("position", newPosition);
          changeValue("movementPoints", budget);
          magnitude = magnitude * 5;
          quickPrint(`You moved ${magnitude} ft. northeast.`);
        }
      }
      break;
    case "east":
      budget = budget - magnitude;
      if (budget < 0) {
        quickPrint("You cannot move more than 20 feet in one turn.");
        return;
      } else if (playerX + magnitude > horizontalTiles) {
        quickPrint("You cannot move out of bounds.");
        return;
      } else {
        newPosition = [playerX + magnitude, playerY];
        if (findEnemiesInCell(newPosition) == true) {
          quickPrint("You cannot move into a cell with an enemy.");
          return;
        } else {
          changeValue("position", newPosition);
          changeValue("movementPoints", budget);
          magnitude = magnitude * 5;
          quickPrint(`You moved ${magnitude} ft. east.`);
        }
      }
      break;
    case "southeast":
      budget = budget - magnitude;
      if (budget < 0) {
        quickPrint("You cannot move more than 20 feet in one turn.");
        return;
      } else if (
        playerY + magnitude > verticalTiles ||
        playerX + magnitude > horizontalTiles
      ) {
        quickPrint("You cannot move out of bounds.");
        return;
      } else {
        newPosition = [playerX + magnitude, playerY + magnitude];
        if (findEnemiesInCell(newPosition) == true) {
          quickPrint("You cannot move into a cell with an enemy.");
          return;
        } else {
          changeValue("position", newPosition);
          changeValue("movementPoints", budget);
          magnitude = magnitude * 5;
          quickPrint(`You moved ${magnitude} ft. southeast.`);
        }
      }
      break;
    case "south":
      budget = budget - magnitude;
      if (budget < 0) {
        quickPrint("You cannot move more than 20 feet in one turn.");
        return;
      } else if (playerY + magnitude > verticalTiles) {
        quickPrint("You cannot move out of bounds.");
        return;
      } else {
        newPosition = [playerX, playerY + magnitude];
        console.log(newPosition);
        if (findEnemiesInCell(newPosition) == true) {
          quickPrint("You cannot move into a cell with an enemy.");
          return;
        } else {
          changeValue("position", newPosition);
          changeValue("movementPoints", budget);
          magnitude = magnitude * 5;
          quickPrint(`You moved ${magnitude} ft. south.`);
        }
      }
      break;
    case "southwest":
      budget = budget - magnitude;
      if (budget < 0) {
        quickPrint("You cannot move more than 20 feet in one turn.");
        return;
      } else if (
        playerY + magnitude > verticalTiles ||
        playerX - magnitude < 0
      ) {
        quickPrint("You cannot move out of bounds.");
        return;
      } else {
        newPosition = [playerX - magnitude, playerY + magnitude];
        if (findEnemiesInCell(newPosition) == true) {
          quickPrint("You cannot move into a cell with an enemy.");
          return;
        } else {
          changeValue("position", newPosition);
          changeValue("movementPoints", budget);
          magnitude = magnitude * 5;
          quickPrint(`You moved ${magnitude} ft. southwest.`);
        }
      }
      break;
    case "west":
      budget = budget - magnitude;
      if (budget < 0) {
        quickPrint("You cannot move more than 20 feet in one turn.");
        return;
      } else if (playerX - magnitude < 0) {
        quickPrint("You cannot move out of bounds.");
        return;
      } else {
        newPosition = [playerX - magnitude, playerY];
        if (findEnemiesInCell(newPosition) == true) {
          quickPrint("You cannot move into a cell with an enemy.");
          return;
        } else {
          changeValue("position", newPosition);
          changeValue("movementPoints", budget);
          magnitude = magnitude * 5;
          quickPrint(`You moved ${magnitude} ft. west.`);
        }
      }
      break;
    case "northwest":
      budget = budget - magnitude;
      if (budget < 0) {
        quickPrint("You cannot move more than 20 feet in one turn.");
        return;
      } else if (playerY - magnitude < 0 || playerX - magnitude < 0) {
        quickPrint("You cannot move out of bounds.");
        return;
      } else {
        newPosition = [playerX - magnitude, playerY - magnitude];
        if (findEnemiesInCell(newPosition) == true) {
          quickPrint("You cannot move into a cell with an enemy.");
          return;
        } else {
          changeValue("position", newPosition);
          changeValue("movementPoints", budget);
          magnitude = magnitude * 5;
          quickPrint(`You moved ${magnitude} ft. northwest.`);
        }
      }
      break;
    default:
      quickPrint("You cannot move in that direction.");
      break;
  }
}

function findDirection(playerDirection, direction) {
  switch (playerDirection) {
    case "north":
      if (direction == "forward" || direction == "forwards") {
        return "north";
      } else if (
        direction == "back" ||
        direction == "backward" ||
        direction == "backwards"
      ) {
        return "south";
      } else if (direction == "left") {
        return "west";
      } else if (direction == "right") {
        return "east";
      } else if (direction == "left forward" || direction == "left forwards") {
        return "northwest";
      } else if (
        direction == "right forward" ||
        direction == "right forwards"
      ) {
        return "northeast";
      } else if (
        direction == "left back" ||
        direction == "left backward" ||
        direction == "left backwards"
      ) {
        return "southwest";
      } else if (
        direction == "right back" ||
        direction == "right backward" ||
        direction == "right backwards"
      ) {
        return "southeast";
      }
      break;
    case "northeast":
      if (direction == "forward" || direction == "forwards") {
        return "northeast";
      } else if (
        direction == "back" ||
        direction == "backward" ||
        direction == "backwards"
      ) {
        return "southwest";
      } else if (direction == "left") {
        return "north";
      } else if (direction == "right") {
        return "east";
      } else if (direction == "left forward" || direction == "left forwards") {
        return "north";
      } else if (
        direction == "right forward" ||
        direction == "right forwards"
      ) {
        return "northeast";
      } else if (
        direction == "left back" ||
        direction == "left backward" ||
        direction == "left backwards"
      ) {
        return "southwest";
      } else if (
        direction == "right back" ||
        direction == "right backward" ||
        direction == "right backwards"
      ) {
        return "south";
      }
      break;
    case "east":
      if (direction == "forward" || direction == "forwards") {
        return "east";
      } else if (
        direction == "back" ||
        direction == "backward" ||
        direction == "backwards"
      ) {
        return "west";
      } else if (direction == "left") {
        return "north";
      } else if (direction == "right") {
        return "south";
      } else if (direction == "left forward" || direction == "left forwards") {
        return "northeast";
      } else if (
        direction == "right forward" ||
        direction == "right forwards"
      ) {
        return "southeast";
      } else if (
        direction == "left back" ||
        direction == "left backward" ||
        direction == "left backwards"
      ) {
        return "northwest";
      } else if (
        direction == "right back" ||
        direction == "right backward" ||
        direction == "right backwards"
      ) {
        return "southwest";
      }
      break;
    case "southeast":
      if (direction == "forward" || direction == "forwards") {
        return "southeast";
      } else if (
        direction == "back" ||
        direction == "backward" ||
        direction == "backwards"
      ) {
        return "northwest";
      } else if (direction == "left") {
        return "south";
      } else if (direction == "right") {
        return "east";
      } else if (direction == "left forward" || direction == "left forwards") {
        return "south";
      } else if (
        direction == "right forward" ||
        direction == "right forwards"
      ) {
        return "southeast";
      } else if (
        direction == "left back" ||
        direction == "left backward" ||
        direction == "left backwards"
      ) {
        return "northwest";
      } else if (
        direction == "right back" ||
        direction == "right backward" ||
        direction == "right backwards"
      ) {
        return "north";
      }
      break;
    case "south":
      if (direction == "forward" || direction == "forwards") {
        return "south";
      } else if (
        direction == "back" ||
        direction == "backward" ||
        direction == "backwards"
      ) {
        return "north";
      } else if (direction == "left") {
        return "east";
      } else if (direction == "right") {
        return "west";
      } else if (direction == "left forward" || direction == "left forwards") {
        return "southeast";
      } else if (
        direction == "right forward" ||
        direction == "right forwards"
      ) {
        return "southwest";
      } else if (
        direction == "left back" ||
        direction == "left backward" ||
        direction == "left backwards"
      ) {
        return "northeast";
      } else if (
        direction == "right back" ||
        direction == "right backward" ||
        direction == "right backwards"
      ) {
        return "northwest";
      }
      break;
    case "southwest":
      if (direction == "forward" || direction == "forwards") {
        return "southwest";
      } else if (
        direction == "back" ||
        direction == "backward" ||
        direction == "backwards"
      ) {
        return "northeast";
      } else if (direction == "left") {
        return "south";
      } else if (direction == "right") {
        return "west";
      } else if (direction == "left forward" || direction == "left forwards") {
        return "south";
      } else if (
        direction == "right forward" ||
        direction == "right forwards"
      ) {
        return "southwest";
      } else if (
        direction == "left back" ||
        direction == "left backward" ||
        direction == "left backwards"
      ) {
        return "northeast";
      } else if (
        direction == "right back" ||
        direction == "right backward" ||
        direction == "right backwards"
      ) {
        return "north";
      }
      break;
    case "west":
      if (direction == "forward" || direction == "forwards") {
        return "west";
      } else if (
        direction == "back" ||
        direction == "backward" ||
        direction == "backwards"
      ) {
        return "east";
      } else if (direction == "left") {
        return "south";
      } else if (direction == "right") {
        return "north";
      } else if (direction == "left forward" || direction == "left forwards") {
        return "southwest";
      } else if (
        direction == "right forward" ||
        direction == "right forwards"
      ) {
        return "northwest";
      } else if (
        direction == "left back" ||
        direction == "left backward" ||
        direction == "left backwards"
      ) {
        return "southeast";
      } else if (
        direction == "right back" ||
        direction == "right backward" ||
        direction == "right backwards"
      ) {
        return "northeast";
      }
      break;
    case "northwest":
      if (direction == "forward" || direction == "forwards") {
        return "northwest";
      } else if (
        direction == "back" ||
        direction == "backward" ||
        direction == "backwards"
      ) {
        return "southeast";
      } else if (direction == "left") {
        return "north";
      } else if (direction == "right") {
        return "west";
      } else if (direction == "left forward" || direction == "left forwards") {
        return "north";
      } else if (
        direction == "right forward" ||
        direction == "right forwards"
      ) {
        return "northwest";
      } else if (
        direction == "left back" ||
        direction == "left backward" ||
        direction == "left backwards"
      ) {
        return "southeast";
      } else if (
        direction == "right back" ||
        direction == "right backward" ||
        direction == "right backwards"
      ) {
        return "south";
      }
      break;
    default:
      break;
  }
}

function findEnemiesInCell(targetCell) {
  var location = getValue("location");
  location = eval(location, true);
  var enemies = location.enemies;
  var enemiesInCell = false;
  for (let i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    var enemyPosition = enemy.position;
    if (enemyPosition == targetCell) {
      enemiesInCell = true;
    }
  }
  return enemiesInCell;
}

module.exports = { handleCombat, handleCombatMovement };
