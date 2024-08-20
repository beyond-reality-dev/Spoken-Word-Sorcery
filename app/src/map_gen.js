const MAP_KEY = {
  X: null, // empty cell
  U: "U", // unknown shore
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
    console.log(xDistance, yDistance);
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

function generateUnknownShore(mapGrid, iterations = 0) {
  var randomRow = Math.floor(Math.random() * mapGrid.length);
  var randomCol = Math.floor(Math.random() * mapGrid[randomRow].length);
  var iterations = iterations;
  if (mapGrid[randomRow][randomCol] == "S") {
    // Ensure it is not within 5 tiles of Paragon City or Liberty City
    var paragonCityCoords = findParagonCity(mapGrid);
    var libertyCityCoords = findLibertyCity(mapGrid);
    var xDistanceParagon = Math.abs(paragonCityCoords[0] - randomRow);
    var yDistanceParagon = Math.abs(paragonCityCoords[1] - randomCol);
    var xDistanceLiberty = Math.abs(libertyCityCoords[0] - randomRow);
    var yDistanceLiberty = Math.abs(libertyCityCoords[1] - randomCol);
    if (iterations < 1000) {
      var targetDistance = 5;
    } else if (iterations < 2000) {
      var targetDistance = 4;
    } else if (iterations < 3000) {
      var targetDistance = 3;
    } else if (iterations < 4000) {
      var targetDistance = 2;
    } else if (iterations < 5000) {
      var targetDistance = 1;
    }
    if (
      xDistanceParagon > targetDistance &&
      yDistanceParagon > targetDistance &&
      xDistanceLiberty > targetDistance &&
      yDistanceLiberty > targetDistance
    ) {
      mapGrid[randomRow][randomCol] = "U";
      return;
    } else {
      iterations++;
      generateUnknownShore(mapGrid);
    }
  } else {
    iterations++;
    generateUnknownShore(mapGrid, iterations);
  }
}

var generatedMap = generateMap(mapGrid);

var displayMap = generatedMap.map((row) => {
  return row.map((cell) => MAP_KEY[cell]);
});

for (let i = 0; i < displayMap.length; i++) {
  console.log(displayMap[i].join(""));
}
