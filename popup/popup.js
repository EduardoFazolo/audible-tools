const DEFAULT_SETTINGS = {
  openInNewTab: false,
  theme: "original", // "original", "dark", or "custom"
  customTheme: {
    bg: "#10131a",
    surface: "#1d2230",
    copy: "#f79a1c"
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
  copy: document.getElementById("colorCopy")
};
const volumeBoostInput = document.getElementById("volumeBoost");
const volumeValueOutput = document.getElementById("volumeValue");

let settings = { ...DEFAULT_SETTINGS };

function hexToRgb(hex) {
  const value = String(hex || "").trim();
  const normalized = value.startsWith("#") ? value.slice(1) : value;
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((token) => token + token)
          .join("")
      : normalized;

  if (!/^[0-9a-f]{6}$/i.test(expanded)) return null;

  return {
    r: parseInt(expanded.slice(0, 2), 16),
    g: parseInt(expanded.slice(2, 4), 16),
    b: parseInt(expanded.slice(4, 6), 16)
  };
}

function toRgba(hex, alpha) {
  const rgb = hexToRgb(hex);
  if (!rgb) return "";
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

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
  document.body.dataset.themeVariant = settings.theme;

  const accent =
    settings.theme === "custom"
      ? settings.customTheme?.copy || DEFAULT_SETTINGS.customTheme.copy
      : settings.theme === "dark"
        ? "#ffa100"
        : "#db7e0e";
  const accentContrast =
    settings.theme === "custom"
      ? settings.customTheme?.bg || "#10131a"
      : settings.theme === "dark"
        ? "#10131a"
        : "#ffffff";

  document.body.style.setProperty("--theme-accent", accent);
  document.body.style.setProperty("--theme-accent-soft", toRgba(accent, 0.2));
  document.body.style.setProperty("--theme-accent-track", toRgba(accent, 0.34));
  document.body.style.setProperty("--theme-accent-contrast", accentContrast);
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
