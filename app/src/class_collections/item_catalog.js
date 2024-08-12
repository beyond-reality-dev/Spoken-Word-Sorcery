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

class MeleeWeapon extends Weapon {
  constructor(
    name,
    description,
    position,
    goldValue,
    attackValue,
    weight,
    quantity
  ) {
    super(
      name,
      description,
      position,
      goldValue,
      attackValue,
      0,
      weight,
      quantity
    );
  }
}

class Club extends MeleeWeapon {
  constructor(quantity = 1, name = "Club", description = "A simple club") {
    super(name, description, "eitherHand", 5, "1d4", 5, quantity);
  }
}

class Staff extends MeleeWeapon {
  constructor(quantity = 1, name = "Staff", description = "A simple staff") {
    super(name, description, "bothHands", 5, "1d6", 5, quantity);
  }
}

class Dagger extends MeleeWeapon {
  constructor(quantity = 1, name = "Dagger", description = "A simple dagger") {
    super(name, description, "eitherHand", 5, "1d6", 5, quantity);
  }
}

class ShortSword extends MeleeWeapon {
  constructor(
    quantity = 1,
    name = "Short Sword",
    description = "A short sword"
  ) {
    super(name, description, "eitherHand", 10, "1d8", 5, quantity);
  }
}

class LongSword extends MeleeWeapon {
  constructor(quantity = 1, name = "Long Sword", description = "A long sword") {
    super(name, description, "bothHands", 20, "2d8", 10, quantity);
  }
}

class GreatSword extends MeleeWeapon {
  constructor(
    quantity = 1,
    name = "Great Sword",
    description = "A great sword"
  ) {
    super(name, description, "bothHands", 50, "2d10", 10, quantity);
  }
}

class Axe extends MeleeWeapon {
  constructor(quantity = 1, name = "Axe", description = "A simple axe") {
    super(name, description, "eitherHand", 10, "1d8", 5, quantity);
  }
}

class BattleAxe extends MeleeWeapon {
  constructor(quantity = 1, name = "Battle Axe", description = "A battle axe") {
    super(name, description, "bothHands", 20, "2d8", 10, quantity);
  }
}

class GreatAxe extends MeleeWeapon {
  constructor(quantity = 1, name = "Great Axe", description = "A great axe") {
    super(name, description, "bothHands", 50, "2d10", 10, quantity);
  }
}

class Mace extends MeleeWeapon {
  constructor(quantity = 1, name = "Mace", description = "A simple mace") {
    super(name, description, "eitherHand", 10, "1d8", 5, quantity);
  }
}

class WarHammer extends MeleeWeapon {
  constructor(
    quantity = 1,
    name = "War Hammer",
    description = "A simple war hammer"
  ) {
    super(name, description, "bothHands", 20, "2d8", 10, quantity);
  }
}

class RangedWeapon extends Weapon {
  constructor(
    name,
    description,
    position,
    goldValue,
    rangedAttackValue,
    rangeValue,
    weight,
    quantity
  ) {
    super(
      name,
      description,
      position,
      goldValue,
      rangedAttackValue,
      rangeValue,
      weight,
      quantity
    );
  }
}

class ShortBow extends RangedWeapon {
  constructor(
    quantity = 1,
    name = "Short Bow",
    description = "A simple short bow"
  ) {
    super(name, description, "bothHands", 10, "1d8", 75, 5, quantity);
    this.ammunition = "Arrow";
  }
}

class LongBow extends RangedWeapon {
  constructor(
    quantity = 1,
    name = "Long Bow",
    description = "A simple long bow"
  ) {
    super(name, description, "bothHands", 10, "2d6", 150, 5, quantity);
    this.ammunition = "Arrow";
  }
}

class LightCrossBow extends Weapon {
  constructor(
    quantity = 1,
    name = "Light Crossbow",
    description = "A light crossbow"
  ) {
    super(name, description, "eitherHand", 10, "1d8", 75, 5, quantity);
    this.ammunition = "Bolt";
  }
}

class HeavyCrossBow extends Weapon {
  constructor(
    quantity = 1,
    name = "Heavy Crossbow",
    description = "A heavy crossbow"
  ) {
    super(name, description, "bothHands", 10, "2d6", 150, 10, quantity);
    this.ammunition = "Bolt";
  }
}

class Dart extends Weapon {
  constructor(quantity = 1) {
    super(
      "Dart",
      "A simple throwing dart",
      "eitherHand",
      5,
      "1d4",
      5,
      1,
      quantity
    );
    this.ammunition = "Dart";
  }
}

class Javelin extends Weapon {
  constructor(quantity = 1) {
    super(
      "Javelin",
      "A simple javelin",
      "eitherHand",
      5,
      "1d6",
      5,
      5,
      quantity
    );
    this.ammunition = "Javelin";
  }
}

class ThrowingAxe extends Weapon {
  constructor(quantity = 1) {
    super(
      "Throwing Axe",
      "A simple throwing axe",
      "eitherHand",
      5,
      "1d6",
      5,
      5,
      quantity
    );
    this.ammunition = "Throwing Axe";
  }
}

class ThrowingKnife extends Weapon {
  constructor(quantity = 1) {
    super(
      "Throwing Knife",
      "A simple throwing knife",
      "eitherHand",
      5,
      "1d4",
      5,
      1,
      quantity
    );
    this.ammunition = "Throwing Knife";
  }
}

class ComboWeapon extends Weapon {
  constructor(
    name,
    description,
    position,
    goldValue,
    attackValue,
    rangedAttackValue,
    rangeValue,
    weight,
    quantity
  ) {
    super(
      name,
      description,
      position,
      goldValue,
      attackValue,
      rangedAttackValue,
      rangeValue,
      weight,
      quantity
    );
  }
}

class Spear extends ComboWeapon {
  constructor(quantity = 1, name = "Spear", description = "A simple spear") {
    super(name, description, "eitherHand", 10, "1d8", "1d6", 5, 5, quantity);
    this.ammunition = "Spear";
  }
}

class Trident extends ComboWeapon {
  constructor(
    quantity = 1,
    name = "Trident",
    description = "A simple trident"
  ) {
    super(name, description, "eitherHand", 10, "1d10", "1d8", 5, 5, quantity);
    this.ammunition = "Trident";
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
      "1d10",
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
      "2d10",
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
      "3d10",
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
      "1d10",
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
      "2d10",
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
      "3d10",
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
      "1d10",
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
      "2d10",
      1,
      quantity
    );
  }
}

class SuperSpeedPotion extends Consumable {
  constructor(quantity = 1) {
    super(
      "Super Speed Potion",
      "A potion that increases speed",
      "consumable",
      30,
      0,
      0,
      "3d10",
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

class Bolt extends Consumable {
  constructor(quantity = 1) {
    super("Bolt", "A simple bolt", "consumable", 1, 0, 0, 0, 1, quantity);
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

class Codex extends Miscellaneous {
  constructor() {
    super(
      "Codex",
      "A book that is said to contain all the Words discovered by the Arcane Order",
      "accessory",
      10,
      1,
      1
    );
  }
}

module.exports = {
  Weapon,
  MeleeWeapon,
  Club,
  Staff,
  Dagger,
  ShortSword,
  LongSword,
  GreatSword,
  Axe,
  BattleAxe,
  GreatAxe,
  Mace,
  WarHammer,
  RangedWeapon,
  ShortBow,
  LongBow,
  LightCrossBow,
  HeavyCrossBow,
  Dart,
  Javelin,
  ThrowingAxe,
  ThrowingKnife,
  ComboWeapon,
  Spear,
  Trident,
  Armor,
  LeatherHelmet,
  IronHelmet,
  LeatherChestplate,
  IronChestplate,
  LeatherLeggings,
  IronLeggings,
  LeatherBoots,
  IronBoots,
  Consumable,
  HealthPotion,
  AdvancedHealthPotion,
  SuperHealthPotion,
  ManaPotion,
  AdvancedManaPotion,
  SuperManaPotion,
  SpeedPotion,
  AdvancedSpeedPotion,
  SuperSpeedPotion,
  Arrow,
  Bolt,
  Accessory,
  Miscellaneous,
  Codex,
};
