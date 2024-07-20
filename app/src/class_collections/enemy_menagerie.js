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
  constructor(name, position, items = ["ironSword"]) {
    super(name, position, 50, 10, 10, 10, 1, 5, 10, items);
  }
}

class RebelCaptain extends Enemy {
  constructor(name, position, items = []) {
    super(name, position, 100, 20, 20, 20, 1, 10, 20, items);
  }
}

class RebelGeneral extends Enemy {
  constructor(name, position, items = []) {
    super(name, position, 200, 30, 30, 30, 1, 20, 40, items);
  }
}

class RebelWarlord extends Enemy {
  constructor(name, position, items = []) {
    super(name, position, 500, 50, 50, 50, 1, 50, 100, items);
  }
}

module.exports = { Rebel, RebelCaptain, RebelGeneral, RebelWarlord };
