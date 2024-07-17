class Enemy {
  constructor(name, health, armor, attack, speed, range, gold, items) {
    this.name = name;
    this.health = health;
    this.armor = armor;
    this.attack = attack;
    this.speed = speed;
    this.range = range;
    this.gold = gold;
    this.items = items;
  }
}

class Rebel extends Enemy {
  constructor(name, items = []) {
    super(name, 100, 10, 10, 10, 1, 5, items);
  }
}

class RebelCaptain extends Enemy {
  constructor(name, items = []) {
    super(name, 150, 15, 15, 15, 1, 10, items);
  }
}

class RebelGeneral extends Enemy {
  constructor(name, items = []) {
    super(name, 200, 20, 20, 20, 1, 15, items);
  }
}

class RebelWarlord extends Enemy {
  constructor(name, items = []) {
    super(name, 250, 25, 25, 25, 1, 20, items);
  }
}

module.exports = { Rebel, RebelCaptain, RebelGeneral, RebelWarlord };
