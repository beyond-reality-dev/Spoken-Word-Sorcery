const { printLines, toTitleCase } = require("../../../general");
const { closedInput } = require("../../../handle_input");
const { generateName } = require("../../../proc_gen");
const { changeValue, getValue } = require("../../../save_data");

async function cityEntrance() {
  var inventory = getValue("inventory");
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].name == "Imperial Signet Ring") {
      var hasRing = true;
      break;
    } else {
      var hasRing = false;
    }
  }
  var name = getValue("player.name");
  var leaderName = generateName("male fullName");
  var location = getValue("location");
  var entrance = location.split(".")[1];
  // split up by capital letters
  entrance = entrance.split(/(?=[A-Z])/).join(" ");
  entrance = toTitleCase(entrance);
  if (hasRing) {
    await printLines("app/src/cutscenes/paragon_city/city_entrance/1.txt", {
      name: name,
      leaderName: leaderName,
      entrance: entrance,
    });
  } else {
    await printLines("app/src/cutscenes/paragon_city/city_entrance/2.txt", {
      name: name,
      leaderName: leaderName,
      entrance: entrance,
    });
  }
  changeValue("paragonCityTile.entrance_1", "cutscenePlayed", true);
  changeValue("paragonCityTile.entrance_2", "cutscenePlayed", true);
  changeValue("paragonCityTile.entrance_3", "cutscenePlayed", true);
  changeValue("paragonCityTile.entrance_4", "cutscenePlayed", true);
}

module.exports = {
  cityEntrance,
};
