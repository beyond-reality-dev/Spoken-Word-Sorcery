const { Room } = require("../room.js");

class GuardTowers2 extends Room {
  constructor() {
    super(
      "Guard Towers",
      "guardTowers",
      "The two guard towers are large, stone towers that overlook the Academy Bridge. There is a path to the north, leading to the nexus of the Imperial Citadel, and a path to the south, leading to the bridge of the Imperial Palace.",
      "10",
      "10"
    );
    this.exits = {
      north: "nexus",
      south: "palaceBridge"
    };
  }
}

var guardTowers2 = new GuardTowers2();

class PalaceBridge extends Room {
  constructor() {
    super(
      "Palace Bridge",
      "palaceBridge",
      "The Palace Bridge is a long, stone bridge that spans a deep moat. There is a path to the north, leading to the guard towers of the Imperial Palace, and a path to the south, leading to the entrance of the Imperial Palace.",
      "10",
      "10"
    );
    this.exits = {
      north: "guardTowers2",
      south: "palaceEntrance"
    };
  }
}

var palaceBridge = new PalaceBridge();

class PalaceEntrance extends Room {
  constructor() {
    super(
      "Palace Entrance",
      "palaceEntrance",
      "The entrance to the Imperial Palace is a large, open area. The remains of large, iron gates lie shattered in the burnt grass. There is a path to the north, leading to the Palace Bridge, and a road to the south, leading to the Imperial Palace.",
      "10",
      "10"
    );
    this.exits = {
      north: "palaceBridge",
      south: "imperialPalace"
    };
  }
}

var palaceEntrance = new PalaceEntrance();

module.exports = { guardTowers2, palaceBridge, palaceEntrance };