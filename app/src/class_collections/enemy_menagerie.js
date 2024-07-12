class Enemy {
    constructor(name, health, armor, attack, speed, range, gold, items) {
    this.name = name;
    this.health = health;
    this.armour = armor;
    this.attack = attack;
    this.speed = speed;
    this.range = range;
    this.gold = gold;
    this.items = items;
  }
}

class Bandit extends Enemy {
  constructor() {
    super("Bandit", 100, 10, 10, 10, 1, 5, []);
  }
}