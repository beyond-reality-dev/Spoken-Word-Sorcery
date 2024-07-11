module.exports = { switchScreen, switchButton, blockInput, allowInput };

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