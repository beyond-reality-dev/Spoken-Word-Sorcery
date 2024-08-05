const { printLines, requireAnswer } = require("../../../general");
const { getValue } = require("../../../save_data");

async function survivorsCamp() {
  printLines("app/src/cutscenes/imperial_academy/survivors_camp/1.txt");
  var name = getValue("name");
  await requireAnswer(
    name,
    "I don't know that name. If you are truly a survivor, and you wish to remain so, you will answer my question honestly."
  );
  printLines("app/src/cutscenes/imperial_academy/survivors_camp/2.txt");
}

module.exports = { survivorsCamp };
