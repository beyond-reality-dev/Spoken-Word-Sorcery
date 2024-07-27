const Room = require("./room.js").Room;

class ImperialDreadnought extends Room {
  constructor() {
    super(
      "Imperial Dreadnought",
      "imperialDreadnought",
      "The Imperial Dreadnought is a massive, armored ship with a large, iron door. There is a door to the north leading outside.",
      "10",
      "10"
    );
    this.exits = {
      north: "imperialDreadnoughtExterior"
    };
  }
}

var imperialDreadnought = new ImperialDreadnought();

module.exports = { imperialDreadnought };