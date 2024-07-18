const { printLines, requireAnswer } = require("../../general");
const { getValue } = require("../../save_data");
const { inputLoop, handleCombat } = require("../../handle_input");

async function militaryAnnex() {
  if (
    getValue("militaryAnnex", true).isVisited == true &&
    getValue("armory", true).isVisited == true
  ) {
    await printLines("app/src/cutscenes/militaryAnnex/1.txt");
    await handleCombat();
    await printLines("app/src/cutscenes/militaryAnnex/2.txt");
  }
}

module.exports = { militaryAnnex };
