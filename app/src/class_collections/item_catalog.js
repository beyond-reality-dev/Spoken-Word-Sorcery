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