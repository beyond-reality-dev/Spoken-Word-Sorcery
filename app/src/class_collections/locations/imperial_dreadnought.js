const Room = require("./room.js").Room;

class imperialDreadnoughtUpperDeck extends Room {
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
      west: "imperialDreadnoughtLowerDeck"
    };
  }
}

var imperialDreadnoughtUpperDeck = new ImperialDreadnoughtUpperDeck();

module.exports = { imperialDreadnoughtUpperDeck };