const { printLines } = require("../../general");
const { getValue } = require("../../save_data");
const { inputLoop } = require("../../handle_input");

async function militaryAnnex() {
  if (getValue("militaryAnnex", true).isVisited == true && getValue("armory", true).isVisited == true) {
    await printLines("app/src/cutscenes/militaryAnnex/1.txt");
    console.log("militaryAnnex");
    await inputLoop();
  }
}

module.exports = { militaryAnnex };