class Item {
  constructor(name, description, goldValue, healthValue, armorValue, attackValue, speedValue, rangeValue, manaValue, isConsumable) {
    this.name = name;
    this.description = description;
    this.goldValue = goldValue;
    this.healthValue = healthValue;
    this.armorValue = armorValue;
    this.attackValue = attackValue;
    this.speedValue = speedValue;
    this.rangeValue = rangeValue;
    this.manaValue = manaValue;
    this.isConsumable = isConsumable;
  }
}

class Sword extends Item {
  constructor() {
    super("Sword", "A basic sword", 5, 0, 0, 5, 0, 1, 0, false);
  }
}