const { Room, Shop } = require("../room");
const enemies = require("../../../class_collections");
const items = require("../../../class_collections");

class RockyBeach extends Room {
  constructor() {
    super(
      "Rocky Beach",
      "unknownShore.rockyBeach",
      "The rocky beach is a desolate place, with the sound of waves crashing against the shore. The beach stretches to the north and south, and there is a path leading to the west leading into the woods.",
      40.5,
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

class ForestPath extends Room {
  constructor() {
    super(
      "Forest Path",
      "unknownShore.forestPath",
      "The forest path winds through the trees for a long way, leading to a rocky beach in the east and a clearing in the west.",
      80.5,
      20.5
    );
    this.items = {};
    this.exits = {
      east: "unknownShore.rockyBeach",
      west: "unknownShore.clearing",
    };
  }
}

var forestPath = new ForestPath();

class Clearing extends Room {
  constructor() {
    super(
      "Clearing",
      "unknownShore.clearing",
      "The clearing is a small, open area surrounded by trees. The forest path leads back to the east.",
      40.5,
      40.5
    );
    this.items = {};
    this.exits = {
      east: "unknownShore.forestPath",
    };
  }
}

var clearing = new Clearing();

class TravellingMerchant extends Shop {
  constructor() {
    super(
      "Travelling Merchant",
      "unknownShore.travellingMerchant",
      `The travelling merchant, by the name of ${merchantName} has a small cart pulled by a donkey that contains a variety of wares. To the south is a small clearing.`,
      40.5,
      40.5
    );
    this.items = {};
    this.exits = {
      south: "unknownShore.clearing",
    };
    this.vendor = merchantName;
    this.shopItems = {};
    this.currency = 500;
  }
}

var merchantName = generateName("either fullName");

var travellingMerchant = new TravellingMerchant();

module.exports = { rockyBeach, northBeach, southBeach, forestPath, clearing, travellingMerchant };
