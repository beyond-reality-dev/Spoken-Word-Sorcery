const { printLines, requireAnswer } = require("../../general");

async function restOfAcademy() {
  printLines("app/src/cutscenes/restOfAcademy/1.txt");
  await requireAnswer(["yes", "y"], '"Really?" he asks incredulously. "Come on. Don\'t you want to know?"')
  printLines("app/src/cutscenes/restOfAcademy/2.txt");
  changeValue("currentMana", getValue("maxMana"));
  changeValue("currentHealth", getValue("maxHealth"));
}

module.exports = { restOfAcademy };