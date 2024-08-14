const { getValue } = require("./save_data");

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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var startingWidth = currentLocation["width"] * 10;
  var startingHeight = currentLocation["height"] * 10;
  var startingX = canvas.width / 2 - startingWidth / 2;
  var startingY = canvas.height / 2 - startingHeight / 2;
  ctx.font = "bold 20px Segoe UI";
  ctx.textAlign = "center";
  ctx.clearRect(startingX, startingY, startingWidth, startingHeight);
  ctx.fillStyle = "white";
  ctx.fillRect(startingX, startingY, startingWidth, startingHeight);
  ctx.fillStyle = "black";
  ctx.strokeRect(startingX, startingY, startingWidth, startingHeight);
  ctx.strokeRect(
    startingX - 1,
    startingY - 1,
    startingWidth + 1.5,
    startingHeight + 1.5
  );
  console.log(getValue("isCombat"));
  if (getValue("isCombat") == true) {
    var enemies = currentLocation["enemies"];
    console.log(enemies);
    for (let i = 0; i < enemies.length; i++) {
      var enemy = enemies[i];
      var enemyPosition = enemy["position"];
      console.log(startingX);
      var roomWidth = locations[primaryLocation][secondaryLocation]["width"];
      var roomHeight = locations[primaryLocation][secondaryLocation]["height"];
      var enemyX = startingX + (enemyPosition[0] - 1) * 60;
      var enemyY = startingY + (enemyPosition[1] - 1) * 60;
      ctx.fillStyle = "red";
      ctx.fillRect(enemyX, enemyY, 10, 10);
      ctx.fillStyle = "black";
      ctx.strokeRect(enemyX, enemyY, 10, 10);
    }
  } else {
    if (locationName.split("/").length > 1) {
      locationName = locationName.split("/");
      ctx.fillText(
        locationName[0],
        startingX + startingWidth / 2 + 0.5,
        startingY + startingHeight / 2 - 10.5
      );
      ctx.fillText(
        locationName[1],
        startingX + startingWidth / 2 + 0.5,
        startingY + startingHeight / 2 + 10.5
      );
    } else {
      ctx.fillText(
        locationName,
        canvas.width / 2 + 0.5,
        canvas.height / 2 + 0.5
      );
    }
  }
  //buildRooms(exits, startingWidth, startingHeight, startingX, startingY);
}

function buildRooms(
  exits,
  startingWidth,
  startingHeight,
  startingX,
  startingY,
  level = 0
) {
  if (level >= 5) {
    return;
  }
  const canvas = document.getElementById("map");
  const ctx = canvas.getContext("2d");
  if (exits["north"]) {
    var north = eval(getValue(exits["north"], true));
    var northExits = north["exits"];
    var northName = north["name"];
    var northWidth = north["width"] * 10;
    var northHeight = north["height"] * 10;
    var differenceX = startingWidth - northWidth;
    var northX = startingX + differenceX / 2;
    var northY = startingY - northHeight - 1.5;
    ctx.clearRect(northX, northY, northWidth, northHeight);
    ctx.fillStyle = "white";
    ctx.fillRect(northX, northY, northWidth, northHeight);
    ctx.fillStyle = "black";
    ctx.strokeRect(northX, northY, northWidth, northHeight);
    ctx.strokeRect(northX - 1, northY - 1, northWidth + 1.5, northHeight + 1.5);
    if (northName.split("/").length > 1) {
      northName = northName.split("/");
      ctx.fillText(
        northName[0],
        northX + northWidth / 2 + 0.5,
        northY + northHeight / 2 - 10.5
      );
      ctx.fillText(
        northName[1],
        northX + northWidth / 2 + 0.5,
        northY + northHeight / 2 + 10.5
      );
    } else {
      ctx.fillText(
        northName,
        northX + northWidth / 2 + 0.5,
        northY + northHeight / 2 + 0.5
      );
    }
    if (north.isVisited) {
      level++;
      buildRooms(northExits, northWidth, northHeight, northX, northY, level);
      level--;
    }
  }
  if (exits["east"]) {
    var east = eval(getValue(exits["east"], true));
    var eastExits = east["exits"];
    var eastName = east["name"];
    var eastWidth = east["width"] * 10;
    var eastHeight = east["height"] * 10;
    var differenceY = startingHeight - eastHeight;
    var eastX = startingX + startingWidth + 1.5;
    var eastY = startingY + differenceY / 2;
    ctx.clearRect(eastX, eastY, eastWidth, eastHeight);
    ctx.fillStyle = "white";
    ctx.fillRect(eastX, eastY, eastWidth, eastHeight);
    ctx.fillStyle = "black";
    ctx.strokeRect(eastX, eastY, eastWidth, eastHeight);
    ctx.strokeRect(eastX - 1, eastY - 1, eastWidth + 1.5, eastHeight + 1.5);
    if (eastName.split("/").length > 1) {
      eastName = eastName.split("/");
      ctx.fillText(
        eastName[0],
        eastX + eastWidth / 2 + 0.5,
        eastY + eastHeight / 2 - 10.5
      );
      ctx.fillText(
        eastName[1],
        eastX + eastWidth / 2 + 0.5,
        eastY + eastHeight / 2 + 10.5
      );
    } else {
      ctx.fillText(
        eastName,
        eastX + eastWidth / 2 + 0.5,
        eastY + eastHeight / 2 + 0.5
      );
    }
    if (east.isVisited) {
      level++;
      buildRooms(eastExits, eastWidth, eastHeight, eastX, eastY, level);
      level--;
    }
  }
  if (exits["south"]) {
    var south = eval(getValue(exits["south"], true));
    var southExits = south["exits"];
    var southName = south["name"];
    var southWidth = south["width"] * 10;
    var southHeight = south["height"] * 10;
    var differenceX = startingWidth - southWidth;
    var southX = startingX + differenceX / 2;
    var southY = startingY + startingHeight + 1.5;
    ctx.clearRect(southX, southY, southWidth, southHeight);
    ctx.fillStyle = "white";
    ctx.fillRect(southX, southY, southWidth, southHeight);
    ctx.fillStyle = "black";
    ctx.strokeRect(southX, southY, southWidth, southHeight);
    ctx.strokeRect(southX - 1, southY - 1, southWidth + 1.5, southHeight + 1.5);
    if (southName.split("/").length > 1) {
      southName = southName.split("/");
      ctx.fillText(
        southName[0],
        southX + southWidth / 2 + 0.5,
        southY + southHeight / 2 - 10.5
      );
      ctx.fillText(
        southName[1],
        southX + southWidth / 2 + 0.5,
        southY + southHeight / 2 + 10.5
      );
    } else {
      ctx.fillText(
        southName,
        southX + southWidth / 2 + 0.5,
        southY + southHeight / 2 + 0.5
      );
    }
    if (south.isVisited) {
      level++;
      buildRooms(southExits, southWidth, southHeight, southX, southY, level);
      level--;
    }
  }
  if (exits["west"]) {
    var west = eval(getValue(exits["west"], true));
    var westExits = west["exits"];
    var westName = west["name"];
    var westWidth = west["width"] * 10;
    var westHeight = west["height"] * 10;
    var differenceY = startingHeight - westHeight;
    var westX = startingX - westWidth - 1.5;
    var westY = startingY + differenceY / 2;
    ctx.clearRect(westX, westY, westWidth, westHeight);
    ctx.fillStyle = "white";
    ctx.fillRect(westX, westY, westWidth, westHeight);
    ctx.fillStyle = "black";
    ctx.strokeRect(westX, westY, westWidth, westHeight);
    ctx.strokeRect(westX - 1, westY - 1, westWidth + 1.5, westHeight + 1.5);
    if (westName.split("/").length > 1) {
      westName = westName.split("/");
      ctx.fillText(
        westName[0],
        westX + westWidth / 2 + 0.5,
        westY + westHeight / 2 - 10.5
      );
      ctx.fillText(
        westName[1],
        westX + westWidth / 2 + 0.5,
        westY + westHeight / 2 + 10.5
      );
    } else {
      ctx.fillText(
        westName,
        westX + westWidth / 2 + 0.5,
        westY + westHeight / 2 + 0.5
      );
    }
    if (west.isVisited) {
      level++;
      buildRooms(westExits, westWidth, westHeight, westX, westY, level);
      level--;
    }
  }
}

module.exports = { updateMap };
