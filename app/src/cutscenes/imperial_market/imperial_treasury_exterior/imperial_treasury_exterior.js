const { handleCombat } = require("../../../combat");
const { printLines } = require("../../../general");
const { getValue, changeValue } = require("../../../save_data");

async function imperialTreasuryExterior() {
  if (
    getValue("imperialMarket.imperialTreasuryExterior", true).cutscenePlayed ==
    false
  ) {
    await printLines(
      "app/src/cutscenes/imperial_market/imperial_treasury_exterior/1.txt"
    );
    await requireAnswer(["any"], "unreachable");
    await handleCombat();
    if (getValue("location") == "imperialMarket.imperialTreasuryExterior") {
      await printLines(
        "app/src/cutscenes/imperial_market/imperial_treasury_exterior/2.txt"
      );
      changeValue(
        "['imperialMarket.imperialTreasuryExterior']['cutscenePlayed']",
        true,
        "locations"
      );
    }
  }
}

module.exports = { imperialTreasuryExterior };
