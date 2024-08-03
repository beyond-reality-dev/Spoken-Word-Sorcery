const Room = require("../room.js").Room;

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
      south: "market",
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
      south: "marketStalls",
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
      south: "imperialTreasury",
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
      south: "imperialTreasury",
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
      north: "imperialTreasuryExterior",
    };
  }
}

var imperialTreasury = new ImperialTreasury();

module.exports = {
  marketEntrance,
  market,
  marketStalls,
  imperialTreasuryExterior,
  imperialTreasury,
};