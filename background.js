const DEFAULT_SETTINGS = {
  openInNewTab: false,
  darkTheme: false,
  volumeBoost: 100,
  playbackSpeed: 1
};

const WEBPLAYER_HOST_REGEX = /^www\.audible\.[a-z.]+$/i;
const WEBPLAYER_PATH = "/webplayer";

function isSupportedWebplayerUrl(url) {
  if (!url) return false;

  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      WEBPLAYER_HOST_REGEX.test(parsed.hostname) &&
      parsed.pathname.startsWith(WEBPLAYER_PATH)
    );
  } catch {
    return false;
  }
}

function getSettings(callback) {
  chrome.storage.local.get(DEFAULT_SETTINGS, (stored) => {
    callback({ ...DEFAULT_SETTINGS, ...stored });
  });
}

function sendSettingsToWebplayerTab(tabId, settings) {
  chrome.tabs.sendMessage(tabId, { type: "apply-settings", settings }, () => {
    void chrome.runtime.lastError;
  });
}

function broadcastSettingsToWebplayerTabs(settings) {
  chrome.tabs.query({}, (tabs) => {
    tabs
      .filter((tab) => isSupportedWebplayerUrl(tab.url))
      .forEach((tab) => {
        if (typeof tab.id === "number") {
          sendSettingsToWebplayerTab(tab.id, settings);
        }
      });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  getSettings((settings) => {
    chrome.storage.local.set(settings);
  });
});

chrome.storage.onChanged.addListener((_, areaName) => {
  if (areaName !== "local") return;

  getSettings((settings) => {
    broadcastSettingsToWebplayerTabs(settings);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete") return;
  if (!isSupportedWebplayerUrl(tab.url)) return;

  getSettings((settings) => {
    sendSettingsToWebplayerTab(tabId, settings);
  });
});

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message?.type !== "request-settings") return;

  getSettings((settings) => {
    sendResponse({ settings });
  });

  return true;
});
