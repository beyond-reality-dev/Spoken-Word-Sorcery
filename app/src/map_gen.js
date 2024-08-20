const MAP_KEY = {
  X: null,
  U: "unknownShore",
  P: "paragonCity",
  L: "libertyCity",
  F: "forest",
  M: "mountain",
  D: "desert",
  O: "ocean",
  S: "shore",
  R: "river",
};

var row01 = ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"];
var row02 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"];
var row03 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"];
var row04 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"];
var row05 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"];
var row06 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"];
var row07 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"];
var row08 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"];
var row09 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"];
var row10 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"];
var row11 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"];
var row12 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"];
var row13 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"];
var row14 = ["O","X","X","X","X","X","X","X","X","X","X","X","X","X","O"];
var row15 = ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"];

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
  for (let i = 0; i < mapGrid.length; i++) {
    if (i == 0) {
      generateOceans(null, mapGrid[i], mapGrid[i + 1]);
    } else if (i == mapGrid.length - 1) {
      generateOceans(mapGrid[i - 1], mapGrid[i], null);
    } else {
      generateOceans(mapGrid[i - 1], mapGrid[i], mapGrid[i + 1]);
    }
  }
}

function generateOceans(priorRow, currentRow, nextRow) {
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
      if (priorRow[i] == "O" || nextRow[i] == "O" || left == "O" || right == "O") {
        var coinFlip = Math.random();
        if (coinFlip > 0.66) {
          currentRow[i] = "O";
        } else {
          currentRow[i] = "S";
        }
      }
    } else if (currentRow[i] == "X" && hasGeneratedOcean) {
      if (priorRow[i] == "O" || nextRow[i] == "O" || left == "O" || right == "O") {
        currentRow[i] = "S";
      }
    }
    if (i == currentRow.length - 1 && !hasGeneratedOcean) {
      hasGeneratedOcean = true;
      i = 0;
    }
  }
}

generateMap(mapGrid);