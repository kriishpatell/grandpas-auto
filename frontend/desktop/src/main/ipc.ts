// src/main/ipc.ts
import { ipcMain } from "electron";
import { clearTokens, getTokens, setTokens, Tokens } from "./token-store";

export function registerIpc() {
  ipcMain.handle("auth:setTokens", async (_e, t: Tokens) => { await setTokens(t); return true; });
  ipcMain.handle("auth:getTokens", async () => await getTokens());
  ipcMain.handle("auth:clearTokens", async () => { await clearTokens(); return true; });
}
