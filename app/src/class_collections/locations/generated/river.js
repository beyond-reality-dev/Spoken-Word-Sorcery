const { Room } = require("../room");

class VerticalRiverEntrance extends Room {
  constructor(id) {
    super(
      "River Entrance",
      id,
      "The river entrance is a calm place, with a gentle current and a sandy shore. The path leads to the north and south.",
      40.5,
      20.5
    );
    this.items = {};
    this.exits = {};
    this.type = "verticalRiverEntrance";
  }
}

class HorizontalRiverEntrance extends Room {
  constructor(id) {
    super(
      "River Entrance",
      id,
      "The river entrance is a calm place, with a gentle current and a sandy shore. The path leads to the east and west.",
      20.5,
      40.5
    );
    this.items = {};
    this.exits = {};
    this.type = "horizontalRiverEntrance";
  }
}

class HorizontalBridge extends Room {
  constructor(id, tier) {
    super(
      "Bridge",
      id,
      "The bridge spans the river, connecting the east and west banks.",
      20.5,
      10.5
    );
    this.items = {};
    this.exits = {};
    this.encounter = `generateRandomEncounter(${tier})`;
    this.encountered = false;
    this.type = "bridge";
  }
}

class VerticalBridge extends Room {
  constructor(id, tier) {
    super(
      "Bridge",
      id,
      "The bridge spans the river, connecting the north and south banks.",
      10.5,
      20.5
    );
    this.items = {};
    this.exits = {};
    this.encounter = `generateRandomEncounter(${tier})`;
    this.encountered = false;
    this.type = "bridge";
  }
}

class RiverBank extends Room {
  constructor(id, tier) {
    super(
      "River Path",
      id,
      "The river path winds along the riverbank, leading to different areas to the east and west.",
      40.5,
      10.5
    );
    this.items = {};
    this.exits = {};
    this.encounter = `generateRandomEncounter(${tier})`;
    this.encountered = false;
    this.type = "riverPath";
  }
}

module.exports = {
  VerticalRiverEntrance,
  HorizontalRiverEntrance,
  HorizontalBridge,
  VerticalBridge,
  RiverBank,
};
