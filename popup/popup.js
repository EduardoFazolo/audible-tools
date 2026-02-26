const DEFAULT_SETTINGS = {
  openInNewTab: false,
  darkTheme: false,
  volumeBoost: 100,
  playbackSpeed: 1
};

const openInNewTabInput = document.getElementById("openInNewTab");
const darkThemeInput = document.getElementById("darkTheme");
const volumeBoostInput = document.getElementById("volumeBoost");
const volumeValueOutput = document.getElementById("volumeValue");

let settings = { ...DEFAULT_SETTINGS };

function getStoredSettings() {
  return new Promise((resolve) => {
    chrome.storage.local.get(DEFAULT_SETTINGS, (stored) => {
      resolve({ ...DEFAULT_SETTINGS, ...stored });
    });
  });
}

function setStoredSettings(nextSettings) {
  return new Promise((resolve) => {
    chrome.storage.local.set(nextSettings, () => resolve());
  });
}

function updateTheme() {
  document.body.dataset.theme = settings.darkTheme ? "dark" : "light";
}

function updateVolumeLabel() {
  volumeValueOutput.textContent = `${settings.volumeBoost}%`;
}

function syncInputsWithSettings() {
  openInNewTabInput.checked = settings.openInNewTab;
  darkThemeInput.checked = settings.darkTheme;
  volumeBoostInput.value = String(settings.volumeBoost);
  updateTheme();
  updateVolumeLabel();
}

async function saveAndRender(nextSettings) {
  settings = { ...settings, ...nextSettings };
  await setStoredSettings(nextSettings);
  syncInputsWithSettings();
}

async function initialize() {
  settings = await getStoredSettings();
  syncInputsWithSettings();

  openInNewTabInput.addEventListener("change", async (event) => {
    await saveAndRender({ openInNewTab: event.target.checked });
  });

  darkThemeInput.addEventListener("change", async (event) => {
    await saveAndRender({ darkTheme: event.target.checked });
  });

  volumeBoostInput.addEventListener("input", async (event) => {
    const numericValue = Number(event.target.value);
    const clamped = Number.isFinite(numericValue)
      ? Math.max(0, Math.min(300, numericValue))
      : DEFAULT_SETTINGS.volumeBoost;

    await saveAndRender({ volumeBoost: clamped });
  });
}

initialize();
