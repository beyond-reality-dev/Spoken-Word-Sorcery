const { printLines, requireAnswer } = require("../../../general");
const { getValue } = require("../../../save_data");
const { handleCombat } = require("../../../handle_input");

async function vault() {
  if (getValue("vault", true).cutscenePlayed == false) {
    await printLines("app/src/cutscenes/imperialAcademy/vault/1.txt");
    await requireAnswer(["any"], "unreachable");
    await handleCombat();
    if (getValue("location") == "vault") {
      await printLines("app/src/cutscenes/imperialAcademy/vault/2.txt");
      changeValue("['vault']['cutscenePlayed']", true, "locations")
    }
  }
}

module.exports = { vault };
