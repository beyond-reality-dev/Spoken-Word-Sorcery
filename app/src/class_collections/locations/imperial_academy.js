const { Room } = require("../locations/locations");

class TrainingRoom extends Room {
  constructor() {
    super("Imperial Academy", "A prestigious academy for the Empire's finest warriors.");
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
    super("Hallway 1", "A long hallway with a few doors on either side.");
    this.items = [];
    this.exits = {
      north: "CommonRoom",
      south: "TrainingRoom"
    };
  }
}

module.exports = TrainingRoom, Hallway_01;