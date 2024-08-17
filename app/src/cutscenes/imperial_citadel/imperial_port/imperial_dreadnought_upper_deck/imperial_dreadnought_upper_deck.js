const { printLines } = require("../../../../general");
const { changeValue } = require("../../../../save_data");

async function imperialDreadnoughtUpperDeck() {
  await printLines(
    "app/src/cutscenes/imperial_citadel/imperial_port/imperial_dreadnought_upper_deck/1.txt"
  );
  changeValue(
    "imperialPort.imperialDreadnoughtUpperDeck.cutscenePlayed",
    true,
    "locations"
  );
}

module.exports = { imperialDreadnoughtUpperDeck };
