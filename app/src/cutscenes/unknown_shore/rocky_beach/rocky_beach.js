const { printLines } = require("../../../general");
const { changeValue } = require("../../../save_data");

async function rockyBeach() {
  await printLines("app/src/cutscenes/unknown_shore/rocky_beach/1.txt");
  changeValue("unknownShore.rockyBeach.cutscenePlayed", true, "locations");
}

module.exports = { rockyBeach };
