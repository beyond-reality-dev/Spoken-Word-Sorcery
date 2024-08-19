const items = require("./item_catalog");
const catalog = items;

class Enemy {
  constructor(
    name,
    baseType,
    position,
    attackDescription,
    health,
    armor,
    attack,
    range,
    speed,
    gold,
    xp,
    items
  ) {
    this.name = name;
    this.baseType = baseType;
    this.position = position;
    this.attackDescription = attackDescription;
    this.health = health;
    this.armor = armor;
    this.attack = attack;
    this.range = range;
    this.speed = speed;
    this.gold = gold;
    this.xp = xp;
    this.items = items;
    this.hitLastTurn = false;
    this.isObstacle = false;
  }
}

class MeleeEnemy extends Enemy {
  constructor(
    name,
    baseType,
    position,
    attackDescription,
    health,
    armor,
    attack,
    speed,
    gold,
    xp,
    items,
    range = 7.5
  ) {
    super(
      name,
      baseType,
      position,
      attackDescription,
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

class RangedEnemy extends Enemy {
  constructor(
    name,
    baseType,
    position,
    attackDescription,
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
      baseType,
      position,
      attackDescription,
      health,
      armor,
      attack,
      range,
      speed,
      gold,
      xp,
      items
    );
    this.icon = "ranged";
  }
}

class RebelGrunt extends MeleeEnemy {
  constructor(name, position, items = [new catalog.ShortSword()]) {
    super(
      name,
      "grunt",
      position,
      "The rebel strikes with his short sword!",
      50,
      0,
      "1d8",
      10,
      5,
      5,
      items
    );
  }
}

class RebelSpearman extends MeleeEnemy {
  constructor(name, position, items = [new catalog.Spear()]) {
    super(
      name,
      "spearman",
      position,
      "The rebel lunges with his spear!",
      50,
      0,
      "1d8",
      10,
      5,
      5,
      items
    );
  }
}

class RebelCaptain extends MeleeEnemy {
  constructor(name, position, items = [new catalog.LongSword()]) {
    super(
      name,
      "captain",
      position,
      "The rebel captain strikes with his long sword!",
      100,
      5,
      "2d8",
      20,
      5,
      10,
      items
    );
    this.icon = "crown";
  }
}

class RebelShortBowman extends RangedEnemy {
  constructor(name, position, items = [new catalog.ShortBow()]) {
    super(
      name,
      "short bowman",
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
      "long bowman",
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
      "light crossbowman",
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
      "heavy crossbowman",
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

class RebelSlinger extends RangedEnemy {
  constructor(name, position, items = [new catalog.Sling()]) {
    super(
      name,
      "slinger",
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

class RebelMage extends RangedEnemy {
  constructor(name, position, items = [new catalog.Staff()], spells) {
    super(
      name,
      "mage",
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

class BanditGrunt extends MeleeEnemy {
  constructor(name, position, items = [new catalog.ShortSword()]) {
    super(
      name,
      "grunt",
      position,
      "The bandit strikes with his short sword!",
      50,
      0,
      "1d8",
      10,
      5,
      5,
      items
    );
  }
}

class BanditCaptain extends Enemy {
  constructor(name, position, items = [new catalog.LongSword()]) {
    super(
      name,
      "captain",
      position,
      "The bandit captain strikes with his long sword!",
      100,
      5,
      "2d8",
      20,
      5,
      10,
      items
    );
    this.icon = "crown";
  }
}

class BanditShortBowman extends RangedEnemy {
  constructor(name, position, items = [new catalog.ShortBow()]) {
    super(
      name,
      "short bowman",
      position,
      "The bandit archer fires his short bow!",
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

class BanditLightCrossbowman extends RangedEnemy {
  constructor(name, position, items = [new catalog.LightCrossbow()]) {
    super(
      name,
      "light crossbowman",
      position,
      "The bandit fires his light crossbow!",
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

class BanditSlinger extends RangedEnemy {
  constructor(name, position, items = [new catalog.Sling()]) {
    super(
      name,
      "slinger",
      position,
      "The bandit fires his sling!",
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

class Obstacle {
  constructor(name, position, health, shape, color) {
    this.name = name;
    this.position = position;
    this.health = health;
    this.shape = shape;
    this.color = color;
    this.armor = 0;
    this.isObstacle = true;
  }
}

class Wall extends Obstacle {
  constructor(position) {
    super("Wall", position, 100, "square", "grey");
  }
}

class Crate extends Obstacle {
  constructor(position) {
    super("Crate", position, 50, "square", "brown");
  }
}

class Barrel extends Obstacle {
  constructor(position) {
    super("Barrel", position, 50, "circle", "brown");
  }
}

const factions = [
  "Rebel",
  "Bandit",
];

const tier1RebelEnemies = [
  "RebelGrunt",
  "RebelSpearman",
  "RebelSlinger",
  "RebelShortBowman",
];

const tier2RebelEnemies = [
  "RebelGrunt",
  "RebelSpearman",
  "RebelSlinger",
  "RebelShortBowman",
  "RebelCaptain",
  "RebelLongBowman",
  "RebelLightCrossbowman",
];

const tier3RebelEnemies = [
  "RebelGrunt",
  "RebelSpearman",
  "RebelSlinger",
  "RebelShortBowman",
  "RebelCaptain",
  "RebelLongBowman",
  "RebelLightCrossbowman",
  "RebelMage",
  "RebelHeavyCrossbowman",
];

const tier1BanditEnemies = [
  "BanditGrunt",
  "BanditSlinger",
];

const tier2BanditEnemies = [
  "BanditGrunt",
  "BanditSlinger",
  "BanditCaptain",
  "BanditShortBowman",
];

const tier3BanditEnemies = [
  "BanditGrunt",
  "BanditSlinger",
  "BanditCaptain",
  "BanditShortBowman",
  "BanditLightCrossbowman",
];

module.exports = {
  Enemy,
  MeleeEnemy,
  RangedEnemy,
  RebelGrunt,
  RebelCaptain,
  RebelShortBowman,
  RebelLongBowman,
  RebelLightCrossbowman,
  RebelHeavyCrossbowman,
  RebelSlinger,
  RebelSpearman,
  RebelMage,
  BanditGrunt,
  BanditCaptain,
  BanditShortBowman,
  BanditLightCrossbowman,
  BanditSlinger,
  Obstacle,
  Wall,
  Crate,
  Barrel,
  factions,
  tier1RebelEnemies,
  tier2RebelEnemies,
  tier3RebelEnemies,
  tier1BanditEnemies,
  tier2BanditEnemies,
  tier3BanditEnemies,
};
