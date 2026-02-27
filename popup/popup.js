const DEFAULT_SETTINGS = {
  openInNewTab: false,
  theme: "original", // "original", "dark", or "custom"
  customTheme: {
    bg: "#10131a",
    surface: "#1d2230",
    border: "#333d4f",
    copy: "#e7eaf1",
    icon: "#ffa100"
  },
  volumeBoost: 100,
  playbackSpeed: 1
};

const openInNewTabInput = document.getElementById("openInNewTab");
const themeInputs = document.querySelectorAll('input[name="theme"]');
const customThemePanel = document.getElementById("customThemePanel");
const colorInputs = {
  bg: document.getElementById("colorBg"),
  surface: document.getElementById("colorSurface"),
  border: document.getElementById("colorBorder"),
  copy: document.getElementById("colorCopy"),
  icon: document.getElementById("colorIcon")
};
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
  document.body.dataset.theme = settings.theme === "original" ? "light" : "dark";
}

function updateVolumeLabel() {
  volumeValueOutput.textContent = `${settings.volumeBoost}%`;
}

function syncInputsWithSettings() {
  openInNewTabInput.checked = settings.openInNewTab;
  
  themeInputs.forEach(input => {
    input.checked = input.value === settings.theme;
  });
  
  if (settings.theme === "custom") {
    customThemePanel.classList.add("expanded");
  } else {
    customThemePanel.classList.remove("expanded");
  }

  Object.entries(colorInputs).forEach(([key, input]) => {
    if (input && settings.customTheme[key]) {
      input.value = settings.customTheme[key];
    }
  });

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

  themeInputs.forEach(input => {
    input.addEventListener("change", async (event) => {
      await saveAndRender({ theme: event.target.value });
    });
  });

  Object.entries(colorInputs).forEach(([key, input]) => {
    if (input) {
      const handleColorChange = async (event) => {
        const newCustomTheme = { ...settings.customTheme, [key]: event.target.value };
        await saveAndRender({ customTheme: newCustomTheme });
      };
      input.addEventListener("input", handleColorChange);
      input.addEventListener("change", handleColorChange);
    }
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
