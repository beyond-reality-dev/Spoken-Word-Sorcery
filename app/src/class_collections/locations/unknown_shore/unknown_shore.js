const { Room } = require("../room");
const enemies = require("../../../class_collections");
const items = require("../../../class_collections");

class RockyBeach extends Room {
  constructor() {
    super(
      "Rocky Beach",
      "unknownShore.rockyBeach",
      "The rocky beach is a desolate place, with the sound of waves crashing against the shore. The beach stretches to the north and south, and there is a path leading to the west leading into the woods.",
      20.5,
      80.5
    );
    this.items = {};
    this.exits = {
      north: "unknownShore.northBeach",
      south: "unknownShore.southBeach",
      east: "unknownShore.forestPath",
    };
    this.cutscenePlayed = false;
    this.cutscene = "rockyBeach";
  }
}

var rockyBeach = new RockyBeach();

class NorthBeach extends Room {
  constructor() {
    super(
      "North Beach",
      "unknownShore.northBeach",
      "The northern beach is a desolate place, with the sound of waves crashing against the shore. The beach stretches to the south.",
      20.5,
      40.5
    );
    this.items = {};
    this.exits = {
      south: "unknownShore.rockyBeach",
    };
  }
}

var northBeach = new NorthBeach();

class SouthBeach extends Room {
  constructor() {
    super(
      "South Beach",
      "unknownShore.southBeach",
      "The southern beach is a desolate place, with the sound of waves crashing against the shore. The beach stretches to the north.",
      20.5,
      40.5
    );
    this.items = {};
    this.exits = {
      north: "unknownShore.rockyBeach",
    };
  }
}

var southBeach = new SouthBeach();

module.exports = { rockyBeach, northBeach, southBeach };
