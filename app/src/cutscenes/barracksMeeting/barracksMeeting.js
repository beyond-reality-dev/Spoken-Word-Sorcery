const { printLines } = require("../../general");
const { inputLoop } = require("../../handle_input");

function barracksMeeting() {
  if (getValue("barracks", true).isVisited == false) {
    printLines("app/src/cutscenes/barracksMeeting/1.txt");
  }
}

module.exports = { barracksMeeting };