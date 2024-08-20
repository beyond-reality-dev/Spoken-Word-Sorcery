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

function generateMap(map) {
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
  generateRegions(map); // Generate regions for each cell
  return mapGrid;
}

function partiallyGenerateMap(map) {
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
        generateForestTile(mapGrid, [i, j]);
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
      }
    }
  }
}

function getIncrement(mapGrid, roomType) {
  var increment = 1;
  for (let i = 0; i < mapGrid.length; i++) {
    for (let j = 0; j < mapGrid[i].length; j++) {
      if (mapGrid[i][j].hasOwnProperty("id")) {
        var id = mapGrid[i][j].id;
        if (id.includes(roomType)) {
          id = id.split("_");
          id = id[1];
          id = parseInt(id);
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
  var oceanTile = new Ocean(`oceanTile_${increment}`);
  mapGrid[targetTile[0]][targetTile[1]] = oceanTile;
}

const {
  HorizontalForestEntrance,
  VerticalForestEntrance,
} = require("./class_collections/locations/generated/forest");
const {
  HorizontalDesertEntrance,
  VerticalDesertEntrance,
} = require("./class_collections/locations/generated/desert");
const {
  HorizontalMountainEntrance,
  VerticalMountainEntrance,
} = require("./class_collections/locations/generated/mountain");
const {
  HorizontalVolcanicEntrance,
  VerticalVolcanicEntrance,
} = require("./class_collections/locations/generated/volcano");
const {
  HorizontalShoreEntrance,
  VerticalShoreEntrance,
} = require("./class_collections/locations/generated/shore");
const {
  HorizontalRiverEntrance,
  VerticalRiverEntrance,
} = require("./class_collections/locations/generated/river");
const {
  HorizontalParagonCityEntrance,
  VerticalParagonCityEntrance,
} = require("./class_collections/locations/paragon_city/paragon_city");
const {
  HorizontalLibertyCityEntrance,
  VerticalLibertyCityEntrance,
} = require("./class_collections/locations/liberty_city/liberty_city");

function generateForestTile(mapGrid, targetTile) {
  var increment = getIncrement(mapGrid, "forestEntrance");
  var westernForestEntrance = new HorizontalForestEntrance(
    `forestEntrance_${increment}`
  );
  var easternForestEntrance = new HorizontalForestEntrance(
    `forestEntrance_${increment + 1}`
  );
  var northernForestEntrance = new VerticalForestEntrance(
    `forestEntrance_${increment + 2}`
  );
  var southernForestEntrance = new VerticalForestEntrance(
    `forestEntrance_${increment + 3}`
  );
  mapGrid[targetTile[0]][targetTile[1]] = {};
  mapGrid[targetTile[0]][targetTile[1]]["west"] = westernForestEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["east"] = easternForestEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["north"] = northernForestEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["south"] = southernForestEntrance;
  var roomTypes = ["SmallClearing", "LargeClearing", "Crossroads"];
  var pathTypes = ["HorizontalForestPath", "VerticalForestPath"];
  var tier = getTier(targetTile);
  var baseId = `interior`;
  var interiorGrid = generate9x9Grid(roomTypes, pathTypes, tier, baseId);
  mapGrid[targetTile[0]][targetTile[1]]["interior"] = interiorGrid;
  mapGrid[targetTile[0]][targetTile[1]]["west"].exits["east"] =
    interiorGrid[1][0].id;
  mapGrid[targetTile[0]][targetTile[1]]["east"].exits["west"] =
    interiorGrid[1][2].id;
  mapGrid[targetTile[0]][targetTile[1]]["north"].exits["south"] =
    interiorGrid[0][1].id;
  mapGrid[targetTile[0]][targetTile[1]]["south"].exits["north"] =
    interiorGrid[2][1].id;
}

function generateDesertTile(mapGrid, targetTile) {
  var increment = getIncrement(mapGrid, "desertEntrance");
  var westernDesertEntrance = new HorizontalDesertEntrance(
    `desertEntrance_${increment}`
  );
  var easternDesertEntrance = new HorizontalDesertEntrance(
    `desertEntrance_${increment + 1}`
  );
  var northernDesertEntrance = new VerticalDesertEntrance(
    `desertEntrance_${increment + 2}`
  );
  var southernDesertEntrance = new VerticalDesertEntrance(
    `desertEntrance_${increment + 3}`
  );
  mapGrid[targetTile[0]][targetTile[1]] = {};
  mapGrid[targetTile[0]][targetTile[1]]["west"] = westernDesertEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["east"] = easternDesertEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["north"] = northernDesertEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["south"] = southernDesertEntrance;
  var roomTypes = ["SmallDunes", "LargeDunes", "SmallOasis", "LargeOasis"];
  var pathTypes = ["HorizontalDesertPath", "VerticalDesertPath"];
  var tier = getTier(targetTile);
  var baseId = `interior`;
  var interiorGrid = generate9x9Grid(roomTypes, pathTypes, tier, baseId);
  mapGrid[targetTile[0]][targetTile[1]]["interior"] = interiorGrid;
  mapGrid[targetTile[0]][targetTile[1]]["west"].exits["east"] =
    interiorGrid[1][0].id;
  mapGrid[targetTile[0]][targetTile[1]]["east"].exits["west"] =
    interiorGrid[1][2].id;
  mapGrid[targetTile[0]][targetTile[1]]["north"].exits["south"] =
    interiorGrid[0][1].id;
  mapGrid[targetTile[0]][targetTile[1]]["south"].exits["north"] =
    interiorGrid[2][1].id;
}

function generateMountainTile(mapGrid, targetTile) {
  var increment = getIncrement(mapGrid, "mountainEntrance");
  var westernMountainEntrance = new HorizontalMountainEntrance(
    `mountainEntrance_${increment}`
  );
  var easternMountainEntrance = new HorizontalMountainEntrance(
    `mountainEntrance_${increment + 1}`
  );
  var northernMountainEntrance = new VerticalMountainEntrance(
    `mountainEntrance_${increment + 2}`
  );
  var southernMountainEntrance = new VerticalMountainEntrance(
    `mountainEntrance_${increment + 3}`
  );
  mapGrid[targetTile[0]][targetTile[1]] = {};
  mapGrid[targetTile[0]][targetTile[1]]["west"] = westernMountainEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["east"] = easternMountainEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["north"] = northernMountainEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["south"] = southernMountainEntrance;
  var roomTypes = ["MountainPeak", "BoulderField", "Cave"];
  var pathTypes = ["HorizontalMountainPath", "VerticalMountainPath"];
  var tier = getTier(targetTile);
  var baseId = `interior`;
  var interiorGrid = generate9x9Grid(roomTypes, pathTypes, tier, baseId);
  mapGrid[targetTile[0]][targetTile[1]]["interior"] = interiorGrid;
  mapGrid[targetTile[0]][targetTile[1]]["west"].exits["east"] =
    interiorGrid[1][0].id;
  mapGrid[targetTile[0]][targetTile[1]]["east"].exits["west"] =
    interiorGrid[1][2].id;
  mapGrid[targetTile[0]][targetTile[1]]["north"].exits["south"] =
    interiorGrid[0][1].id;
  mapGrid[targetTile[0]][targetTile[1]]["south"].exits["north"] =
    interiorGrid[2][1].id;
}

function generateVolcanoTile(mapGrid, targetTile) {
  var increment = getIncrement(mapGrid, "volcanicEntrance");
  var westernVolcanicEntrance = new HorizontalVolcanicEntrance(
    `volcanicEntrance_${increment}`
  );
  var easternVolcanicEntrance = new HorizontalVolcanicEntrance(
    `volcanicEntrance_${increment + 1}`
  );
  var northernVolcanicEntrance = new VerticalVolcanicEntrance(
    `volcanicEntrance_${increment + 2}`
  );
  var southernVolcanicEntrance = new VerticalVolcanicEntrance(
    `volcanicEntrance_${increment + 3}`
  );
  mapGrid[targetTile[0]][targetTile[1]] = {};
  mapGrid[targetTile[0]][targetTile[1]]["west"] = westernVolcanicEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["east"] = easternVolcanicEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["north"] = northernVolcanicEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["south"] = southernVolcanicEntrance;
  var roomTypes = ["LavaLake", "LavaFlow", "LavaCave"];
  var pathTypes = ["HorizontalVolcanicPath", "VerticalVolcanicPath"];
  var tier = getTier(targetTile);
  var baseId = `interior`;
  var interiorGrid = generate9x9Grid(roomTypes, pathTypes, tier, baseId);
  mapGrid[targetTile[0]][targetTile[1]]["interior"] = interiorGrid;
  mapGrid[targetTile[0]][targetTile[1]]["west"].exits["east"] =
    interiorGrid[1][0].id;
  mapGrid[targetTile[0]][targetTile[1]]["east"].exits["west"] =
    interiorGrid[1][2].id;
  mapGrid[targetTile[0]][targetTile[1]]["north"].exits["south"] =
    interiorGrid[0][1].id;
  mapGrid[targetTile[0]][targetTile[1]]["south"].exits["north"] =
    interiorGrid[2][1].id;
}

function generateShoreTile(mapGrid, targetTile) {
  var increment = getIncrement(mapGrid, "shoreEntrance");
  var westernShoreEntrance = new HorizontalShoreEntrance(
    `shoreEntrance_${increment}`
  );
  var easternShoreEntrance = new HorizontalShoreEntrance(
    `shoreEntrance_${increment + 1}`
  );
  var northernShoreEntrance = new VerticalShoreEntrance(
    `shoreEntrance_${increment + 2}`
  );
  var southernShoreEntrance = new VerticalShoreEntrance(
    `shoreEntrance_${increment + 3}`
  );
  mapGrid[targetTile[0]][targetTile[1]] = {};
  mapGrid[targetTile[0]][targetTile[1]]["west"] = westernShoreEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["east"] = easternShoreEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["north"] = northernShoreEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["south"] = southernShoreEntrance;
  var roomTypes = ["Beach", "Tidepool", "CoralReef"];
  var pathTypes = ["HorizontalBeachPath", "VerticalBeachPath"];
  var tier = getTier(targetTile);
  var baseId = `interior`;
  var interiorGrid = generate9x9Grid(roomTypes, pathTypes, tier, baseId);
  mapGrid[targetTile[0]][targetTile[1]]["interior"] = interiorGrid;
  mapGrid[targetTile[0]][targetTile[1]]["west"].exits["east"] =
    interiorGrid[1][0].id;
  mapGrid[targetTile[0]][targetTile[1]]["east"].exits["west"] =
    interiorGrid[1][2].id;
  mapGrid[targetTile[0]][targetTile[1]]["north"].exits["south"] =
    interiorGrid[0][1].id;
  mapGrid[targetTile[0]][targetTile[1]]["south"].exits["north"] =
    interiorGrid[2][1].id;
}

function generateRiverTile(mapGrid, targetTile) {
  var increment = getIncrement(mapGrid, "riverEntrance");
  var westernRiverEntrance = new HorizontalRiverEntrance(
    `riverEntrance_${increment}`
  );
  var easternRiverEntrance = new HorizontalRiverEntrance(
    `riverEntrance_${increment + 1}`
  );
  var northernRiverEntrance = new VerticalRiverEntrance(
    `riverEntrance_${increment + 2}`
  );
  var southernRiverEntrance = new VerticalRiverEntrance(
    `riverEntrance_${increment + 3}`
  );
  mapGrid[targetTile[0]][targetTile[1]] = {};
  mapGrid[targetTile[0]][targetTile[1]]["west"] = westernRiverEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["east"] = easternRiverEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["north"] = northernRiverEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["south"] = southernRiverEntrance;
  var roomTypes = ["RiverBank"];
  var pathTypes = ["HorizontalBridge", "VerticalBridge"];
  var tier = getTier(targetTile);
  var baseId = `interior`;
  var interiorGrid = generate9x9Grid(roomTypes, pathTypes, tier, baseId);
  mapGrid[targetTile[0]][targetTile[1]]["interior"] = interiorGrid;
  mapGrid[targetTile[0]][targetTile[1]]["west"].exits["east"] =
    interiorGrid[1][0].id;
  mapGrid[targetTile[0]][targetTile[1]]["east"].exits["west"] =
    interiorGrid[1][2].id;
  mapGrid[targetTile[0]][targetTile[1]]["north"].exits["south"] =
    interiorGrid[0][1].id;
  mapGrid[targetTile[0]][targetTile[1]]["south"].exits["north"] =
    interiorGrid[2][1].id;
}

function generateParagonCityTile(mapGrid, targetTile) {
  var increment = getIncrement(mapGrid, "paragonCityEntrance");
  var westernParagonCityEntrance = new HorizontalParagonCityEntrance(
    `paragonCityEntrance_${increment}`
  );
  var easternParagonCityEntrance = new HorizontalParagonCityEntrance(
    `paragonCityEntrance_${increment + 1}`
  );
  var northernParagonCityEntrance = new VerticalParagonCityEntrance(
    `paragonCityEntrance_${increment + 2}`
  );
  var southernParagonCityEntrance = new VerticalParagonCityEntrance(
    `paragonCityEntrance_${increment + 3}`
  );
  mapGrid[targetTile[0]][targetTile[1]] = {};
  mapGrid[targetTile[0]][targetTile[1]]["west"] = westernParagonCityEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["east"] = easternParagonCityEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["north"] = northernParagonCityEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["south"] = southernParagonCityEntrance;
  var roomTypes = ["CitySquare"];
  var pathTypes = ["HorizontalParagonCityPath", "VerticalParagonCityPath"];
  var tier = getTier(targetTile);
  var baseId = `interior`;
  var interiorGrid = generate9x9Grid(roomTypes, pathTypes, tier, baseId);
  mapGrid[targetTile[0]][targetTile[1]]["interior"] = interiorGrid;
  mapGrid[targetTile[0]][targetTile[1]]["west"].exits["east"] =
    interiorGrid[1][0].id;
  mapGrid[targetTile[0]][targetTile[1]]["east"].exits["west"] =
    interiorGrid[1][2].id;
  mapGrid[targetTile[0]][targetTile[1]]["north"].exits["south"] =
    interiorGrid[0][1].id;
  mapGrid[targetTile[0]][targetTile[1]]["south"].exits["north"] =
    interiorGrid[2][1].id;
}

function generateLibertyCityTile(mapGrid, targetTile) {
  var increment = getIncrement(mapGrid, "libertyCityEntrance");
  var westernLibertyCityEntrance = new HorizontalLibertyCityEntrance(
    `libertyCityEntrance_${increment}`
  );
  var easternLibertyCityEntrance = new HorizontalLibertyCityEntrance(
    `libertyCityEntrance_${increment + 1}`
  );
  var northernLibertyCityEntrance = new VerticalLibertyCityEntrance(
    `libertyCityEntrance_${increment + 2}`
  );
  var southernLibertyCityEntrance = new VerticalLibertyCityEntrance(
    `libertyCityEntrance_${increment + 3}`
  );
  mapGrid[targetTile[0]][targetTile[1]] = {};
  mapGrid[targetTile[0]][targetTile[1]]["west"] = westernLibertyCityEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["east"] = easternLibertyCityEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["north"] = northernLibertyCityEntrance;
  mapGrid[targetTile[0]][targetTile[1]]["south"] = southernLibertyCityEntrance;
  var roomTypes = ["CitySquare"];
  var pathTypes = ["HorizontalLibertyCityPath", "VerticalLibertyCityPath"];
  var tier = getTier(targetTile);
  var baseId = `interior`;
  var interiorGrid = generate9x9Grid(roomTypes, pathTypes, tier, baseId);
  mapGrid[targetTile[0]][targetTile[1]]["interior"] = interiorGrid;
  mapGrid[targetTile[0]][targetTile[1]]["west"].exits["east"] =
    interiorGrid[1][0].id;
  mapGrid[targetTile[0]][targetTile[1]]["east"].exits["west"] =
    interiorGrid[1][2].id;
  mapGrid[targetTile[0]][targetTile[1]]["north"].exits["south"] =
    interiorGrid[0][1].id;
  mapGrid[targetTile[0]][targetTile[1]]["south"].exits["north"] =
    interiorGrid[2][1].id;
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
        interiorGrid[row][col] = createRoom(
          pathType,
          `${baseId}.room_${row}_${col}`,
          tier
        );
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

function displayMap(mapGrid) {
  var mapGenerated = false;
  while (!mapGenerated) {
    try {
      var generatedMap = partiallyGenerateMap(mapGrid);
      mapGenerated = true;
    } catch (error) {
      mapGenerated = false;
    }
  }
  var displayMap = generatedMap.map((row) => {
    return row.map((cell) => MAP_KEY[cell]);
  });
  for (let i = 0; i < displayMap.length; i++) {
    console.log(displayMap[i].join(""));
  }
}

module.exports = {
  generateMap,
  displayMap,
};
