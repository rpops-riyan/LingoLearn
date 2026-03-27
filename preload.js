const fs = require("fs");
const path = require("path");
const { contextBridge, ipcRenderer } = require("electron");

function normalizeHttpUrl(value) {
  const trimmed = String(value || "").trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed.replace(/\/+$/, "") : "";
}

function readAdditionalArgument(prefix) {
  const argument = process.argv.find((item) => item.startsWith(prefix));
  return argument ? argument.slice(prefix.length) : "";
}

function readBackendBaseUrlFromConfig() {
  const candidates = [];

  if (process.resourcesPath) {
    candidates.push(path.join(process.resourcesPath, "app-config.json"));
  }

  candidates.push(path.join(__dirname, "app-config.json"));

  for (const filePath of candidates) {
    try {
      const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
      const backendBaseUrl = normalizeHttpUrl(parsed?.backendBaseUrl);

      if (backendBaseUrl) {
        return backendBaseUrl;
      }
    } catch (error) {
      continue;
    }
  }

  return "";
}

const backendBaseUrl =
  normalizeHttpUrl(process.env.LINGO_BACKEND_URL) ||
  normalizeHttpUrl(readAdditionalArgument("--lingoBackendBaseUrl=")) ||
  readBackendBaseUrlFromConfig();

contextBridge.exposeInMainWorld("lingoDesktop", {
  getBackendBaseUrl: () => backendBaseUrl,
  openExternal: (url) => ipcRenderer.invoke("desktop:open-external", url),
});
