const MAP_KEY = {
  X: null,
  U: "unknownShore",
  P: "P",
  L: "libertyCity",
  F: "🟩",
  M: "⬛",
  D: "🟨",
  O: "🟦",
  S: "🟫",
  R: "🟦",
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
  generateOceans(map);
  generateBiome(map, "F");
  generateBiome(map, "M");
  generateBiome(map, "D");
  propagateBiomes(map);
  generateParagonCity(map);
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
    var iteration = 0
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
      currentNum = 0;
    }
  }
  targetNum--;
  generateParagonCity(mapGrid, targetNum);
}

function generateOldParagonCity(mapGrid, iterations = 0, level = 0) {
  var rowChoice = Math.floor(Math.random() * mapGrid.length);
  var colChoice = Math.floor(Math.random() * mapGrid[rowChoice].length);
  if (mapGrid[rowChoice][colChoice] == "M") {
    if (
      (level == 0 &&
        mapGrid[rowChoice - 1][colChoice] == "M" &&
        mapGrid[rowChoice + 1][colChoice] == "M" &&
        mapGrid[rowChoice][colChoice - 1] == "M" &&
        mapGrid[rowChoice][colChoice + 1] == "M") ||
      (level == 1 &&
        mapGrid[rowChoice - 1][colChoice] == "M" &&
        mapGrid[rowChoice + 1][colChoice] == "M" &&
        mapGrid[rowChoice][colChoice - 1] == "M") ||
      mapGrid[rowChoice][colChoice + 1] == "M" ||
      (level == 2 &&
        mapGrid[rowChoice - 1][colChoice] == "M" &&
        mapGrid[rowChoice + 1][colChoice] == "M") ||
      mapGrid[rowChoice][colChoice - 1] == "M" ||
      mapGrid[rowChoice][colChoice + 1] == "M" ||
      level == 3
    ) {
      mapGrid[rowChoice][colChoice] = "P";
    } else {
      if (iterations < 225) {
        iterations++;
        generateParagonCity(mapGrid, iterations, level);
      } else if (level == 1 && iterations < 550) {
        iterations++;
        generateParagonCity(mapGrid, iterations, level);
      } else if (level == 2 && iterations < 775) {
        iterations++;
        generateParagonCity(mapGrid, iterations, level);
      } else if (level == 3 && iterations < 1100) {
        iterations++;
        generateParagonCity(mapGrid, iterations, level);
      } else {
        return false;
      }
    }
  } else {
    if (iterations < 225) {
      iterations++;
      generateParagonCity(mapGrid, iterations);
    } else if (level == 1 && iterations < 550) {
      iterations++;
      generateParagonCity(mapGrid, iterations);
    } else if (level == 2 && iterations < 775) {
      iterations++;
      generateParagonCity(mapGrid, iterations);
    } else if (level == 3 && iterations < 1100) {
      iterations++;
      generateParagonCity(mapGrid, iterations);
    } else {
      return false;
    }
  }
}

var generatedMap = generateMap(mapGrid);
for (let i = 0; i < generatedMap.length; i++) {
  for (let j = 0; j < generatedMap[i].length; j++) {
    if (generatedMap[i][j] == "X") {
      if (
        i > 0 &&
        generatedMap[i - 1][j] != "X" &&
        generatedMap[i - 1][j] != "S"
      ) {
        generatedMap[i][j] = "S";
      } else if (
        i < generatedMap.length - 1 &&
        generatedMap[i + 1][j] != "X" &&
        generatedMap[i + 1][j] != "S"
      ) {
        generatedMap[i][j] = "S";
      } else if (
        j > 0 &&
        generatedMap[i][j - 1] != "X" &&
        generatedMap[i][j - 1] != "S"
      ) {
        generatedMap[i][j] = "S";
      } else if (
        j < generatedMap[i].length - 1 &&
        generatedMap[i][j + 1] != "X" &&
        generatedMap[i][j + 1] != "S"
      ) {
        generatedMap[i][j] = "S";
      } else {
        generatedMap[i][j] = "O";
      }
    }
  }
}
for (let i = 0; i < generatedMap.length; i++) {
  for (let j = 0; j < generatedMap[i].length; j++) {
    if (generatedMap[i][j] != "O" && generatedMap[i][j] != "S") {
      if (
        i > 0 &&
        generatedMap[i - 1][j] == "O" &&
        generatedMap[i - 1][j] != "S"
      ) {
        generatedMap[i][j] = "S";
      } else if (
        i < generatedMap.length - 1 &&
        generatedMap[i + 1][j] == "O" &&
        generatedMap[i + 1][j] != "S"
      ) {
        generatedMap[i][j] = "S";
      } else if (
        j > 0 &&
        generatedMap[i][j - 1] == "O" &&
        generatedMap[i][j - 1] != "S"
      ) {
        generatedMap[i][j] = "S";
      } else if (
        j < generatedMap[i].length - 1 &&
        generatedMap[i][j + 1] == "O" &&
        generatedMap[i][j + 1] != "S"
      ) {
        generatedMap[i][j] = "S";
      }
    }
  }
}

var displayMap = generatedMap.map((row) => {
  return row.map((cell) => MAP_KEY[cell]);
});

for (let i = 0; i < displayMap.length; i++) {
  console.log(displayMap[i].join(""));
}
