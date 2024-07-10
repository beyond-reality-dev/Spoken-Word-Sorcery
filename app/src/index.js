import { window } from "electron/main"

window.webContents.executeJavaScript(`document.getElementById("left-sidebar").style.display = "none";`);