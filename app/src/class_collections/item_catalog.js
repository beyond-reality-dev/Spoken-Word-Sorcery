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
  constructor() {
    super("Staff", "A simple staff", "mainHand", 5, 5, 1, 5);
  }
}

var woodenStaff = new WoodenStaff();

class IronSword extends Weapon {
  constructor() {
    super("Sword", "A simple sword", "mainHand", 10, 10, 1, 5);
  }
}

var ironSword = new IronSword();

class WoodenBow extends Weapon {
  constructor() {
    super("Bow", "A simple bow", "mainHand", 10, 5, 5, 5);
  }
}

var woodenBow = new WoodenBow();

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

var leatherHelmet = new LeatherHelmet();

class LeatherChestplate extends Armor {
  constructor() {
    super("Chestplate", "A simple chestplate", "chest", 10, 5, 5);
  }
}

var leatherChestplate = new LeatherChestplate();

class LeatherLeggings extends Armor {
  constructor() {
    super("Leggings", "Simple leggings", "legs", 10, 5, 5);
  }
}

var leatherLeggings = new LeatherLeggings();

class LeatherBoots extends Armor {
  constructor() {
    super("Boots", "Simple boots", "feet", 10, 5, 5);
  }
}

var leatherBoots = new LeatherBoots();

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

var healthPotion = new HealthPotion();

class ManaPotion extends Consumable {
  constructor() {
    super("Mana Potion", "A potion that restores mana", "consumable", 10, 0, 10, 0, 1);
  }
}

var manaPotion = new ManaPotion();

class SpeedPotion extends Consumable {
  constructor() {
    super("Speed Potion", "A potion that increases speed", "consumable", 10, 0, 0, 10, 1);
  }
}

var speedPotion = new SpeedPotion();

class Arrow extends Consumable {
  constructor() {
    super("Arrow", "A simple arrow", "consumable", 1, 0, 0, 0, 1);
  }
}

var arrow = new Arrow();

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

module.exports = { Weapon, Armor, Consumable, Miscellaneous, arrow };