const Room = require("../room.js").Room;
const { enemies } = require("../../../class_collections");

class MarketEntrance extends Room {
  constructor() {
    super(
      "Market Entrance",
      "imperialMarket.marketEntrance",
      "The entrance to the market is a large open area. The remains of large iron gates lie shattered in the burnt grass. There is a path to the east, leading to the nexus of the Imperial Citadel, and a road to the west, leading to the market.",
      "10",
      "10"
    );
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

class ImperialTreasuryLounge extends Room {
  constructor() {
    super(
      "Imperial Treasury Lounge",
      "imperialMarket.imperialTreasuryLoounge",
      "The Imperial Treasury Lounge is a large open area with numerous guards and officials moving about. There is a door to the north leading deeper inside, and a door to the south leading outside.",
      "10",
      "10"
    );
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

class ShortHallway extends Room {
  constructor() {
    super(
      "Short Hallway",
      "imperialMarket.shortHallway",
      "The short hallway is a narrow stone hallway with a door to the north leading to the Imperial Treasury's main hall, and a door to the south leading back to the Imperial Treasury's lounge.",
      "10",
      "10"
    );
    this.exits = {
      north: "imperialMarket.mainHall",
      south: "imperialMarket.imperialTreasuryLounge",
    };
  }
}

var shortHallway = new ShortHallway();

class CitadelRoad extends Room {
  constructor() {
    super(
      "Citadel Road",
      "imperialMarket.citadelRoad",
      "The Citadel Road is a wide stone road that leads to the Imperial Citadel's walls. There is a path to the north leading to the Imperial Treasury, and a path to the south leading to the Imperial Citadel's walls.",
      "10",
      "20"
    );
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

module.exports = {
  marketEntrance,
  market,
  marketStalls,
  imperialTreasuryExterior,
  imperialTreasuryLounge,
  shortHallway,
  citadelRoad,
  citadelWalls,
  mainGate,
};
