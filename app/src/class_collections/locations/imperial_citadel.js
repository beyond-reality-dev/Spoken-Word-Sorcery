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
      "The port is a large, open area, with numerous docks and ships. There is a path to the north leading to the port entrance, and a path to the south leading to the Imperial Dreadnought.",
      "10",
      "10"
    );
    this.exits = {
      north: "portEntrance",
      south: "imperialDreadnought"
    };
  }
}

var port = new Port();

class ImperialDreadnought extends Room {
  constructor() {
    super(
      "Imperial Dreadnought",
      "imperialDreadnought",
      "The Imperial Dreadnought is a massive, ironclad warship. There is a path to the north, leading to the port.",
      "10",
      "10"
    );
    this.exits = {
      north: "port"
    };
  }
}

var imperialDreadnought = new ImperialDreadnought();

class MarketEntrance extends Room {
  constructor() {
    super(
      "Market Entrance",
      "marketEntrance",
      "The entrance to the market is a large, open area. The remains of large, iron gates lie shattered in the burnt grass. There is a path to the east, leading to the nexus of the Imperial Citadel, and a road to the south, leading to the market.",
      "10",
      "10"
    );
    this.exits = {
      east: "nexus",
      south: "market"
    };
  }
}

var marketEntrance = new MarketEntrance();

class Market extends Room {
  constructor() {
    super(
      "Market",
      "market",
      "The market is a large, open area, with numerous stalls and shops. There is a path to the north leading to the market entrance, and a path to the south leading to the market stalls.",
      "10",
      "10"
    );
    this.exits = {
      north: "marketEntrance",
      south: "marketStalls"
    };
  }
}

var market = new Market();

class MarketStalls extends Room {
  constructor() {
    super(
      "Market Stalls",
      "marketStalls",
      "The market stalls have a wide variety of merchants selling various wares. There is a path to the north leading to the market.",
      "10",
      "10"
    );
    this.exits = {
      north: "market",
      south: "imperialTreasury"
    };
  }
}

var marketStalls = new MarketStalls();

class ImperialTreasuryExterior extends Room {
  constructor() {
    super(
      "Imperial Treasury Exterior",
      "imperialTreasuryExterior",
      "The Imperial Treasury is a large, stone building with a massive, iron door. There is a path to the north leading to the market stalls, and a door to the south leading inside.",
      "10",
      "10"
    );
    this.exits = {
      north: "marketStalls",
      south: "imperialTreasury"
    };
  }
}

var imperialTreasuryExterior = new ImperialTreasuryExterior();

class ImperialTreasury extends Room {
  constructor() {
    super(
      "Imperial Treasury",
      "imperialTreasury",
      "The Imperial Treasury is a large, stone building with a massive, iron door. There is a door to the north leading outside.",
      "10",
      "10"
    );
    this.exits = {
      north: "imperialTreasuryExterior"
    };
  }
}

var imperialTreasury = new ImperialTreasury();

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

module.exports = { survivorCamp, academyEntrance, academyBridge, guardTowers, nexus, portEntrance, port, imperialDreadnought, marketEntrance, market, marketStalls, guardTowers2, palaceBridge, palaceEntrance };