const Ocean = require("./class_collections/locations/generated/ocean");

const MAP_KEY = {
  X: null, // empty cell
  U: "U", // Unknown Shore
  P: "P", // Paragon City
  L: "L", // Liberty City
  F: "🟩", // forest
  M: "⬛", // mountain
  K: "⬜", // mountain peak
  V: "🟥", // volcano
  D: "🟨", // desert
  O: "🟦", // ocean
  S: "🟫", // shore
  R: "🟦", // river
};

var row01 = ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"]; // prettier-ignore
var row02 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"]; // prettier-ignore
var row03 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"]; // prettier-ignore
var row04 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"]; // prettier-ignore
var row05 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"]; // prettier-ignore
var row06 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"]; // prettier-ignore
var row07 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"]; // prettier-ignore
var row08 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"]; // prettier-ignore
var row09 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"]; // prettier-ignore
var row10 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"]; // prettier-ignore
var row11 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"]; // prettier-ignore
var row12 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"]; // prettier-ignore
var row13 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"]; // prettier-ignore
var row14 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"]; // prettier-ignore
var row15 = ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"]; // prettier-ignore

var mapGrid = [
  row01,
  row02,
  row03,
  row04,
  row05,
  row06,
  row07,
  row08,
  row09,
  row10,
  row11,
  row12,
  row13,
  row14,
  row15,
];

function generateMap(map, print = false) {
  generateOceans(map); // If a cell is adjacent to ocean, it will become ocean 33% of the time, otherwise it will become shore
  generateBiome(map, "F"); // Generate 5 forest tiles
  generateBiome(map, "M"); // Generate 5 mountain tiles
  generateBiome(map, "D"); // Generate 5 desert tiles
  propagateBiomes(map); // Biomes will propagate to adjacent cells
  generateParagonCity(map); // Generate Paragon City, on a tile that is surrounded by four mountain tiles (or less if that is not possible)
  fillShoreline(map); // If there are empty cells adjacent to ocean cells, they will become shore
  trimShoreline(map); // If there are shore cells that are not adjacent to non-shore tiles, they will become ocean
  generateRiver(map); // Generate a river that starts at the ocean and ends at the ocean
  generateLibertyCity(map); // Generate Liberty City, on a forest tile that is adjacent to a shore and not too close to Paragon City
  generateSpecialBiome(map, "M", "V", 2); // Generate 2 volcano tiles
  generateUnknownShore(map); // Generate the Unknown Shore
  if (print) {
    var displayMap = map.map((row) => {
      return row.map((cell) => MAP_KEY[cell]);
    });
    for (let i = 0; i < displayMap.length; i++) {
      console.log(displayMap[i].join(""));
    }
  }
  generateRegions(map); // Generate regions for each cell
  linkRegions(map); // Link the entrances of each region to the entrances of adjacent regions
  return mapGrid;
}

function generateOceans(mapGrid) {
  for (let i = 0; i < mapGrid.length; i++) {
    if (i == 0) {
      var priorRow = null;
    } else if (i == mapGrid.length - 1) {
      var nextRow = null;
    } else {
      var priorRow = mapGrid[i - 1];
      var nextRow = mapGrid[i + 1];
    }
    var currentRow = mapGrid[i];
    var hasGeneratedOcean = false;
    for (let i = 0; i < currentRow.length; i++) {
      if (i == 0) {
        var left = null;
      } else if (i == currentRow.length - 1) {
        var right = null;
      } else {
        var left = currentRow[i - 1];
        var right = currentRow[i + 1];
      }
      if (currentRow[i] == "X" && !hasGeneratedOcean) {
        if (
          priorRow[i] == "O" ||
          nextRow[i] == "O" ||
          left == "O" ||
          right == "O"
        ) {
          var coinFlip = Math.random();
          if (coinFlip > 0.66) {
            currentRow[i] = "O";
          } else {
            currentRow[i] = "S";
          }
        }
      } else if (currentRow[i] == "X" && hasGeneratedOcean) {
        if (
          priorRow[i] == "O" ||
          nextRow[i] == "O" ||
          left == "O" ||
          right == "O"
        ) {
          currentRow[i] = "S";
        }
      }
      if (i == currentRow.length - 1 && !hasGeneratedOcean) {
        hasGeneratedOcean = true;
        i = 0;
      }
    }
  }
  for (let i = 0; i < mapGrid.length; i++) {
    if (i == 0) {
      var priorRow = null;
    } else if (i == mapGrid.length - 1) {
      var nextRow = null;
    } else {
      var priorRow = mapGrid[i - 1];
      var nextRow = mapGrid[i + 1];
    }
    var currentRow = mapGrid[i];
    for (let i = 0; i < currentRow.length; i++) {
      if (i == 0) {
        var left = null;
      } else if (i == currentRow.length - 1) {
        var right = null;
      } else {
        var left = currentRow[i - 1];
        var right = currentRow[i + 1];
      }
      if (currentRow[i] == "S") {
        if (
          priorRow[i] == "O" &&
          nextRow[i] == "O" &&
          left == "O" &&
          right == "O"
        ) {
          currentRow[i] = "O";
        }
      }
    }
  }
}

function generateBiome(mapGrid, biome) {
  var biomeNum = 5;
  for (let i = 0; i < biomeNum; i++) {
    var rowChoice = Math.floor(Math.random() * mapGrid.length);
    var colChoice = Math.floor(Math.random() * mapGrid[rowChoice].length);
    if (mapGrid[rowChoice][colChoice] == "X") {
      mapGrid[rowChoice][colChoice] = biome;
    } else {
      i--;
    }
  }
}

function propagateBiomes(mapGrid) {
  for (let i = 0; i < mapGrid.length; i++) {
    if (i == 0) {
      var priorRow = null;
    } else if (i == mapGrid.length - 1) {
      var nextRow = null;
    } else {
      var priorRow = mapGrid[i - 1];
      var nextRow = mapGrid[i + 1];
    }
    var currentRow = mapGrid[i];
    var iteration = 0;
    for (let i = 0; i < currentRow.length; i++) {
      if (i == 0) {
        var left = null;
      } else if (i == currentRow.length - 1) {
        var right = null;
      } else {
        var left = currentRow[i - 1];
        var right = currentRow[i + 1];
      }
      if (currentRow[i] == "X") {
        if (iteration < 4) {
          iteration++;
        } else {
          iteration = 0;
        }
        if (iteration == 0 || iteration == 1) {
          if (
            priorRow[i] == "F" ||
            nextRow[i] == "F" ||
            left == "F" ||
            right == "F"
          ) {
            currentRow[i] = "F";
            i = 0;
          } else if (
            priorRow[i] == "M" ||
            nextRow[i] == "M" ||
            left == "M" ||
            right == "M"
          ) {
            currentRow[i] = "M";
            i = 0;
          } else if (
            priorRow[i] == "D" ||
            nextRow[i] == "D" ||
            left == "D" ||
            right == "D"
          ) {
            currentRow[i] = "D";
            i = 0;
          }
        } else if (iteration == 2) {
          if (
            priorRow[i] == "D" ||
            nextRow[i] == "D" ||
            left == "D" ||
            right == "D"
          ) {
            currentRow[i] = "D";
            i = 0;
          } else if (
            priorRow[i] == "F" ||
            nextRow[i] == "F" ||
            left == "F" ||
            right == "F"
          ) {
            currentRow[i] = "F";
            i = 0;
          } else if (
            priorRow[i] == "M" ||
            nextRow[i] == "M" ||
            left == "M" ||
            right == "M"
          ) {
            currentRow[i] = "M";
            i = 0;
          }
        } else if (iteration == 3) {
          if (
            priorRow[i] == "M" ||
            nextRow[i] == "M" ||
            left == "M" ||
            right == "M"
          ) {
            currentRow[i] = "M";
            i = 0;
          } else if (
            priorRow[i] == "D" ||
            nextRow[i] == "D" ||
            left == "D" ||
            right == "D"
          ) {
            currentRow[i] = "D";
            i = 0;
          } else if (
            priorRow[i] == "F" ||
            nextRow[i] == "F" ||
            left == "F" ||
            right == "F"
          ) {
            currentRow[i] = "F";
            i = 0;
          }
        }
      }
    }
  }
}

function fillShoreline(mapGrid) {
  for (let i = 0; i < mapGrid.length; i++) {
    for (let j = 0; j < mapGrid[i].length; j++) {
      if (mapGrid[i][j] == "X") {
        if (i > 0 && mapGrid[i - 1][j] != "X" && mapGrid[i - 1][j] != "S") {
          mapGrid[i][j] = "S";
        } else if (
          i < mapGrid.length - 1 &&
          mapGrid[i + 1][j] != "X" &&
          mapGrid[i + 1][j] != "S"
        ) {
          mapGrid[i][j] = "S";
        } else if (
          j > 0 &&
          mapGrid[i][j - 1] != "X" &&
          mapGrid[i][j - 1] != "S"
        ) {
          mapGrid[i][j] = "S";
        } else if (
          j < mapGrid[i].length - 1 &&
          mapGrid[i][j + 1] != "X" &&
          mapGrid[i][j + 1] != "S"
        ) {
          mapGrid[i][j] = "S";
        } else {
          mapGrid[i][j] = "O";
        }
      }
    }
  }
  for (let i = 0; i < mapGrid.length; i++) {
    for (let j = 0; j < mapGrid[i].length; j++) {
      if (mapGrid[i][j] != "O" && mapGrid[i][j] != "S") {
        if (i > 0 && mapGrid[i - 1][j] == "O" && mapGrid[i - 1][j] != "S") {
          mapGrid[i][j] = "S";
        } else if (
          i < mapGrid.length - 1 &&
          mapGrid[i + 1][j] == "O" &&
          mapGrid[i + 1][j] != "S"
        ) {
          mapGrid[i][j] = "S";
        } else if (
          j > 0 &&
          mapGrid[i][j - 1] == "O" &&
          mapGrid[i][j - 1] != "S"
        ) {
          mapGrid[i][j] = "S";
        } else if (
          j < mapGrid[i].length - 1 &&
          mapGrid[i][j + 1] == "O" &&
          mapGrid[i][j + 1] != "S"
        ) {
          mapGrid[i][j] = "S";
        }
      }
    }
  }
}

function trimShoreline(mapGrid) {
  for (let i = 0; i < mapGrid.length; i++) {
    for (let j = 0; j < mapGrid[i].length; j++) {
      if (mapGrid[i][j] == "S") {
        if (i > 0 && mapGrid[i - 1][j] != "S" && mapGrid[i - 1][j] != "O") {
          continue;
        } else if (
          i < mapGrid.length - 1 &&
          mapGrid[i + 1][j] != "S" &&
          mapGrid[i + 1][j] != "O"
        ) {
          continue;
        } else if (
          j > 0 &&
          mapGrid[i][j - 1] != "S" &&
          mapGrid[i][j - 1] != "O"
        ) {
          continue;
        } else if (
          j < mapGrid[i].length - 1 &&
          mapGrid[i][j + 1] != "S" &&
          mapGrid[i][j + 1] != "O"
        ) {
          continue;
        } else {
          mapGrid[i][j] = "O";
        }
      }
    }
  }
}

function generateRiver(mapGrid) {
  var riverPlotted = false;
  while (!riverPlotted) {
    var startRow = Math.floor(Math.random() * mapGrid.length);
    var startCol = Math.floor(Math.random() * mapGrid[startRow].length);
    while (mapGrid[startRow][startCol] != "S") {
      startRow = Math.floor(Math.random() * mapGrid.length);
      startCol = Math.floor(Math.random() * mapGrid[startRow].length);
    }
    var rowNum = mapGrid.length - 1;
    var colNum = mapGrid[rowNum].length - 1;
    var endRow = rowNum - startRow;
    var endCol = colNum - startCol;
    var xDistance = endCol - startCol;
    var yDistance = endRow - startRow;
    if (mapGrid[endRow][endCol] == "S") {
      mapGrid[startRow][startCol] = "R";
      riverPlotted = true;
    }
  }
  var currentRow = startRow;
  var currentCol = startCol;
  while (xDistance != 0 || yDistance != 0) {
    if (xDistance > 0) {
      mapGrid[currentRow][currentCol + 1] = "R";
      currentCol++;
      xDistance--;
    } else if (xDistance < 0) {
      mapGrid[currentRow][currentCol - 1] = "R";
      currentCol--;
      xDistance++;
    }
    if (yDistance > 0) {
      mapGrid[currentRow + 1][currentCol] = "R";
      currentRow++;
      yDistance--;
    } else if (yDistance < 0) {
      mapGrid[currentRow - 1][currentCol] = "R";
      currentRow--;
      yDistance++;
    }
  }
}

function generateParagonCity(mapGrid, targetNumber = 4) {
  var targetNum = targetNumber;
  var currentNum = 0;
  for (let i = 0; i < mapGrid.length; i++) {
    if (i == 0) {
      var priorRow = null;
    } else if (i == mapGrid.length - 1) {
      var nextRow = null;
    } else {
      var priorRow = mapGrid[i - 1];
      var nextRow = mapGrid[i + 1];
    }
    var currentRow = mapGrid[i];
    for (j = 0; j < currentRow.length; j++) {
      if (j == 0) {
        var left = null;
      } else if (j == currentRow.length - 1) {
        var right = null;
      } else {
        var left = currentRow[j - 1];
        var right = currentRow[j + 1];
      }
      if (currentRow[j] == "M") {
        if (left != null) {
          if (left == "M") {
            currentNum++;
          }
        }
        if (right != null) {
          if (right == "M") {
            currentNum++;
          }
        }
        if (priorRow != null) {
          if (priorRow[j] == "M") {
            currentNum++;
          }
        }
        if (nextRow != null) {
          if (nextRow[j] == "M") {
            currentNum++;
          }
        }
        if (currentNum >= targetNum) {
          mapGrid[i][j] = "P";
          return;
        }
      }
      currentNum = 0;
    }
  }
  targetNum--;
  generateParagonCity(mapGrid, targetNum);
}

function generateLibertyCity(mapGrid) {
  var targetNum = 1;
  var currentNum = 0;
  for (let i = 0; i < mapGrid.length; i++) {
    if (i == 0) {
      var priorRow = null;
    } else if (i == mapGrid.length - 1) {
      var nextRow = null;
    } else {
      var priorRow = mapGrid[i - 1];
      var nextRow = mapGrid[i + 1];
    }
    var currentRow = mapGrid[i];
    for (j = 0; j < currentRow.length; j++) {
      if (j == 0) {
        var left = null;
      } else if (j == currentRow.length - 1) {
        var right = null;
      } else {
        var left = currentRow[j - 1];
        var right = currentRow[j + 1];
      }
      if (currentRow[j] == "F") {
        if (left != null) {
          if (left == "S") {
            currentNum++;
          }
        }
        if (right != null) {
          if (right == "S") {
            currentNum++;
          }
        }
        if (priorRow != null) {
          if (priorRow[j] == "S") {
            currentNum++;
          }
        }
        if (nextRow != null) {
          if (nextRow[j] == "S") {
            currentNum++;
          }
        }
        if (currentNum >= targetNum) {
          var paragonCityCoords = findParagonCity(mapGrid);
          if (paragonCityCoords == undefined) {
            return false;
          }
          var xDistance = Math.abs(paragonCityCoords[0] - i);
          var yDistance = Math.abs(paragonCityCoords[1] - j);
          if (xDistance > 5 || yDistance > 5) {
            mapGrid[i][j] = "L";
            return;
          } else {
            currentNum = 0;
          }
        }
      }
      currentNum = 0;
    }
  }
  targetNum--;
  generateLibertyCity(mapGrid, targetNum);
}

function findParagonCity(mapGrid) {
  try {
    for (let i = 0; i < mapGrid.length; i++) {
      for (let j = 0; j < mapGrid[i].length; j++) {
        if (mapGrid[i][j] == "P") {
          return [i, j];
        }
      }
    }
  } catch (error) {
    generateParagonCity(mapGrid);
    findParagonCity(mapGrid);
  }
}

function findLibertyCity(mapGrid) {
  try {
    for (let i = 0; i < mapGrid.length; i++) {
      for (let j = 0; j < mapGrid[i].length; j++) {
        if (mapGrid[i][j] == "L") {
          return [i, j];
        }
      }
    }
  } catch (error) {
    generateLibertyCity(mapGrid);
    findLibertyCity(mapGrid);
  }
}

function findUnknownShore(mapGrid) {
  try {
    for (let i = 0; i < mapGrid.length; i++) {
      for (let j = 0; j < mapGrid[i].length; j++) {
        if (mapGrid[i][j] == "U") {
          return [i, j];
        }
      }
    }
  } catch (error) {
    generateUnknownShore(mapGrid);
    findUnknownShore(mapGrid);
  }
}

function generateSpecialBiome(
  mapGrid,
  biome,
  specialBiome,
  targetNumber,
  currentNum = 0,
  iterations = 0
) {
  var targetNum = targetNumber;
  var currentNum = currentNum;
  var iterations = iterations;
  var randomRow = Math.floor(Math.random() * mapGrid.length);
  var randomCol = Math.floor(Math.random() * mapGrid[randomRow].length);
  if (iterations > 1000) {
    return;
  }
  if (mapGrid[randomRow][randomCol] == biome && currentNum < targetNum) {
    mapGrid[randomRow][randomCol] = specialBiome;
    currentNum++;
    if (currentNum >= targetNum) {
      return;
    }
  }
  iterations++;
  generateSpecialBiome(mapGrid, biome, specialBiome, targetNumber, currentNum);
}

function generateUnknownShore(mapGrid) {
  for (let i = 0; i < mapGrid.length; i++) {
    for (let j = 0; j < mapGrid[i].length; j++) {
      if (mapGrid[i][j] == "S") {
        var paragonCityCoords = findParagonCity(mapGrid);
        var libertyCityCoords = findLibertyCity(mapGrid);
        var xDistanceParagon = Math.abs(paragonCityCoords[0] - i);
        var yDistanceParagon = Math.abs(paragonCityCoords[1] - j);
        var xDistanceLiberty = Math.abs(libertyCityCoords[0] - i);
        var yDistanceLiberty = Math.abs(libertyCityCoords[1] - j);
        if (xDistanceParagon > 5 || yDistanceParagon > 5) {
          if (xDistanceLiberty > 5 || yDistanceLiberty > 5) {
            mapGrid[i][j] = "U";
            return;
          }
        }
      }
    }
  }
}

function generateRegions(mapGrid) {
  for (let i = 0; i < mapGrid.length; i++) {
    for (let j = 0; j < mapGrid[i].length; j++) {
      if (mapGrid[i][j] == "O") {
        generateOceanTile(mapGrid, [i, j]);
      } else if (mapGrid[i][j] == "F") {
        generateTile(mapGrid, [i, j], "forest");
      } else if (mapGrid[i][j] == "D") {
        generateDesertTile(mapGrid, [i, j]);
      } else if (mapGrid[i][j] == "M") {
        generateMountainTile(mapGrid, [i, j]);
      } else if (mapGrid[i][j] == "V") {
        generateVolcanoTile(mapGrid, [i, j]);
      } else if (mapGrid[i][j] == "S") {
        generateShoreTile(mapGrid, [i, j]);
      } else if (mapGrid[i][j] == "R") {
        generateRiverTile(mapGrid, [i, j]);
      } else if (mapGrid[i][j] == "P") {
        generateParagonCityTile(mapGrid, [i, j]);
      } else if (mapGrid[i][j] == "L") {
        generateLibertyCityTile(mapGrid, [i, j]);
      } else if (mapGrid[i][j] == "U") {
        //generateUnknownShoreTile(mapGrid, [i, j]);
      }
    }
  }
}

function getIncrement(mapGrid, roomType) {
  var increment = 1;
  for (let i = 0; i < mapGrid.length; i++) {
    for (let j = 0; j < mapGrid[i].length; j++) {
      var keys = Object.keys(mapGrid[i][j]);
      for (let k = 0; k < keys.length; k++) {
        if (keys[k].includes(roomType)) {
          increment++;
        }
      }
    }
  }
  return increment;
}

function getTier(targetTile) {
  var d10 = Math.floor(Math.random() * 10 + 1);
  if (d10 == 1) {
    var unknownShoreCoords = findUnknownShore(mapGrid);
    var xDistance = Math.abs(unknownShoreCoords[0] - targetTile[0]);
    var yDistance = Math.abs(unknownShoreCoords[1] - targetTile[1]);
    var distance = xDistance + yDistance;
    var tier = Math.floor(distance / 5);
  } else {
    tier = 0;
  }
  return tier;
}

function generateOceanTile(mapGrid, targetTile) {
  var increment = getIncrement(mapGrid, "oceanTile");
  var regionId = `oceanTile_${increment}`;
  var oceanTile = new Ocean(`${regionId}.oceanTile_1`);
  var locationObjects = {};
  locationObjects[`oceanTile_1`] = oceanTile;
  mapGrid[targetTile[0]][targetTile[1]] = {};
  mapGrid[targetTile[0]][targetTile[1]][regionId] = locationObjects;
}

const {
  HorizontalForestEntrance,
  VerticalForestEntrance,
  HorizontalForestPath,
  VerticalForestPath,
  SmallClearing,
  LargeClearing,
  Crossroads,
} = require("./class_collections/locations/generated/forest");
const {
  HorizontalDesertEntrance,
  VerticalDesertEntrance,
  HorizontalDesertPath,
  VerticalDesertPath,
  SmallDunes,
  LargeDunes,
  SmallOasis,
  LargeOasis,
} = require("./class_collections/locations/generated/desert");
const {
  HorizontalMountainEntrance,
  VerticalMountainEntrance,
  HorizontalMountainPath,
  VerticalMountainPath,
  MountainPeak,
  BoulderField,
  Cave,
} = require("./class_collections/locations/generated/mountain");
const {
  HorizontalVolcanicEntrance,
  VerticalVolcanicEntrance,
  HorizontalVolcanicPath,
  VerticalVolcanicPath,
  LavaLake,
  LavaFlow,
  LavaCave,
} = require("./class_collections/locations/generated/volcano");
const {
  HorizontalShoreEntrance,
  VerticalShoreEntrance,
  HorizontalBeachPath,
  VerticalBeachPath,
  Beach,
  Tidepool,
  CoralReef,
} = require("./class_collections/locations/generated/shore");
const {
  HorizontalRiverEntrance,
  VerticalRiverEntrance,
} = require("./class_collections/locations/generated/river");
const {
  HorizontalParagonCityEntrance,
  VerticalParagonCityEntrance,
  HorizontalParagonCityPath,
  VerticalParagonCityPath,
  CitySquare,
} = require("./class_collections/locations/paragon_city/paragon_city");
const {
  HorizontalLibertyCityEntrance,
  VerticalLibertyCityEntrance,
  HorizontalLibertyCityPath,
  VerticalLibertyCityPath,
} = require("./class_collections/locations/liberty_city/liberty_city");

function generateTile(mapGrid, targetTile, type) {
  var regionIncrement = getIncrement(mapGrid, type);
  var regionId = `${type}Tile_${regionIncrement}`;
  var increment = 1;
  switch (type) {
    case "forest":
      var randomTypes = [SmallClearing, LargeClearing];
      var horizontalPath = HorizontalForestPath;
      var verticalPath = VerticalForestPath;
      var horizontalEntrance = HorizontalForestEntrance;
      var verticalEntrance = VerticalForestEntrance;
      break;
    case "desert":
      var randomTypes = [SmallDunes, LargeDunes, SmallOasis, LargeOasis];
      var horizontalPath = HorizontalDesertPath;
      var verticalPath = VerticalDesertPath;
      var horizontalEntrance = HorizontalDesertEntrance;
      var verticalEntrance = VerticalDesertEntrance;
      break;
    case "mountain":
      var randomTypes = [MountainPeak, BoulderField, Cave];
      var horizontalPath = HorizontalMountainPath;
      var verticalPath = VerticalMountainPath;
      var horizontalEntrance = HorizontalMountainEntrance;
      var verticalEntrance = VerticalMountainEntrance;
      break;
    case "volcano":
      var randomTypes = [LavaLake, LavaFlow, LavaCave];
      var horizontalPath = HorizontalVolcanicPath;
      var verticalPath = VerticalVolcanicPath;
      var horizontalEntrance = HorizontalVolcanicEntrance;
      var verticalEntrance = VerticalVolcanicEntrance;
      break;
    case "shore":
      var randomTypes = [Beach, Tidepool, CoralReef];
      var horizontalPath = HorizontalBeachPath;
      var verticalPath = VerticalBeachPath;
      var horizontalEntrance = HorizontalShoreEntrance;
      var verticalEntrance = VerticalShoreEntrance;
      break;
    case "paragonCity":
      var randomTypes = [CitySquare];
      var horizontalPath = HorizontalParagonCityPath;
      var verticalPath = VerticalParagonCityPath;
      var horizontalEntrance = HorizontalParagonCityEntrance;
      var verticalEntrance = VerticalParagonCityEntrance;
      break;
    case "libertyCity":
      var randomTypes = [CitySquare];
      var horizontalPath = HorizontalLibertyCityPath;
      var verticalPath = VerticalLibertyCityPath;
      var horizontalEntrance = HorizontalLibertyCityEntrance;
      var verticalEntrance = VerticalLibertyCityEntrance;
      break;
  }
  var westernEntrance = new horizontalEntrance(
    `${regionId}.entrance_${increment}`
  );
  var westernPath = new horizontalPath(`${regionId}.path_${increment}`);
  var firstChoice = Math.floor(Math.random() * randomTypes.length);
  var firstRandomLocation = new randomTypes[firstChoice](
    `${regionId}.location_${increment}`,
    getTier(targetTile)
  );
  var pathFromWestToNorthwest = new verticalPath(
    `${regionId}.path_${increment + 1}`,
    getTier(targetTile)
  );
  var secondChoice = Math.floor(Math.random() * randomTypes.length);
  var secondRandomLocation = new randomTypes[secondChoice](
    `${regionId}.location_${increment + 1}`,
    getTier(targetTile)
  );
  var pathFromNorthwestToEast = new horizontalPath(
    `${regionId}.path_${increment + 2}`,
    getTier(targetTile)
  );
  var thirdChoice = Math.floor(Math.random() * randomTypes.length);
  var thirdRandomLocation = new randomTypes[thirdChoice](
    `${regionId}.location_${increment + 2}`,
    getTier(targetTile)
  );
  var northernPathToEntrance = new verticalPath(
    `${regionId}.path_${increment + 3}`,
    getTier(targetTile)
  );
  var pathFromNorthToEast = new horizontalPath(
    `${regionId}.path_${increment + 3}`,
    getTier(targetTile)
  );
  var fourthChoice = Math.floor(Math.random() * randomTypes.length);
  var fourthRandomLocation = new randomTypes[fourthChoice](
    `${regionId}.location_${increment + 3}`,
    getTier(targetTile)
  );
  var pathFromNortheastToSouth = new verticalPath(
    `${regionId}.path_${increment + 2}`,
    getTier(targetTile)
  );
  var fifthChoice = Math.floor(Math.random() * randomTypes.length);
  var fifthRandomLocation = new randomTypes[fifthChoice](
    `${regionId}.location_${increment + 4}`,
    getTier(targetTile)
  );
  var easternPathToEntrance = new horizontalPath(
    `${regionId}.path_${increment + 4}`,
    getTier(targetTile)
  );
  var pathFromEastToSouth = new verticalPath(
    `${regionId}.path_${increment + 5}`,
    getTier(targetTile)
  );
  var sixthChoice = Math.floor(Math.random() * randomTypes.length);
  var sixthRandomLocation = new randomTypes[sixthChoice](
    `${regionId}.location_${increment + 5}`,
    getTier(targetTile)
  );
  var pathFromSouthEastToSouth = new horizontalPath(
    `${regionId}.path_${increment + 6}`,
    getTier(targetTile)
  );
  var seventhChoice = Math.floor(Math.random() * randomTypes.length);
  var seventhRandomLocation = new randomTypes[seventhChoice](
    `${regionId}.location_${increment + 6}`,
    getTier(targetTile)
  );
  var pathFromWestToSouthwest = new verticalPath(
    `${regionId}.path_${increment + 7}`,
    getTier(targetTile)
  );
  var eighthChoice = Math.floor(Math.random() * randomTypes.length);
  var eighthRandomLocation = new randomTypes[eighthChoice](
    `${regionId}.location_${increment + 7}`,
    getTier(targetTile)
  );
  var pathFromSouthwestToNorth = new horizontalPath(
    `${regionId}.path_${increment + 8}`,
    getTier(targetTile)
  );
  var pathFromSouthToCenter = new verticalPath(
    `${regionId}.path_${increment + 7}`,
    getTier(targetTile)
  );
  var center = new Crossroads(
    `${regionId}.location_${increment + 7}`,
    getTier(targetTile)
  );
  var pathFromWestToCenter = new horizontalPath(
    `${regionId}.path_${increment + 8}`,
    getTier(targetTile)
  );
  var pathFromEastToCenter = new horizontalPath(
    `${regionId}.path_${increment + 9}`,
    getTier(targetTile)
  );
  var pathFromNorthToCenter = new verticalPath(
    `${regionId}.path_${increment + 10}`,
    getTier(targetTile)
  );
  var southernPathToEntrance = new verticalPath(
    `${regionId}.path_${increment + 11}`,
    getTier(targetTile)
  );
  var easternEntrance = new horizontalEntrance(
    `${regionId}.entrance_${increment + 1}`
  );
  var northernEntrance = new verticalEntrance(
    `${regionId}.entrance_${increment + 2}`
  );
  var southernEntrance = new verticalEntrance(
    `${regionId}.entrance_${increment + 3}`
  );
  southernPathToEntrance.exits = {
    north: seventhRandomLocation.id,
    south: southernEntrance.id,
  };
  southernEntrance.exits = {
    north: southernPathToEntrance.id,
  };
  westernEntrance.exits = {
    east: westernPath.id,
  };
  westernPath.exits = {
    west: westernEntrance.id,
    east: firstRandomLocation.id,
  };
  firstRandomLocation.exits = {
    west: westernPath.id,
    east: pathFromWestToCenter.id,
    north: pathFromWestToNorthwest.id,
    south: pathFromSouthwestToNorth.id,
  };
  pathFromWestToNorthwest.exits = {
    north: secondRandomLocation.id,
    south: firstRandomLocation.id,
  };
  secondRandomLocation.exits = {
    south: pathFromWestToNorthwest.id,
    east: pathFromNorthwestToEast.id,
  };
  pathFromNorthwestToEast.exits = {
    west: secondRandomLocation.id,
    east: thirdRandomLocation.id,
  };
  thirdRandomLocation.exits = {
    west: pathFromNorthwestToEast.id,
    north: northernPathToEntrance.id,
    east: pathFromNorthToEast.id,
    south: pathFromNorthToCenter.id,
  };
  northernPathToEntrance.exits = {
    south: thirdRandomLocation.id,
    north: northernEntrance.id,
  };
  northernEntrance.exits = {
    south: northernPathToEntrance.id,
  };
  pathFromNorthToEast.exits = {
    west: thirdRandomLocation.id,
    east: fourthRandomLocation.id,
  };
  fourthRandomLocation.exits = {
    west: pathFromNorthToEast.id,
    south: pathFromNortheastToSouth.id,
  };
  pathFromNortheastToSouth.exits = {
    north: fourthRandomLocation.id,
    south: fifthRandomLocation.id,
  };
  fifthRandomLocation.exits = {
    north: pathFromNortheastToSouth.id,
    east: easternPathToEntrance.id,
    south: pathFromEastToSouth.id,
    west: pathFromEastToCenter.id,
  };
  easternPathToEntrance.exits = {
    west: fifthRandomLocation.id,
    east: easternEntrance.id,
  };
  easternEntrance.exits = {
    west: easternPathToEntrance.id,
  };
  pathFromEastToSouth.exits = {
    north: fifthRandomLocation.id,
    south: sixthRandomLocation.id,
  };
  sixthRandomLocation.exits = {
    north: pathFromEastToSouth.id,
    west: pathFromSouthEastToSouth.id,
  };
  pathFromSouthEastToSouth.exits = {
    east: sixthRandomLocation.id,
    west: seventhRandomLocation.id,
  };
  seventhRandomLocation.exits = {
    north: pathFromSouthToCenter.id,
    east: pathFromSouthEastToSouth.id,
    west: pathFromSouthwestToNorth.id,
    south: southernPathToEntrance.id,
  };
  pathFromWestToSouthwest.exits = {
    east: seventhRandomLocation.id,
    west: eighthRandomLocation.id,
  };
  eighthRandomLocation.exits = {
    east: pathFromWestToSouthwest.id,
    north: pathFromSouthwestToNorth.id,
  };
  pathFromSouthToCenter.exits = {
    west: pathFromSouthwestToNorth.id,
    east: center.id,
  };
  center.exits = {
    west: pathFromSouthToCenter.id,
    east: pathFromEastToCenter.id,
    north: pathFromNorthToCenter.id,
  };
  pathFromWestToCenter.exits = {
    west: westernPath.id,
    east: center.id,
  };
  pathFromEastToCenter.exits = {
    west: center.id,
    east: easternPathToEntrance.id,
  };
  pathFromNorthToCenter.exits = {
    north: northernPathToEntrance.id,
    south: center.id,
  };
  easternEntrance.exits = {
    east: easternPathToEntrance.id,
  };
  northernEntrance.exits = {
    north: northernPathToEntrance.id,
  };
  southernEntrance.exits = {
    south: southernPathToEntrance.id,
  };
  var locationObjects = {};
  locationObjects[`path${increment}`] = westernPath;
  locationObjects[`location_${increment}`] = firstRandomLocation;
  locationObjects[`path${increment + 1}`] = pathFromWestToNorthwest;
  locationObjects[`location_${increment + 1}`] = secondRandomLocation;
  locationObjects[`path${increment + 2}`] = pathFromNorthwestToEast;
  locationObjects[`location_${increment + 2}`] = thirdRandomLocation;
  locationObjects[`path${increment + 3}`] = pathFromNorthToEast;
  locationObjects[`location_${increment + 3}`] = fourthRandomLocation;
  locationObjects[`path${increment + 5}`] = pathFromNortheastToSouth;
  locationObjects[`location_${increment + 4}`] = fifthRandomLocation;
  locationObjects[`path${increment + 6}`] = easternPathToEntrance;
  locationObjects[`location_${increment + 5}`] = sixthRandomLocation;
  locationObjects[`path${increment + 7}`] = pathFromEastToSouth;
  locationObjects[`location_${increment + 6}`] = seventhRandomLocation;
  locationObjects[`path${increment + 8}`] = pathFromSouthEastToSouth;
  locationObjects[`location_${increment + 7}`] = eighthRandomLocation;
  locationObjects[`path${increment + 9}`] = pathFromWestToSouthwest;
  locationObjects[`path${increment + 10}`] = pathFromSouthToCenter;
  locationObjects[`location_${increment + 8}`] = center;
  locationObjects[`path${increment + 11}`] = pathFromWestToCenter;
  locationObjects[`entrance_${increment}`] = westernEntrance;
  locationObjects[`entrance_${increment + 1}`] = easternEntrance;
  locationObjects[`entrance_${increment + 2}`] = northernEntrance;
  locationObjects[`entrance_${increment + 3}`] = southernEntrance;
  mapGrid[targetTile[0]][targetTile[1]] = {};
  mapGrid[targetTile[0]][targetTile[1]][regionId] = locationObjects;
}

function generateForestTile(mapGrid, targetTile) {
  var regionIncrement = getIncrement(mapGrid, "forest");
  var regionId = `forestTile_${regionIncrement}`;
  var increment = 1;
  const randomTypes = [SmallClearing, LargeClearing];
  var westernForestEntrance = new HorizontalForestEntrance(
    `${regionId}.entrance_${increment}`
  );
  var westernPathFromEntrance = new HorizontalForestPath(
    `${regionId}.path_${increment}`
  );
  var firstChoice = Math.floor(Math.random() * randomTypes.length);
  var firstRandomForestLocation = new randomTypes[firstChoice](
    `${regionId}.location_${increment}`,
    getTier(targetTile)
  );
  var pathFromWestToNorthwest = new VerticalForestPath(
    `${regionId}.path_${increment + 1}`,
    getTier(targetTile)
  );
  var secondChoice = Math.floor(Math.random() * randomTypes.length);
  var secondRandomForestLocation = new randomTypes[secondChoice](
    `${regionId}.location_${increment + 1}`,
    getTier(targetTile)
  );
  var pathFromNorthwestToEast = new HorizontalForestPath(
    `${regionId}.path_${increment + 2}`,
    getTier(targetTile)
  );
  var thirdChoice = Math.floor(Math.random() * randomTypes.length);
  var thirdRandomForestLocation = new randomTypes[thirdChoice](
    `${regionId}.location_${increment + 2}`,
    getTier(targetTile)
  );
  var northernPathToEntrance = new VerticalForestPath(
    `${regionId}.path_${increment + 3}`,
    getTier(targetTile)
  );
  var pathFromNorthToEast = new HorizontalForestPath(
    `${regionId}.path_${increment + 3}`,
    getTier(targetTile)
  );
  var fourthChoice = Math.floor(Math.random() * randomTypes.length);
  var fourthRandomForestLocation = new randomTypes[fourthChoice](
    `${regionId}.location_${increment + 3}`,
    getTier(targetTile)
  );
  var pathFromNortheastToSouth = new VerticalForestPath(
    `${regionId}.path_${increment + 2}`,
    getTier(targetTile)
  );
  var fifthChoice = Math.floor(Math.random() * randomTypes.length);
  var fifthRandomForestLocation = new randomTypes[fifthChoice](
    `${regionId}.location_${increment + 4}`,
    getTier(targetTile)
  );
  var easternPathToEntrance = new HorizontalForestPath(
    `${regionId}.path_${increment + 4}`,
    getTier(targetTile)
  );
  var pathFromEastToSouth = new VerticalForestPath(
    `${regionId}.path_${increment + 5}`,
    getTier(targetTile)
  );
  var sixthChoice = Math.floor(Math.random() * randomTypes.length);
  var sixthRandomForestLocation = new randomTypes[sixthChoice](
    `${regionId}.location_${increment + 5}`,
    getTier(targetTile)
  );
  var pathFromSouthEastToSouth = new HorizontalForestPath(
    `${regionId}.path_${increment + 6}`,
    getTier(targetTile)
  );
  var seventhChoice = Math.floor(Math.random() * randomTypes.length);
  var seventhRandomForestLocation = new randomTypes[seventhChoice](
    `${regionId}.location_${increment + 6}`,
    getTier(targetTile)
  );
  var pathFromWestToSouthwest = new VerticalForestPath(
    `${regionId}.path_${increment + 7}`,
    getTier(targetTile)
  );
  var eighthChoice = Math.floor(Math.random() * randomTypes.length);
  var eighthRandomForestLocation = new randomTypes[eighthChoice](
    `${regionId}.location_${increment + 7}`,
    getTier(targetTile)
  );
  var pathFromSouthwestToNorth = new HorizontalForestPath(
    `${regionId}.path_${increment + 8}`,
    getTier(targetTile)
  );
  var pathFromSouthToCenter = new VerticalForestPath(
    `${regionId}.path_${increment + 7}`,
    getTier(targetTile)
  );
  var center = new Crossroads(
    `${regionId}.location_${increment + 7}`,
    getTier(targetTile)
  );
  var pathFromWestToCenter = new HorizontalForestPath(
    `${regionId}.path_${increment + 8}`,
    getTier(targetTile)
  );
  var pathFromEastToCenter = new HorizontalForestPath(
    `${regionId}.path_${increment + 9}`,
    getTier(targetTile)
  );
  var pathFromNorthToCenter = new VerticalForestPath(
    `${regionId}.path_${increment + 10}`,
    getTier(targetTile)
  );
  var southernPathToEntrance = new VerticalForestPath(
    `${regionId}.path_${increment + 11}`,
    getTier(targetTile)
  );
  var easternForestEntrance = new HorizontalForestEntrance(
    `${regionId}.entrance_${increment + 1}`
  );
  var northernForestEntrance = new VerticalForestEntrance(
    `${regionId}.entrance_${increment + 2}`
  );
  var southernForestEntrance = new VerticalForestEntrance(
    `${regionId}.entrance_${increment + 3}`
  );
  southernPathToEntrance.exits = {
    north: seventhRandomForestLocation.id,
    south: southernForestEntrance.id,
  };
  southernForestEntrance.exits = {
    north: southernPathToEntrance.id,
  };
  westernForestEntrance.exits = {
    east: westernPathFromEntrance.id,
  };
  westernPathFromEntrance.exits = {
    west: westernForestEntrance.id,
    east: firstRandomForestLocation.id,
  };
  firstRandomForestLocation.exits = {
    west: westernPathFromEntrance.id,
    north: pathFromWestToNorthwest.id,
    east: pathFromWestToCenter.id,
    south: pathFromSouthwestToNorth.id,
  };
  firstRandomForestLocation.description =
    firstRandomForestLocation.description +
    " " +
    "The forest path continues in all directions.";
  pathFromWestToNorthwest.exits = {
    north: secondRandomForestLocation.id,
    south: firstRandomForestLocation.id,
  };
  secondRandomForestLocation.exits = {
    east: pathFromNorthwestToEast.id,
    south: pathFromWestToNorthwest.id,
  };
  secondRandomForestLocation.description =
    secondRandomForestLocation.description +
    " " +
    "The forest path continues to the east and south.";
  pathFromNorthwestToEast.exits = {
    west: secondRandomForestLocation.id,
    east: thirdRandomForestLocation.id,
  };
  thirdRandomForestLocation.exits = {
    north: northernPathToEntrance.id,
    east: pathFromNorthToEast.id,
    west: pathFromNorthwestToEast.id,
    south: pathFromNorthToCenter.id,
  };
  thirdRandomForestLocation.description =
    thirdRandomForestLocation.description +
    " " +
    "The forest path continues in all directions.";
  northernPathToEntrance.exits = {
    north: northernForestEntrance.id,
    south: thirdRandomForestLocation.id,
  };
  pathFromNorthToEast.exits = {
    east: fourthRandomForestLocation.id,
    west: thirdRandomForestLocation.id,
  };
  fourthRandomForestLocation.exits = {
    west: pathFromNorthToEast.id,
    south: pathFromNortheastToSouth.id,
  };
  fourthRandomForestLocation.description =
    fourthRandomForestLocation.description +
    " " +
    "The forest path continues to the west and south.";
  pathFromNortheastToSouth.exits = {
    north: fourthRandomForestLocation.id,
    south: fifthRandomForestLocation.id,
  };
  fifthRandomForestLocation.exits = {
    north: pathFromNortheastToSouth.id,
    east: easternPathToEntrance.id,
    south: pathFromEastToSouth.id,
    west: pathFromEastToCenter.id,
  };
  fifthRandomForestLocation.description =
    fifthRandomForestLocation.description +
    " " +
    "The forest path continues in all directions.";
  easternPathToEntrance.exits = {
    west: fifthRandomForestLocation.id,
    east: easternForestEntrance.id,
  };
  pathFromEastToSouth.exits = {
    north: fifthRandomForestLocation.id,
    south: sixthRandomForestLocation.id,
  };
  sixthRandomForestLocation.exits = {
    north: pathFromEastToSouth.id,
    west: pathFromSouthEastToSouth.id,
  };
  sixthRandomForestLocation.description =
    sixthRandomForestLocation.description +
    " " +
    "The forest path continues to the north and west.";
  pathFromSouthEastToSouth.exits = {
    east: sixthRandomForestLocation.id,
    west: seventhRandomForestLocation.id,
  };
  seventhRandomForestLocation.exits = {
    east: pathFromSouthEastToSouth.id,
    north: pathFromSouthToCenter.id,
    west: pathFromWestToSouthwest.id,
    south: southernPathToEntrance.id,
  };
  seventhRandomForestLocation.description =
    seventhRandomForestLocation.description +
    " " +
    "The forest path continues in all directions.";
  pathFromWestToSouthwest.exits = {
    west: eighthRandomForestLocation.id,
    east: seventhRandomForestLocation.id,
  };
  eighthRandomForestLocation.exits = {
    east: pathFromWestToSouthwest.id,
    north: pathFromSouthwestToNorth.id,
  };
  eighthRandomForestLocation.description =
    eighthRandomForestLocation.description +
    " " +
    "The forest path continues to the east and north.";
  pathFromSouthwestToNorth.exits = {
    north: firstRandomForestLocation.id,
    south: eighthRandomForestLocation.id,
  };
  pathFromSouthToCenter.exits = {
    north: center.id,
    south: seventhRandomForestLocation.id,
  };
  center.exits = {
    east: pathFromWestToCenter.id,
    north: pathFromSouthToCenter.id,
    west: pathFromEastToCenter.id,
    south: pathFromNorthToCenter.id,
  };
  pathFromWestToCenter.exits = {
    east: center.id,
    west: firstRandomForestLocation.id,
  };
  pathFromEastToCenter.exits = {
    east: fifthRandomForestLocation.id,
    west: center.id,
  };
  pathFromNorthToCenter.exits = {
    north: thirdRandomForestLocation.id,
    south: center.id,
  };
  var locationObjects = {};
  locationObjects[`entrance_${increment}`] = westernForestEntrance;
  locationObjects[`entrance_${increment + 1}`] = easternForestEntrance;
  locationObjects[`entrance_${increment + 2}`] = northernForestEntrance;
  locationObjects[`entrance_${increment + 3}`] = southernForestEntrance;
  locationObjects[`path_${increment}`] = westernPathFromEntrance;
  locationObjects[`location_${increment}`] = firstRandomForestLocation;
  locationObjects[`path_${increment + 1}`] = pathFromWestToNorthwest;
  locationObjects[`location_${increment + 1}`] = secondRandomForestLocation;
  locationObjects[`path_${increment + 2}`] = pathFromNorthwestToEast;
  locationObjects[`location_${increment + 2}`] = thirdRandomForestLocation;
  locationObjects[`path_${increment + 3}`] = northernPathToEntrance;
  locationObjects[`path_${increment + 3}`] = pathFromNorthToEast;
  locationObjects[`location_${increment + 3}`] = fourthRandomForestLocation;
  locationObjects[`path_${increment + 4}`] = pathFromNortheastToSouth;
  locationObjects[`location_${increment + 4}`] = fifthRandomForestLocation;
  locationObjects[`path_${increment + 5}`] = pathFromEastToSouth;
  locationObjects[`location_${increment + 5}`] = sixthRandomForestLocation;
  locationObjects[`path_${increment + 6}`] = pathFromSouthEastToSouth;
  locationObjects[`location_${increment + 6}`] = seventhRandomForestLocation;
  locationObjects[`path_${increment + 7}`] = pathFromWestToSouthwest;
  locationObjects[`location_${increment + 7}`] = eighthRandomForestLocation;
  locationObjects[`path_${increment + 8}`] = pathFromSouthwestToNorth;
  locationObjects[`path_${increment + 7}`] = pathFromSouthToCenter;
  locationObjects[`location_${increment + 7}`] = center;
  locationObjects[`path_${increment + 8}`] = pathFromWestToCenter;
  locationObjects[`path_${increment + 9}`] = pathFromEastToCenter;
  locationObjects[`path_${increment + 10}`] = pathFromNorthToCenter;
  mapGrid[targetTile[0]][targetTile[1]] = {};
  mapGrid[targetTile[0]][targetTile[1]][regionId] = locationObjects;
}

function generateDesertTile(mapGrid, targetTile) {
  var regionIncrement = getIncrement(mapGrid, "desert");
  var regionId = `desertTile_${regionIncrement}`;
  var locationObjects = {};
  var increment = getIncrement(mapGrid, `${regionId}.entrance`);
  var westernDesertEntrance = new HorizontalDesertEntrance(
    `${regionId}.entrance_${increment}`
  );
  var easternDesertEntrance = new HorizontalDesertEntrance(
    `${regionId}.entrance_${increment + 1}`
  );
  var northernDesertEntrance = new VerticalDesertEntrance(
    `${regionId}.entrance_${increment + 2}`
  );
  var southernDesertEntrance = new VerticalDesertEntrance(
    `${regionId}.entrance_${increment + 3}`
  );
  increment = 1;
  locationObjects[`entrance_${increment}`] = westernDesertEntrance;
  locationObjects[`entrance_${increment + 1}`] = easternDesertEntrance;
  locationObjects[`entrance_${increment + 2}`] = northernDesertEntrance;
  locationObjects[`entrance_${increment + 3}`] = southernDesertEntrance;
  mapGrid[targetTile[0]][targetTile[1]] = {};
  mapGrid[targetTile[0]][targetTile[1]][regionId] = locationObjects;
}

function generateMountainTile(mapGrid, targetTile) {
  var regionIncrement = getIncrement(mapGrid, "mountain");
  var regionId = `mountainTile_${regionIncrement}`;
  var increment = getIncrement(mapGrid, `${regionId}.entrance`);
  var locationObjects = {};
  var westernMountainEntrance = new HorizontalMountainEntrance(
    `${regionId}.entrance_${increment}`
  );
  var easternMountainEntrance = new HorizontalMountainEntrance(
    `${regionId}.entrance_${increment + 1}`
  );
  var northernMountainEntrance = new VerticalMountainEntrance(
    `${regionId}.entrance_${increment + 2}`
  );
  var southernMountainEntrance = new VerticalMountainEntrance(
    `${regionId}.entrance_${increment + 3}`
  );
  increment = 1;
  locationObjects[`entrance_${increment}`] = westernMountainEntrance;
  locationObjects[`entrance_${increment + 1}`] = easternMountainEntrance;
  locationObjects[`entrance_${increment + 2}`] = northernMountainEntrance;
  locationObjects[`entrance_${increment + 3}`] = southernMountainEntrance;
  mapGrid[targetTile[0]][targetTile[1]] = {};
  mapGrid[targetTile[0]][targetTile[1]][regionId] = locationObjects;
}

function generateVolcanoTile(mapGrid, targetTile) {
  var regionIncrement = getIncrement(mapGrid, "volcano");
  var regionId = `volcanoTile_${regionIncrement}`;
  var increment = getIncrement(mapGrid, `${regionId}.entrance`);
  var locationObjects = {};
  var westernVolcanicEntrance = new HorizontalVolcanicEntrance(
    `${regionId}.entrance_${increment}`
  );
  var easternVolcanicEntrance = new HorizontalVolcanicEntrance(
    `${regionId}.entrance_${increment + 1}`
  );
  var northernVolcanicEntrance = new VerticalVolcanicEntrance(
    `${regionId}.entrance_${increment + 2}`
  );
  var southernVolcanicEntrance = new VerticalVolcanicEntrance(
    `${regionId}.entrance_${increment + 3}`
  );
  increment = 1;
  locationObjects[`entrance_${increment}`] = westernVolcanicEntrance;
  locationObjects[`entrance_${increment + 1}`] = easternVolcanicEntrance;
  locationObjects[`entrance_${increment + 2}`] = northernVolcanicEntrance;
  locationObjects[`entrance_${increment + 3}`] = southernVolcanicEntrance;
  mapGrid[targetTile[0]][targetTile[1]] = {};
  mapGrid[targetTile[0]][targetTile[1]][regionId] = locationObjects;
}

function generateShoreTile(mapGrid, targetTile) {
  var regionIncrement = getIncrement(mapGrid, "shore");
  var regionId = `shoreTile_${regionIncrement}`;
  var increment = getIncrement(mapGrid, `${regionId}.entrance`);
  var locationObjects = {};
  var westernShoreEntrance = new HorizontalShoreEntrance(
    `${regionId}.entrance_${increment}`
  );
  var easternShoreEntrance = new HorizontalShoreEntrance(
    `${regionId}.entrance_${increment + 1}`
  );
  var northernShoreEntrance = new VerticalShoreEntrance(
    `${regionId}.entrance_${increment + 2}`
  );
  var southernShoreEntrance = new VerticalShoreEntrance(
    `${regionId}.entrance_${increment + 3}`
  );
  increment = 1;
  locationObjects[`entrance_${increment}`] = westernShoreEntrance;
  locationObjects[`entrance_${increment + 1}`] = easternShoreEntrance;
  locationObjects[`entrance_${increment + 2}`] = northernShoreEntrance;
  locationObjects[`entrance_${increment + 3}`] = southernShoreEntrance;
  mapGrid[targetTile[0]][targetTile[1]] = {};
  mapGrid[targetTile[0]][targetTile[1]][regionId] = locationObjects;
}

function generateRiverTile(mapGrid, targetTile) {
  var regionIncrement = getIncrement(mapGrid, "river");
  var regionId = `riverTile_${regionIncrement}`;
  var increment = getIncrement(mapGrid, `${regionId}.entrance`);
  var locationObjects = {};
  var westernRiverEntrance = new HorizontalRiverEntrance(
    `${regionId}.entrance_${increment}`
  );
  var easternRiverEntrance = new HorizontalRiverEntrance(
    `${regionId}.entrance_${increment + 1}`
  );
  var northernRiverEntrance = new VerticalRiverEntrance(
    `${regionId}.entrance_${increment + 2}`
  );
  var southernRiverEntrance = new VerticalRiverEntrance(
    `${regionId}.entrance_${increment + 3}`
  );
  increment = 1;
  locationObjects[`entrance_${increment}`] = westernRiverEntrance;
  locationObjects[`entrance_${increment + 1}`] = easternRiverEntrance;
  locationObjects[`entrance_${increment + 2}`] = northernRiverEntrance;
  locationObjects[`entrance_${increment + 3}`] = southernRiverEntrance;
  mapGrid[targetTile[0]][targetTile[1]] = {};
  mapGrid[targetTile[0]][targetTile[1]][regionId] = locationObjects;
}

function generateParagonCityTile(mapGrid, targetTile) {
  var regionId = "paragonCity";
  var increment = getIncrement(mapGrid, `${regionId}.entrance`);
  var locationObjects = {};
  var westernParagonCityEntrance = new HorizontalParagonCityEntrance(
    `${regionId}.entrance_${increment}`
  );
  var easternParagonCityEntrance = new HorizontalParagonCityEntrance(
    `${regionId}.entrance_${increment + 1}`
  );
  var northernParagonCityEntrance = new VerticalParagonCityEntrance(
    `${regionId}.entrance_${increment + 2}`
  );
  var southernParagonCityEntrance = new VerticalParagonCityEntrance(
    `${regionId}.entrance_${increment + 3}`
  );
  increment = 1;
  locationObjects[`entrance_${increment}`] = westernParagonCityEntrance;
  locationObjects[`entrance_${increment + 1}`] = easternParagonCityEntrance;
  locationObjects[`entrance_${increment + 2}`] = northernParagonCityEntrance;
  locationObjects[`entrance_${increment + 3}`] = southernParagonCityEntrance;
  mapGrid[targetTile[0]][targetTile[1]] = {};
  mapGrid[targetTile[0]][targetTile[1]][regionId] = locationObjects;
}

function generateLibertyCityTile(mapGrid, targetTile) {
  var regionId = "libertyCity";
  var increment = getIncrement(mapGrid, `${regionId}.entrance`);
  var locationObjects = {};
  var westernLibertyCityEntrance = new HorizontalLibertyCityEntrance(
    `${regionId}.entrance_${increment}`
  );
  var easternLibertyCityEntrance = new HorizontalLibertyCityEntrance(
    `${regionId}.entrance_${increment + 1}`
  );
  var northernLibertyCityEntrance = new VerticalLibertyCityEntrance(
    `${regionId}.entrance_${increment + 2}`
  );
  var southernLibertyCityEntrance = new VerticalLibertyCityEntrance(
    `${regionId}.entrance_${increment + 3}`
  );
  increment = 1;
  locationObjects[`entrance_${increment}`] = westernLibertyCityEntrance;
  locationObjects[`entrance_${increment + 1}`] = easternLibertyCityEntrance;
  locationObjects[`entrance_${increment + 2}`] = northernLibertyCityEntrance;
  locationObjects[`entrance_${increment + 3}`] = southernLibertyCityEntrance;
  mapGrid[targetTile[0]][targetTile[1]] = {};
  mapGrid[targetTile[0]][targetTile[1]][regionId] = locationObjects;
}

function generate9x9Grid(roomTypes, pathTypes, tier, baseId) {
  const {
    HorizontalForestPath,
    VerticalForestPath,
  } = require("./class_collections/locations/generated/forest");
  const {
    HorizontalDesertPath,
    VerticalDesertPath,
  } = require("./class_collections/locations/generated/desert");
  const {
    HorizontalMountainPath,
    VerticalMountainPath,
  } = require("./class_collections/locations/generated/mountain");
  const {
    HorizontalVolcanicPath,
    VerticalVolcanicPath,
  } = require("./class_collections/locations/generated/volcano");
  const {
    HorizontalBeachPath,
    VerticalBeachPath,
  } = require("./class_collections/locations/generated/shore");
  const {
    HorizontalBridge,
    VerticalBridge,
  } = require("./class_collections/locations/generated/river");
  const {
    HorizontalParagonCityPath,
    VerticalParagonCityPath,
  } = require("./class_collections/locations/paragon_city/paragon_city");
  const {
    HorizontalLibertyCityPath,
    VerticalLibertyCityPath,
  } = require("./class_collections/locations/liberty_city/liberty_city");
  const gridSize = 3;
  var horizontalPath = pathTypes[0];
  var verticalPath = pathTypes[1];
  var interiorGrid = Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(null));
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let roomType = getRandomRoomType(roomTypes);
      let roomId = `${baseId}.room_${row}_${col}`;
      interiorGrid[row][col] = createRoom(roomType, roomId, tier);
    }
  }
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (row % 2 == 0 && col % 2 == 0) {
        let pathType = Math.random() > 0.5 ? horizontalPath : verticalPath;
        interiorGrid[row][col][baseId] = createRoom(
          pathType,
          `${baseId}.room_${row}_${col}`,
          tier
        );
        console.log(interiorGrid[row][col][baseId]);
      }
    }
  }
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let room = interiorGrid[row][col];
      room.exits = {};
      if (room.type == horizontalPath) {
        if (col > 0) {
          room.exits["west"] = interiorGrid[row][col - 1].id;
        } else if (col < gridSize - 1) {
          room.exits["east"] = interiorGrid[row][col + 1].id;
        } else if (row > 0) {
          room.exits["north"] = interiorGrid[row - 1][col].id;
        } else if (row < gridSize - 1) {
          room.exits["south"] = interiorGrid[row + 1][col].id;
        }
      } else if (room.type == verticalPath) {
        if (row > 0) {
          room.exits["north"] = interiorGrid[row - 1][col].id;
        } else if (row < gridSize - 1) {
          room.exits["south"] = interiorGrid[row + 1][col].id;
        } else if (col > 0) {
          room.exits["west"] = interiorGrid[row][col - 1].id;
        } else if (col < gridSize - 1) {
          room.exits["east"] = interiorGrid[row][col + 1].id;
        }
      } else {
        if (row > 0) {
          room.exits["north"] = interiorGrid[row - 1][col].id;
        }
        if (row < gridSize - 1) {
          room.exits["south"] = interiorGrid[row + 1][col].id;
        }
        if (col > 0) {
          room.exits["west"] = interiorGrid[row][col - 1].id;
        }
        if (col < gridSize - 1) {
          room.exits["east"] = interiorGrid[row][col + 1].id;
        }
      }
    }
  }
  return interiorGrid;
}

function getRandomRoomType(roomTypes) {
  return roomTypes[Math.floor(Math.random() * roomTypes.length)];
}

function createRoom(type, id, tier) {
  const {
    HorizontalForestPath,
    VerticalForestPath,
    SmallClearing,
    LargeClearing,
    Crossroads,
  } = require("./class_collections/locations/generated/forest");
  const {
    HorizontalDesertPath,
    VerticalDesertPath,
    SmallDunes,
    LargeDunes,
    SmallOasis,
    LargeOasis,
  } = require("./class_collections/locations/generated/desert");
  const {
    HorizontalMountainPath,
    VerticalMountainPath,
    MountainPeak,
    BoulderField,
    Cave,
  } = require("./class_collections/locations/generated/mountain");
  const {
    HorizontalVolcanicPath,
    VerticalVolcanicPath,
    LavaLake,
    LavaFlow,
    LavaCave,
  } = require("./class_collections/locations/generated/volcano");
  const {
    HorizontalBeachPath,
    VerticalBeachPath,
    Beach,
    Tidepool,
    CoralReef,
  } = require("./class_collections/locations/generated/shore");
  const {
    HorizontalBridge,
    VerticalBridge,
    RiverBank,
  } = require("./class_collections/locations/generated/river");
  const {
    HorizontalParagonCityPath,
    VerticalParagonCityPath,
    CitySquare,
  } = require("./class_collections/locations/paragon_city/paragon_city");
  const {
    HorizontalLibertyCityPath,
    VerticalLibertyCityPath,
  } = require("./class_collections/locations/liberty_city/liberty_city");
  return eval(`new ${type}('${id}', ${tier})`);
}

function linkRegions(mapGrid) {
  for (let i = 0; i < mapGrid.length; i++) {
    for (let j = 0; j < mapGrid[i].length; j++) {
      try {
        var room = mapGrid[i][j];
        var keys = Object.keys(room);
        for (let k = 0; k < keys.length; k++) {
          var secondaryRoom = room[keys[k]];
          var secondaryKeys = Object.keys(secondaryRoom);
          for (let l = 0; l < secondaryKeys.length; l++) {
            console.log(secondaryRoom[secondaryKeys[l]]);
            var primaryId = secondaryRoom[secondaryKeys[l]].id;
            if (
              primaryId.includes("entrance") ||
              primaryId.includes("oceanTile")
            ) {
              if (primaryId.includes("1") || primaryId.includes("oceanTile")) {
                if (j > 0) {
                  var westernRoom = mapGrid[i][j - 1];
                  var westernKeys = Object.keys(westernRoom);
                  for (let m = 0; m < westernKeys.length; m++) {
                    var westernSecondaryRoom = westernRoom[westernKeys[m]];
                    var westernSecondaryKeys =
                      Object.keys(westernSecondaryRoom);
                    for (let n = 0; n < westernSecondaryKeys.length; n++) {
                      var westernId =
                        westernSecondaryRoom[westernSecondaryKeys[n]].id;
                      if (
                        westernId.includes("entrance") ||
                        westernId.includes("oceanTile")
                      ) {
                        secondaryRoom[secondaryKeys[l]].exits["west"] =
                          westernSecondaryRoom[westernSecondaryKeys[n]].id;
                      }
                    }
                  }
                }
              }
              if (primaryId.includes("2") || primaryId.includes("oceanTile")) {
                if (j < mapGrid[i].length - 1) {
                  var easternRoom = mapGrid[i][j + 1];
                  var easternKeys = Object.keys(easternRoom);
                  for (let m = 0; m < easternKeys.length; m++) {
                    var easternSecondaryRoom = easternRoom[easternKeys[m]];
                    var easternSecondaryKeys =
                      Object.keys(easternSecondaryRoom);
                    for (let n = 0; n < easternSecondaryKeys.length; n++) {
                      var easternId =
                        easternSecondaryRoom[easternSecondaryKeys[n]].id;
                      if (
                        easternId.includes("entrance") ||
                        easternId.includes("oceanTile")
                      ) {
                        secondaryRoom[secondaryKeys[l]].exits["east"] =
                          easternSecondaryRoom[easternSecondaryKeys[n]].id;
                      }
                    }
                  }
                }
              }
              if (primaryId.includes("3") || primaryId.includes("oceanTile")) {
                if (i > 0) {
                  var northernRoom = mapGrid[i - 1][j];
                  var northernKeys = Object.keys(northernRoom);
                  for (let m = 0; m < northernKeys.length; m++) {
                    var northernSecondaryRoom = northernRoom[northernKeys[m]];
                    var northernSecondaryKeys = Object.keys(
                      northernSecondaryRoom
                    );
                    for (let n = 0; n < northernSecondaryKeys.length; n++) {
                      var northernId =
                        northernSecondaryRoom[northernSecondaryKeys[n]].id;
                      if (
                        northernId.includes("entrance") ||
                        northernId.includes("oceanTile")
                      ) {
                        secondaryRoom[secondaryKeys[l]].exits["north"] =
                          northernSecondaryRoom[northernSecondaryKeys[n]].id;
                      }
                    }
                  }
                }
              }
              if (primaryId.includes("4") || primaryId.includes("oceanTile")) {
                if (i < mapGrid.length - 1) {
                  var southernRoom = mapGrid[i + 1][j];
                  var southernKeys = Object.keys(southernRoom);
                  for (let m = 0; m < southernKeys.length; m++) {
                    var southernSecondaryRoom = southernRoom[southernKeys[m]];
                    var southernSecondaryKeys = Object.keys(
                      southernSecondaryRoom
                    );
                    for (let n = 0; n < southernSecondaryKeys.length; n++) {
                      var southernId =
                        southernSecondaryRoom[southernSecondaryKeys[n]].id;
                      if (
                        southernId.includes("entrance") ||
                        southernId.includes("oceanTile")
                      ) {
                        secondaryRoom[secondaryKeys[l]].exits["south"] =
                          southernSecondaryRoom[southernSecondaryKeys[n]].id;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } catch (error) {
        continue;
      }
    }
  }
}

module.exports = {
  generateMap,
  mapGrid,
};
