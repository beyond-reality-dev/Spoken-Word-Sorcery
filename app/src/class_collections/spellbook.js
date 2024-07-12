module.exports = { Earth, Fire, Water, Spear, Shield };

class Element {
  constructor(name, description, negates, isNegatedBy, isSpoken) {
    this.name = name;
    this.description = description;
    this.negates = negates;
    this.isNegatedBy = isNegatedBy;
    this.isSpoken = isSpoken;
  }
}

class Aether extends Element {
  constructor() {
    super("Aether", "The element that underpins the Power of the universe but can only affect the immaterial.", "None", "None", false);
  }
}

class Earth extends Element {
  constructor() {
    super("Earth", "The element of rock, soil, and plant life.", "Water", "Air", false);
  }
}

class Fire extends Element {
  constructor() {
    super("Fire", "The element of heat and flame.", "Earth", "Water", false);
  }
}

class Water extends Element {
  constructor() {
    super("Water", "The element of oceans and rivers.", "Fire", "Earth", false);
  }
}

class Spell {
  constructor(name, manaCost, power, range, isOffensive, attackIncrease, healthIncrease, armorIncrease, speedIncrease, rangeIncrease, isSpoken) {
    this.name = name;
    this.manaCost = manaCost;
    this.power = power;
    this.range = range;
    this.isOffensive = isOffensive;
    this.attackIncrease = attackIncrease;
    this.healthIncrease = healthIncrease;
    this.armorIncrease = armorIncrease;
    this.speedIncrease = speedIncrease;
    this.rangeIncrease = rangeIncrease;
    this.isSpoken = isSpoken;
  }
}

class Spear extends Spell {
  constructor() {
    super("Spear", 5, 10, 1, true, 0, 0, 0, 0, 0, false);
  }
}

class Shield extends Spell {
  constructor() {
    super("Shield", 5, 10, 0, false, 0, 0, 0, 0, 0, false);
  }
}