const fs = require("fs");
const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");

let squirrelStartup = false;

try {
  squirrelStartup = require("electron-squirrel-startup");
} catch (error) {
  squirrelStartup = false;
}

if (squirrelStartup) {
  app.quit();
}

function normalizeHttpUrl(value) {
  const trimmed = String(value || "").trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed.replace(/\/+$/, "") : "";
}

function readJsonFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    return null;
  }
}

function resolveDesktopConfig() {
  const envBackendBaseUrl = normalizeHttpUrl(process.env.LINGO_BACKEND_URL);
  const configPath = app.isPackaged
    ? path.join(process.resourcesPath, "app-config.json")
    : path.join(__dirname, "app-config.json");
  const fileConfig = readJsonFile(configPath);
  const fileBackendBaseUrl = normalizeHttpUrl(fileConfig?.backendBaseUrl);
  const backendBaseUrl = envBackendBaseUrl || fileBackendBaseUrl || (app.isPackaged ? "" : "http://localhost:4242");

  return {
    backendBaseUrl,
    configPath,
  };
}

function createWindow(desktopConfig) {
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 960,
    minWidth: 1100,
    minHeight: 760,
    backgroundColor: "#e6fff1",
    autoHideMenuBar: true,
    webPreferences: {
      additionalArguments: [`--lingoBackendBaseUrl=${desktopConfig.backendBaseUrl}`],
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) {
      shell.openExternal(url);
      return { action: "deny" };
    }

    return { action: "allow" };
  });

  mainWindow.loadFile(path.join(__dirname, "main.html"));
}

app.whenReady().then(() => {
  const desktopConfig = resolveDesktopConfig();

  if (!desktopConfig.backendBaseUrl) {
    console.warn(
      `LingoLearn is missing a live billing backend URL. Add backendBaseUrl to ${desktopConfig.configPath} before sharing this build.`
    );
  }

  ipcMain.handle("desktop:open-external", async (_event, url) => {
    if (!/^https?:\/\//i.test(url)) {
      throw new Error("Only http and https URLs can be opened externally.");
    }

    await shell.openExternal(url);
    return { opened: true };
  });

  createWindow(desktopConfig);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow(desktopConfig);
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
