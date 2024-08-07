class Enemy {
  constructor(
    name,
    position,
    health,
    armor,
    attack,
    speed,
    range,
    gold,
    xp,
    items
  ) {
    this.name = name;
    this.position = position;
    this.health = health;
    this.armor = armor;
    this.attack = attack;
    this.speed = speed;
    this.range = range;
    this.gold = gold;
    this.xp = xp;
    this.items = items;
  }
}

class Rebel extends Enemy {
  constructor(name, position, items = ["shortSword"]) {
    super(name, position, 50, 10, "1d8", 10, 1, 5, 10, items);
  }
}

class RebelCaptain extends Enemy {
  constructor(name, position, items = [ "longSword" ]) {
    super(name, position, 100, 20, "2d8", 20, 1, 10, 20, items);
  }
}

module.exports = { Enemy, Rebel, RebelCaptain };
