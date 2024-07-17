const { printLines } = require("../../general");
const { getValue } = require("../../save_data");

async function militaryAnnex() {
  if (getValue("militaryAnnex", true).isVisited == true && getValue("armory", true).isVisited == true) {
    await printLines("app/src/cutscenes/militaryAnnex/1.txt");
  }
}

module.exports = { militaryAnnex };