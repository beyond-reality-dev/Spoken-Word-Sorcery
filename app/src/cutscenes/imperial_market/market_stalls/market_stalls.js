const { handleCombat } = require("../../../combat");
const { printLines } = require("../../../general");
const { getValue, changeValue } = require("../../../save_data");

async function marketStalls() {
  if (getValue("imperialMarket.marketStalls", true).cutscenePlayed == false) {
    await printLines("app/src/cutscenes/imperial_market/market_stalls/1.txt");
    await requireAnswer(["any"], "unreachable");
    await handleCombat();
    if (getValue("location") == "imperialMarket.marketStalls") {
      await printLines("app/src/cutscenes/imperial_market/market_stalls/2.txt");
      changeValue(
        "['imperialMarket.marketStalls']['cutscenePlayed']",
        true,
        "locations"
      );
    }
  }
}

module.exports = { marketStalls };
