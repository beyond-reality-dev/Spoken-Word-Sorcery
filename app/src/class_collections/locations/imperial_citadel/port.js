const Room = require("../room.js").Room;
const { enemies } = require("../../../class_collections");

class PortEntrance extends Room {
  constructor() {
    super(
      "Port Entrance",
      "imperialPort.portEntrance",
      "The entrance to the port is a large open area. The remains of large iron gates lie shattered in the burnt grass. There is a path to the west, leading to the nexus of the Imperial Citadel, and a road to the east, leading to the port.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      west: "imperialCitadel.nexus",
      east: "imperialPort.port",
    };
    this.enemies = [
      new enemies.RebelCaptain("Rebel Captain", "south"),
      new enemies.Rebel("Rebel 1", "southwest"),
      new enemies.Rebel("Rebel 2", "southwest"),
    ];
  }
}

var portEntrance = new PortEntrance();

class Port extends Room {
  constructor() {
    super(
      "Port",
      "imperialPort.port",
      "The port is a large open area with numerous docks and ships. There is a path to the west leading to the port entrance, and a path to the east leading to the Imperial Dreadnought.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      west: "imperialPort.portEntrance",
      east: "imperialPort.imperialDreadnoughtExterior",
    };
  }
}

var port = new Port();

class ImperialDreadnoughtExterior extends Room {
  constructor() {
    super(
      "Imperial Dreadnought",
      "imperialPort.imperialDreadnought",
      "The Imperial Dreadnought is a massive armored ship with imposing ballistae, each with a heavy javelin already nocked. There is a door to the west leading to the port, and a ladder to the east leading up to the upper deck.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      west: "imperialPort.port",
      east: "imperialPort.imperialDreadnoughtUpperDeck",
    };
  }
}

var imperialDreadnoughtExterior = new ImperialDreadnoughtExterior();

class ImperialDreadnoughtUpperDeck extends Room {
  constructor() {
    super(
      "Imperial Dreadnought Upper Deck",
      "imperialPort.imperialDreadnoughtUpperDeck",
      "The upper deck of the Imperial Dreadnought is a large open area with a few crates and barrels scattered about. There is a ladder to the west, leading down to the ship's exterior, and a wooden door to the east, leading below deck.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      west: "imperialDreadnoughtExterior",
      east: "imperialDreadnoughtLowerDeck",
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
