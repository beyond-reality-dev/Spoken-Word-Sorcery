const items = require("./item_catalog");
const catalog = items;

class Enemy {
  constructor(
    name,
    position,
    attackDescription,
    health,
    armor,
    attack,
    speed,
    gold,
    xp,
    items,
    isBoss,
  ) {
    this.name = name;
    this.position = position;
    this.attackDescription = attackDescription;
    this.health = health;
    this.armor = armor;
    this.attack = attack;
    this.speed = speed;
    this.gold = gold;
    this.xp = xp;
    this.items = items;
    this.isBoss = isBoss;
    this.hitLastTurn = false;
  }
}

class MeleeEnemy extends Enemy {
  constructor(
    name,
    position,
    attackDescription,
    health,
    armor,
    attack,
    speed,
    gold,
    xp,
    items,
    isBoss,
  ) {
    super(
      name,
      position,
      attackDescription,
      health,
      armor,
      attack,
      speed,
      gold,
      xp,
      items,
      isBoss = false,
    );
    this.range = 7.5;
  }
}

class Rebel extends MeleeEnemy {
  constructor(name, position, items = [new catalog.ShortSword()]) {
    super(
      name,
      position,
      "The rebel strikes with his short sword!",
      50,
      0,
      "1d8",
      10,
      5,
      5,
      10,
      items
    );
  }
}

class RebelCaptain extends Enemy {
  constructor(name, position, items = [new catalog.LongSword()]) {
    super(
      name,
      position,
      "The rebel captain strikes with his long sword!",
      100,
      5,
      "2d8",
      20,
      5,
      10,
      20,
      items,
      true
    );
  }
}

class RangedEnemy extends Enemy {
  constructor(
    name,
    position,
    attackDescription,
    health,
    armor,
    attack,
    range,
    speed,
    gold,
    xp,
    items,
    isBoss,
  ) {
    super(
      name,
      position,
      attackDescription,
      health,
      armor,
      attack,
      range,
      speed,
      gold,
      xp,
      items,
      isBoss = false,
    );
  }
}

class RebelShortBowman extends RangedEnemy {
  constructor(name, position, items = [new catalog.ShortBow()]) {
    super(
      name,
      position,
      "The rebel archer fires his short bow!",
      50,
      0,
      "1d6",
      60,
      10,
      5,
      10,
      items
    );
  }
}

class RebelLongBowman extends RangedEnemy {
  constructor(name, position, items = [new catalog.LongBow()]) {
    super(
      name,
      position,
      "The rebel archer fires his long bow!",
      50,
      0,
      "1d8",
      120,
      10,
      5,
      10,
      items
    );
  }
}

class RebelLightCrossbowman extends RangedEnemy {
  constructor(name, position, items = [new catalog.LightCrossbow()]) {
    super(
      name,
      position,
      "The rebel fires his light crossbow!",
      50,
      0,
      "1d8",
      30,
      10,
      5,
      10,
      items
    );
  }
}

class RebelHeavyCrossbowman extends RangedEnemy {
  constructor(name, position, items = [new catalog.HeavyCrossbow()]) {
    super(
      name,
      position,
      "The rebel fires his heavy crossbow!",
      50,
      0,
      "1d10",
      60,
      10,
      5,
      10,
      items
    );
  }
}

class Slinger extends RangedEnemy {
  constructor(name, position, items = [new catalog.Sling()]) {
    super(
      name,
      position,
      "The rebel fires his sling!",
      50,
      0,
      "1d4",
      30,
      10,
      5,
      10,
      items
    );
  }
}

class RebelSpearman extends RangedEnemy {
  constructor(name, position, items = [new catalog.Spear()]) {
    super(
      name,
      position,
      "The rebel throws his spear!",
      50,
      0,
      "1d8",
      10,
      5,
      5,
      10,
      items
    );
  }
}

class RebelMage extends RangedEnemy {
  constructor(name, position, items = [new catalog.Staff()], spells) {
    super(
      name,
      position,
      `The rebel mage yells <i>${spells}</i> and casts a spell!`,
      50,
      0,
      "5d10",
      100,
      10,
      5,
      10,
      items
    );
    this.spells = spells;
  }
}

module.exports = {
  Enemy,
  MeleeEnemy,
  Rebel,
  RebelCaptain,
  RangedEnemy,
  RebelShortBowman,
  RebelLongBowman,
  RebelLightCrossbowman,
  RebelHeavyCrossbowman,
  Slinger,
  RebelSpearman,
  RebelMage,
};
