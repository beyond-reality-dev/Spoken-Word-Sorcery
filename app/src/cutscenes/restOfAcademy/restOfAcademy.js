const { printLines, requireAnswer } = require("../../general");
const { addEntity, changeValue } = require("../../save_data");
const { ImperialDagger } = require("../../class_collections/equipment");

async function restOfAcademy() {
  printLines("app/src/cutscenes/restOfAcademy/1.txt");
  await requireAnswer(["yes", "y"], '"Really?" he asks incredulously. "Come on. Don\'t you want to know?"')
  printLines("app/src/cutscenes/restOfAcademy/2.txt");
  addEntity(new ImperialDagger(), "inventory");
  changeValue("currentMana", getValue("maxMana"));
  changeValue("currentHealth", getValue("maxHealth"));
  changeValue("['vault']['isLocked']", false, "locations");
}

module.exports = { restOfAcademy };