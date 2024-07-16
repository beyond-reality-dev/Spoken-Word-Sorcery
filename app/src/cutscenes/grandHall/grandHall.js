const { printLines } = require("../../general");
const { getValue } = require("../../save_data");

function grandHall() {
  if (getValue("barracks", true).isVisited == false) {
    printLines("app/src/cutscenes/grandHall/1.txt");
  } else {
    printLines("app/src/cutscenes/grandHall/2.txt");
  }
}

module.exports = { grandHall };