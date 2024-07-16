const { printLines } = require("../../general");
const { getValue } = require("../../save_data");

async function barracksMeeting() {
  if (getValue("barracks", true).isVisited == false) {
    printLines("app/src/cutscenes/barracksMeeting/1.txt");
  }
}

module.exports = { barracksMeeting };