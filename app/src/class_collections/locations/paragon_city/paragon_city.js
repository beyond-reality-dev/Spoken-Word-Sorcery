const { Room } = require("../room");
const enemies = require("../../../class_collections/enemy_menagerie");

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
    this.type = "northernCityEntrance";
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
    this.type = "southernCityEntrance";
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
    this.type = "westernCityEntrance";
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
    this.type = "easternCityEntrance";
    this.cutscene = "paragonCityTile.cityEntrance";
    this.cutscenePlayed = false;
  }
}

class ShortHorizontalCityStreet extends Room {
  constructor(id) {
    super("City Street", id, "The city street leads to a ", 20.5, 10.5);
    this.items = {};
    this.exits = {};
    this.type = "shortHorizontalCityStreet";
  }
}

class LongHorizontalCityStreet extends Room {
  constructor(id) {
    super("City Street", id, "The city street leads to a ", 40.5, 10.5);
    this.items = {};
    this.exits = {};
    this.type = "longHorizontalCityStreet";
  }
}

class ShortVerticalCityStreet extends Room {
  constructor(id) {
    super("City Street", id, "The city street leads to a ", 10.5, 20.5);
    this.items = {};
    this.exits = {};
    this.type = "shortVerticalCityStreet";
  }
}

class LongVerticalCityStreet extends Room {
  constructor(id) {
    super("City Street", id, "The city street leads to a ", 10.5, 40.5);
    this.items = {};
    this.exits = {};
    this.type = "longVerticalCityStreet";
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
    this.type = "citySquare";
  }
}

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
};
