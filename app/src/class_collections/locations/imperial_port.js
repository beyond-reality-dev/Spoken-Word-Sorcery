const Room = require("./room.js").Room;

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
      south: "port",
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
      south: "imperialDreadnoughtExterior",
    };
  }
}

var port = new Port();

class ImperialDreadnoughtExterior extends Room {
  constructor() {
    super(
      "Imperial Dreadnought",
      "imperialDreadnought",
      "The Imperial Dreadnought is a massive, armored ship with a large, iron door. There is a door to the north leading to the port, and a ladder to the south leading to the upper deck.",
      "10",
      "10"
    );
    this.exits = {
      north: "port",
      south: "imperialDreadnoughtUpperDeck",
    };
  }
}

var imperialDreadnoughtExterior = new ImperialDreadnoughtExterior();

class ImperialDreadnoughtUpperDeck extends Room {
  constructor() {
    super(
      "Imperial Dreadnought Upper Deck",
      "imperialDreadnoughtUpperDeck",
      "The upper deck of the Imperial Dreadnought is a large, open area with a few crates and barrels scattered about. There is a ladder to the north, leading to the ship's exterior, and a door to the west, leading below deck.",
      "10",
      "10"
    );
    this.exits = {
      north: "imperialDreadnoughtExterior",
      west: "imperialDreadnoughtLowerDeck",
    };
  }
}

var imperialDreadnoughtUpperDeck = new ImperialDreadnoughtUpperDeck();

module.exports = {
  portEntrance,
  port,
  imperialDreadnoughtExterior,
  imperialDreadnoughtUpperDeck,
};
