const { Room } = require("../room")

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

module.exports = { nexus };