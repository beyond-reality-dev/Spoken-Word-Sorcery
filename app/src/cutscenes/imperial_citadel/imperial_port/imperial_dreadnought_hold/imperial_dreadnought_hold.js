const { printLines, requireAnswer } = require("../../../../general");
const { changeValue } = require("../../../../save_data");

async function imperialDreadnoughtHold() {
  await printLines(
    "app/src/cutscenes/imperial_citadel/imperial_port/imperial_dreadnought_hold/1.txt"
  );
  await requireAnswer(["any"], "unreachable");
  await printLines(
    "app/src/cutscenes/imperial_citadel/imperial_port/imperial_dreadnought_hold/2.txt"
  );
  changeValue(
    "imperialPort.imperialDreadnoughtUpperDeck.exits",
    {
      south: "imperialPort.imperialDreadnoughtLowerDeck",
    },
    "locations"
  );
  changeValue(
    "imperialPort.imperialDreadnoughtUpperDeck.description",
    "The upper deck of the Imperial Dreadnought is a large open area with a few crates and barrels scattered about. There is a ladder a wooden door to the south, leading below deck.",
    "locations"
  );
  changeValue(
    "imperialPort.imperialDreadnoughtCaptainQuarters.name",
    "Temporary Imperial Quarters",
    "locations"
  );
  changeValue(
    "imperialPort.imperialDreadnoughtCaptainQuarters.lockedDescription",
    "The door to the Emperor's quarters are guarded by a pair of Imperial soldiers, who manage to stay remarkably upright despite the storm."
  );
  changeValue(
    "imperialPort.imperialDreadnoughtUpperDeck.cutscenePlayed",
    false,
    "locations"
  )
  changeValue(
    "imperialPort.imperialDreadnoughtHold.cutscenePlayed",
    true,
    "locations"
  );
}

module.exports = { imperialDreadnoughtHold };
