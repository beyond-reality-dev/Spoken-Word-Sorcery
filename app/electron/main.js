const {
    app,
    BrowserWindow
} = require("electron");

function createWindow() {
    // Create the browser window and load the index.html of the app.
    var window = new BrowserWindow({
        width: 800,
        height: 600,
        show: false
    });
    window.removeMenu();
    window.loadFile("app/src/index.html");
    window.webContents.on("did-finish-load", () => {
        window.show();
        window.focus();
    });
    window.maximize();

    // Set up the window to display the start screen.
    window.webContents.executeJavaScript(`document.getElementById("start-button").onclick = function () { 
        document.getElementById("left-sidebar").style.display = "inline-block";
        document.getElementById("right-sidebar").style.display = "block";
        document.getElementById("title-bar").style.display = "block";
        document.getElementById("main-content").style.display = "block";
        document.getElementById("input-bar").style.display = "block";
        document.getElementById("start-screen").style.display = "none";
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