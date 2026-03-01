# CWS Permission Justifications

When submitting the **Audible Tools** extension to the Chrome Web Store, you will need to provide business justifications for the permissions requested in `manifest.json`. You can copy and paste the explanations below to ensure a smooth review process.

## 1. `storage` justification
**Why it's needed:**
"The 'storage' permission is required to save and persist user preferences locally. This ensures that when a user customizes their experience—such as selecting a specific theme (dark mode, custom colors), setting a volume boost multiplier, or choosing a playback speed—their preferred settings are immediately applied the next time they open the Audible web player without needing to be reconfigured."

## 2. `tabs` justification
**Why it's needed:**
"The 'tabs' permission is necessary for the extension's popup UI to identify and establish a communication channel with the active Audible web player tab. It allows the background service worker and popup to send messages to the content script, enabling real-time control over audio playback options, volume boosting, and theme toggling without reloading the page."

## 3. Host permission justification (`https://*/*`)
**Why it's needed:**
"Host permissions for 'https://*/*' are strictly necessary because Audible operates its web player across numerous distinct regional top-level domains globally (e.g., audible.com, audible.co.uk, audible.de, audible.com.au, audible.ca, audible.in, audible.co.jp, etc.). Using a broad match pattern ensures our content scripts and web-accessible resources can be injected and function consistently for users worldwide, regardless of which official Audible storefront they use to access their library."

## 4. Are you using remote code?
You should select: **No, I am not using remote code.** 

**Reasoning:**
Our extension fully complies with Manifest V3 requirements. It does not use `eval()`, `new Function()`, or fetch external JavaScript or Wasm files. All scripts, styling, logic, and icon assets (SVGs, PNGs) are fully bundled within the extension package you uploaded.

## 5. Single purpose description
**What to enter:**
"The single purpose of the Audible Tools extension is to enhance the Audible web player experience by providing users with localized customization features, including an audio volume booster, persistent UI theme toggling, and fine-grained playback speed controls."
