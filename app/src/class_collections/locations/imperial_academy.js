class Room { 
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.items = [];
    this.exits = {};
  }
}

class TrainingRoom extends Room {
  constructor() {
    super("TrainingRoom", "A prestigious academy for the Empire's finest warriors.");
    this.items = [];
    this.exits = {
      north: "Hallway_01",
      east: "Hallway_02",
      south: "Hallway_03"
    };
  }
}

class Hallway_01 extends Room {
  constructor() {
    super("Hallway_01", "A long hallway with a few doors on either side.");
    this.items = [];
    this.exits = {
      north: "CommonRoom",
      south: "TrainingRoom"
    };
  }
}

module.exports = TrainingRoom, Hallway_01;