module.exports = {
  gameSpeed,
  switchScreen,
  switchButton,
  printLines,
  quickPrint,
  requireAnswer,
  toTitleCase,
};

const { allowInput, blockInput, closedInput } = require("./handle_input");
const { getValue } = require("./save_data");

var gameSpeed = 0;

function switchScreen(screen) {
  document.getElementById("main").style.display = "none";
  document.getElementById("spellbook-screen").style.display = "none";
  document.getElementById("equipment-screen").style.display = "none";
  document.getElementById("inventory-screen").style.display = "none";
  document.getElementById("settings-screen").style.display = "none";
  document.getElementById("map-screen").style.display = "none";
  document.getElementById(screen).style.display = "block";
}

function switchButton(button) {
  document.getElementById("spellbook-button").style.backgroundColor = "#ffffff";
  document.getElementById("spellbook-button").style.cursor = "pointer";
  document.getElementById("equipment-button").style.backgroundColor = "#ffffff";
  document.getElementById("equipment-button").style.cursor = "pointer";
  document.getElementById("inventory-button").style.backgroundColor = "#ffffff";
  document.getElementById("inventory-button").style.cursor = "pointer";
  document.getElementById("settings-button").style.backgroundColor = "#ffffff";
  document.getElementById("settings-button").style.cursor = "pointer";
  document.getElementById("map-button").style.backgroundColor = "#ffffff";
  document.getElementById("map-button").style.cursor = "pointer";
  document.getElementById("home-button").style.backgroundColor = "#ffffff";
  document.getElementById("home-button").style.cursor = "pointer";
  document.getElementById(button).style.backgroundColor = "#d1d1d1";
  document.getElementById(button).style.cursor = "default";
}

async function printLines(file) {
  blockInput();
  var fs = require("fs");
  fs.readFile(file, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    var lines = data.split("\n");
    for (let i = 0; i < lines.length; i++) {
      setTimeout(() => {
        document.getElementById("main-content").innerHTML +=
          "<p>" + lines[i] + "</p>";
        document.getElementById("main-content").scrollTop =
          document.getElementById("main-content").scrollHeight;
        if (i == lines.length - 1) {
          allowInput();
        }
      }, i * gameSpeed);
    }
  });
}

function quickPrint(text) {
  document.getElementById("main-content").innerHTML += "<p>" + text + "</p>";
  document.getElementById("main-content").scrollTop =
    document.getElementById("main-content").scrollHeight;
}

async function requireAnswer(answerChoices, question) {
  var confirm = await closedInput();
  confirm = confirm.toLowerCase();
  confirm = confirm.replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ");
  console.log(confirm);
  while (!answerChoices.includes(confirm) && !answerChoices.includes("any")) {
    quickPrint(question);
    confirm = await closedInput();
    confirm = confirm.toLowerCase();
    confirm = confirm.replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ");
  }
  confirm = false;
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}
