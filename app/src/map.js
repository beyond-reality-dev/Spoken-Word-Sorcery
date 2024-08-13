const {
  imperialAcademy,
  imperialMarket,
  imperialNexus,
  imperialPalace,
  imperialPort,
} = require("./class_collections/locations");

function updateMap() {
  var playerData = JSON.parse(localStorage.getItem("playerData"));
  var location = playerData["location"];
  var primaryLocation = location.split(".")[0];
  var secondaryLocation = location.split(".")[1];
  var locations = playerData["locations"];
  var currentLocation = locations[primaryLocation][secondaryLocation];
  var locationName = currentLocation["name"];
  var exits = currentLocation["exits"];
  const canvas = document.getElementById("map");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var startingWidth = currentLocation["width"] * 10;
  var startingHeight = currentLocation["height"] * 10;
  var startingX = canvas.width / 2 - startingWidth / 2;
  var startingY = canvas.height / 2 - startingHeight / 2;
  ctx.strokeRect(startingX, startingY, startingWidth, startingHeight);
  ctx.strokeRect(startingX - 1, startingY - 1, startingWidth + 1.5, startingHeight + 1.5);
  ctx.font = "bold 20px Segoe UI";
  ctx.textAlign = "center";
  if (locationName.split("/").length > 1) {
    locationName = locationName.split("/");
    ctx.fillText(locationName[0], startingX + (startingWidth / 2) + 0.5, startingY + (startingHeight / 2) - 10.5);
    ctx.fillText(locationName[1], startingX + (startingWidth / 2) + 0.5, startingY + (startingHeight / 2) + 10.5);
  } else {
    ctx.fillText(locationName, canvas.width / 2 + 0.5, canvas.height / 2 + 0.5);
  }
  buildRooms(exits, startingWidth, startingHeight, startingX, startingY);
}

function buildRooms(exits, startingWidth, startingHeight, startingX, startingY, level=0) {
  if (level >= 2) {
    return;
  }
  const canvas = document.getElementById("map");
  const ctx = canvas.getContext("2d");
  if (exits["north"]) {
    var north = eval(exits["north"]);
    var northExits = north["exits"];
    var northName = north["name"];
    console.log(northName);
    var northWidth = north["width"] * 10;
    var northHeight = north["height"] * 10;
    var differenceX = startingWidth - northWidth;
    var northX = startingX + differenceX / 2;
    var northY = startingY - northHeight - 1.5;
    ctx.strokeRect(northX, northY, northWidth, northHeight);
    ctx.strokeRect(northX - 1, northY - 1, northWidth + 1.5, northHeight + 1.5);
    if (northName.split("/").length > 1) {
      northName = northName.split("/");
      ctx.fillText(northName[0], northX + (northWidth / 2) + 0.5, northY + (northHeight / 2) - 10.5);
      ctx.fillText(northName[1], northX + (northWidth / 2) + 0.5, northY + (northHeight / 2) + 10.5);
    } else {
      ctx.fillText(northName, northX + (northWidth / 2) + 0.5, northY + (northHeight / 2) + 0.5);
    }
    level++;
    buildRooms(northExits, northWidth, northHeight, northX, northY, level);
    level--;
  }
}

module.exports = { updateMap };
