const Room = require("./room.js").Room;

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

module.exports = { imperialTreasury };