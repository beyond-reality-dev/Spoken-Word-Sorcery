const { ipcMain, app, BrowserWindow } = require("electron");

function createWindow() {
  var window = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  window.removeMenu();
  window.webContents.openDevTools();
  window.loadFile("app/src/index.html");
  window.webContents.on("did-finish-load", () => {
    window.show();
    window.focus();
  });
  window.maximize();
  window.webContents.executeJavaScript(`
        const { changeGameSpeed, switchScreen, switchButton, blockInput, allowInput } = require("./general.js");
        const { saveGame, loadGame } = require("./save_data.js");
        const { intro } = require("./cutscenes/intro/intro.js");

        // Start menu functions.
        document.getElementById("start-button").onclick = function () {
          document.getElementById("game-screen").style.display = "block";
          document.getElementById("start-screen").style.display = "none";
          document.getElementById("home-button").style.backgroundColor = "#d1d1d1";
          document.getElementById("home-button").style.cursor = "default";
          intro();
        }

        document.getElementById("load-button").onclick = function () { 
          document.getElementById("loading-screen").style.display = "block";
          document.getElementById("start-screen").style.display = "none";
        }
        
        document.getElementById("load-save").onclick = function () {
          document.getElementById("game-screen").style.display = "block";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("home-button").style.backgroundColor = "#d1d1d1";
          document.getElementById("home-button").style.cursor = "default";
          loadGame();
        }

        document.getElementById("overwrite-save").onclick = function () {
          document.getElementById("game-screen").style.display = "block";
          document.getElementById("start-screen").style.display = "none";
          document.getElementById("home-button").style.backgroundColor = "#d1d1d1";
          document.getElementById("home-button").style.cursor = "default";
          intro();
        }
        
        document.getElementById("loading-back").onclick = function () {
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("start-screen").style.display = "block";
        }
        
        document.getElementById("about-button").onclick = function () { 
          document.getElementById("about-screen").style.display = "block";
          document.getElementById("start-screen").style.display = "none";
        }
        
        document.getElementById("about-back").onclick = function () {
          document.getElementById("about-screen").style.display = "none";
          document.getElementById("start-screen").style.display = "block";
        }
        
        // Sidebar functions.
        document.getElementById("spellbook-button").onclick = function () {
          switchScreen("spellbook-screen");
          switchButton("spellbook-button");
        }

        document.getElementById("equipment-button").onclick = function () {
          switchScreen("equipment-screen");
          switchButton("equipment-button");
        }

        document.getElementById("inventory-button").onclick = function () { 
          switchScreen("inventory-screen");
          switchButton("inventory-button");
        }

        document.getElementById("settings-button").onclick = function () {
          switchScreen("settings-screen");
          switchButton("settings-button");
        }

        document.getElementById("map-button").onclick = function () {
          switchScreen("map-screen");
          switchButton("map-button");
        }

        document.getElementById("home-button").onclick = function () {
          switchScreen("main");
          switchButton("home-button");
        }

        // Setttings functions.
        document.getElementById("radio-zero").onclick = function () {
          changeGameSpeed(0);
        }

        document.getElementById("radio-one").onclick = function () {
          changeGameSpeed(1000);
        }

        document.getElementById("radio-two").onclick = function () {
          changeGameSpeed(2000);
        }

        document.getElementById("radio-three").onclick = function () {
          changeGameSpeed(3000);
        }

        document.getElementById("radio-four").onclick = function () {
          changeGameSpeed(4000);
        }

        document.getElementById("save-button").onclick = function () {
          saveGame();
        }

        document.getElementById("quit-save").onclick = function () {
          saveGame();
          window.close();
        }

        document.getElementById("quit-button").onclick = function () {
          window.close();
        }
    `);
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
