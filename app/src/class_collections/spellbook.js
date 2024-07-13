class Element {
  constructor(name, description, negates, isNegatedBy) {
    this.name = name;
    this.description = description;
    this.negates = negates;
    this.isNegatedBy = isNegatedBy;
  }
}

class Aether extends Element {
  constructor() {
    super("Aether", "The element that underpins the Power of the universe but can only affect the immaterial.", "None", "None");
  }
}

class Earth extends Element {
  constructor() {
    super("Earth", "The element of rock, soil, and plant life.", "Water", "Air");
  }
}

class Fire extends Element {
  constructor() {
    super("Fire", "The element of heat and flame.", "Earth", "Water");
  }
}

class Water extends Element {
  constructor() {
    super("Water", "The element of oceans and rivers.", "Fire", "Earth");
  }
}

class Spell {
  constructor(name, manaCost, power, range, isOffensive, attackIncrease, healthIncrease, armorIncrease, speedIncrease, rangeIncrease) {
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
  }
}

class Spear extends Spell {
  constructor() {
    super("Spear", 5, 10, 1, true, 0, 0, 0, 0, 0);
  }
}

class Shield extends Spell {
  constructor() {
    super("Shield", 5, 10, 0, false, 0, 0, 0, 0, 0);
  }
}

class Direction {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
}

class Away extends Direction {
  constructor() {
    super("Away", "The direction opposite the caster.");
  }
}

module.exports = { Earth, Fire, Water, Spear, Shield, Away };