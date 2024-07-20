const { Rebel } = require("../enemy_menagerie");

class Room {
  constructor(
    name,
    id,
    description,
    width,
    height,
    isLocked = false,
    lockedDescription = "The door is locked."
  ) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.width = width;
    this.height = height;
    this.isLocked = isLocked;
    this.lockedDescription = lockedDescription;
    this.items = {};
    this.exits = {};
  }
}

class TrainingRoom extends Room {
  constructor() {
    super(
      "Training Room",
      "trainingRoom",
      "The training room is a large room with a few training dummies and a practice wooden staff on the wall. There is a door to the north, leading to the common room, a door to the east, leading to the practice yard, and a door to the west, leading to the storage room.",
      "10",
      "10"
    );
    this.items = { staff: "WoodenStaff(1)" };
    this.exits = {
      north: "commonRoom",
      east: "practiceYard",
      west: "storageRoom",
    };
  }
}

var trainingRoom = new TrainingRoom();

class PracticeYard extends Room {
  constructor() {
    super(
      "Practice Yard",
      "practiceYard",
      "The practice yard is a small outdoor yard with a few simple targets, some still pierced with arrows. There is a door to the west, leading back to the training room.",
      "10",
      "10"
    );
    this.items = { arrow: "Arrow(3)" };
    this.exits = {
      west: "trainingRoom",
    };
  }
}

var practiceYard = new PracticeYard();

class StorageRoom extends Room {
  constructor() {
    super(
      "Storage Room",
      "storageRoom",
      "The storage room is a small room with a few empty shelves, and seems to have been cleared out recently. There is a door to the east, leading back to the training room.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      east: "trainingRoom",
    };
  }
}

var storageRoom = new StorageRoom();

class CommonRoom extends Room {
  constructor() {
    super(
      "Common Room",
      "commonRoom",
      "The common room is a large room with a few tables and chairs. There is a door to the north, leading to the grand hall, a door to the south, leading to the training room, a door to the east, leading to the kitchen, and a door to the west, leading to the barracks.",
      "20",
      "20"
    );
    this.items = {};
    this.exits = {
      north: "grandHall",
      south: "trainingRoom",
      east: "kitchen",
      west: "barracks",
    };
  }
}

var commonRoom = new CommonRoom();

class Kitchen extends Room {
  constructor() {
    super(
      "Kitchen",
      "kitchen",
      "The kitchen is a small room with some half-eaten meals still left on the tables. Chairs are left askew, as though their occupants left in a hurry. There is a door to the west, leading to the common room.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      west: "commonRoom",
    };
  }
}

var kitchen = new Kitchen();

class Barracks extends Room {
  constructor() {
    super(
      "Barracks",
      "barracks",
      "The barracks is a large room with a few beds and footlockers. There is a door to the east, leading to the common room.",
      "20",
      "20"
    );
    this.items = {};
    this.exits = {
      east: "commonRoom",
    };
    this.cutscene = "barracksMeeting";
    this.isVisited = false;
  }
}

var barracks = new Barracks();

class GrandHall extends Room {
  constructor() {
    super(
      "Grand Hall",
      "grandHall",
      "The grand hall is an enormous hall, and normally an impressive sight. Right now, however, it's a mess. Guards line the doorways, and the doors are barricaded. There is a door to the north, leading to a long passageway, a door to the east leading to the Academy's vault, a door to the west leading to the rest of the Academy, and a door to the south leading to the common room.",
      "80",
      "40"
    );
    this.items = {};
    this.exits = {
      north: "longPassageway",
      east: "vault",
      west: "academyGates",
      south: "commonRoom",
    };
    this.cutscene = "grandHall";
  }
}

var grandHall = new GrandHall();

class Vault extends Room {
  constructor() {
    super(
      "Vault",
      "vault",
      "The vault is a small room with a few chests and a long scroll, kept safely behind a glowing force field. There is a door to the west, leading back to the grand hall.",
      "10",
      "10",
      true,
      "The entrance to the vault is securely locked."
    );
    this.items = {};
    this.exits = {
      west: "grandHall",
    };
  }
}

var vault = new Vault();

class HallGates extends Room {
  constructor() {
    super(
      "Hall Gates",
      "hallGates",
      "The hall gates are a large, imposing set of doors. To the east of the doors is the grand hall, and to the west is a short hallway.",
      "10",
      "10",
      true,
      "The Academy gates are barricaded and guarded by a pair of imposing soldiers, who inform you that the Grandmaster is only allowing movement between the interior and main part of the Academy with his explicit command."
    );
    this.items = {};
    this.exits = {
      east: "grandHall",
      west: "shortHallway",
    };
  }
}

var hallGates = new HallGates();

class ShortHallway extends Room {
  constructor() {
    super(
      "Short Hallway",
      "shortHallway",
      "The short hallway is a small, dark hallway. There is a door to the east, leading to the hall gates.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      east: "hallGates",
      west: "restOfAcademy",
    };
  }
}

var shortHallway = new ShortHallway();

class RestOfAcademy extends Room {
  constructor() {
    super(
      "Rest of the Academy",
      "restOfAcademy",
      "The rest of the Academy is a large, open area. There is a door to the east, leading to the short hallway.",
      "10",
      "10"
    );
    this.items = {};
    this.exits = {
      east: "shortHallway",
    };
    this.cutscene = "restOfAcademy";
  }
}

class LongPassageway extends Room {
  constructor() {
    super(
      "Long Passageway",
      "longPassageway",
      "The long passageway is a long, dark passageway. There is a door to the north, leading to the Academy's military annex, and a door to the south, leading to the grand hall.",
      "60",
      "20"
    );
    this.items = {};
    this.exits = {
      north: "militaryAnnex",
      south: "grandHall",
    };
  }
}

var longPassageway = new LongPassageway();

class MilitaryAnnex extends Room {
  constructor() {
    super(
      "Military Annex",
      "militaryAnnex",
      "The military annex is a large, empty room. There is a door to the north, leading to the armory, a door to the east, leading to the first barracks, a door to the west, leading to the second barracks, and a door to the south, leading back to the long passageway.",
      "40",
      "40"
    );
    this.items = {};
    this.exits = {
      north: "armory",
      east: "firstBarracks",
      west: "secondBarracks",
      south: "longPassageway",
    };
    this.isVisited = false;
    this.cutscene = "militaryAnnex";
    this.enemies = [barracksRebelOne, barracksRebelTwo, barracksRebelThree];
  }
}

var barracksRebelOne = new Rebel("Rebel 1", "southwest");
var barracksRebelTwo = new Rebel("Rebel 2", "south");
var barracksRebelThree = new Rebel("Rebel 3", "southeast");

var militaryAnnex = new MilitaryAnnex();

class FirstBarracks extends Room {
  constructor() {
    super(
      "First Barracks",
      "firstBarracks",
      "The first barracks is a large room with a few beds and footlockers. The inside of the doorframe is oddly pierced by an arrow. There is a door to the west, leading back to the military annex.",
      "20",
      "20"
    );
    this.items = {};
    this.exits = {
      west: "militaryAnnex",
    };
  }
}

var firstBarracks = new FirstBarracks();

class SecondBarracks extends Room {
  constructor() {
    super(
      "Second Barracks",
      "secondBarracks",
      "The second barracks is a large room with a few beds and footlockers. As you look closer at one of the beds, you realize that there is a deep, dark red stain, in roughly the shape of a person's profile. There is a door to the east, leading back to the military annex.",
      "20",
      "20"
    );
    this.items = {};
    this.exits = {
      east: "militaryAnnex",
    };
  }
}

var secondBarracks = new SecondBarracks();

class Armory extends Room {
  constructor() {
    super(
      "Armory",
      "armory",
      "The armory is a large room with a few weapons racks and a few stands for pieces of armor. Oddly, much of the furniture has been strewn about, and none of the equipment remains. There is a door to the south, leading back to the military annex.",
      "20",
      "20"
    );
    this.items = {};
    this.exits = {
      south: "militaryAnnex",
    };
    this.isVisited = false;
  }
}

var armory = new Armory();

module.exports = {
  trainingRoom,
  practiceYard,
  storageRoom,
  commonRoom,
  kitchen,
  barracks,
  grandHall,
  vault,
  hallGates,
  shortHallway,
  longPassageway,
  militaryAnnex,
  firstBarracks,
  secondBarracks,
  armory,
};
