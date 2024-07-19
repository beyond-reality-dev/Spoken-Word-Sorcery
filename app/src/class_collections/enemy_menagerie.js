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
  constructor(name, position, items = []) {
    super(name, position, 100, 10, 10, 10, 1, 5, 10, items);
  }
}

class RebelCaptain extends Enemy {
  constructor(name, position, items = []) {
    super(name, position, 150, 15, 15, 15, 1, 10, 20, items);
  }
}

class RebelGeneral extends Enemy {
  constructor(name, position, items = []) {
    super(name, position, 200, 20, 20, 20, 1, 15, 30, items);
  }
}

class RebelWarlord extends Enemy {
  constructor(name, position, items = []) {
    super(name, position, 250, 25, 25, 25, 1, 20, 40, items);
  }
}

class ImperialGuard extends Enemy {
  constructor(name, position, items = []) {
    super(name, position, 100, 10, 10, 10, 1, 5, 10, items);
  }
}

class ImperialCaptain extends Enemy {
  constructor(name, position, items = []) {
    super(name, position, 150, 15, 15, 15, 1, 10, 20, items);
  }
}

class ImperialGeneral extends Enemy {
  constructor(name, position, items = []) {
    super(name, position, 200, 20, 20, 20, 1, 15, 30, items);
  }
}

module.exports = { Rebel, RebelCaptain, RebelGeneral, RebelWarlord, ImperialGuard, ImperialCaptain, ImperialGeneral };
