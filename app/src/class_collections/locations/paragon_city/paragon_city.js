const { Room } = require('../room');

class NorthernCityEntrance extends Room {
  constructor(id) {
    super(
      'City Entrance',
      id,
      'The city entrance is a bustling place, with people coming and going in all directions. The path leads to the north and south.',
      40.5,
      20.5
    );
    this.items = {};
    this.exits = {};
    this.type = 'northernCityEntrance';
  }
}

class SouthernCityEntrance extends Room {
  constructor(id) {
    super(
      'City Entrance',
      id,
      'The city entrance is a bustling place, with people coming and going in all directions. The path leads to the south and north.',
      20.5,
      40.5
    );
    this.items = {};
    this.exits = {};
    this.type = 'southernCityEntrance';
  }
}

class WesternCityEntrance extends Room {
  constructor(id) {
    super(
      'City Entrance',
      id,
      'The city entrance is a bustling place, with people coming and going in all directions. The path leads to the west and east.',
      40.5,
      20.5
    );
    this.items = {};
    this.exits = {};
    this.type = 'westernCityEntrance';
  }
}

class EasternCityEntrance extends Room {
  constructor(id) {
    super(
      'City Entrance',
      id,
      'The city entrance is a bustling place, with people coming and going in all directions. The path leads to the east and west.',
      20.5,
      40.5
    );
    this.items = {};
    this.exits = {};
    this.type = 'easternCityEntrance';
  }
}

class CitySquare extends Room {
  constructor(id) {
    super(
      'City Square',
      id,
      'The city square is a large, open area surrounded by buildings.',
      40.5,
      40.5
    );
    this.items = {};
    this.exits = {};
    this.type = 'citySquare';
  }
}

module.exports = {
  NorthernCityEntrance,
  SouthernCityEntrance,
  WesternCityEntrance,
  EasternCityEntrance,
  CitySquare,
};