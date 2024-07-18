const { printLines, requireAnswer } = require("../../general");
const { getValue } = require("../../save_data");
const { inputLoop, handleCombat } = require("../../handle_input");

async function militaryAnnex() {
  if (
    getValue("militaryAnnex", true).isVisited == true &&
    getValue("armory", true).isVisited == true
  ) {
    await printLines("app/src/cutscenes/militaryAnnex/1.txt");
    await requireAnswer(
      ["fight", "i fight", "attack", "i attack"],
      "You must choose to fight, your Oath provides for no other option."
    );
    await handleCombat();
    await printLines("app/src/cutscenes/militaryAnnex/2.txt");
  }
}

module.exports = { militaryAnnex };
