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

module.exports = { rockyBeach };
