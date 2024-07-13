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
    super("Aether", "A shimmering ", "None", "None");
  }
}

class Earth extends Element {
  constructor() {
    super("Earth", "An earthen ", "Water", "Air");
  }
}

class Fire extends Element {
  constructor() {
    super("Fire", "A flaming ", "Earth", "Water");
  }
}

class Water extends Element {
  constructor() {
    super("Water", "A rushing ", "Fire", "Earth");
  }
}

class Spell {
  constructor(name, description, manaCost, power, range, isOffensive, attackIncrease, healthIncrease, armorIncrease, speedIncrease, rangeIncrease) {
    this.name = name;
    this.description = description;
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
    super("Spear", "spear flies through the air ", 5, 10, 1, true, 0, 0, 0, 0, 0);
  }
}

class Shield extends Spell {
  constructor() {
    super("Shield", "shield forms in front of you!", 5, 10, 0, false, 0, 0, 0, 0, 0);
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
    super("Away", "away from you!");
  }
}

module.exports = { Earth, Fire, Water, Spear, Shield, Away };