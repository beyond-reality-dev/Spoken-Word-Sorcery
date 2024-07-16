const { printLines } = require("../../general");
const { getValue } = require("../../save_data");
const { handleCombat } = require("../../handle_input");

async function militaryAnnex() {
  if (getValue("militaryAnnex", true).isVisited == true && getValue("armory", true).isVisited == true) {
    printLines("app/src/cutscenes/militaryAnnex/1.txt");
    handleCombat();
  }
}

module.exports = { militaryAnnex };