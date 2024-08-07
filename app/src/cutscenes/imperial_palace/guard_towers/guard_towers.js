const { printLines } = require("../../../general");
const { getValue, changeValue } = require("../../../save_data");

async function guardTowers() {
  if (getValue("imperialPalace.guardTowers", true).cutscenePlayed == false) {
    await printLines("app/src/cutscenes/imperial_palace/guard_towers/1.txt");
    var choice = await requireAnswer(["1", "2"], "What do you do?");
    if (choice == "1") {
      await printLines("app/src/cutscenes/imperial_palace/guard_towers/2.txt");
    } else if (choice == "2") {
      await printLines("app/src/cutscenes/imperial_palace/guard_towers/3.txt");
    }
    changeValue(
      "['imperialPalace.guardTowers']['cutscenePlayed']",
      true,
      "locations"
    );
  }
}

module.exports = { guardTowers };
