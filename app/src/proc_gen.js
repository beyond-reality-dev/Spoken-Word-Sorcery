const items = require("./class_collections/item_catalog");
const spells = require("./class_collections/spellbook");
const { NameGenerator } = require("../lib/markov_namegen/name_generator");
const { getRandomInt } = require("./general");
const { type } = require("os");

function generateName(type, quantity = 1) {
  if (type.split(" ").length > 1) {
    var type = type.split(" ");
    if (type[0] == "either") {
      var coinFlip = Math.random();
      if (coinFlip > 0.5) {
        var gender = "male";
      } else {
        gender = "female";
      }
      var type = type[1];
    } else {
      var gender = type[0];
      var type = type[1];
    }
  }
  const fs = require("fs");
  var data;
  if (type == "fullName") {
    if (quantity == 1) {
      var forename = generateName(`${gender} forename`);
      var surname = generateName("surname");
      var name = forename + " " + surname;
      return name;
    } else {
      data = [];
      for (let i = 0; i < quantity; i++) {
        var forename = generateName(`${gender} forename`);
        var surname = generateName("surname");
        var name = forename + " " + surname;
        data.push(name);
      }
      return data;
    }
  } else if (type == "forename") {
    if (gender == "male") {
      data = fs.readFileSync(
        "./app/lib/markov_namegen/word_lists/male_forenames.txt",
        "utf8"
      );
    } else if (gender == "female") {
      data = fs.readFileSync(
        "./app/lib/markov_namegen/word_lists/female_forenames.txt",
        "utf8"
      );
    }
  } else if (type == "surname") {
    data = fs.readFileSync(
      "./app/lib/markov_namegen/word_lists/surnames.txt",
      "utf8"
    );
  } else if (type == "town") {
    data = fs.readFileSync(
      "./app/lib/markov_namegen/word_lists/towns.txt",
      "utf8"
    );
  }
  var data = data.split("\n");
  var generator = new NameGenerator(data, 10, 0, false);
  var isNull = true;
  if (quantity == 1) {
    while (isNull) {
      var generatedName = generator.generateName(5, 11, "", "", "", "");
      if (generatedName != null) {
        isNull = false;
      }
    }
    generatedName = generatedName.replace("\r", "");
    return generatedName;
  }
  var names = [];
  for (let i = 0; i < quantity; i++) {
    isNull = true;
    while (isNull) {
      var generatedName = generator.generateName(5, 11, "", "", "", "");
      if (generatedName != null) {
        isNull = false;
      }
    }
    generatedName = generatedName.replace("\r", "");
    names.push(generatedName);
  }
  return names;
}

function generateShop(tier) {
  var name = generateName("either fullName");
  var items = [];
  var numItems = tier * getRandomInt(5) + 5;
  var currency = tier * getRandomInt(500) + 100;
  var itemTier = tier;
  var itemTypes = [
    "weapon",
    "weapon",
    "weapon",
    "weapon",
    "armor",
    "armor",
    "armor",
    "potion",
    "potion",
    "scroll",
  ];
  for (let i = 0; i < numItems; i++) {
    var itemType = itemTypes[getRandomInt(itemTypes.length)];
    var item = generateItem(itemType, itemTier);
    items.push(item);
  }
  var uniqueItems = [];
  for (let i = 0; i < items.length; i++) {
    var isUnique = true;
    for (let j = 0; j < uniqueItems.length; j++) {
      if (items[i].name == uniqueItems[j].name) {
        isUnique = false;
      }
    }
    if (isUnique) {
      uniqueItems.push(items[i]);
    }
  }
  items = uniqueItems;
  var ammo = generateAmmo(tier);
  for (let i = 0; i < ammo.length; i++) {
    items.push(ammo[i]);
  }
  var markup = 1.1 + (Math.random() * 4) / 10;
  return [name, items, currency, markup];
}

function generateItem(type, tier) {
  var item;
  if (type == "weapon") {
    item = generateWeapon(tier);
  } else if (type == "armor") {
    item = generateArmor(tier);
  } else if (type == "potion") {
    item = generatePotion(tier);
  } else if (type == "scroll") {
    item = generateScroll();
  }
  return item;
}

function generateWeapon(tier) {
  if (tier < 4) {
    var weaponTypes = items[`tier${tier}Weapons`];
    var weaponType = weaponTypes[getRandomInt(weaponTypes.length)];
    var weapon = new items[weaponType]();
  } else {
    coinFlip = Math.random();
    if (coinFlip > 0.5) {
      var weaponTypes = items[`tier3Weapons`];
      var weaponType = weaponTypes[getRandomInt(weaponTypes.length)];
      var generatedFirstName = generateName("either forename");
      var generatedLastName = generateName("surname");
      var generatedName = `${generatedFirstName} ${generatedLastName}`;
      var baseWeapon = new items[weaponType]();
      var basePrice = baseWeapon.value;
      var newPrice = boost * 1.5 * basePrice;
      if (
        baseWeapon.hasOwnProperty("rangedAttackValue") &&
        baseWeapon.hasOwnProperty("attackValue")
      ) {
        var baseAttack = baseWeapon.attackValue;
        var number = baseAttack.split("d")[0];
        var sides = baseAttack.split("d")[1];
        var boost = getRandomInt(tier) + 1;
        var newAttack = `${number + boost}d${sides}`;
        var rangedAttack = baseWeapon.rangedAttackValue;
        var number = rangedAttack.split("d")[0];
        var sides = rangedAttack.split("d")[1];
        var newRangedAttack = `${number + boost}d${sides}`;
        var weapon = {
          name: `${generatedFirstName}'s ${baseWeapon.name}`,
          description: `A ${baseWeapon.name} that once belonged to ${generatedName}.`,
          attackValue: newAttack,
          rangedAttackValue: newRangedAttack,
          minRange: baseWeapon.minRange,
          effectiveRange: baseWeapon.effectiveRange,
          maxRange: baseWeapon.maxRange,
          weight: baseWeapon.weight,
          value: newPrice,
          type: baseWeapon.type,
        };
      } else if (baseWeapon.hasOwnProperty("rangedAttackValue")) {
        var rangedAttack = baseWeapon.rangedAttackValue;
        var number = rangedAttack.split("d")[0];
        var sides = rangedAttack.split("d")[1];
        var boost = getRandomInt(tier) + 1;
        var newRangedAttack = `${number + boost}d${sides}`;
        var weapon = {
          name: `${generatedFirstName}'s ${baseWeapon.name}`,
          description: `A ${baseWeapon.name} that once belonged to ${generatedName}.`,
          rangedAttackValue: newRangedAttack,
          minRange: baseWeapon.minRange,
          effectiveRange: baseWeapon.effectiveRange,
          maxRange: baseWeapon.maxRange,
          weight: baseWeapon.weight,
          value: newPrice,
          type: baseWeapon.type,
        };
      } else {
        var attack = baseWeapon.attackValue;
        var number = attack.split("d")[0];
        var sides = attack.split("d")[1];
        var boost = getRandomInt(tier) + 1;
        var newAttack = `${number + boost}d${sides}`;
        var weapon = {
          name: `${generatedFirstName}'s ${baseWeapon.name}`,
          description: `A ${baseWeapon.name} that once belonged to ${generatedName}.`,
          attackValue: newAttack,
          weight: baseWeapon.weight,
          value: newPrice,
          type: baseWeapon.type,
        };
      }
    } else {
      var weaponTypes = items[`tier3Weapons`];
      var weaponType = weaponTypes[getRandomInt(weaponTypes.length)];
      var weapon = new items[weaponType]();
    }
  }
  return weapon;
}

function generateArmor(tier) {
  if (tier < 4) {
    var armorTypes = items[`tier${tier}Armor`];
    var armorType = armorTypes[getRandomInt(armorTypes.length)];
    var armor = new items[armorType]();
  } else {
    coinFlip = Math.random();
    if (coinFlip > 0.5) {
      var armorTypes = items[`tier3Armor`];
      var armorType = armorTypes[getRandomInt(armorTypes.length)];
      var generatedFirstName = generateName("either forename");
      var generatedLastName = generateName("surname");
      var generatedName = `${generatedFirstName} ${generatedLastName}`;
      var baseArmor = new items[armorType]();
      var basePrice = baseArmor.value;
      var newPrice = boost * 1.5 * basePrice;
      var armor = {
        name: `${generatedFirstName}'s ${baseArmor.name}`,
        description: `A ${baseArmor.name} that once belonged to ${generatedName}.`,
        defenseValue: baseArmor.defenseValue,
        weight: baseArmor.weight,
        value: newPrice,
        type: baseArmor.type,
      };
    } else {
      var armorTypes = items[`tier3Armor`];
      var armorType = armorTypes[getRandomInt(armorTypes.length)];
      var armor = new items[armorType]();
    }
  }
  return armor;
}

function generatePotion(tier) {
  var potionTypes = items[`tier${tier}Potions`];
  var potionType = potionTypes[getRandomInt(potionTypes.length)];
  var potion = new items[potionType]();
  return potion;
}

function generateScroll() {
  var scrollTypes = spells.scrolls;
  var scrollType = scrollTypes[getRandomInt(scrollTypes.length)];
  var scrollName = `${scrollType} Scroll`;
  var scrollDescription = `A scroll that, when read, grants the reader the ability to cast the ${scrollType} spell.`;
  var scroll = {
    name: scrollName,
    description: scrollDescription,
    saleName: "Scroll",
    saleDescription: `A scroll that grants the ability to cast a spell. Of course, you cannot know what spell it contains until you read it.`,
    spell: scrollType,
    value: 100,
    type: "scroll",
  }
  return scroll;
}

function generateAmmo(tier) {
  var ammo = [];
  var standardAmmo = items[`tier1Ammo`];
  for (let i = 0; i < standardAmmo.length; i++) {
    var quantity = tier * (getRandomInt(25) + 1);
    var ammoComponent = new items[standardAmmo[i]](quantity);
    ammo.push(ammoComponent);
  }
  if (tier > 1 && tier < 4) {
    for (let i = 2; i <= tier; i++) {
      var ammoTypes = items[`tier${i}Ammo`];
      for (let j = 0; j < ammoTypes.length; j++) {
        quantity = tier * (getRandomInt(25) + 1);
        ammoComponent = new items[ammoTypes[j]](quantity);
        ammo.push(ammoComponent);
      }
    }
  }
  return ammo;
}

module.exports = { generateName, generateShop };
