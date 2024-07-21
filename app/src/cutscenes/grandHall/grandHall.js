const { printLines, requireAnswer } = require("../../general");
const { getValue, changeValue } = require("../../save_data");
const { grandHall, longPassage, commonRoom, hallGates } = require("../../class_collections/locations/imperial_academy");
const { handleMovement } = require("../../handle_input");

async function grandHallEncounter() {
  if (getValue("armory", true).isVisited == false || getValue("militaryAnnex", true).isVisited == false) {
    if (getValue("barracks", true).isVisited == false) {
      printLines("app/src/cutscenes/grandHall/1.txt");
      return;
    } else {
      printLines("app/src/cutscenes/grandHall/2.txt");
    }
    await requireAnswer(["yes", "y"], '"I want the truth," he said. "Is this everyone?"');
    printLines("app/src/cutscenes/grandHall/3.txt");
    await requireAnswer(["yes", "y"], '"I am afraid you do not have much of a choice," he scolded. "So I will ask again, are you ready?');
    printLines("app/src/cutscenes/grandHall/4.txt");
    await requireAnswer(["no", "n"], "You try to speak, but the words catch in your throat. Your oath requires you to answer honestly.");
    printLines("app/src/cutscenes/grandHall/5.txt");
    await requireAnswer(["yes", "y"], '"Is that clear?"');
  } else {
    console.log(1);
    printLines("app/src/cutscenes/grandHall/6.txt");
    changeValue("currentMana", getValue("maxMana"));
    changeValue("currentHealth", getValue("maxHealth"));
    requireAnswer(["any"], "unreachable");
    printLines("app/src/cutscenes/grandHall/7.txt");
    changeValue("['longPassage']['isLocked']", true, "locations");
    changeValue("['commonRoom']['isLocked']", true, "locations");
    changeValue("['hallGates']['isLocked']", false, "locations");
    changeValue("['longPassage']['lockedDescription']", "The door to the long passage has collapsed, blocking the way.", "locations");
    changeValue("['commonRoom']['lockedDescription']", "The door to the common room has collapsed, blocking the way.", "locations");
    changeValue("['grandHall']['description']", "The grand hall, once impressive, is now desolate. Nothing of value remains, with even the soldiers' weapons and armor having been stripped from their bodies. By whom, you cannot say.", "locations");
    handleMovement("load");
  }
}

module.exports = { grandHallEncounter };