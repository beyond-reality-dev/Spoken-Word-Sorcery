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

var survivorCamp = new SurvivorCamp();

class AcademyEntrance extends Room {
  constructor() {
    super(
      "Academy Entrance",
      "academyEntrance",
      "The entrance to the Imperial Academy is a large, open area. The remains of large, iron gates lie shattered in the burnt grass. There is a path to the north, leading to the survivor camp, and a road to the south, leading to the Academy's bridge.",
      "10",
      "10"
    );
    this.exits = {
      north: "survivorCamp",
      south: "academyBridge"
    };
  }
}

var academyEntrance = new AcademyEntrance();

class AcademyBridge extends Room {
  constructor() {
    super(
      "Academy Bridge",
      "academyBridge",
      "The Academy Bridge is a long, stone bridge that spans a deep moat. There is a path to the north, leading back to the Academy Entrance, and a path to the south, leading to the Imperial Citadel.",
      "10",
      "10"
    );
    this.exits = {
      north: "academyEntrance",
      south: "imperialCitadel"
    };
  }
}

var academyBridge = new AcademyBridge();

module.exports = { survivorCamp, academyEntrance, academyBridge };