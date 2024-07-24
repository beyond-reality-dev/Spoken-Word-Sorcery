const { Room } = require("../locations/room")

class SurvivorCamp extends Room {
  constructor() {
    super(
      "Survivor Camp",
      "survivorCamp",
      "The survivor camp is a small camp with a few tents and a campfire. There is a path to the north, leading back to the Imperial Academy.",
      "10",
      "10"
    );
    this.exits = {
      north: "restOfAcademy",
      south: "academyEntrance",
    };
  }
}

class AcademyEntrance extends Room {
  constructor() {
    super(
      "Academy Entrance",
      "academyEntrance",
      "The entrance to the Imperial Academy is a large, open area. There is a path to the north, leading to the survivor camp.",
      "10",
      "10"
    );
    this.exits = {
      north: "survivorCamp",
    };
  }
}