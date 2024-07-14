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

class IronSword extends Weapon {
  constructor() {
    super("Sword", "A simple sword", "mainHand", 10, 10, 1, 5);
  }
}

class WoodenBow extends Weapon {
  constructor() {
    super("Bow", "A simple bow", "mainHand", 10, 5, 5, 5);
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
  constructor() {
    super("Helmet", "A simple helmet", "head", 10, 5, 5);
  }
}

class LeatherChestplate extends Armor {
  constructor() {
    super("Chestplate", "A simple chestplate", "chest", 10, 5, 5);
  }
}

class LeatherLeggings extends Armor {
  constructor() {
    super("Leggings", "Simple leggings", "legs", 10, 5, 5);
  }
}

class LeatherBoots extends Armor {
  constructor() {
    super("Boots", "Simple boots", "feet", 10, 5, 5);
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
  constructor() {
    super("Health Potion", "A potion that restores health", "consumable", 10, 10, 0, 0, 1);
  }
}

class ManaPotion extends Consumable {
  constructor() {
    super("Mana Potion", "A potion that restores mana", "consumable", 10, 0, 10, 0, 1);
  }
}

class SpeedPotion extends Consumable {
  constructor() {
    super("Speed Potion", "A potion that increases speed", "consumable", 10, 0, 0, 10, 1);
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

module.exports = { Weapon, Armor, Consumable, Miscellaneous };