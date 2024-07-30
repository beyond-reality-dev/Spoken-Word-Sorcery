class Weapon {
  constructor(
    name,
    description,
    position,
    goldValue,
    attackValue,
    rangeValue,
    weight,
    quantity
  ) {
    this.name = name;
    this.description = description;
    this.position = position;
    this.type = "Weapon";
    this.goldValue = goldValue;
    this.attackValue = attackValue;
    this.rangeValue = rangeValue;
    this.weight = weight;
    this.quantity = quantity;
  }
}

class WoodenStaff extends Weapon {
  constructor(quantity = 1) {
    super("Staff", "A simple staff", "mainHand", 5, 5, 1, 5, quantity);
  }
}

class ImperialDagger extends Weapon {
  constructor(quantity = 1) {
    super(
      "Imperial Dagger",
      "A dagger that once belonged to an Imperial Adept, before he sacrificed his life for your benefit",
      "mainHand",
      10,
      10,
      1,
      5,
      quantity
    );
  }
}

class ShortSword extends Weapon {
  constructor(quantity = 1) {
    super("Short Sword", "A short sword", "mainHand", 10, 10, 1, 5, quantity);
  }
}

class LongSword extends Weapon {
  constructor(quantity = 1) {
    super("Long Sword", "A long sword", "mainHand", 20, 15, 1, 10, quantity);
  }
}

class GreatSword extends Weapon {
  constructor(quantity = 1) {
    super("Great Sword", "A great sword", "mainHand", 50, 20, 1, 10, quantity);
  }
}

class ShortBow extends Weapon {
  constructor(quantity = 1) {
    super("Bow", "A simple bow", "mainHand", 10, 5, 5, 5, quantity);
  }
}

class LongBow extends Weapon {
  constructor(quantity = 1) {
    super("Bow", "A simple bow", "mainHand", 10, 10, 10, 5, quantity);
  }
}

class Armor {
  constructor(
    name,
    description,
    position,
    goldValue,
    armorValue,
    weight,
    quantity
  ) {
    this.name = name;
    this.description = description;
    this.position = position;
    this.type = "Armor";
    this.goldValue = goldValue;
    this.armorValue = armorValue;
    this.weight = weight;
    this.quantity = quantity;
  }
}

class LeatherHelmet extends Armor {
  constructor(quantity = 1) {
    super("Helmet", "A simple helmet", "head", 10, 5, 5, quantity);
  }
}

class IronHelmet extends Armor {
  constructor(quantity = 1) {
    super("Helmet", "A simple helmet", "head", 10, 10, 5, quantity);
  }
}

class LeatherChestplate extends Armor {
  constructor(quantity = 1) {
    super("Chestplate", "A simple chestplate", "chest", 10, 5, 5, quantity);
  }
}

class IronChestplate extends Armor {
  constructor(quantity = 1) {
    super("Chestplate", "A simple chestplate", "chest", 10, 10, 5, quantity);
  }
}

class LeatherLeggings extends Armor {
  constructor(quantity = 1) {
    super("Leggings", "Simple leggings", "legs", 10, 5, 5, quantity);
  }
}

class IronLeggings extends Armor {
  constructor(quantity = 1) {
    super("Leggings", "Simple leggings", "legs", 10, 10, 5, quantity);
  }
}

class LeatherBoots extends Armor {
  constructor(quantity = 1) {
    super("Boots", "Simple boots", "feet", 10, 5, 5, quantity);
  }
}

class IronBoots extends Armor {
  constructor(quantity = 1) {
    super("Boots", "Simple boots", "feet", 10, 10, 5, quantity);
  }
}

class Consumable {
  constructor(
    name,
    description,
    position,
    goldValue,
    healthValue,
    manaValue,
    speedValue,
    weight,
    quantity
  ) {
    this.name = name;
    this.description = description;
    this.position = position;
    this.type = "Consumable";
    this.goldValue = goldValue;
    this.healthValue = healthValue;
    this.manaValue = manaValue;
    this.speedValue = speedValue;
    this.weight = weight;
    this.quantity = quantity;
  }
}

class HealthPotion extends Consumable {
  constructor(quantity = 1) {
    super(
      "Health Potion",
      "A potion that restores health",
      "consumable",
      10,
      10,
      0,
      0,
      1,
      quantity
    );
  }
}

class AdvancedHealthPotion extends Consumable {
  constructor(quantity = 1) {
    super(
      "Advanced Health Potion",
      "A potion that restores health",
      "consumable",
      20,
      20,
      0,
      0,
      1,
      quantity
    );
  }
}

class SuperHealthPotion extends Consumable {
  constructor(quantity = 1) {
    super(
      "Super Health Potion",
      "A potion that restores health",
      "consumable",
      30,
      30,
      0,
      0,
      1,
      quantity
    );
  }
}

class ManaPotion extends Consumable {
  constructor(quantity = 1) {
    super(
      "Mana Potion",
      "A potion that restores mana",
      "consumable",
      10,
      0,
      10,
      0,
      1,
      quantity
    );
  }
}

class AdvancedManaPotion extends Consumable {
  constructor(quantity = 1) {
    super(
      "Advanced Mana Potion",
      "A potion that restores mana",
      "consumable",
      20,
      0,
      20,
      0,
      1,
      quantity
    );
  }
}

class SuperManaPotion extends Consumable {
  constructor(quantity = 1) {
    super(
      "Super Mana Potion",
      "A potion that restores mana",
      "consumable",
      30,
      0,
      30,
      0,
      1,
      quantity
    );
  }
}

class SpeedPotion extends Consumable {
  constructor(quantity = 1) {
    super(
      "Speed Potion",
      "A potion that increases speed",
      "consumable",
      10,
      0,
      0,
      10,
      1,
      quantity
    );
  }
}

class AdvancedSpeedPotion extends Consumable {
  constructor(quantity = 1) {
    super(
      "Advanced Speed Potion",
      "A potion that increases speed",
      "consumable",
      20,
      0,
      0,
      20,
      1,
      quantity
    );
  }
}

class Arrow extends Consumable {
  constructor(quantity = 1) {
    super("Arrow", "A simple arrow", "consumable", 1, 0, 0, 0, 1, quantity);
  }
}

class Accessory {
  constructor(
    name,
    description,
    position,
    goldValue,
    healthValue,
    manaValue,
    speedValue,
    weight,
    quantity
  ) {
    this.name = name;
    this.description = description;
    this.position = position;
    this.type = "Accessory";
    this.goldValue = goldValue;
    this.healthValue = healthValue;
    this.manaValue = manaValue;
    this.speedValue = speedValue;
    this.weight = weight;
    this.quantity = quantity;
  }
}

class Miscellaneous {
  constructor(name, description, position, goldValue, weight, quantity) {
    this.name = name;
    this.description = description;
    this.position = position;
    this.type = "Miscellaneous";
    this.goldValue = goldValue;
    this.weight = weight;
    this.quantity = quantity;
  }
}

module.exports = {
  Weapon,
  Armor,
  Consumable,
  Accessory,
  Miscellaneous,
  ImperialDagger,
  Arrow,
  WoodenStaff,
};
