const { Room } = require('../room');

class HorizontalParagonCityEntrance extends Room {
  constructor(id) {
    super(
      'Paragon City Entrance',
      id,
      'The city entrance is a bustling place, with people coming and going in all directions. The path leads to the east and west.',
      20.5,
      40.5
    );
    this.items = {};
    this.exits = {};
    this.type = 'horizontalParagonCityEntrance';
  }
}

class VerticalParagonCityEntrance extends Room {
  constructor(id) {
    super(
      'Paragon City Entrance',
      id,
      'The city entrance is a bustling place, with people coming and going in all directions. The path leads to the north and south.',
      40.5,
      20.5
    );
    this.items = {};
    this.exits = {};
    this.type = 'verticalParagonCityEntrance';
  }
}

class HorizontalParagonCityPath extends Room {
  constructor(id, tier) {
    super(
      'Paragon City Path',
      id,
      'The city path winds through the buildings for a long way, leading to different areas to the east and west.',
      40.5,
      10.5
    );
    this.items = {};
    this.exits = {};
    this.encounter = `generateRandomEncounter(${tier})`;
    this.encountered = false;
    this.type = 'horizontalParagonCityPath';
  }
}

class VerticalParagonCityPath extends Room {
  constructor(id, tier) {
    super(
      'Paragon City Path',
      id,
      'The city path winds through the buildings for a long way, leading to different areas to the north and south.',
      10.5,
      40.5
    );
    this.items = {};
    this.exits = {};
    this.encounter = `generateRandomEncounter(${tier})`;
    this.encountered = false;
    this.type = 'verticalParagonCityPath';
  }
}

class CitySquare extends Room {
  constructor(id, tier) {
    super(
      'City Square',
      id,
      'The city square is a bustling place, with people coming and going in all directions. The path leads to the east and west.',
      40.5,
      40.5
    );
    this.items = {};
    this.exits = {};
    this.encounter = `generateRandomEncounter(${tier})`;
    this.encountered = false;
    this.type = 'citySquare';
  }
}

module.exports = {
  HorizontalParagonCityEntrance,
  VerticalParagonCityEntrance,
  HorizontalParagonCityPath,
  VerticalParagonCityPath,
  CitySquare
};