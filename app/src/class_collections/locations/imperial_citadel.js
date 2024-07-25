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
      "The Academy Bridge is a long, stone bridge that spans a deep moat. There is a path to the north, leading to the Academy Entrance, and a path to the south, leading to two guard towers.",
      "10",
      "10"
    );
    this.exits = {
      north: "academyEntrance",
      south: "guardTowers"
    };
  }
}

var academyBridge = new AcademyBridge();

class GuardTowers1 extends Room {
  constructor() {
    super(
      "Guard Towers",
      "guardTowers",
      "The two guard towers are large, stone towers that overlook the Academy Bridge. There is a path to the north, leading to the Academy Bridge, and a path to the south, leading to the nexus of the Imperial Citadel.",
      "10",
      "10"
    );
    this.exits = {
      north: "academyBridge"
    };
  }
}

var guardTowers1 = new GuardTowers1();

class Nexus extends Room {
  constructor() {
    super(
      "Nexus",
      "nexus",
      "The nexus of the Imperial Citadel is a large, open area, with numerous roads and paths intersecting. There is a path to the north leading to the guard towers of the Imperial Academy and a path to the south leading to the guard towers of the Imperial Palace.",
      "10",
      "10"
    );
    this.exits = {
      north: "guardTowers1",
      south: "guardTowers2"
    };
  }
}

var nexus = new Nexus();

class GuardTowers2 extends Room {
  constructor() {
    super(
      "Guard Towers",
      "guardTowers",
      "The two guard towers are large, stone towers that overlook the Academy Bridge. There is a path to the north, leading to the nexus of the Imperial Citadel, and a path to the south, leading to the bridge of the Imperial Palace.",
      "10",
      "10"
    );
    this.exits = {
      north: "nexus",
      south: "palaceBridge"
    };
  }
}

var guardTowers2 = new GuardTowers2();

class PalaceBridge extends Room {
  constructor() {
    super(
      "Palace Bridge",
      "palaceBridge",
      "The Palace Bridge is a long, stone bridge that spans a deep moat. There is a path to the north, leading to the guard towers of the Imperial Palace, and a path to the south, leading to the Imperial Palace.",
      "10",
      "10"
    );
    this.exits = {
      north: "guardTowers2",
      south: "imperialPalace"
    };
  }
}

var palaceBridge = new PalaceBridge();

module.exports = { survivorCamp, academyEntrance, academyBridge, guardTowers, nexus };