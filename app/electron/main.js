const { ipcMain, app, BrowserWindow } = require("electron");

function createWindow() {
    // Create the browser window and load the index.html of the app.
    var window = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    window.removeMenu();
    window.webContents.openDevTools();
    window.loadFile("app/src/index.html");
    window.webContents.on("did-finish-load", () => {
        window.show();
        window.focus();
    });
    window.maximize();

    // Start menu functions.
    window.webContents.executeJavaScript(`document.getElementById("start-button").onclick = function () {
        document.getElementById("game-screen").style.display = "block";
        document.getElementById("start-screen").style.display = "none";
        document.getElementById("home-button").style.backgroundColor = "#d1d1d1";
        document.getElementById("home-button").style.cursor = "default";
        }`);
    window.webContents.executeJavaScript(`document.getElementById("load-button").onclick = function () { 
        document.getElementById("loading-screen").style.display = "block";
        document.getElementById("start-screen").style.display = "none";
        }`);
    window.webContents.executeJavaScript(`document.getElementById("loading-back").onclick = function () {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("start-screen").style.display = "block";
        }`);
    window.webContents.executeJavaScript(`document.getElementById("about-button").onclick = function () { 
        document.getElementById("about-screen").style.display = "block";
        document.getElementById("start-screen").style.display = "none";
        }`);
    window.webContents.executeJavaScript(`document.getElementById("about-back").onclick = function () {
        document.getElementById("about-screen").style.display = "none";
        document.getElementById("start-screen").style.display = "block";
        }`);
    
    // Game screen functions.
    window.webContents.executeJavaScript(`var input = document.getElementById("input-bar");
        input.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                var text = document.getElementById("input-bar").innerText;
                console.log(text);
                document.getElementById("input-bar").innerText = "";
            }
    });`);
    window.webContents.executeJavaScript(`document.getElementById("spellbook-button").onclick = function () {
        document.getElementById("spellbook-screen").style.display = "block";
        document.getElementById("main").style.display = "none";
        document.getElementById("equipment-screen").style.display = "none";
        document.getElementById("inventory-screen").style.display = "none";
        document.getElementById("settings-screen").style.display = "none";
        document.getElementById("map-screen").style.display = "none";
        document.getElementById("spellbook-button").style.backgroundColor = "#d1d1d1";
        document.getElementById("spellbook-button").style.cursor = "default";
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

    }`);
    window.webContents.executeJavaScript(`document.getElementById("equipment-button").onclick = function () {
        document.getElementById("equipment-screen").style.display = "block";
        document.getElementById("main").style.display = "none";
        document.getElementById("spellbook-screen").style.display = "none";
        document.getElementById("inventory-screen").style.display = "none";
        document.getElementById("settings-screen").style.display = "none";
        document.getElementById("map-screen").style.display = "none";
        document.getElementById("equipment-button").style.backgroundColor = "#d1d1d1";
        document.getElementById("equipment-button").style.cursor = "default";
        document.getElementById("spellbook-button").style.backgroundColor = "#ffffff";
        document.getElementById("spellbook-button").style.cursor = "pointer";
        document.getElementById("inventory-button").style.backgroundColor = "#ffffff";
        document.getElementById("inventory-button").style.cursor = "pointer";
        document.getElementById("settings-button").style.backgroundColor = "#ffffff";
        document.getElementById("settings-button").style.cursor = "pointer";
        document.getElementById("map-button").style.backgroundColor = "#ffffff";
        document.getElementById("map-button").style.cursor = "pointer";
        document.getElementById("home-button").style.backgroundColor = "#ffffff";
        document.getElementById("home-button").style.cursor = "pointer";
    }`);
    window.webContents.executeJavaScript(`document.getElementById("inventory-button").onclick = function () {
        document.getElementById("inventory-screen").style.display = "block";
        document.getElementById("main").style.display = "none";
        document.getElementById("spellbook-screen").style.display = "none";
        document.getElementById("equipment-screen").style.display = "none";
        document.getElementById("settings-screen").style.display = "none";
        document.getElementById("map-screen").style.display = "none";
        document.getElementById("inventory-button").style.backgroundColor = "#d1d1d1";
        document.getElementById("inventory-button").style.cursor = "default";
        document.getElementById("spellbook-button").style.backgroundColor = "#ffffff";
        document.getElementById("spellbook-button").style.cursor = "pointer";
        document.getElementById("equipment-button").style.backgroundColor = "#ffffff";
        document.getElementById("equipment-button").style.cursor = "pointer";
        document.getElementById("settings-button").style.backgroundColor = "#ffffff";
        document.getElementById("settings-button").style.cursor = "pointer";
        document.getElementById("map-button").style.backgroundColor = "#ffffff";
        document.getElementById("map-button").style.cursor = "pointer";
        document.getElementById("home-button").style.backgroundColor = "#ffffff";
        document.getElementById("home-button").style.cursor = "pointer";
    }`);
    window.webContents.executeJavaScript(`document.getElementById("settings-button").onclick = function () {
        document.getElementById("settings-screen").style.display = "block";
        document.getElementById("main").style.display = "none";
        document.getElementById("spellbook-screen").style.display = "none";
        document.getElementById("equipment-screen").style.display = "none";
        document.getElementById("inventory-screen").style.display = "none";
        document.getElementById("map-screen").style.display = "none";
        document.getElementById("settings-button").style.backgroundColor = "#d1d1d1";
        document.getElementById("settings-button").style.cursor = "default";
        document.getElementById("spellbook-button").style.backgroundColor = "#ffffff";
        document.getElementById("spellbook-button").style.cursor = "pointer";
        document.getElementById("equipment-button").style.backgroundColor = "#ffffff";
        document.getElementById("equipment-button").style.cursor = "pointer";
        document.getElementById("inventory-button").style.backgroundColor = "#ffffff";
        document.getElementById("inventory-button").style.cursor = "pointer";
        document.getElementById("map-button").style.backgroundColor = "#ffffff";
        document.getElementById("map-button").style.cursor = "pointer";
        document.getElementById("home-button").style.backgroundColor = "#ffffff";
        document.getElementById("home-button").style.cursor = "pointer";
    }`);
    window.webContents.executeJavaScript(`document.getElementById("map-button").onclick = function () {
        document.getElementById("map-screen").style.display = "block";
        document.getElementById("main").style.display = "none";
        document.getElementById("spellbook-screen").style.display = "none";
        document.getElementById("equipment-screen").style.display = "none";
        document.getElementById("inventory-screen").style.display = "none";
        document.getElementById("settings-screen").style.display = "none";
        document.getElementById("map-button").style.backgroundColor = "#d1d1d1";
        document.getElementById("map-button").style.cursor = "default";
        document.getElementById("spellbook-button").style.backgroundColor = "#ffffff";
        document.getElementById("spellbook-button").style.cursor = "pointer";
        document.getElementById("equipment-button").style.backgroundColor = "#ffffff";
        document.getElementById("equipment-button").style.cursor = "pointer";
        document.getElementById("inventory-button").style.backgroundColor = "#ffffff";
        document.getElementById("inventory-button").style.cursor = "pointer";
        document.getElementById("settings-button").style.backgroundColor = "#ffffff";
        document.getElementById("settings-button").style.cursor = "pointer";
        document.getElementById("home-button").style.backgroundColor = "#ffffff";
        document.getElementById("home-button").style.cursor = "pointer";
    }`);
    window.webContents.executeJavaScript(`document.getElementById("home-button").onclick = function () { 
        document.getElementById("main").style.display = "block";
        document.getElementById("spellbook-screen").style.display = "none";
        document.getElementById("equipment-screen").style.display = "none";
        document.getElementById("inventory-screen").style.display = "none";
        document.getElementById("settings-screen").style.display = "none";
        document.getElementById("map-screen").style.display = "none";
        document.getElementById("home-button").style.backgroundColor = "#d1d1d1";
        document.getElementById("home-button").style.cursor = "default";
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
    }`);
}

// This method is called when Electron
// has finished initializing
app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});