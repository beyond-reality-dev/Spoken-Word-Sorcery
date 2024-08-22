const { Room } = require("../room");
const enemies = require("../../../class_collections/enemy_menagerie");
const { generateShop } = require("../../../proc_gen");

class NorthernCityEntrance extends Room {
  constructor(id) {
    super(
      "City Entrance",
      id,
      "The city entrance is a bustling place, with people coming and going in all directions. The path leads to the north and south.",
      40.5,
      20.5
    );
    this.items = {};
    this.exits = {};
    this.enemies = [
      new enemies.ImperialGuard("Imperial Guard 1", [3, 4]),
      new enemies.ImperialGuard("Imperial Guard 2", [4, 4]),
      new enemies.ImperialGuard("Imperial Guard 3", [5, 4]),
      new enemies.ImperialGuard("Imperial Guard 4", [6, 4]),
    ];
    this.cutscene = "paragonCityTile.cityEntrance";
    this.cutscenePlayed = false;
  }
}

class SouthernCityEntrance extends Room {
  constructor(id) {
    super(
      "City Entrance",
      id,
      "The city entrance is a bustling place, with people coming and going in all directions. The path leads to the south and north.",
      20.5,
      40.5
    );
    this.items = {};
    this.exits = {};
    this.enemies = [
      new enemies.ImperialGuard("Imperial Guard 1", [3, 1]),
      new enemies.ImperialGuard("Imperial Guard 2", [4, 1]),
      new enemies.ImperialGuard("Imperial Guard 3", [5, 1]),
      new enemies.ImperialGuard("Imperial Guard 4", [6, 1]),
    ];
    this.cutscene = "paragonCityTile.cityEntrance";
    this.cutscenePlayed = false;
  }
}

class WesternCityEntrance extends Room {
  constructor(id) {
    super(
      "City Entrance",
      id,
      "The city entrance is a bustling place, with people coming and going in all directions. The path leads to the west and east.",
      40.5,
      20.5
    );
    this.items = {};
    this.exits = {};
    this.enemies = [
      new enemies.ImperialGuard("Imperial Guard 1", [1, 3]),
      new enemies.ImperialGuard("Imperial Guard 2", [1, 4]),
      new enemies.ImperialGuard("Imperial Guard 3", [1, 5]),
      new enemies.ImperialGuard("Imperial Guard 4", [1, 6]),
    ];
    this.cutscene = "paragonCityTile.cityEntrance";
    this.cutscenePlayed = false;
  }
}

class EasternCityEntrance extends Room {
  constructor(id) {
    super(
      "City Entrance",
      id,
      "The city entrance is a bustling place, with people coming and going in all directions. The path leads to the east and west.",
      20.5,
      40.5
    );
    this.items = {};
    this.exits = {};
    this.enemies = [
      new enemies.ImperialGuard("Imperial Guard 1", [4, 3]),
      new enemies.ImperialGuard("Imperial Guard 2", [4, 4]),
      new enemies.ImperialGuard("Imperial Guard 3", [4, 5]),
      new enemies.ImperialGuard("Imperial Guard 4", [4, 6]),
    ];
    this.cutscene = "paragonCityTile.cityEntrance";
    this.cutscenePlayed = false;
  }
}

class ShortHorizontalCityStreet extends Room {
  constructor(id) {
    super("City Street", id, "The city street leads to a ", 20.5, 10.5);
    this.items = {};
    this.exits = {};
  }
}

class LongHorizontalCityStreet extends Room {
  constructor(id) {
    super("City Street", id, "The city street leads to a ", 40.5, 10.5);
    this.items = {};
    this.exits = {};
  }
}

class ShortVerticalCityStreet extends Room {
  constructor(id) {
    super("City Street", id, "The city street leads to a ", 10.5, 20.5);
    this.items = {};
    this.exits = {};
  }
}

class LongVerticalCityStreet extends Room {
  constructor(id) {
    super("City Street", id, "The city street leads to a ", 10.5, 40.5);
    this.items = {};
    this.exits = {};
  }
}

class CitySquare extends Room {
  constructor(id) {
    super(
      "City Square",
      id,
      "The city square is a large, open area surrounded by buildings.",
      40.5,
      40.5
    );
    this.items = {};
    this.exits = {};
  }
}

class NorthernCustomsCheckpoint extends Room {
  constructor() {
    super(
      "Customs Checkpoint",
      "paragonCityTile.northernCustomsCheckpoint",
      "Soldiers stand guard at the northern customs checkpoint, inspecting travelers as they enter the city. The street leads to the north and south.",
      40.5,
      40.5
    );
    this.items = {};
    this.exits = {
      north: "paragonCityTile.cityStreetFromNorth",
      south: "paragonCityTile.shortVerticalStreet_01",
    };
    this.enemies = [];
  }
}

var northernCustomsCheckpoint = new NorthernCustomsCheckpoint();

var shortVerticalStreet_01 = new ShortVerticalCityStreet("paragonCityTile.shortVerticalStreet_01");
shortVerticalStreet_01.exits = {
  north: "paragonCityTile.northernCustomsCheckpoint",
  south: "paragonCityTile.paragonCityMarketSquare",
};
shortVerticalStreet_01.description = shortVerticalStreet_01.description + "a customs checkpoint to the north and a market square to the south.";

class MarketSquare extends Room {
  constructor() {
    super(
      "Market Square",
      "paragonCityTile.paragonCityMarketSquare",
      "The market square is a bustling place, with a multitude of vendors selling their wares to passersby. There is a street to the north and south, and merchant stalls to the east and west.",
      40.5,
      40.5
    );
    this.items = {};
    this.exits = {
      north: "paragonCityTile.shortVerticalStreet_01",
      south: "paragonCityTile.shortVerticalStreet_02",
      east: "paragonCityTile.easternMarketStalls",
      west: "paragonCityTile.westernMarketStalls",
    };
    this.enemies = [];
  }
}

var marketSquare = new MarketSquare();

class WesternMarketStalls extends Room {
  constructor() {
    super(
      "Western Market Stalls",
      "paragonCityTile.westernMarketStalls",
      "The western market stalls include a vendor to the north, south, and west. The market square is to the east.",
      40.5,
      20.5
    );
    this.items = {};
    this.exits = {
      north: "paragonCityTile.westernMarketStall_01",
      south: "paragonCityTile.westernMarketStall_02",
      west: "paragonCityTile.westernMarketStall_03",
      east: "paragonCityTile.paragonCityMarketSquare",
    };
    this.enemies = [];
  }
}

var westernMarketStalls = new WesternMarketStalls();

var generatedTier_01 = Math.floor(Math.random() * 5) + 1;
var generatedMerchant_01 = generateShop(generatedTier_01);

class WesternMarketStall_01 extends Shop {
  constructor() {
    super(
      `${generatedMerchant_01[0]}'s Stall`,
      "paragonCityTile.westernMarketStall_01",
      `${generatedMerchant_01[0]}'s stall is filled with a variety of wares.`,
      10.5,
      10.5
    );
    this.items = {};
    this.exits = {
      south: "paragonCityTile.westernMarketStalls",
    };
    this.vendor = generatedMerchant_01[0];
    this.shopItems = generatedMerchant_01[1];
    this.currency = generatedMerchant_01[2];
    this.markup = generatedMerchant_01[3];
  }
}

var westernMarketStall_01 = new WesternMarketStall_01();

var generatedTier_02 = Math.floor(Math.random() * 5) + 1;
var generatedMerchant_02 = generateShop(generatedTier_02);

class WesternMarketStall_02 extends Shop {
  constructor() {
    super(
      `${generatedMerchant_02[0]}'s Stall`,
      "paragonCityTile.westernMarketStall_02",
      `${generatedMerchant_02[0]}'s stall is filled with a variety of wares.`,
      10.5,
      10.5
    );
    this.items = {};
    this.exits = {
      north: "paragonCityTile.westernMarketStalls",
    };
    this.vendor = generatedMerchant_02[0];
    this.shopItems = generatedMerchant_02[1];
    this.currency = generatedMerchant_02[2];
    this.markup = generatedMerchant_02[3];
  }
}

var westernMarketStall_02 = new WesternMarketStall_02();

var generatedTier_03 = Math.floor(Math.random() * 5) + 1;
var generatedMerchant_03 = generateShop(generatedTier_03);

class WesternMarketStall_03 extends Shop {
  constructor() {
    super(
      `${generatedMerchant_03[0]}'s Stall`,
      "paragonCityTile.westernMarketStall_03",
      `${generatedMerchant_03[0]}'s stall is filled with a variety of wares.`,
      10.5,
      10.5
    );
    this.items = {};
    this.exits = {
      east: "paragonCityTile.westernMarketStalls",
    };
    this.vendor = generatedMerchant_03[0];
    this.shopItems = generatedMerchant_03[1];
    this.currency = generatedMerchant_03[2];
    this.markup = generatedMerchant_03[3];
  }
}

var westernMarketStall_03 = new WesternMarketStall_03();

class EasternMarketStalls extends Room {
  constructor() {
    super(
      "Eastern Market Stalls",
      "paragonCityTile.easternMarketStalls",
      "The eastern market stalls include a vendor to the north, south, and east. The market square is to the west.",
      40.5,
      20.5
    );
    this.items = {};
    this.exits = {
      north: "paragonCityTile.easternMarketStall_01",
      south: "paragonCityTile.easternMarketStall_02",
      east: "paragonCityTile.easternMarketStall_03",
      west: "paragonCityTile.paragonCityMarketSquare",
    };
    this.enemies = [];
  }
}

var easternMarketStalls = new EasternMarketStalls();

var generatedTier_04 = Math.floor(Math.random() * 5) + 1;
var generatedMerchant_04 = generateShop(generatedTier_04);

class EasternMarketStall_01 extends Shop {
  constructor() {
    super(
      `${generatedMerchant_04[0]}'s Stall`,
      "paragonCityTile.easternMarketStall_01",
      `${generatedMerchant_04[0]}'s stall is filled with a variety of wares.`,
      10.5,
      10.5
    );
    this.items = {};
    this.exits = {
      south: "paragonCityTile.easternMarketStalls",
    };
    this.vendor = generatedMerchant_04[0];
    this.shopItems = generatedMerchant_04[1];
    this.currency = generatedMerchant_04[2];
    this.markup = generatedMerchant_04[3];
  }
}

var easternMarketStall_01 = new EasternMarketStall_01();

var generatedTier_05 = Math.floor(Math.random() * 5) + 1;
var generatedMerchant_05 = generateShop(generatedTier_05);

class EasternMarketStall_02 extends Shop {
  constructor() {
    super(
      `${generatedMerchant_05[0]}'s Stall`,
      "paragonCityTile.easternMarketStall_02",
      `${generatedMerchant_05[0]}'s stall is filled with a variety of wares.`,
      10.5,
      10.5
    );
    this.items = {};
    this.exits = {
      north: "paragonCityTile.easternMarketStalls",
    };
    this.vendor = generatedMerchant_05[0];
    this.shopItems = generatedMerchant_05[1];
    this.currency = generatedMerchant_05[2];
    this.markup = generatedMerchant_05[3];
  }
}

var easternMarketStall_02 = new EasternMarketStall_02();

var generatedTier_06 = Math.floor(Math.random() * 5) + 1;
var generatedMerchant_06 = generateShop(generatedTier_06);

class EasternMarketStall_03 extends Shop {
  constructor() {
    super(
      `${generatedMerchant_06[0]}'s Stall`,
      "paragonCityTile.easternMarketStall_03",
      `${generatedMerchant_06[0]}'s stall is filled with a variety of wares.`,
      10.5,
      10.5
    );
    this.items = {};
    this.exits = {
      west: "paragonCityTile.easternMarketStalls",
    };
    this.vendor = generatedMerchant_06[0];
    this.shopItems = generatedMerchant_06[1];
    this.currency = generatedMerchant_06[2];
    this.markup = generatedMerchant_06[3];
  }
}

var easternMarketStall_03 = new EasternMarketStall_03();

class WesternCustomsCheckpoint extends Room {
  constructor() {
    super(
      "Customs Checkpoint",
      "paragonCityTile.westernCustomsCheckpoint",
      "Soldiers stand guard at the western customs checkpoint, inspecting travelers as they enter the city. The street leads to the west and east.",
      40.5,
      40.5
    );
    this.items = {};
    this.exits = {
      east: "paragonCityTile.cityStreetFromWest",
      west: "paragonCityTile.shortHorizontalStreet_01",
    };
    this.enemies = [];
  }
}

var westernCustomsCheckpoint = new WesternCustomsCheckpoint();

class EasternCustomsCheckpoint extends Room {
  constructor() {
    super(
      "Customs Checkpoint",
      "paragonCityTile.easternCustomsCheckpoint",
      "Soldiers stand guard at the eastern customs checkpoint, inspecting travelers as they enter the city. The street leads to the east and west.",
      40.5,
      40.5
    );
    this.items = {};
    this.exits = {
      west: "paragonCityTile.cityStreetFromEast",
      east: "paragonCityTile.shortHorizontalStreet_02",
    };
    this.enemies = [];
  }
}

var easternCustomsCheckpoint = new EasternCustomsCheckpoint();

class SouthernCustomsCheckpoint extends Room {
  constructor() {
    super(
      "Customs Checkpoint",
      "paragonCityTile.southernCustomsCheckpoint",
      "Soldiers stand guard at the southern customs checkpoint, inspecting travelers as they enter the city. The street leads to the south and north.",
      40.5,
      40.5
    );
    this.items = {};
    this.exits = {
      south: "paragonCityTile.cityStreetFromSouth",
      north: "paragonCityTile.shortVerticalStreet_02",
    };
    this.enemies = [];
  }
}

var southernCustomsCheckpoint = new SouthernCustomsCheckpoint();

module.exports = {
  NorthernCityEntrance,
  SouthernCityEntrance,
  WesternCityEntrance,
  EasternCityEntrance,
  ShortHorizontalCityStreet,
  LongHorizontalCityStreet,
  ShortVerticalCityStreet,
  LongVerticalCityStreet,
  CitySquare,
  northernCustomsCheckpoint,
  shortVerticalStreet_01,
  marketSquare,
  westernMarketStalls,
  westernMarketStall_01,
  westernMarketStall_02,
  westernMarketStall_03,
  easternMarketStalls,
  easternMarketStall_01,
  easternMarketStall_02,
  easternMarketStall_03,
  westernCustomsCheckpoint,
  easternCustomsCheckpoint,
  southernCustomsCheckpoint,
};
