const items = require("./item_catalog");
const catalog = items;

class Enemy {
  constructor(name, position, health, armor, attack, speed, gold, xp, items) {
    this.name = name;
    this.position = position;
    this.health = health;
    this.armor = armor;
    this.attack = attack;
    this.speed = speed;
    this.gold = gold;
    this.xp = xp;
    this.items = items;
  }
}

class MeleeEnemy extends Enemy {
  constructor(name, position, health, armor, attack, speed, gold, xp, items) {
    super(name, position, health, armor, attack, speed, gold, xp, items);
    this.range = 7.5;
  }
}

class Rebel extends MeleeEnemy {
  constructor(name, position, items = [new catalog.ShortSword()]) {
    super(name, position, 50, 0, "1d8", 10, 5, 5, 10, items);
  }
}

class RebelCaptain extends Enemy {
  constructor(name, position, items = [new catalog.LongSword()]) {
    super(name, position, 100, 5, "2d8", 20, 5, 10, 20, items);
  }
}

class RangedEnemy extends Enemy {
  constructor(
    name,
    position,
    health,
    armor,
    attack,
    range,
    speed,
    gold,
    xp,
    items
  ) {
    super(
      name,
      position,
      health,
      armor,
      attack,
      range,
      speed,
      gold,
      xp,
      items
    );
  }
}

class RebelArcher extends RangedEnemy {
  constructor(name, position, items = [new catalog.ShortBow()]) {
    super(name, position, 50, 0, "1d6", 60, 10, 5, 10, items);
  }
}

class RebelCrossbowman extends RangedEnemy {
  constructor(name, position, items = [new catalog.LightCrossBow()]) {
    super(name, position, 50, 0, "1d8", 30, 10, 5, 10, items);
  }
}

module.exports = {
  Enemy,
  MeleeEnemy,
  Rebel,
  RebelCaptain,
  RangedEnemy,
  RebelArcher,
  RebelCrossbowman,
};
