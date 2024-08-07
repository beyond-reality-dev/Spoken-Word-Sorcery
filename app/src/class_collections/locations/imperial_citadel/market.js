const Room = require("../room.js").Room;
const { enemies } = require("../../../class_collections");
const { items } = require("../../../class_collections");

class MarketEntrance extends Room {
  constructor() {
    super(
      "Market Entrance",
      "imperialMarket.marketEntrance",
      "The entrance to the market is a large open area. The remains of large iron gates lie shattered in the burnt grass. There is a path to the east, leading to the nexus of the Imperial Citadel, and a road to the west, leading to the market.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      east: "imperialCitadel.nexus",
      west: "imperialMarket.market",
    };
  }
}

var marketEntrance = new MarketEntrance();

class Market extends Room {
  constructor() {
    super(
      "Market",
      "imperialMarket.market",
      "The market is a large open area with numerous stalls and shops. There is a path to the east leading to the market entrance, and a path to the west leading to the market stalls.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      east: "imperialMarket.marketEntrance",
      west: "imperialMarket.marketStalls",
    };
  }
}

var market = new Market();

class MarketStalls extends Room {
  constructor() {
    super(
      "Market Stalls",
      "imperialMarket.marketStalls",
      "The market stalls have a wide variety of merchants selling various wares. There is a path to the east leading to the market, and a path to the west leading to the Imperial Treasury.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      east: "imperialMarket.market",
      west: "imperialMarket.imperialTreasury",
    };
    this.enemies = [
      new enemies.Rebel("Rebel 1", "southwest"),
      new enemies.Rebel("Rebel 2", "west"),
      new enemies.Rebel("Rebel 3", "northwest"),
    ];
    this.cutsene = "marketStalls";
    this.cutscenePlayed = false;
  }
}

var marketStalls = new MarketStalls();

class ImperialTreasuryExterior extends Room {
  constructor() {
    super(
      "Imperial Treasury Exterior",
      "imperialMarket.imperialTreasuryExterior",
      "The Imperial Treasury is a large stone building with a massive iron door. There is a path to the east leading to the market stalls, a door to the north leading inside, and a road to the south leading to the Imperial Citadel's walls.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      north: "imperialMarket.imperialTreasury",
      east: "imperialMarket.marketStalls",
      south: "imperialMarket.citadelRoad",
    };
    this.enemies = [
      new enemies.Rebel("Rebel 1", "northwest"),
      new enemies.RebelCaptain("Rebel 2", "north"),
      new enemies.Rebel("Rebel 3", "northeast"),
    ];
    this.cutsene = "imperialTreasuryExterior";
    this.cutscenePlayed = false;
  }
}

var imperialTreasuryExterior = new ImperialTreasuryExterior();

class CitadelRoad extends Room {
  constructor() {
    super(
      "Citadel Road",
      "imperialMarket.citadelRoad",
      "The Citadel Road is a wide stone road that leads to the Imperial Citadel's walls. There is a path to the north leading to the Imperial Treasury, and a path to the south leading to the Imperial Citadel's walls.",
      "10",
      "20"
    );
    this.items = {};
    this.exits = {
      north: "imperialMarket.imperialTreasuryExterior",
      south: "imperialCitadel.citadelWalls",
    };
  }
}

var citadelRoad = new CitadelRoad();

class CitadelWalls extends Room {
  constructor() {
    super(
      "Citadel Walls",
      "imperialMarket.citadelWalls",
      "The Citadel Walls are tall stone walls that surround the Imperial Citadel. There is a path to the north leading to the Citadel Road, and a path to the south leading to the main gates of the Imperial Citadel.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      north: "imperialMarket.citadelRoad",
      south: "imperialCitadel.mainGate",
    };
  }
}

var citadelWalls = new CitadelWalls();

class MainGate extends Room {
  constructor() {
    super(
      "Main Gate",
      "imperialCitadel.mainGate",
      "The main gates of the Imperial Citadel are large iron gates that are currently closed. There is a path to the north leading to the Citadel Walls, and a path to the south leading outside of the Imperial Citadel.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      north: "imperialMarket.citadelWalls",
      south: "placeholder",
    };
    this.enemies = [
      new enemies.RebelCaptain("Rebel Captain", "south"),
      new enemies.Rebel("Rebel 1", "northeast"),
      new enemies.Rebel("Rebel 2", "east"),
      new enemies.Rebel("Rebel 3", "southeast"),
      new enemies.Rebel("Rebel 4", "southwest"),
      new enemies.Rebel("Rebel 5", "west"),
      new enemies.Rebel("Rebel 6", "northwest"),
    ];
    this.cutscene = "mainGate";
    this.cutscenePlayed = false;
  }
}

var mainGate = new MainGate();

class ImperialTreasuryLounge extends Room {
  constructor() {
    super(
      "Imperial Treasury Lounge",
      "imperialMarket.imperialTreasuryLoounge",
      "The Imperial Treasury Lounge is a crowded room with several guards and officials rushing about. There is a door to the north leading deeper inside, and a door to the south leading outside.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      north: "imperialMarket.shortHallway",
      south: "imperialMarket.imperialTreasuryExterior",
    };
    this.isLocked = true;
    this.lockedDescription =
      "The doors to the inside of the Imperial Treasury are locked. The guards inform you that it will not open except for express, written permission from the Emperor himself.";
    this.key = "Imperial Writ of Entry";
    this.unlockMessage =
      "The guards nod and step aside as you present the Imperial Writ of Entry. The doors to the Imperial Treasury swing open.";
  }
}

var imperialTreasuryLounge = new ImperialTreasuryLounge();

class ShortHallway_01 extends Room {
  constructor() {
    super(
      "Short Hallway",
      "imperialMarket.shortHallway_01",
      "The short hallway is a narrow stone hallway with a door to the north leading to the Imperial Treasury's main hall, and a door to the south leading back to the Imperial Treasury's lounge.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      north: "imperialMarket.mainHall",
      south: "imperialMarket.imperialTreasuryLounge",
    };
  }
}

var shortHallway_01 = new ShortHallway_01();

class MainHall extends Room {
  constructor() {
    super(
      "Main Hall",
      "imperialMarket.mainHall",
      "The main hall of the Imperial Treasury is a large open area with numerous guards and officials moving about. It appears to be being used as a staging area for the defense and management of the treasury. There is a door to the north leading to a short hallway, and a door to the south leading to a different short hallway.",
      "20",
      "20"
    );
    this.items = {};
    this.exits = {
      north: "imperialMarket.shortHallway_02",
      south: "imperialMarket.shortHallway_01",
    };
  }
}

var mainHall = new MainHall();

class ShortHallway_02 extends Room {
  constructor() {
    super(
      "Short Hallway",
      "imperialMarket.shortHallway_02",
      "The short hallway is a narrow stone hallway with a door to the north leading to the Imperial Treasury's vaults, and a door to the south leading to the Imperial Treasury's main hall.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      north: "imperialMarket.vaults",
      south: "imperialMarket.mainHall",
    };
  }
}

var shortHallway_02 = new ShortHallway_02();

class VaultEntrance extends Room {
  constructor() {
    super(
      "Vault Entrance",
      "imperialMarket.vaultEntrance",
      "The vault entrance is a large stone door with a heavy iron lock. The vaults of the treasury are to the north, and a short hallway is to the south.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      north: "imperialMarket.longHallway_01",
      south: "imperialMarket.shortHallway_02",
    };
    this.cutscene = "vaultEntrance";
    this.cutscenePlayed = false;
  }
}

var vaultEntrance = new VaultEntrance();

class LongHallway_01 extends Room {
  constructor() {
    super(
      "Long Hallway",
      "imperialMarket.longHallway_01",
      "The long hallway is a narrow stone hallway with a door to the north leading to a small room, and a door to the south leading to the vault's entrance.",
      "10",
      "30"
    );
    this.items = {};
    this.exits = {
      north: "imperialMarket.smallRoom_01",
      south: "imperialMarket.vaultEntrance",
    };
  }
}

var longHallway_01 = new LongHallway_01();

class SmallRoom_01 extends Room {
  constructor() {
    super(
      "Small Room",
      "imperialMarket.smallRoom_01",
      "The small room is a cramped stone room with a single table and chair, the purpose of which is unclear. There is a door to the north leading to a long hallway, a door to the east leading to a short hallway, a door to the south leading to a different long hallway, and a door to the west leading to a different short hallway.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      north: "imperialMarket.longHallway_02",
      east: "imperialMarket.shortHallway_03",
      south: "imperialMarket.longHallway_01",
      west: "imperialMarket.shortHallway_04",
    };
  }
}

var smallRoom_01 = new SmallRoom_01();

class LongHallway_02 extends Room {
  constructor() {
    super(
      "Long Hallway",
      "imperialMarket.longHallway_02",
      "The long hallway is a narrow stone hallway with a door to the north leading to a small room, and a door to the south leading to a different small room.",
      "10",
      "30"
    );
    this.items = {};
    this.exits = {
      north: "imperialMarket.smallRoom_02",
      south: "imperialMarket.smallRoom_01",
    };
  }
}

var longHallway_02 = new LongHallway_02();

class SmallRoom_02 extends Room {
  constructor() {
    super(
      "Small Room",
      "imperialMarket.smallRoom_02",
      "The small room appears to contain nothing and is a dead end, with a door to the south leading to a long hallway.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      south: "imperialMarket.longHallway_02",
    };
  }
}

var smallRoom_02 = new SmallRoom_02();

class ShortHallway_03 extends Room {
  constructor() {
    super(
      "Short Hallway",
      "imperialMarket.shortHallway_03",
      "The short hallway is a narrow stone hallway with a door to the west leading to a small room, and a door to the east leading to a large chamber.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      west: "imperialMarket.smallRoom_01",
      east: "imperialMarket.largeChamber_01",
    };
  }
}

var shortHallway_03 = new ShortHallway_03();

class LargeChamber_01 extends Room {
  constructor() {
    super(
      "Large Chamber",
      "imperialMarket.largeChamber_01",
      "The large chamber is a massive stone room with a high ceiling and numerous pillars. There is a door to the west leading to a short hallway, and a door to the east leading to a long hallway.",
      "30",
      "30"
    );
    this.items = {};
    this.exits = {
      west: "imperialMarket.shortHallway_03",
      east: "longHallway_03",
    };
    this.enemies = [
      new enemies.RebelCaptain("Rebel 1", "southeast"),
      new enemies.Rebel("Rebel 2", "east"),
      new enemies.Rebel("Rebel 3", "northeast"),
    ];
  }
}

var largeChamber_01 = new LargeChamber_01();

class LongHallway_03 extends Room {
  constructor() {
    super(
      "Long Hallway",
      "imperialMarket.longHallway_03",
      "The long hallway is a narrow stone hallway with a door to the west leading to a large chamber, and a door to the east leading to a small room.",
      "30",
      "10",
    );
    this.items = {};
    this.exits = {
      west: "imperialMarket.largeChamber_01",
      east: "imperialMarket.smallRoom_03",
    };
  }
}

var longHallway_03 = new LongHallway_03();

class SmallRoom_03 extends Room {
  constructor() {
    super(
      "Small Room",
      "imperialMarket.smallRoom_03",
      "The small room contains a bloody cot, with a dead rebel soldier lying on top of it clutching his sword. There is a door to the west leading to a short hallway.",
      "10",
      "10"
    );
    this.items = {
      sword: new items.ShortSword(),
    };
    this.exits = {
      west: "imperialMarket.longHallway_03",
    };
  }
}

var smallRoom_03 = new SmallRoom_03();

class ShortHallway_04 extends Room {
  constructor() {
    super(
      "Short Hallway",
      "imperialMarket.shortHallway_04",
      "The short hallway is a narrow stone hallway with a door to the east leading to a small room, and a door to the west leading to a different small room.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      east: "imperialMarket.smallRoom_04",
      west: "imperialMarket.smallRoom_03",
    };
  }
}

var shortHallway_04 = new ShortHallway_04();

class SmallRoom_04 extends Room {
  constructor() {
    super(
      "Small Room",
      "imperialMarket.smallRoom_04",
      "The small room contains a small chest, with the lock broken and the contents long gone. There is a door to the east leading to a short hallway, and a door to the west leading to a different short hallway.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      east: "imperialMarket.shortHallway_04",
      west: "imperialMarket.longHallway_04",
    };
  }
}

var smallRoom_04 = new SmallRoom_04();

class LongHallway_04 extends Room {
  constructor() {
    super(
      "Long Hallway",
      "imperialMarket.longHallway_04",
      "The long hallway is a narrow stone hallway with a door to the east leading to a small room, and a door to the west leading to a different small room.",
      "10",
      "30"
    );
    this.items = {};
    this.exits = {
      east: "imperialMarket.smallRoom_04",
      west: "imperialMarket.smallRoom_05",
    };
  }
}

var longHallway_04 = new LongHallway_04();

class SmallRoom_05 extends Room {
  constructor() {
    super(
      "Small Room",
      "imperialMarket.smallRoom_05",
      "This small room is mostly empty, with a door to the north leading to a short hallway and a door to the east leading to a long hallway.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      north: "imperialMarket.shortHallway_05",
      east: "imperialMarket.longHallway_04",
    };
  }
}

var smallRoom_05 = new SmallRoom_05();

class ShortHallway_05 extends Room {
  constructor() {
    super(
      "Short Hallway",
      "imperialMarket.shortHallway_05",
      "The short hallway is a narrow stone hallway with a door to the north leading to a small room, and a door to the south leading to a different small room.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      north: "imperialMarket.smallRoom_06",
      south: "imperialMarket.smallRoom_05",
    };
  }
}

var shortHallway_05 = new ShortHallway_05();

class SmallRoom_06 extends Room {
  constructor() {
    super(
      "Small Room",
      "imperialMarket.smallRoom_06",
      "The small room is a dead end, with a door to the south leading to a short hallway.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      south: "imperialMarket.shortHallway_05",
    };
    this.enemies = [
      new enemies.RebelCaptain("Rebel", "north"),
    ];
  }
}

var smallRoom_06 = new SmallRoom_06();

module.exports = {
  marketEntrance,
  market,
  marketStalls,
  imperialTreasuryExterior,
  citadelRoad,
  citadelWalls,
  mainGate,
  imperialTreasuryLounge,
  shortHallway_01,
  mainHall,
  shortHallway_02,
  vaultEntrance,
  longHallway_01,
  smallRoom_01,
  longHallway_02,
  smallRoom_02,
  shortHallway_03,
  largeChamber_01,
  longHallway_03,
  smallRoom_03,
  shortHallway_04,
  smallRoom_04,
  longHallway_04,
  smallRoom_05,
  shortHallway_05,
  smallRoom_06,
};
