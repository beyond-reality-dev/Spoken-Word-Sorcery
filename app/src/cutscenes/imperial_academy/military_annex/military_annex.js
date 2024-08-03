const { printLines, requireAnswer } = require("../../../general");
const { getValue } = require("../../../save_data");
const { handleCombat } = require("../../../handle_input");

async function militaryAnnex() {
  if (
    getValue("militaryAnnex", true).isVisited == true &&
    getValue("militaryAnnex", true).cutscenePlayed == false &&
    getValue("armory", true).isVisited == true
  ) {
    await printLines("app/src/cutscenes/imperial_academy/military_annex/1.txt");
    await requireAnswer(["any"], "unreachable");
    await handleCombat();
    if (getValue("location") == "militaryAnnex") {
      await printLines("app/src/cutscenes/imperial_academy/military_annex/2.txt");
      changeValue("['militaryAnnex']['cutscenePlayed']", true, "locations")
    }
  }
}

module.exports = { militaryAnnex };
