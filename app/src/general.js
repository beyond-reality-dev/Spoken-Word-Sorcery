module.exports = { gameSpeed, switchScreen, switchButton, blockInput, allowInput, printLines, quickPrint, awaitInput, requireAnswer };

var gameSpeed = 1000;

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

function blockInput() {
    document.getElementById("input-bar").style.backgroundColor = "#d1d1d1";
    document.getElementById("input-bar").setAttribute("contenteditable", "false");
}

function allowInput() {
    document.getElementById("input-bar").style.backgroundColor = "#ffffff";
    document.getElementById("input-bar").setAttribute("contenteditable", "true");
}

async function printLines(file) {
    blockInput();
    var fs = require("fs");
    fs.readFile(file, "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        var lines = data.split("\n");
        for (let i = 0; i < lines.length; i++) {
            setTimeout(() => {
                document.getElementById("main-content").innerHTML += "<p>" + lines[i] + "</p>";
                document.getElementById("main-content").scrollTop = document.getElementById("main-content").scrollHeight;
                if (i == lines.length - 1) {
                    allowInput();
                }
            }, i*gameSpeed);
        }
    });
}

function quickPrint(text) {
    document.getElementById("main-content").innerHTML += "<p>" + text + "</p>";
    document.getElementById("main-content").scrollTop = document.getElementById("main-content").scrollHeight;
}

async function awaitInput() {
    return new Promise(function(resolve) {
        const input = document.getElementById("input-bar");
        function handleKeyPress(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                const text = input.innerText;
                document.getElementById("main-content").innerHTML += "<span style='color: blue;'><p> " + text + "</p></span>";
                document.getElementById("main-content").scrollTop = document.getElementById("main-content").scrollHeight;
                input.innerText = "";
                input.removeEventListener("keypress", handleKeyPress);
                resolve(text);
            }
        }
        input.addEventListener("keypress", handleKeyPress);
    });
}

async function requireAnswer(answerChoices, question) {
    var confirm = await awaitInput();
    confirm = confirm.toLowerCase();
    confirm = confirm.replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ");
    console.log(confirm);
    while (!answerChoices.includes(confirm) && !answerChoices.includes("any")) {
        quickPrint(question);
        confirm = await awaitInput();
        confirm = confirm.toLowerCase();
        confirm = confirm.replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ");
    }
    confirm = false;
}

function loadAndEditPlayerData(target, key, value) {
    var playerData = JSON.parse(localStorage.getItem("playerData"));
    playerData[target][key] = value
}