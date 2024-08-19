const { Room, Shop } = require("../room");
const enemies = require("../../../class_collections");
const items = require("../../../class_collections");
const { generateShop } = require("../../../proc_gen");

class RockyBeach extends Room {
  constructor() {
    super(
      "Rocky Beach",
      "unknownShore.rockyBeach",
      "The rocky beach is a desolate place, with the sound of waves crashing against the shore. The beach stretches to the north and south, and there is a path leading to the west leading into the woods.",
      20.5,
      40.5
    );
    this.items = {};
    this.exits = {
      north: "unknownShore.northBeach",
      south: "unknownShore.southBeach",
      west: "unknownShore.forestPath_01",
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
      10.5,
      20.5
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
      10.5,
      20.5
    );
    this.items = {};
    this.exits = {
      north: "unknownShore.rockyBeach",
    };
  }
}

var southBeach = new SouthBeach();

class ForestPath_01 extends Room {
  constructor() {
    super(
      "Forest Path",
      "unknownShore.forestPath_01",
      "The forest path winds through the trees for a long way, leading to a rocky beach in the east and a clearing in the west.",
      80.5,
      10.5
    );
    this.items = {};
    this.exits = {
      east: "unknownShore.rockyBeach",
      west: "unknownShore.clearing_01",
    };
  }
}

var forestPath_01 = new ForestPath_01();

class Clearing_01 extends Room {
  constructor() {
    super(
      "Clearing",
      "unknownShore.clearing_01",
      "The clearing is a small, open area surrounded by trees. There is a traveling merchant to the north, a forest path to the east and west, and an old tree stump to the south.",
      20.5,
      20.5
    );
    this.items = {};
    this.exits = {
      north: "unknownShore.travelingMerchant",
      east: "unknownShore.forestPath_01",
      south: "unknownShore.oldTreeStump",
      west: "unknownShore.forestPath_02",
    };
  }
}

var clearing_01 = new Clearing_01();

class TravelingMerchant extends Shop {
  constructor() {
    super(
      "Traveling/Merchant",
      "unknownShore.travelingMerchant",
      `The traveling merchant, by the name of ${generatedMerchant[0]} has a small cart pulled by a donkey that contains a variety of wares. To the south is a small clearing.`,
      15.5,
      15.5
    );
    this.items = {};
    this.exits = {
      south: "unknownShore.clearing_01",
    };
    this.vendor = generatedMerchant[0];
    this.shopItems = generatedMerchant[1];
    this.currency = generatedMerchant[2];
    this.markup = generatedMerchant[3];
  }
}

var generatedMerchant = generateShop(1);
var travelingMerchant = new TravelingMerchant();

class OldTreeStump extends Room {
  constructor() {
    super(
      "Old Tree/Stump",
      "unknownShore.oldTreeStump",
      "The old tree stump is a small, moss-covered stump with a hole in the center. There is a clearing to the north.",
      15.5,
      15.5
    );
    this.items = {};
    this.exits = {
      north: "unknownShore.clearing_01",
    };
  }
}

var oldTreeStump = new OldTreeStump();

class ForestPath_02 extends Room {
  constructor() {
    super(
      "Forest Path",
      "unknownShore.forestPath_02",
      "The forest path winds through the trees for a long way, leading to two different clearings in the east and west.",
      80.5,
      10.5
    );
    this.items = {};
    this.exits = {
      east: "unknownShore.clearing_01",
      west: "unknownShore.clearing_02",
    };
    this.encounter = "generateRandomEncounter(1)";
    this.encountered = false;
  }
}

var forestPath_02 = new ForestPath_02();

class Clearing_02 extends Room {
  constructor() {
    super(
      "Clearing",
      "unknownShore.clearing_02",
      "The clearing is a small, open area surrounded by trees. There is a forest path to the east and west.",
      20.5,
      20.5
    );
    this.items = {};
    this.exits = {
      east: "unknownShore.forestPath_02",
      west: "unknownShore.forestPath_03",
    };
  }
}

var clearing_02 = new Clearing_02();

class ForestPath_03 extends Room {
  constructor() {
    super(
      "Forest Path",
      "unknownShore.forestPath_03",
      "The forest path winds through the trees for a long way, leading to two different clearings in the east and west.",
      80.5,
      10.5
    );
    this.items = {};
    this.exits = {
      east: "unknownShore.clearing_02",
      west: "unknownShore.clearing_03",
    };
  }
}

var forestPath_03 = new ForestPath_03();

class Clearing_03 extends Room {
  constructor() {
    super(
      "Clearing",
      "unknownShore.clearing_03",
      "The clearing is a small, open area surrounded by trees. There is a forest path to the east and west.",
      20.5,
      20.5
    );
    this.items = {};
    this.exits = {
      east: "unknownShore.forestPath_03",
      west: "unknownShore.forestPath_04",
    };
  }
}

var clearing_03 = new Clearing_03();

class ForestPath_04 extends Room {
  constructor() {
    super(
      "Forest Path",
      "unknownShore.forestPath_04",
      "The forest path winds through the trees for a long way, leading to two different clearings in the east and west.",
      80.5,
      10.5
    );
    this.items = {};
    this.exits = {
      east: "unknownShore.clearing_03",
      west: "unknownShore.clearing_04",
    };
  }
}

var forestPath_04 = new ForestPath_04();

class Clearing_04 extends Room {
  constructor() {
    super(
      "Clearing",
      "unknownShore.clearing_04",
      "The clearing is a small, open area surrounded by trees. There is a forest path to the east and west.",
      20.5,
      20.5
    );
    this.items = {};
    this.exits = {
      east: "unknownShore.forestPath_04",
      west: "unknownShore.forestPath_05",
    };
  }
}

var clearing_04 = new Clearing_04();

module.exports = {
  rockyBeach,
  northBeach,
  southBeach,
  forestPath_01,
  clearing_01,
  travelingMerchant,
  oldTreeStump,
  forestPath_02,
  clearing_02,
  forestPath_03,
  clearing_03,
  forestPath_04,
  clearing_04,
};
