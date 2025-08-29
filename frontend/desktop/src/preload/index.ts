import { contextBridge, ipcRenderer } from "electron";
import type { Tokens } from "../main/token-store";

contextBridge.exposeInMainWorld("secureAuth", {
  setTokens: (t: Tokens) => ipcRenderer.invoke("auth:setTokens", t),
  getTokens: () => ipcRenderer.invoke("auth:getTokens"),
  clearTokens: () => ipcRenderer.invoke("auth:clearTokens"),
});
