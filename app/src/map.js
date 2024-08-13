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
  ctx.strokeRect(startingX - 1, startingY - 1, startingWidth + 1.5, startingHeight + 1.5)
  ctx.font = "bold 20px Segoe UI";
  ctx.textAlign = "center";
  ctx.fillText(locationName, canvas.width / 2 + 0.5, canvas.height / 2 + 0.5);
  buildRooms(exits, startingWidth, startingHeight, startingX, startingY, level);
}

function buildRooms(exits, startingWidth, startingHeight, startingX, startingY, level) {
  if (exits["north"]) {
    var north = eval(exits["north"]);
    var 
  }
}

function updateTextMap() {
  var playerData = JSON.parse(localStorage.getItem("playerData"));
  var location = playerData["location"];
  var primaryLocation = location.split(".")[0];
  var secondaryLocation = location.split(".")[1];
  var locations = playerData["locations"];
  var currentLocation = locations[primaryLocation][secondaryLocation];
  var locationName = currentLocation["name"];
  var exits = currentLocation["exits"];
  const mapTitle = document.getElementById("map-title");
  const map = document.getElementById("map");
  mapTitle.innerHTML = "";
  mapTitle.innerHTML += `Current Location: ${locationName}`;
  if (exits["north"]) {
    const north = eval(exits["north"]);
    mapTitle.innerHTML += "<br></br>";
    mapTitle.innerHTML += `You can go north to the ${north["name"]}`;
  }
  if (exits["west"]) {
    const west = eval(exits["west"]);
    mapTitle.innerHTML += "<br></br>";
    mapTitle.innerHTML += `You can go west to the ${west["name"]}`;
  }
  if (exits["east"]) {
    const east = eval(exits["east"]);
    mapTitle.innerHTML += "<br></br>";
    mapTitle.innerHTML += `You can go east to the ${east["name"]}`;
  }
  if (exits["south"]) {
    const south = eval(exits["south"]);
    mapTitle.innerHTML += "<br></br>";
    mapTitle.innerHTML += `You can go south to the ${south["name"]}`;
  }
}

function oldUpdateMap() {
  var playerData = JSON.parse(localStorage.getItem("playerData"));
  var location = playerData["location"];
  var primaryLocation = location.split(".")[0];
  var secondaryLocation = location.split(".")[1];
  var locations = playerData["locations"];
  var currentLocation = locations[primaryLocation][secondaryLocation];
  var locationName = currentLocation["name"];
  var exits = currentLocation["exits"];
  const map = document.getElementById("map");
  map.innerHTML = "";
  const mapTitle = document.getElementById("map-title");
  mapTitle.innerHTML = "";
  mapTitle.innerHTML += `Current Location: ${locationName}`;
  const startDiv = document.createElement("div");
  startDiv.setAttribute("id", currentLocation["id"]);
  startDiv.style.width = `${currentLocation["width"] * 10}px`;
  startDiv.style.height = `${currentLocation["height"] * 10}px`;
  startDiv.className = "map-tile";
  startDiv.style.justifySelf = "center";
  startDiv.style.alignSelf = "center";
  startDiv.innerHTML = `<div>${locationName}</div>`;
  map.appendChild(startDiv);
  buildRooms(exits, "start");
}

function buildOldRooms(exits, startingDirection, level = 0) {
  const map = document.getElementById("map");
  if (exits["north"]) {
    var north = eval(exits["north"]);
    if (document.getElementById(north["id"])) {
      return;
    }
    var northDiv = document.createElement("div");
    northDiv.setAttribute("id", north["id"]);
    northDiv.style.width = `${north["width"] * 10}px`;
    northDiv.style.height = `${north["height"] * 10}px`;
    northDiv.style.order = -2 - level * 2;
    northDiv.className = "map-tile";
    northDiv.innerHTML = `<div>${north["name"]}</div>`;
    map.appendChild(northDiv);
    var emptyTile = document.createElement("div");
    emptyTile.style.order = -1 - level * 2;
    emptyTile.className = "empty-tile";
    map.appendChild(emptyTile);
  }
  if (exits["west"]) {
    var west = eval(exits["west"]);
    if (document.getElementById(west["id"])) {
      return;
    }
    var westDiv = document.createElement("div");
    westDiv.setAttribute("id", west["id"]);
    westDiv.style.width = `${west["width"] * 10}px`;
    westDiv.style.height = `${west["height"] * 10}px`;
    if (startingDirection == "west") {
      westDiv.style.order = -1 - level;
    } else {
      westDiv.style.order = -1 - level * 2;
    }
    westDiv.className = "map-tile";
    westDiv.innerHTML = `<div>${west["name"]}</div>`;
    map.appendChild(westDiv);
  }
  if (exits["east"]) {
    var east = eval(exits["east"]);
    if (document.getElementById(east["id"])) {
      return;
    }
    var eastDiv = document.createElement("div");
    eastDiv.setAttribute("id", east["id"]);
    eastDiv.style.width = `${east["width"] * 10}px`;
    eastDiv.style.height = `${east["height"] * 10}px`;
    if (startingDirection == "east") {
      eastDiv.style.order = 0 - (level - 1) * 2;
    } else {
      eastDiv.style.order = 0 - level * 2;
    }
    eastDiv.className = "map-tile";
    eastDiv.innerHTML = `<div>${east["name"]}</div>`;
    map.appendChild(eastDiv);
  }
  if (exits["south"]) {
    var emptyTile = document.createElement("div");
    emptyTile.className = "empty-tile";
    emptyTile.style.order = 2 + level * 2;
    map.appendChild(emptyTile);
    var south = eval(exits["south"]);
    if (document.getElementById(south["id"])) {
      return;
    }
    var southDiv = document.createElement("div");
    southDiv.setAttribute("id", south["id"]);
    southDiv.style.width = `${south["width"] * 10}px`;
    southDiv.style.height = `${south["height"] * 10}px`;
    if (startingDirection == "south") {
      southDiv.style.order = 3 + (level + 1) * 2;
    } else {
      southDiv.style.order = 3 + level * 2;
    }
    southDiv.className = "map-tile";
    southDiv.innerHTML = `<div>${south["name"]}</div>`;
    map.appendChild(southDiv);
  }
  if (level < 1) {
    level++;
    if (north) {
      const northExits = north["exits"];
      buildRooms(northExits, "north", level);
    }
    if (west) {
      const westExits = west["exits"];
      buildRooms(westExits, "west", level);
    }
    if (east) {
      const eastExits = east["exits"];
      buildRooms(eastExits, "east", level);
    }
    if (south) {
      const southExits = south["exits"];
      buildRooms(southExits, "south", level);
    }
  }
}

module.exports = { updateMap };
