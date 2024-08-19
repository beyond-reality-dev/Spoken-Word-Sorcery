const startingLocationId = "unknownShore.rockyBeach";
const minorLocations = {
  forestBiome: ["forestPath", "forestClearing", "forestCave"],
  mountainBiome: ["mountainPath", "mountainPeak", "mountainCave"],
  desertBiome: ["desertPath", "desertDunes", "desertOasis"],
};
const intermediateLocations = {
  village: ["villageCenter", "villageInn", "villageMarket"],
  town: ["townCenter", "townInn", "townMarket"],
  city: ["cityEntrance", "cityCenter", "cityMarket"],
};
const majorLocations = {
  paragonCity: ["paragonCity.cityEntrance"],
  libertyCity: ["libertyCity.cityEntrance"],
};
var generatedRooms = [];

function generateMap(startingLocationId) {
  var playerData = JSON.parse(localStorage.getItem("playerData"));
  var locations = playerData.locations;
  var primaryLocation = startingLocationId.split(".")[0];
  var secondaryLocation = startingLocationId.split(".")[1];
  var location = locations[primaryLocation][secondaryLocation];
  location["exits"] = {};
  var biome = determineBiome(startingLocationId);
  location["exits"] = {
    north: generateRoom(startingLocationId, "south", biome),
    east: null,
    south: null,
    west: null,
  }
}

function determineBiome(locationId) {
  var biome = null;
  var d10 = Math.floor(Math.random() * 10 + 1);
  if (d10 != 10) {
    if (locationId.includes("forest")) {
      biome = minorLocations.forestBiome;
    } else if (locationId.includes("mountain")) {
      biome = minorLocations.mountainBiome;
    } else if (locationId.includes("desert")) {
      biome = minorLocations.desertBiome;
    } else {
      var randomChoice = Math.floor(Math.random() * 3 + 1);
      if (randomChoice == 1) {
        biome = minorLocations.forestBiome;
      } else if (randomChoice == 2) {
        biome = minorLocations.mountainBiome;
      } else {
        biome = minorLocations.desertBiome;
      }
    }
  } else {
    var coinFlip = Math.random();
    if (locationId.includes("forest")) {
      if (coinFlip < 0.5) {
        biome = minorLocations.mountainBiome;
      } else {
        biome = minorLocations.desertBiome;
      }
    } else if (locationId.includes("mountain")) {
      if (coinFlip < 0.5) {
        biome = minorLocations.forestBiome;
      } else {
        biome = minorLocations.desertBiome;
      }
    } else if (locationId.includes("desert")) {
      if (coinFlip < 0.5) {
        biome = minorLocations.forestBiome;
      } else {
        biome = minorLocations.mountainBiome;
      }
    } else {
      var randomChoice = Math.floor(Math.random() * 3 + 1);
      if (randomChoice == 1) {
        biome = minorLocations.forestBiome;
      } else if (randomChoice == 2) {
        biome = minorLocations.mountainBiome;
      } else {
        biome = minorLocations.desertBiome;
      }
    }
  }
  return biome;
}

function generateRoom(startingId, originDirection, biome) {
  if (originDirection == "north") {
    originDirection = "south";
  } else if (originDirection == "east") {
    originDirection = "west";
  } else if (originDirection == "south") {
    originDirection = "north";
  } else {
    originDirection = "east";
  }
  var coinFlip = Math.random();
  if (coinFlip < 0.5) {
    return null;
  } else {
    if (startingId.includes("path")) {
      var isPath = true;
      while (isPath) {
        var randomChoice = Math.floor(Math.random() * biome.length + 1);
        var newLocationId = biome[randomChoice];
        if (newLocationId.includes("path")) {
          isPath = false;
        }
      }
      for (var i = 0; i < generatedRooms.length; i++) {
        if (generatedRooms[i] == newLocationId) {
          if (generatedRooms[i].includes("_")) {
            var id = newLocationId.split("_")[0];
            var number = newLocationId.split("_")[1];
            number++;
            newLocationId = id + "_" + number;
            i = 0;
          } else {
            newLocationId += "_1";
            i = 0;
          }
        }
      }
    } else {
      var newLocationId = biome[0];
      for (var i = 0; i < generatedRooms.length; i++) {
        if (generatedRooms[i] == newLocationId) {
          if (generatedRooms[i].includes("_")) {
            var id = newLocationId.split("_")[0];
            var number = newLocationId.split("_")[1];
            number++;
            newLocationId = id + "_" + number;
            i = 0;
          } else {
            newLocationId += "_1";
            i = 0;
          }
        }
      }
    }
    if (originDirection == "north") {
      var exit1 = "east";
      var exit2 = "south";
      var exit3 = "west";
    } else if (originDirection == "east") {
      var exit1 = "south";
      var exit2 = "west";
      var exit3 = "north";
    } else if (originDirection == "south") {
      var exit1 = "west";
      var exit2 = "north";
      var exit3 = "east";
    } else {
      var exit1 = "north";
      var exit2 = "east";
      var exit3 = "south";
    }
    var newRoom = {
      id: newLocationId,
      exits: {
        originDirection: startingId,
      },
    };
    newRoom["exits"][exit1] = generateRoom(newLocationId, exit1, biome);
    newRoom["exits"][exit2] = generateRoom(newLocationId, exit2, biome);
    newRoom["exits"][exit3] = generateRoom(newLocationId, exit3, biome);
  }
}
