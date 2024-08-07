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
      "The upper deck of the Imperial Dreadnought is a large open area with a few crates and barrels scattered about. There is a ladder to the west, leading down to the ship's exterior, and a wooden door to the south, leading below deck.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      west: "imperialDreadnoughtExterior",
      south: "imperialDreadnoughtLowerDeck",
    };
  }
}

var imperialDreadnoughtUpperDeck = new ImperialDreadnoughtUpperDeck();

class ImperialDreadnoughtLowerDeck extends Room {
  constructor() {
    super(
      "Imperial Dreadnought Lower Deck",
      "imperialPort.imperialDreadnoughtLowerDeck",
      "The lower deck of the Imperial Dreadnought is a dimly lit area with a few crates and barrels scattered about. There is a wooden ladder to the north, leading up to the upper deck, a door to the crew quarters to the west, a door to the captain's quarters to the east, and a ladder to the south, leading further below deck into the ship's hold.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      north: "imperialDreadnoughtUpperDeck",
      east: "imperialDreadnoughtCaptainQuarters",
      south: "imperialDreadnoughtHold",
      west: "imperialDreadnoughtCrewQuarters",
    };
  }
}

var imperialDreadnoughtLowerDeck = new ImperialDreadnoughtLowerDeck();

class ImperialDreadnoughtCrewQuarters extends Room {
  constructor() {
    super(
      "Imperial Dreadnought Crew Quarters",
      "imperialPort.imperialDreadnoughtCrewQuarters",
      "The crew quarters of the Imperial Dreadnought is a cramped area with rows of hammocks and personal belongings. There is a door to the east, leading back to the lower deck.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      east: "imperialDreadnoughtLowerDeck",
    };
  }
}

var imperialDreadnoughtCrewQuarters = new ImperialDreadnoughtCrewQuarters();

class ImperialDreadnoughtCaptainQuarters extends Room {
  constructor() {
    super(
      "Imperial Dreadnought Captain Quarters",
      "imperialPort.imperialDreadnoughtCaptainQuarters",
      "The captain's quarters of the Imperial Dreadnought is a spacious area with a large bed, a desk, and a few personal belongings. There is a door to the west, leading back to the lower deck.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      west: "imperialDreadnoughtLowerDeck",
    };
  }
}

var imperialDreadnoughtCaptainQuarters = new ImperialDreadnoughtCaptainQuarters();

class ImperialDreadnoughtHold extends Room {
  constructor() {
    super(
      "Imperial Dreadnought Hold",
      "imperialPort.imperialDreadnoughtHold",
      "The hold of the Imperial Dreadnought is a dark, cramped area with rows of crates and barrels stacked to the ceiling. There is a ladder to the north, leading back up to the lower deck.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      north: "imperialDreadnoughtLowerDeck",
    };
  }
}

var imperialDreadnoughtHold = new ImperialDreadnoughtHold();

module.exports = {
  portEntrance,
  port,
  imperialDreadnoughtExterior,
  imperialDreadnoughtUpperDeck,
  imperialDreadnoughtLowerDeck,
  imperialDreadnoughtCrewQuarters,
  imperialDreadnoughtCaptainQuarters,
  imperialDreadnoughtHold,
};
