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
      north: "academyBridge",
      south: "nexus"
    };
  }
}

var guardTowers1 = new GuardTowers1();

class Nexus extends Room {
  constructor() {
    super(
      "Nexus",
      "nexus",
      "The nexus of the Imperial Citadel is a large, open area, with numerous roads and paths intersecting. There is a path to the north leading to the guard towers of the Imperial Academy, a path to the east leading to the port, a path to the south leading to the guard towers of the Imperial Palace, and a path to the west leading to the market.",
      "10",
      "10"
    );
    this.exits = {
      north: "guardTowers1",
      east: "port",
      south: "guardTowers2",
      west: "market",
    };
  }
}

var nexus = new Nexus();

class PortEntrance extends Room {
  constructor() {
    super(
      "Port Entrance",
      "portEntrance",
      "The entrance to the port is a large, open area. The remains of large, iron gates lie shattered in the burnt grass. There is a path to the west, leading to the nexus of the Imperial Citadel, and a road to the south, leading to the port.",
      "10",
      "10"
    );
    this.exits = {
      west: "nexus",
      south: "port"
    };
  }
}

var portEntrance = new PortEntrance();

class Port extends Room {
  constructor() {
    super(
      "Port",
      "port",
      "The port is a large, open area, with numerous docks and ships. There is a path to the north leading to the port entrance.",
      "10",
      "10"
    );
    this.exits = {
      north: "portEntrance"
    };
  }
}

var port = new Port();

class Market extends Room {
  constructor() {
    super(
      "Market",
      "market",
      "The market is a large, open area, with numerous stalls and shops. There is a path to the west leading to the nexus of the Imperial Citadel.",
      "10",
      "10"
    );
    this.exits = {
      east: "nexus"
    };
  }
}

var market = new Market();

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
      "The Palace Bridge is a long, stone bridge that spans a deep moat. There is a path to the north, leading to the guard towers of the Imperial Palace, and a path to the south, leading to the entrance of the Imperial Palace.",
      "10",
      "10"
    );
    this.exits = {
      north: "guardTowers2",
      south: "palaceEntrance"
    };
  }
}

var palaceBridge = new PalaceBridge();

class PalaceEntrance extends Room {
  constructor() {
    super(
      "Palace Entrance",
      "palaceEntrance",
      "The entrance to the Imperial Palace is a large, open area. The remains of large, iron gates lie shattered in the burnt grass. There is a path to the north, leading to the Palace Bridge, and a road to the south, leading to the Imperial Palace.",
      "10",
      "10"
    );
    this.exits = {
      north: "palaceBridge",
      south: "imperialPalace"
    };
  }
}

var palaceEntrance = new PalaceEntrance();

module.exports = { survivorCamp, academyEntrance, academyBridge, guardTowers, nexus, port, market, guardTowers2, palaceBridge, palaceEntrance };