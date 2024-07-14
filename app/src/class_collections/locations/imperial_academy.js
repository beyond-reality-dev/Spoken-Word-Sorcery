class Room {
  constructor(
    name,
    description,
    locked = false,
    lockedDescription = "The door is locked."
  ) {
    this.name = name;
    this.description = description;
    this.locked = locked;
    this.lockedDescription = lockedDescription;
    this.items = {};
    this.exits = {};
  }
}

class TrainingRoom extends Room {
  constructor() {
    super(
      "TrainingRoom",
      "The training room is a large room with a few training dummies and a few wooden staffs on the wall. There is a door to the north, east, and south."
    );
    this.items = {"wooden staff": "WoodenStaff"};
    this.exits = {
      north: "Hallway_01",
      east: "PracticeYard",
      west: "StorageRoom",
    };
  }
}

class Hallway_01 extends Room {
  constructor() {
    super(
      "Hallway_01",
      "A long hallway with a door to the south, leading back to the training room, and a door to the north, leading to the common room."
    );
    this.items = {};
    this.exits = {
      north: "CommonRoom",
      south: "TrainingRoom",
    };
  }
}

class PracticeYard extends Room {
  constructor() {
    super(
      "PracticeYard",
      "The practice yard is a small outdoor yard with a few simple targets, some still pierced with arrows. There is a door to the west, leading back to the training room."
    );
    this.items = {"arrow": "Arrow", "arrow": "Arrow", "arrow": "Arrow"};
    this.exits = {
      west: "TrainingRoom",
    };
  }
}

class CommonRoom extends Room {
  constructor() {
    super(
      "CommonRoom",
      "The common room is a large room with a few tables and chairs. There is a door to the south, leading to the hallway, and a door to the east, leading to the kitchen."
    );
    this.items = {};
    this.exits = {
      south: "Hallway_01",
      east: "Kitchen",
    };
  }
}

module.exports = { TrainingRoom, Hallway_01, PracticeYard, CommonRoom };
