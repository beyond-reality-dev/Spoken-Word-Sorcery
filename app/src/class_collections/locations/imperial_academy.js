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
      "The training room is a large room with a few training dummies and a practice wooden staff on the wall. There is a door to the north, east, and south."
    );
    this.items = {"staff": "WoodenStaff(1)"};
    this.exits = {
      north: "commonRoom",
      east: "practiceYard",
      west: "storageRoom",
    };
  }
}

var trainingRoom = new TrainingRoom();

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

class StorageRoom extends Room {
  constructor() {
    super(
      "storageRoom",
      "The storage room is a small room with a few empty shelves, and seems to have been cleared out recently. There is a door to the east, leading back to the training room."
    );
    this.items = {};
    this.exits = {
      east: "trainingRoom",
    };
  }
}

var storageRoom = new StorageRoom();

class CommonRoom extends Room {
  constructor() {
    super(
      "commonRoom",
      "The common room is a large room with a few tables and chairs. There is a door to the south, leading to the hallway, and a door to the east, leading to the kitchen."
    );
    this.items = {};
    this.exits = {
      north: "grandHall",
      south: "trainingRoom",
      east: "kitchen",
      west: "barracks"
    };
  }
}

var commonRoom = new CommonRoom();

class Kitchen extends Room {
  constructor() {
    super(
      "kitchen",
      "The kitchen is a small room with some half-eaten meals still left on the tables. Chairs are left askew, as though their occupants left in a hurry. There is a door to the west, leading to the common room."
    );
    this.items = {};
    this.exits = {
      west: "commonRoom",
    };
  }
}

var kitchen = new Kitchen();

class Barracks extends Room {
  constructor() {
    super(
      "barracks",
      "The barracks is a large room with a few beds and footlockers. There is a door to the east, leading to the common room."
    );
    this.items = {};
    this.exits = {
      east: "commonRoom",
    };
  }
}

var barracks = new Barracks();

class GrandHall extends Room {
  constructor() {
    super(
      "grandHall",
      "The grand hall is an enormous hall, and normally an impressive sight. Right now, however, it's a mess. Guards line the doorways, and the doors are barricaded. There is a door to the south, leading to the common room."
    );
    this.items = {};
    this.exits = {
      south: "commonRoom",
    };
    this.cutscene = "chapterOne";
  }
}

var grandHall = new GrandHall();

module.exports = { trainingRoom, practiceYard, storageRoom, commonRoom, kitchen, barracks, grandHall };