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

function generateMap(mapGrid) {
  generateOceans(mapGrid);
  generateBiome(mapGrid, "F");
  generateBiome(mapGrid, "M");
  generateBiome(mapGrid, "D");
  propagateBiomes(mapGrid);
  generateParagonCity(mapGrid);
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
    // If any of the shore tiles are surrounded by ocean, they become ocean
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
        var randomChoice = Math.random();
        if (randomChoice > 0.5) {
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
        } else if (randomChoice > 0.33) {
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
        } else {
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
        }
      }
    }
  }
}

function generateParagonCity(mapGrid) {
  var rowChoice = Math.floor(Math.random() * mapGrid.length);
  var colChoice = Math.floor(Math.random() * mapGrid[rowChoice].length);
  if (mapGrid[rowChoice][colChoice] == "M") {
    if (
      mapGrid[rowChoice - 1][colChoice] == "M" &&
      mapGrid[rowChoice + 1][colChoice] == "M" &&
      mapGrid[rowChoice][colChoice - 1] == "M" &&
      mapGrid[rowChoice][colChoice + 1] == "M"
    ) {
      mapGrid[rowChoice][colChoice] = "P";
    } else {
      generateParagonCity(mapGrid);
    }
  } else {
    generateParagonCity(mapGrid);
  }
}

generateMap(mapGrid);

var displayMap = mapGrid.map((row) => {
  return row.map((cell) => MAP_KEY[cell]);
});

for (let i = 0; i < displayMap.length; i++) {
  console.log(displayMap[i].join(""));
}
