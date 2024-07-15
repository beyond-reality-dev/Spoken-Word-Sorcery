class Weapon {
  constructor(name, description, position, goldValue, attackValue, rangeValue, weight) {
    this.name = name;
    this.description = description;
    this.position = position;
    this.type = "Weapon";
    this.goldValue = goldValue;
    this.attackValue = attackValue;
    this.rangeValue = rangeValue;
    this.weight = weight;
  }
}

class WoodenStaff extends Weapon {
  constructor(quantity=1) {
    super("Staff", "A simple staff", "mainHand", 5, 5, 1, 5, quantity);
  }
}

class IronSword extends Weapon {
  constructor(quantity=1) {
    super("Sword", "A simple sword", "mainHand", 10, 10, 1, 5, quantity);
  }
}

class WoodenBow extends Weapon {
  constructor(quantity=1) {
    super("Bow", "A simple bow", "mainHand", 10, 5, 5, 5, quantity);
  }
}

class Armor {
  constructor(name, description, position, goldValue, armorValue, weight) {
    this.name = name;
    this.description = description;
    this.position = position;
    this.type = "Armor";
    this.goldValue = goldValue;
    this.armorValue = armorValue;
    this.weight = weight;
  }
}

class LeatherHelmet extends Armor {
  constructor(quantity=1) {
    super("Helmet", "A simple helmet", "head", 10, 5, 5, quantity);
  }
}

class LeatherChestplate extends Armor {
  constructor(quantity=1) {
    super("Chestplate", "A simple chestplate", "chest", 10, 5, 5, quantity);
  }
}

class LeatherLeggings extends Armor {
  constructor(quantity=1) {
    super("Leggings", "Simple leggings", "legs", 10, 5, 5, quantity);
  }
}

class LeatherBoots extends Armor {
  constructor(quantity=1) {
    super("Boots", "Simple boots", "feet", 10, 5, 5, quantity);
  }
}

class Consumable {
  constructor(name, description, position, goldValue, healthValue, manaValue, speedValue, weight) {
    this.name = name;
    this.description = description;
    this.position = position;
    this.type = "Consumable";
    this.goldValue = goldValue;
    this.healthValue = healthValue;
    this.manaValue = manaValue;
    this.speedValue = speedValue;
    this.weight = weight;
  }
}

class HealthPotion extends Consumable {
  constructor(quantity=1) {
    super("Health Potion", "A potion that restores health", "consumable", 10, 10, 0, 0, 1, quantity);
  }
}

class ManaPotion extends Consumable {
  constructor(quantity=1) {
    super("Mana Potion", "A potion that restores mana", "consumable", 10, 0, 10, 0, 1, quantity);
  }
}

class SpeedPotion extends Consumable {
  constructor(quantity=1) {
    super("Speed Potion", "A potion that increases speed", "consumable", 10, 0, 0, 10, 1, quantity);
  }
}

class Arrow extends Consumable {
  constructor(quantity=1) {
    super("Arrow", "A simple arrow", "consumable", 1, 0, 0, 0, 1, quantity);
  }
}

class Miscellaneous {
  constructor(name, description, position, goldValue, weight) {
    this.name = name;
    this.description = description;
    this.position = position;
    this.type = "Miscellaneous";
    this.goldValue = goldValue;
    this.weight = weight;
  }
}

module.exports = { Weapon, Armor, Consumable, Miscellaneous, Arrow };