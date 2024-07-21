const { printLines, requireAnswer } = require("../../general");
const { getValue } = require("../../save_data");

async function grandHall() {
  if (getValue("armory", true).isVisited == true && getValue("militaryAnnex", true).isVisited == true) {
    if (getValue("barracks", true).isVisited == false) {
      printLines("app/src/cutscenes/grandHall/1.txt");
      return;
    } else {
      printLines("app/src/cutscenes/grandHall/2.txt");
    }
    await requireAnswer(["yes", "y"], '"I want the truth," he said. "Is this everyone?"');
    printLines("app/src/cutscenes/grandHall/3.txt");
    await requireAnswer(["yes", "y"], '"I am afraid you do not have much of a choice," he scolded. "So I will ask again, are you ready?');
    printLines("app/src/cutscenes/grandHall/4.txt");
    await requireAnswer(["no", "n"], "You try to speak, but the words catch in your throat. Your oath requires you to answer honestly.");
    printLines("app/src/cutscenes/grandHall/5.txt");
    await requireAnswer(["yes", "y"], '"Is that clear?"');
  } else {
    printLines("app/src/cutscenes/grandHall/6.txt");
  }
}

module.exports = { grandHall };