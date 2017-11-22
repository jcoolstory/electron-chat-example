import { BrowserWindow } from "electron";


let win;
function createWindow() {
    console.log(__dirname)
    win = new BrowserWindow();
    win.loadURL('file://'+__dirname+'/../../index.html');
    win.on("close", () => {
        win = null;
    })
}

export default createWindow