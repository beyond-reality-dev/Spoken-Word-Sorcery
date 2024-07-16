const { printLines, requireAnswer } = require("../../general");
const { getValue } = require("../../save_data");

function grandHall() {
  if (getValue("barracks", true).isVisited == false) {
    printLines("app/src/cutscenes/grandHall/1.txt");
  } else {
    printLines("app/src/cutscenes/grandHall/2.txt");
  }
  requireAnswer(["yes", "y"], '"I want the truth," he said. "Is this everyone?"');
  printLines("app/src/cutscenes/grandHall/3.txt");
  requireAnswer(["yes", "y"], '"I am afraid you do not have much of a choice," he scolded. "So I will ask again, are you ready?');
  printLines("app/src/cutscenes/grandHall/4.txt");
  requireAnswer(["no", "n"], "You try to speak, but the words catch in your throat. Your oath requires you to answer honestly.");
  printLines("app/src/cutscenes/grandHall/5.txt");
  requireAnswer(["yes", "y"], "Is that clear?");
}

module.exports = { grandHall };