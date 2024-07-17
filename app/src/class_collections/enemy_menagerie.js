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
  constructor(name) {
    super(name, 100, 10, 10, 10, 1, 5, []);
  }
}