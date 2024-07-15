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
      "trainingRoom",
      "The training room is a large room with a few training dummies and a few wooden staffs on the wall. There is a door to the north, east, and south."
    );
    this.items = {"staff": "WoodenStaff(3)"};
    this.exits = {
      north: "hallway_01",
      east: "practiceYard",
      west: "storageRoom",
    };
  }
}

var trainingRoom = new TrainingRoom();

class Hallway_01 extends Room {
  constructor() {
    super(
      "hallway_01",
      "A long hallway with a door to the south, leading back to the training room, and a door to the north, leading to the common room."
    );
    this.items = {};
    this.exits = {
      north: "commonRoom",
      south: "trainingRoom",
    };
  }
}

var hallway_01 = new Hallway_01();

class PracticeYard extends Room {
  constructor() {
    super(
      "practiceYard",
      "The practice yard is a small outdoor yard with a few simple targets, some still pierced with arrows. There is a door to the west, leading back to the training room."
    );
    this.items = {"arrow": "Arrow(3)"};
    this.exits = {
      west: "trainingRoom",
    };
  }
}

var practiceYard = new PracticeYard();

class CommonRoom extends Room {
  constructor() {
    super(
      "commonRoom",
      "The common room is a large room with a few tables and chairs. There is a door to the south, leading to the hallway, and a door to the east, leading to the kitchen."
    );
    this.items = {};
    this.exits = {
      south: "hallway_01",
      east: "kitchen",
    };
  }
}

var commonRoom = new CommonRoom();

module.exports = { trainingRoom, hallway_01, practiceYard, commonRoom };
