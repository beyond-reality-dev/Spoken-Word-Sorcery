const { printLines } = require("../../general");
const { getValue, changeValue } = require("../../save_data");

async function barracksMeeting() {
  if (getValue("barracks", true).cutscenePlayed == false) {
    printLines("app/src/cutscenes/barracksMeeting/1.txt");
    changeValue("['barracks']['cutscenePlayed']", true, "locations")
  }
}

module.exports = { barracksMeeting };