const { printLines } = require("../../../general");
const { closedInput } = require("../../../handle_input");
const { changeValue } = require("../../../save_data");

async function rockyBeach() {
  await printLines("app/src/cutscenes/unknown_shore/rocky_beach/1.txt");
  var response = await closedInput(["1", "approach", "approach the figure", "2", "ignore", "ignore the figure"]);
  if (response == "1" || response == "approach" || response == "approach the figure") {
    await printLines("app/src/cutscenes/unknown_shore/rocky_beach/2.txt");
  } else {
    await printLines("app/src/cutscenes/unknown_shore/rocky_beach/3.txt");
  }
  changeValue("unknownShore.rockyBeach.cutscenePlayed", true, "locations");
}

module.exports = { rockyBeach };
