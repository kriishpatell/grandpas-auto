import { app, BrowserWindow } from "electron";
import path from "node:path";
import { registerIpc } from "./ipc";

let win: BrowserWindow | null = null;

async function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const isDev = !!process.env.VITE_DEV_SERVER_URL;
  if (isDev) {
    await win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    await win.loadFile(path.join(__dirname, "../index.html"));
  }
}

app.whenReady().then(() => {
  registerIpc();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
