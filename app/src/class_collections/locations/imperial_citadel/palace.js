const { Room } = require("../room.js");

class GuardTowers extends Room {
  constructor() {
    super(
      "Guard Towers",
      "imperialPalace.guardTowers",
      "The two guard towers are large stone towers that stand in front of the Palace Bridge. There is a path to the north, leading to the nexus of the Imperial Citadel, and a path to the south, leading to the bridge of the Imperial Palace.",
      20.5,
      10.5
    );
    this.items = {};
    this.exits = {
      north: "imperialNexus.nexus",
      south: "imperialPalace.palaceBridge",
    };
    this.cutscene = "guardTowers";
    this.cutscenePlayed = false;
  }
}

var guardTowers = new GuardTowers();

class PalaceBridge extends Room {
  constructor() {
    super(
      "Palace Bridge",
      "imperialPalace.palaceBridge",
      "The Palace Bridge is a long stone bridge that spans a deep moat. There is a path to the north, leading to the guard towers of the Imperial Palace, and a path to the south, leading to the entrance of the Imperial Palace.",
      10.5,
      20.5
    );
    this.items = {};
    this.exits = {
      north: "imperialPalace.guardTowers",
      south: "imperialPalace.palaceEntrance",
    };
    this.isLocked = true;
    this.lockedMessage =
      "Guards rush forward to block your path, and remind you that they will not let you pass until you have the Emperor's belongings.";
  }
}

var palaceBridge = new PalaceBridge();

class PalaceEntrance extends Room {
  constructor() {
    super(
      "Palace Entrance",
      "imperialPalace.palaceEntrance",
      "The entrance to the Imperial Palace is a large open area. The remains of large iron gates lie shattered in the burnt grass. There is a path to the north, leading to the Palace Bridge, and a road to the south, leading to the Imperial Palace.",
      20.5,
      10.5
    );
    this.items = {};
    this.exits = {
      north: "imperialPalace.palaceBridge",
      south: "imperialPalace.imperialPalace",
    };
  }
}

var palaceEntrance = new PalaceEntrance();

module.exports = { guardTowers, palaceBridge, palaceEntrance };
