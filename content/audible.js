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

const WEBPLAYER_HOST_REGEX = /^www\.audible\.[a-z.]+$/i;
const WEBPLAYER_PATH = "/webplayer";
const DARK_MODE_CLASS = "audible-tools-dark-mode";
const DARK_MODE_STYLE_ID = "audible-tools-dark-mode-style";
const ICON_BUTTON_CLASS = "audible-tools-icon-button";
const CUSTOM_ICON_CLASS = "audible-tools-custom-icon";
const ICON_OVERLAY_CLASS = "audible-tools-icon-overlay";
const ICON_ASSET_CLASS = "audible-tools-icon-asset";
const ICON_TYPE_ATTRIBUTE = "data-audible-tools-icon-type";
const TEXT_ACCENT_CLASS = "audible-tools-text-accent-control";
const CHAPTERS_ICON_CLASS = "audible-tools-chapters-icon";
const CHAPTERS_ICON_HOST_CLASS = "audible-tools-chapters-icon-host";
const BOOKMARK_ICON_CLASS = "audible-tools-bookmark-icon";
const BOOKMARK_ICON_HOST_CLASS = "audible-tools-bookmark-icon-host";
const CHAPTER_PANEL_HOST_CLASS = "audible-tools-chapter-panel-host";
const CHAPTER_PANEL_ROW_CLASS = "audible-tools-chapter-panel-row";
const CHAPTERS_ICON_ORIGINAL_HIDDEN_CLASS = "audible-tools-chapters-icon-original-hidden";
const CHAPTERS_ICON_ASSET_PATH = "assets/chapters.svg";
const BOOKMARK_ICON_ASSET_PATH = "assets/bookmark.svg";
const CHAPTERS_ICON_ORIGINAL_DISPLAY_ATTRIBUTE = "data-audible-tools-original-display";
const BOTTOM_MENU_CARD_CLICK_BOUND_ATTRIBUTE = "data-audible-tools-card-click-bound";
const LOGO_REPLACEMENT_CLASS = "audible-tools-logo-replacement";
const LOGO_ORIGINAL_CLASS = "audible-tools-logo-original";
const SVG_PLAY = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="${ICON_ASSET_CLASS}"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><polygon points="10 8 17 12 10 16" fill="currentColor"/></svg>`;
const SVG_PAUSE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="${ICON_ASSET_CLASS}"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><line x1="10" y1="8.7" x2="10" y2="15.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="14" y1="8.7" x2="14" y2="15.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
const SVG_REWIND30 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="${ICON_ASSET_CLASS}"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 3v5h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><text x="12" y="16" text-anchor="middle" font-size="7.2" font-family="system-ui, sans-serif" font-weight="700" fill="currentColor">30</text></svg>`;
const SVG_FORWARD30 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="${ICON_ASSET_CLASS}"><g transform="translate(24 0) scale(-1 1)"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 3v5h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><text x="12" y="16" text-anchor="middle" font-size="7.2" font-family="system-ui, sans-serif" font-weight="700" fill="currentColor">30</text></svg>`;
const SVG_PREVIOUS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="${ICON_ASSET_CLASS}"><line x1="6.8" y1="4.8" x2="6.8" y2="19.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><polyline points="17.4 5.8 9.2 12 17.4 18.2 17.4 5.8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const SVG_NEXT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="${ICON_ASSET_CLASS}"><line x1="17.2" y1="4.8" x2="17.2" y2="19.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><polyline points="6.6 5.8 14.8 12 6.6 18.2 6.6 5.8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const SVG_MENU = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="${ICON_ASSET_CLASS}"><circle cx="6" cy="12" r="1.8" fill="currentColor"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/><circle cx="18" cy="12" r="1.8" fill="currentColor"/></svg>`;

const SVG_CHAPTERS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="${CHAPTERS_ICON_CLASS}"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.1"><line x1="8.2" y1="6" x2="18.2" y2="6"/><line x1="8.2" y1="12" x2="18.2" y2="12"/><line x1="8.2" y1="18" x2="18.2" y2="18"/></g><g fill="currentColor"><circle cx="4.4" cy="6" r="1.4"/><circle cx="4.4" cy="12" r="1.4"/><circle cx="4.4" cy="18" r="1.4"/></g></svg>`;
const SVG_BOOKMARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="${BOOKMARK_ICON_CLASS}"><path d="M7 3.5h10v16l-5-2.9-5 2.9z" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8v5" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/><path d="M9.5 10.5h5" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/></svg>`;
const SVG_DETAIL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="audible-tools-drawer-icon"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 7h6" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" /><path d="M9 11h6" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" /></svg>`;
const SVG_LIBRARY = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="audible-tools-drawer-icon"><path d="M4 19V5a2 2 0 0 1 2-2h13.4a.6.6 0 0 1 .6.6v13.8a2.6 2.6 0 0 1-2.6 2.6H6a2 2 0 0 1-2-2Z" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 17h14" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/><path d="M9 7v6" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/><path d="M12 7v6" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/><path d="M15 7v4" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/></svg>`;

const SVG_LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 24.5" fill="none" aria-hidden="true" class="${ICON_ASSET_CLASS}"><polygon fill="currentColor" points="22,21.3 44,10.3 44,13.5 22,24.5 0,13.5 0,10.3"/><path fill="currentColor" d="M28.3,15.3c-1.2-2.2-3.6-3.8-6.3-3.8c-2.7,0-5,1.6-6.3,3.8c0,0,1.4-1.4,3.7-1.4c2.3,0,4.2,1.4,5.2,3.2C24.7,17,28.3,15.3,28.3,15.3z"/><path fill="currentColor" d="M35.5,11.7c-3-5.5-9-9.2-15.7-9.2c-6,0-11.2,3-14.4,7.5c0,0,0,0-0.1,0.1C8.5,4.1,14.8,0,22,0c7.2,0,13.8,4,17,9.9L35.5,11.7z"/><path fill="currentColor" d="M30.1,14.4L33.7,12.6C31.3,8.6,27,5.9,22,5.9c-4.9,0-9.3,2.8-11.6,6.7c2.2-2.5,5.5-4.2,9.1-4.2C24,8.3,27.9,10.8,30.1,14.4z"/></svg>`;

const PLAY_NOW_BUTTON_SELECTOR = '#adbl-buy-box-play-now-button, adbl-button[name="playButton"]';
const DEFAULT_CONTENT_DELIVERY_TYPE = "SinglePartBook";
const VOLUME_WIDGET_ID = "audible-tools-webplayer-volume";
const VOLUME_WIDGET_STYLE_ID = "audible-tools-webplayer-volume-style";
const VOLUME_WIDGET_SLIDER_CLASS = "audible-tools-webplayer-volume-slider";
const SPEED_POPOVER_ID = "audible-tools-speed-popover";
const SPEED_POPOVER_STYLE_ID = "audible-tools-speed-popover-style";
const SPEED_POPOVER_RANGE_CLASS = "audible-tools-speed-popover-range";
const SPEED_POPOVER_VALUE_CLASS = "audible-tools-speed-popover-value";
const SPEED_POPOVER_PRESET_CLASS = "audible-tools-speed-popover-preset";
const SPEED_PRESET_VALUES = [0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];
const PLAYBACK_SPEED_MIN = 0.5;
const PLAYBACK_SPEED_MAX = 3;
const PLAYBACK_SPEED_STEP = 0.05;
const VOLUME_WIDGET_STYLES = `
#${VOLUME_WIDGET_ID} {
  --audible-tools-volume-copy: #0f1724;
  --audible-tools-volume-track: rgba(15, 23, 36, 0.2);
  --audible-tools-volume-track-active: #ffa100;
  --audible-tools-volume-thumb: #ffa100;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 90%;
  margin: 4px auto 8px;
  padding: 0;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  color: var(--audible-tools-volume-copy);
  font-family: "Audible Sans", "Helvetica Neue", Arial, sans-serif;
  box-sizing: border-box;
}

#${VOLUME_WIDGET_ID}[data-layout="floating"] {
  position: fixed;
  left: 50%;
  bottom: 98px;
  width: min(520px, calc(100vw - 44px));
  transform: translateX(-50%);
  margin: 0 auto;
  padding: 8px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  z-index: 2147483646;
}

#${VOLUME_WIDGET_ID}[data-layout="floating"][data-theme="dark"] {
  background: rgba(18, 24, 36, 0.92);
}

#${VOLUME_WIDGET_ID}[data-theme="dark"] {
  --audible-tools-volume-copy: #eef2f8;
  --audible-tools-volume-track: rgba(238, 242, 248, 0.28);
}

#${VOLUME_WIDGET_ID}[data-theme="light"] {
  --audible-tools-volume-copy: #101723;
  --audible-tools-volume-track: rgba(16, 23, 35, 0.22);
}

#${VOLUME_WIDGET_ID} .audible-tools-webplayer-volume-icon {
  flex: 0 0 auto;
  width: 18px;
  height: 18px;
  color: var(--audible-tools-volume-copy);
  opacity: 0.82;
}

#${VOLUME_WIDGET_ID} .audible-tools-webplayer-volume-icon svg {
  width: 100%;
  height: 100%;
  display: block;
  fill: currentColor;
}

#${VOLUME_WIDGET_ID} .audible-tools-webplayer-volume-sr {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  border: 0 !important;
}

#${VOLUME_WIDGET_ID} .${VOLUME_WIDGET_SLIDER_CLASS} {
  flex: 1 1 auto;
  min-width: 120px;
  height: 22px;
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
}

#${VOLUME_WIDGET_ID} .${VOLUME_WIDGET_SLIDER_CLASS}::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(
    to right,
    var(--audible-tools-volume-track-active) 0%,
    var(--audible-tools-volume-track-active) var(--value, 33%),
    var(--audible-tools-volume-track) var(--value, 33%),
    var(--audible-tools-volume-track) 100%
  );
}

#${VOLUME_WIDGET_ID} .${VOLUME_WIDGET_SLIDER_CLASS}::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  margin-top: -6px;
  border: 0;
  border-radius: 50%;
  background: var(--audible-tools-volume-thumb);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

#${VOLUME_WIDGET_ID} .${VOLUME_WIDGET_SLIDER_CLASS}::-moz-range-track {
  height: 4px;
  border: 0;
  border-radius: 999px;
  background: var(--audible-tools-volume-track);
}

#${VOLUME_WIDGET_ID} .${VOLUME_WIDGET_SLIDER_CLASS}::-moz-range-progress {
  height: 4px;
  border-radius: 999px;
  background: var(--audible-tools-volume-track-active);
}

#${VOLUME_WIDGET_ID} .${VOLUME_WIDGET_SLIDER_CLASS}::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border: 0;
  border-radius: 50%;
  background: var(--audible-tools-volume-thumb);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

@media (max-width: 640px) {
  #${VOLUME_WIDGET_ID}[data-layout="floating"] {
    bottom: 86px;
    width: min(520px, calc(100vw - 28px));
  }

  #${VOLUME_WIDGET_ID} {
    gap: 10px;
  }
}
`;
const SPEED_POPOVER_STYLES = `
#${SPEED_POPOVER_ID} {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2147483647;
  width: min(328px, calc(100vw - 20px));
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 36, 0.16);
  background: rgba(255, 255, 255, 0.98) !important;
  color: #101723 !important;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.24);
  display: none;
  box-sizing: border-box;
  font-family: "Audible Sans", "Helvetica Neue", Arial, sans-serif;
}

#${SPEED_POPOVER_ID}[data-open="true"] {
  display: block;
}

#${SPEED_POPOVER_ID}[data-theme="dark"] {
  border-color: rgba(81, 96, 122, 0.72);
  background: rgba(18, 24, 36, 0.96) !important;
  color: #ecf1f8 !important;
}

#${SPEED_POPOVER_ID} * {
  box-sizing: border-box;
}

#${SPEED_POPOVER_ID} .audible-tools-speed-popover-title {
  font-size: 0.86rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  opacity: 0.92;
}

#${SPEED_POPOVER_ID} .${SPEED_POPOVER_VALUE_CLASS} {
  margin-top: 6px;
  font-size: 1.45rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

#${SPEED_POPOVER_ID} .audible-tools-speed-popover-controls {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 36px 1fr 36px;
  gap: 8px;
  align-items: center;
}

#${SPEED_POPOVER_ID} button.audible-tools-speed-popover-step {
  width: 36px !important;
  height: 36px !important;
  border: 0 !important;
  border-radius: 50% !important;
  background: rgba(15, 23, 36, 0.1) !important;
  color: var(--audible-tools-accent) !important;
  font-size: 1.35rem !important;
  font-weight: 700 !important;
  line-height: 1 !important;
  padding: 0 !important;
  cursor: pointer !important;
}

#${SPEED_POPOVER_ID}[data-theme="dark"] button.audible-tools-speed-popover-step {
  background: rgba(236, 241, 248, 0.14) !important;
  color: var(--audible-tools-accent) !important;
}

#${SPEED_POPOVER_ID} .${SPEED_POPOVER_RANGE_CLASS} {
  width: 100%;
  height: 22px;
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
}

#${SPEED_POPOVER_ID} .${SPEED_POPOVER_RANGE_CLASS}::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(
    to right,
    #ffa100 0%,
    #ffa100 var(--value, 20%),
    rgba(15, 23, 36, 0.28) var(--value, 20%),
    rgba(15, 23, 36, 0.28) 100%
  );
}

#${SPEED_POPOVER_ID}[data-theme="dark"] .${SPEED_POPOVER_RANGE_CLASS}::-webkit-slider-runnable-track {
  background: linear-gradient(
    to right,
    #ffa100 0%,
    #ffa100 var(--value, 20%),
    rgba(236, 241, 248, 0.34) var(--value, 20%),
    rgba(236, 241, 248, 0.34) 100%
  );
}

#${SPEED_POPOVER_ID} .${SPEED_POPOVER_RANGE_CLASS}::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  margin-top: -6px;
  border: 0;
  border-radius: 50%;
  background: #ffa100;
}

#${SPEED_POPOVER_ID} .${SPEED_POPOVER_RANGE_CLASS}::-moz-range-track {
  height: 4px;
  border: 0;
  border-radius: 999px;
  background: rgba(15, 23, 36, 0.28);
}

#${SPEED_POPOVER_ID}[data-theme="dark"] .${SPEED_POPOVER_RANGE_CLASS}::-moz-range-track {
  background: rgba(236, 241, 248, 0.34);
}

#${SPEED_POPOVER_ID} .${SPEED_POPOVER_RANGE_CLASS}::-moz-range-progress {
  height: 4px;
  border-radius: 999px;
  background: #ffa100;
}

#${SPEED_POPOVER_ID} .${SPEED_POPOVER_RANGE_CLASS}::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border: 0;
  border-radius: 50%;
  background: #ffa100;
}

#${SPEED_POPOVER_ID} .audible-tools-speed-popover-presets {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

#${SPEED_POPOVER_ID} button.${SPEED_POPOVER_PRESET_CLASS} {
  min-width: 58px !important;
  height: 32px !important;
  border: 1px solid rgba(15, 23, 36, 0.18) !important;
  border-radius: 999px !important;
  background: rgba(15, 23, 36, 0.08) !important;
  color: inherit !important;
  font-size: 0.95rem !important;
  font-weight: 700 !important;
  line-height: 1 !important;
  padding: 0 12px !important;
  cursor: pointer !important;
}

#${SPEED_POPOVER_ID}[data-theme="dark"] button.${SPEED_POPOVER_PRESET_CLASS} {
  border-color: rgba(236, 241, 248, 0.18) !important;
  background: rgba(236, 241, 248, 0.1) !important;
}

#${SPEED_POPOVER_ID} button.${SPEED_POPOVER_PRESET_CLASS}[aria-pressed="true"] {
  border-color: #ffa100 !important;
  background: rgba(255, 161, 0, 0.2) !important;
  color: #ffa100 !important;
}
`;
const CONTROL_ICON_ASSET_PATHS = {
  menu: "assets/icon-menu.svg",
  previous: "assets/icon-previous.svg",
  rewind30: "assets/icon-rewind30.svg",
  play: "assets/icon-play.svg",
  pause: "assets/icon-pause.svg",
  forward30: "assets/icon-forward30.svg",
  next: "assets/icon-next.svg"
};
const DARK_MODE_STYLES = `
html.${DARK_MODE_CLASS} {
  --audible-tools-bg: #10131a;
  --audible-tools-bg-elevated: #171b24;
  --audible-tools-surface: #1d2230;
  --audible-tools-surface-raised: #242b3a;
  --audible-tools-surface-strong: #2b3344;
  --audible-tools-border: transparent;
  --audible-tools-copy: #f79a1c;
  --audible-tools-muted: #a2a9b8;
  --audible-tools-icon: var(--audible-tools-copy);
  --audible-tools-focus: rgba(255, 161, 0, 0.34);
  background: var(--audible-tools-bg) !important;
  color-scheme: dark !important;
}

html.${DARK_MODE_CLASS},
html.${DARK_MODE_CLASS} body {
  background: var(--audible-tools-bg) !important;
  color: var(--audible-tools-copy) !important;
}

html.${DARK_MODE_CLASS} body::before,
html.${DARK_MODE_CLASS} body::after {
  content: none !important;
}

html.${DARK_MODE_CLASS} :where(header, nav, [role="banner"], [role="navigation"], body > :first-child) {
  background: var(--audible-tools-bg-elevated) !important;
  background-image: none !important;
  border-color: var(--audible-tools-border) !important;
  box-shadow: none !important;
}

html.${DARK_MODE_CLASS} :where(
  main,
  header,
  footer,
  section,
  article,
  aside,
  nav,
  form,
  dialog,
  details,
  summary,
  ul,
  ol,
  li,
  table,
  thead,
  tbody,
  tr,
  th,
  td,
  [role="dialog"],
  [role="menu"],
  [role="listbox"],
  [role="tabpanel"],
  [role="region"]
) {
  background-color: var(--audible-tools-surface) !important;
  background-image: none !important;
  border-color: var(--audible-tools-border) !important;
  box-shadow: none !important;
}

html.${DARK_MODE_CLASS} :where(
  div,
  span,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  small,
  strong,
  em,
  label,
  dt,
  dd,
  li
) {
  color: var(--audible-tools-copy) !important;
}

html.${DARK_MODE_CLASS} :where(button, [role="button"], a[role="button"], input:not([type="range"]), textarea, select) {
  background-color: var(--audible-tools-surface-raised) !important;
  color: var(--audible-tools-copy) !important;
  border-color: var(--audible-tools-border) !important;
  background-image: none !important;
  box-shadow: none !important;
}

html.${DARK_MODE_CLASS} :where(input::placeholder, textarea::placeholder) {
  color: var(--audible-tools-muted) !important;
}

html.${DARK_MODE_CLASS} a,
html.${DARK_MODE_CLASS} [role="link"] {
  color: var(--audible-tools-copy) !important;
}

html.${DARK_MODE_CLASS} :where(
  button[aria-pressed="true"],
  [role="button"][aria-pressed="true"],
  [aria-selected="true"],
  [data-state="active"],
  .active
) {
  background-color: rgba(255, 161, 0, 0.16) !important;
  border-color: transparent !important;
}

html.${DARK_MODE_CLASS} :where(progress, meter) {
  accent-color: var(--audible-tools-accent) !important;
}



html.${DARK_MODE_CLASS} :where(hr) {
  border-color: var(--audible-tools-border) !important;
}

html.${DARK_MODE_CLASS} :where(img, video, picture, canvas, iframe, svg image) {
  filter: none !important;
}

html.${DARK_MODE_CLASS} .${ICON_BUTTON_CLASS} {
  position: relative !important;
  min-width: 44px !important;
  min-height: 44px !important;
  background: var(--audible-tools-surface-raised) !important;
  border: 1px solid var(--audible-tools-border) !important;
  border-radius: 14px !important;
  color: var(--audible-tools-accent) !important;
  overflow: hidden !important;
}

html.${DARK_MODE_CLASS} :where(
  button[aria-label*="Voltar"],
  button[aria-label*="Retroced"],
  button[aria-label*="Avanç"],
  button[aria-label*="Paus"],
  button[aria-label*="Reprodu"],
  button[aria-label*="Play"],
  button[aria-label*="Pause"],
  button[aria-label*="Back"],
  button[aria-label*="Forward"],
  button[title*="Voltar"],
  button[title*="Retroced"],
  button[title*="Avanç"],
  button[title*="Paus"],
  button[title*="Reprodu"],
  button[title*="Play"],
  button[title*="Pause"]
) {
  background: var(--audible-tools-surface-raised) !important;
  border: 1px solid var(--audible-tools-border) !important;
  color: var(--audible-tools-accent) !important;
}

html.${DARK_MODE_CLASS} .${ICON_BUTTON_CLASS} :where(*) {
  background-color: transparent !important;
  background-image: none !important;
}

html.${DARK_MODE_CLASS} .${ICON_BUTTON_CLASS}::before,
html.${DARK_MODE_CLASS} .${ICON_BUTTON_CLASS}::after {
  content: none !important;
  background: none !important;
  border: 0 !important;
  box-shadow: none !important;
}

html.${DARK_MODE_CLASS} .${ICON_BUTTON_CLASS} :where(svg) {
  color: var(--audible-tools-accent) !important;
  fill: var(--audible-tools-accent) !important;
}

html.${DARK_MODE_CLASS} .${ICON_BUTTON_CLASS} :where(
  path,
  circle,
  ellipse,
  rect,
  polygon,
  polyline,
  line
) {
  stroke: currentColor !important;
}

html.${DARK_MODE_CLASS} .${ICON_BUTTON_CLASS} :where(text, tspan) {
  fill: var(--audible-tools-accent) !important;
  color: var(--audible-tools-accent) !important;
  stroke: none !important;
}

html.${DARK_MODE_CLASS} .${ICON_BUTTON_CLASS} :where([style*="background"]) {
  background: transparent !important;
}

html.${DARK_MODE_CLASS} .${CUSTOM_ICON_CLASS} {
  position: relative !important;
  color: var(--audible-tools-accent) !important;
}

html.${DARK_MODE_CLASS} .${CUSTOM_ICON_CLASS}::before,
html.${DARK_MODE_CLASS} .${CUSTOM_ICON_CLASS}::after {
  content: none !important;
  background: none !important;
  background-image: none !important;
  border: 0 !important;
  box-shadow: none !important;
}

html.${DARK_MODE_CLASS} .${CUSTOM_ICON_CLASS} > :not(.${ICON_OVERLAY_CLASS}) {
  opacity: 0 !important;
}

html.${DARK_MODE_CLASS} .${ICON_OVERLAY_CLASS} {
  position: absolute !important;
  inset: 0 !important;
  z-index: 2 !important;
  pointer-events: none !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: var(--audible-tools-accent) !important;
}

html.${DARK_MODE_CLASS} .${ICON_OVERLAY_CLASS} :where(svg.${ICON_ASSET_CLASS}) {
  width: 68% !important;
  height: 68% !important;
  overflow: visible !important;
}

html.${DARK_MODE_CLASS} .${ICON_OVERLAY_CLASS} :where(svg) {
  stroke: currentColor !important;
  stroke-width: 2 !important;
  stroke-linecap: round !important;
  stroke-linejoin: round !important;
  fill: none !important;
}

html.${DARK_MODE_CLASS} .${CUSTOM_ICON_CLASS}[${ICON_TYPE_ATTRIBUTE}="play"] .${ICON_OVERLAY_CLASS} :where(svg.${ICON_ASSET_CLASS}),
html.${DARK_MODE_CLASS} .${CUSTOM_ICON_CLASS}[${ICON_TYPE_ATTRIBUTE}="pause"] .${ICON_OVERLAY_CLASS} :where(svg.${ICON_ASSET_CLASS}) {
  width: 74% !important;
  height: 74% !important;
}

html.${DARK_MODE_CLASS} .${CUSTOM_ICON_CLASS}[${ICON_TYPE_ATTRIBUTE}="rewind30"] .${ICON_OVERLAY_CLASS} :where(svg.${ICON_ASSET_CLASS}),
html.${DARK_MODE_CLASS} .${CUSTOM_ICON_CLASS}[${ICON_TYPE_ATTRIBUTE}="forward30"] .${ICON_OVERLAY_CLASS} :where(svg.${ICON_ASSET_CLASS}) {
  width: 76% !important;
  height: 76% !important;
}

html.${DARK_MODE_CLASS} .${ICON_OVERLAY_CLASS} .fill-current {
  fill: var(--audible-tools-accent) !important;
  color: var(--audible-tools-accent) !important;
  stroke: none !important;
}

html.${DARK_MODE_CLASS} .${ICON_OVERLAY_CLASS} :where(text, tspan) {
  fill: var(--audible-tools-accent) !important;
  color: var(--audible-tools-accent) !important;
  stroke: none !important;
  font-family: system-ui, sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: -0.2px !important;
}

html.${DARK_MODE_CLASS} .${TEXT_ACCENT_CLASS},
html.${DARK_MODE_CLASS} .${TEXT_ACCENT_CLASS} :where(
  span,
  p,
  small,
  strong,
  b,
  em,
  label,
  div,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6
) {
  color: var(--audible-tools-icon) !important;
}

html.${DARK_MODE_CLASS} #adbl-cloud-player-bottom-menu-area {
  display: flex !important;
  flex-wrap: nowrap !important;
  align-items: stretch !important;
  justify-content: space-between !important;
  gap: 6px !important;
  padding: 3px 4px 4px !important;
  transform: translateY(50px) !important;
}

html.${DARK_MODE_CLASS} #adbl-cloud-player-bottom-menu-area > *:has(.${TEXT_ACCENT_CLASS}),
html.${DARK_MODE_CLASS} #adbl-cloud-player-bottom-menu-area > .${TEXT_ACCENT_CLASS} {
  flex: 1 1 0 !important;
  min-width: 0 !important;
  height: 66px !important;
  min-height: 66px !important;
  max-height: 66px !important;
  padding: 2px 2px !important;
  border: 1px solid var(--audible-tools-border) !important;
  border-radius: 8px !important;
  background: var(--audible-tools-surface-raised) !important;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.04) !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 3px !important;
  text-align: center !important;
  font-size: 0.78rem !important;
  line-height: 1.18 !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
}

html.${DARK_MODE_CLASS} #adbl-cloud-player-bottom-menu-area > *:has(.${TEXT_ACCENT_CLASS}) :where(
  button,
  [role="button"],
  a[role="button"],
  a
),
html.${DARK_MODE_CLASS} #adbl-cloud-player-bottom-menu-area > .${TEXT_ACCENT_CLASS} :where(
  button,
  [role="button"],
  a[role="button"],
  a
) {
  width: 100% !important;
  min-height: 100% !important;
  border: 0 !important;
  padding: 0 !important;
  background: transparent !important;
}

html.${DARK_MODE_CLASS} #adbl-cloud-player-bottom-menu-area > *:has(.${TEXT_ACCENT_CLASS}) :where(
  span,
  p,
  small,
  strong,
  b,
  em,
  label,
  div,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6
),
html.${DARK_MODE_CLASS} #adbl-cloud-player-bottom-menu-area > .${TEXT_ACCENT_CLASS} :where(
  span,
  p,
  small,
  strong,
  b,
  em,
  label,
  div,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6
) {
  font-size: 0.94em !important;
  line-height: 1.1 !important;
}

html.${DARK_MODE_CLASS} #adbl-cloud-player-bottom-menu-area > *:has(.${TEXT_ACCENT_CLASS}) :where(svg, span.${ICON_ASSET_CLASS}),
html.${DARK_MODE_CLASS} #adbl-cloud-player-bottom-menu-area > .${TEXT_ACCENT_CLASS} :where(svg, span.${ICON_ASSET_CLASS}) {
  max-width: 20px !important;
  max-height: 20px !important;
}

html.${DARK_MODE_CLASS} #adbl-cloud-player-bottom-menu-area svg.${CHAPTERS_ICON_CLASS} {
  display: inline-block !important;
  color: var(--audible-tools-accent) !important;
}

html.${DARK_MODE_CLASS} #adbl-cloud-player-bottom-menu-area svg.${BOOKMARK_ICON_CLASS} {
  display: inline-block !important;
  color: var(--audible-tools-accent) !important;
}

/* Action Sheet & Drawer fixes */
html.${DARK_MODE_CLASS} .bc-action-sheet-item,
html.${DARK_MODE_CLASS} .bc-action-sheet-item :where(button, [role="button"], a),
html.${DARK_MODE_CLASS} .bc-core-actionsheet-cancel,
html.${DARK_MODE_CLASS} .bc-core-actionsheet-cancel :where(button, [role="button"], a) {
  background-color: transparent !important;
  border-color: transparent !important;
  box-shadow: none !important;
}

html.${DARK_MODE_CLASS} .bc-core-actionsheet-cancel .bc-button {
  background-color: var(--audible-tools-surface-raised) !important;
  border: 1px solid var(--audible-tools-border) !important;
  border-radius: 9999px !important;
}

/* Fix Bookmark missing hover underline (Audible omitted the <a> tag) */
html.${DARK_MODE_CLASS} .adblCPMenuClipsBookmarksTray:hover .bc-size-action-large,
html.${DARK_MODE_CLASS} .adblAddToLibrary:hover .bc-size-action-large {
  text-decoration: underline !important;
  cursor: pointer !important;
}

/* Sizing for injected Drawer Custom Icons */
html.${DARK_MODE_CLASS} .audible-tools-drawer-icon {
  display: inline-block !important;
  width: 24px !important;
  height: 24px !important;
  color: var(--audible-tools-accent) !important;
  margin-right: -4px !important;
  vertical-align: middle !important;
}

html.${DARK_MODE_CLASS} .${CHAPTER_PANEL_HOST_CLASS} {
  background: var(--audible-tools-bg-elevated) !important;
}

html.${DARK_MODE_CLASS} .${CHAPTER_PANEL_ROW_CLASS} {
  background: var(--audible-tools-surface) !important;
  border-color: var(--audible-tools-border) !important;
}

html.${DARK_MODE_CLASS} .${CHAPTER_PANEL_ROW_CLASS} :where(
  div,
  span,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  small,
  strong,
  b,
  em,
  label,
  a,
  button,
  [role="button"]
) {
  color: var(--audible-tools-copy) !important;
}

html.${DARK_MODE_CLASS} .${LOGO_ORIGINAL_CLASS} {
  display: none !important;
}

html.${DARK_MODE_CLASS} .${LOGO_REPLACEMENT_CLASS} {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  line-height: 0 !important;
  color: var(--audible-tools-accent) !important;
  pointer-events: none !important;
  object-fit: contain !important;
}

html.${DARK_MODE_CLASS} .${LOGO_REPLACEMENT_CLASS} :where(svg, span.${ICON_ASSET_CLASS}) {
  width: 100% !important;
  height: 100% !important;
}

html.${DARK_MODE_CLASS} .${LOGO_REPLACEMENT_CLASS} :where(span.${ICON_ASSET_CLASS}) {
  display: block !important;
  background-color: currentColor !important;
  -webkit-mask-size: contain !important;
  -webkit-mask-repeat: no-repeat !important;
  -webkit-mask-position: center !important;
  mask-size: contain !important;
  mask-repeat: no-repeat !important;
  mask-position: center !important;
}

html.${DARK_MODE_CLASS} :where(button, [role="button"], a[role="button"]):focus-visible {
  outline: 2px solid var(--audible-tools-focus) !important;
  outline-offset: 2px !important;
}
`;

let currentSettings = { ...DEFAULT_SETTINGS };
let audioContext = null;
let iconRefreshPending = false;
let speedPopoverAnchor = null;

const connectedMedia = new WeakMap();
const observedMedia = new WeakSet();
const REPLACEABLE_ICON_TYPES = new Set([
  "menu",
  "previous",
  "rewind30",
  "play",
  "pause",
  "forward30",
  "next"
]);

function isSupportedWebplayerUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    return (
      parsed.protocol === "https:" &&
      WEBPLAYER_HOST_REGEX.test(parsed.hostname) &&
      parsed.pathname.startsWith(WEBPLAYER_PATH)
    );
  } catch {
    return false;
  }
}

function isAudibleUrl(url) {
  return url.protocol === "https:" && WEBPLAYER_HOST_REGEX.test(url.hostname);
}

function isSupportedAudibleUrl(rawUrl) {
  try {
    return isAudibleUrl(new URL(rawUrl));
  } catch {
    return false;
  }
}

function parseLinkUrl(link) {
  try {
    return new URL(link.href, window.location.href);
  } catch {
    return null;
  }
}

function isNavigableAudibleUrl(url) {
  return isAudibleUrl(url);
}

function isCurrentPageHashNavigation(url) {
  return (
    url.origin === window.location.origin &&
    url.pathname === window.location.pathname &&
    url.search === window.location.search &&
    Boolean(url.hash)
  );
}

function isIconLikeControl(element) {
  if (!(element instanceof Element)) return false;
  if (element.closest(`#${SPEED_POPOVER_ID}`)) return false;

  if (
    !element.matches('button, [role="button"], a[role="button"]')
  ) {
    return false;
  }

  const text = (element.textContent || "").replace(/\s+/g, "");
  const hasVisualIcon = Boolean(element.querySelector("svg, img, canvas, picture"));

  const rect = element.getBoundingClientRect();
  if (!rect.width || !rect.height) return false;
  if (rect.width > 160 || rect.height > 140) return false;

  if (!hasVisualIcon && text.length > 2) return false;

  return text.length <= 18;
}

function normalizeControlText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function getControlDescriptor(element) {
  const fields = [
    element.getAttribute("aria-label"),
    element.getAttribute("title"),
    element.getAttribute("aria-description"),
    element.getAttribute("data-testid"),
    element.getAttribute("name"),
    element.textContent
  ];

  return normalizeControlText(fields.filter(Boolean).join(" "));
}

function getRectCenterX(rect) {
  return rect.left + rect.width / 2;
}

function getTransport30Type(descriptor, fallback) {
  if (/(avanc|forward|adiant|frente)/.test(descriptor)) return "forward30";
  if (/(retroced|rewind|voltar|atras|back)/.test(descriptor)) return "rewind30";
  return fallback;
}

function getCurrentPlayPauseType() {
  const media = document.querySelector("audio, video");
  return media && !media.paused ? "pause" : "play";
}

function buildTransportIconMap(candidates) {
  const controls = candidates.filter((candidate) => {
    if (!(candidate instanceof Element)) return false;
    if (!candidate.classList.contains(ICON_BUTTON_CLASS)) return false;
    const rect = candidate.getBoundingClientRect();
    return rect.width >= 40 && rect.width <= 130 && rect.height >= 40 && rect.height <= 130;
  });

  if (controls.length < 5) return new Map();

  const descriptorByControl = new Map(
    controls.map((control) => [control, getControlDescriptor(control)])
  );

  const thirtyCandidates = controls.filter((control) => {
    const descriptor = descriptorByControl.get(control) || "";
    const textContent = normalizeControlText(control.textContent);
    return /\b30\b|30s|30 seg|30 segund/.test(`${descriptor} ${textContent}`);
  });

  if (thirtyCandidates.length < 2) return new Map();

  let bestPair = null;
  let maxDistance = 0;

  for (let i = 0; i < thirtyCandidates.length - 1; i += 1) {
    for (let j = i + 1; j < thirtyCandidates.length; j += 1) {
      const leftCandidate = thirtyCandidates[i];
      const rightCandidate = thirtyCandidates[j];
      const leftRect = leftCandidate.getBoundingClientRect();
      const rightRect = rightCandidate.getBoundingClientRect();

      if (Math.abs(leftRect.top - rightRect.top) > 34) continue;

      const distance = Math.abs(getRectCenterX(leftRect) - getRectCenterX(rightRect));
      if (distance > maxDistance) {
        maxDistance = distance;
        bestPair = [leftCandidate, rightCandidate];
      }
    }
  }

  if (!bestPair || maxDistance < Math.min(120, window.innerWidth * 0.24)) {
    return new Map();
  }

  let [first30, second30] = bestPair;
  if (getRectCenterX(first30.getBoundingClientRect()) > getRectCenterX(second30.getBoundingClientRect())) {
    [first30, second30] = [second30, first30];
  }

  const firstDescriptor = descriptorByControl.get(first30) || "";
  const secondDescriptor = descriptorByControl.get(second30) || "";
  let firstType = getTransport30Type(firstDescriptor, "rewind30");
  let secondType = getTransport30Type(secondDescriptor, firstType === "rewind30" ? "forward30" : "rewind30");

  if (firstType === secondType) {
    secondType = firstType === "rewind30" ? "forward30" : "rewind30";
  }

  const firstRect = first30.getBoundingClientRect();
  const secondRect = second30.getBoundingClientRect();
  const bandTop = (firstRect.top + secondRect.top) / 2;
  const minX = Math.min(firstRect.left, secondRect.left) - 150;
  const maxX = Math.max(firstRect.right, secondRect.right) + 150;

  const rowControls = controls
    .filter((control) => {
      const rect = control.getBoundingClientRect();
      const centerX = getRectCenterX(rect);
      return Math.abs(rect.top - bandTop) <= 34 && centerX >= minX && centerX <= maxX;
    })
    .sort((left, right) => {
      return getRectCenterX(left.getBoundingClientRect()) - getRectCenterX(right.getBoundingClientRect());
    });

  if (rowControls.length < 5) {
    return new Map();
  }

  const iconMap = new Map();
  iconMap.set(first30, firstType);
  iconMap.set(second30, secondType);

  const firstCenterX = getRectCenterX(firstRect);
  const secondCenterX = getRectCenterX(secondRect);
  const rowMidX = (firstCenterX + secondCenterX) / 2;

  const min30CenterX = Math.min(firstCenterX, secondCenterX);
  const max30CenterX = Math.max(firstCenterX, secondCenterX);

  let middleControl = rowControls
    .filter((control) => {
      if (control === first30 || control === second30) return false;
      const rect = control.getBoundingClientRect();
      const centerX = getRectCenterX(rect);
      return centerX > min30CenterX + 10 && centerX < max30CenterX - 10;
    })
    .sort((left, right) => {
      const leftRect = left.getBoundingClientRect();
      const rightRect = right.getBoundingClientRect();
      const leftArea = leftRect.width * leftRect.height;
      const rightArea = rightRect.width * rightRect.height;
      if (rightArea !== leftArea) return rightArea - leftArea;
      const leftDistance = Math.abs(getRectCenterX(leftRect) - rowMidX);
      const rightDistance = Math.abs(getRectCenterX(rightRect) - rowMidX);
      return leftDistance - rightDistance;
    })[0];

  if (!middleControl) {
    middleControl = rowControls
      .filter((control) => control !== first30 && control !== second30)
      .sort((left, right) => {
        const leftDistance = Math.abs(getRectCenterX(left.getBoundingClientRect()) - rowMidX);
        const rightDistance = Math.abs(getRectCenterX(right.getBoundingClientRect()) - rowMidX);
        return leftDistance - rightDistance;
      })[0];
  }

  if (middleControl) {
    iconMap.set(middleControl, getCurrentPlayPauseType());
  }

  const leftNeighbor = [...rowControls]
    .reverse()
    .find((control) => getRectCenterX(control.getBoundingClientRect()) < Math.min(firstCenterX, secondCenterX));
  if (leftNeighbor) {
    iconMap.set(leftNeighbor, "previous");
  }

  const rightNeighbor = rowControls.find(
    (control) => getRectCenterX(control.getBoundingClientRect()) > Math.max(firstCenterX, secondCenterX)
  );
  if (rightNeighbor) {
    iconMap.set(rightNeighbor, "next");
  }

  return iconMap;
}

function inferIconType(element, transportIconMap = null) {
  if (!(element instanceof Element)) return null;

  if (transportIconMap instanceof Map && transportIconMap.has(element)) {
    return transportIconMap.get(element) || null;
  }

  const descriptor = getControlDescriptor(element);
  const has30 = /\b30\b|30s|30 seg|30 segund/.test(descriptor);
  const hasBackHint = /(retroced|rewind|voltar|atras|back)/.test(descriptor);
  const hasForwardHint = /(avanc|forward|adiant|frente)/.test(descriptor);

  if (hasBackHint && has30) return "rewind30";
  if (hasForwardHint && has30) return "forward30";
  if (/(anterior|previous|previo|skip back|capitulo anterior)/.test(descriptor)) return "previous";
  if (/(proxim|next|seguinte|skip forward|capitulo seguinte)/.test(descriptor)) return "next";

  if (/(menu|opco|options|more|mais)/.test(descriptor)) return "menu";

  if (!descriptor) {
    const rect = element.getBoundingClientRect();
    const centerX = getRectCenterX(rect);
    if (
      rect.width >= 36 &&
      rect.width <= 90 &&
      rect.height >= 36 &&
      rect.height <= 90 &&
      rect.top < Math.max(140, window.innerHeight * 0.24) &&
      centerX > window.innerWidth * 0.68
    ) {
      return "menu";
    }
  }

  return null;
}

function shouldUseTextAccent(control) {
  if (!(control instanceof Element)) return false;

  const descriptor = getControlDescriptor(control);
  const textContent = normalizeControlText(control.textContent);
  const combined = `${descriptor} ${textContent}`;

  return /(velocidade|speed|narracao|narration|1\.0x|capitul|chapter|marcador|bookmark)/.test(combined);
}

function getControlIconAssetPath(type) {
  return CONTROL_ICON_ASSET_PATHS[type] || CONTROL_ICON_ASSET_PATHS.menu;
}

function getRuntimeAssetUrl(assetPath) {
  if (!assetPath) return null;
  try {
    if (assetPath.startsWith("chrome-extension://")) {
      return null;
    }
    return chrome.runtime.getURL(assetPath);
  } catch {
    return null;
  }
}

function getIconMarkup(type) {
  switch (type) {
    case "play": return SVG_PLAY;
    case "pause": return SVG_PAUSE;
    case "rewind30": return SVG_REWIND30;
    case "forward30": return SVG_FORWARD30;
    case "previous": return SVG_PREVIOUS;
    case "next": return SVG_NEXT;
    case "menu": return SVG_MENU;
    default: return "";
  }
}

function reinjectBottomMenuIcon(container, className, type) {
  if (container.querySelector(`.${className}`)) return;
  const svgMarkup = type === 'chapters' ? SVG_CHAPTERS : SVG_BOOKMARK;
  container.innerHTML = svgMarkup;
}

function getDirectIconOverlay(control) {
  return (
    Array.from(control.children).find(
      (child) => child instanceof Element && child.classList.contains(ICON_OVERLAY_CLASS)
    ) || null
  );
}

function removeCustomIcon(control) {
  if (!(control instanceof Element)) return;

  const overlay = getDirectIconOverlay(control);
  if (overlay) overlay.remove();

  control.classList.remove(CUSTOM_ICON_CLASS);
  control.removeAttribute(ICON_TYPE_ATTRIBUTE);
}

function applyCustomIcon(control, iconType) {
  if (!REPLACEABLE_ICON_TYPES.has(iconType)) {
    removeCustomIcon(control);
    return;
  }

  let overlay = getDirectIconOverlay(control);
  if (!overlay) {
    overlay = document.createElement("span");
    overlay.className = ICON_OVERLAY_CLASS;
    overlay.setAttribute("aria-hidden", "true");
    control.appendChild(overlay);
  }

  const iconMarkup = getIconMarkup(iconType);
  if (!iconMarkup) {
    removeCustomIcon(control);
    return;
  }

  overlay.innerHTML = iconMarkup;
  control.classList.add(CUSTOM_ICON_CLASS);
  control.setAttribute(ICON_TYPE_ATTRIBUTE, iconType);
}

function refreshControlIcon(control, transportIconMap = null) {
  if (!(control instanceof Element)) return;

  const iconType = inferIconType(control, transportIconMap);
  if (!iconType || !REPLACEABLE_ICON_TYPES.has(iconType)) {
    removeCustomIcon(control);
    return;
  }

  applyCustomIcon(control, iconType);
}

function collectControls(root = document) {
  const selector = 'button, [role="button"], a[role="button"]';
  const controls = [];

  if (root instanceof Element && root.matches(selector)) {
    controls.push(root);
  }

  if (root instanceof Element || root instanceof Document) {
    controls.push(...root.querySelectorAll(selector));
  }

  return controls;
}

function collectImages(root = document) {
  const images = [];

  if (root instanceof HTMLImageElement) {
    images.push(root);
  }

  if (root instanceof Element || root instanceof Document) {
    images.push(...root.querySelectorAll("img"));
  }

  return images;
}

function getImageDescriptor(image) {
  const className =
    typeof image.className === "string" ? image.className : image.className?.baseVal || "";

  return normalizeControlText(
    [
      image.getAttribute("alt"),
      image.getAttribute("title"),
      image.getAttribute("aria-label"),
      className,
      image.getAttribute("src")
    ]
      .filter(Boolean)
      .join(" ")
  );
}

function isLikelyAudibleTopLogoImage(image) {
  if (!(image instanceof HTMLImageElement)) return false;
  if (!image.isConnected) return false;
  if (image.closest(`.${LOGO_REPLACEMENT_CLASS}`)) return false;

  const rect = image.getBoundingClientRect();
  if (!rect.width || !rect.height) return false;
  if (rect.width < 34 || rect.width > 280) return false;
  if (rect.height < 12 || rect.height > 96) return false;
  if (rect.top > Math.max(180, window.innerHeight * 0.34)) return false;

  const ratio = rect.width / Math.max(1, rect.height);
  if (ratio < 1.2 || ratio > 4.9) return false;

  const descriptor = getImageDescriptor(image);
  if (/(audiobook|cover|capa|thumbnail|livro|book)/.test(descriptor)) return false;

  if (/(audible|logo|brand|cloudplayer)/.test(descriptor)) return true;
  if (image.closest("header, nav, [role='banner'], [role='navigation']")) return true;

  const centerX = rect.left + rect.width / 2;
  return centerX > window.innerWidth * 0.18 && centerX < window.innerWidth * 0.82;
}

function removeCustomLogoReplacements() {
  document.querySelectorAll(`.${LOGO_REPLACEMENT_CLASS}`).forEach((replacement) => {
    replacement.remove();
  });

  document.querySelectorAll(`img.${LOGO_ORIGINAL_CLASS}`).forEach((image) => {
    image.classList.remove(LOGO_ORIGINAL_CLASS);
  });
}

function replaceTopLogoImage(image) {
  if (!(image instanceof HTMLImageElement)) return;
  if (image.classList.contains(LOGO_ORIGINAL_CLASS)) return;

  const rect = image.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  const wrapper = document.createElement("span");
  wrapper.className = LOGO_REPLACEMENT_CLASS;
  wrapper.style.width = `${Math.round(rect.width)}px`;
  wrapper.style.height = `${Math.round(rect.height)}px`;
  wrapper.innerHTML = SVG_LOGO;

  image.after(wrapper);
  image.classList.add(LOGO_ORIGINAL_CLASS);
}

function applyTopLogoReplacement(root = document) {
  if (currentSettings.theme === "original") return;

  const candidates = collectImages(root);
  candidates.forEach((image) => {
    if (isLikelyAudibleTopLogoImage(image)) {
      replaceTopLogoImage(image);
    }
  });
}

function isBottomMenuChapterControl(control) {
  if (!(control instanceof Element)) return false;
  if (!control.closest("#adbl-cloud-player-bottom-menu-area")) return false;

  const descriptor = getControlDescriptor(control);
  const textContent = normalizeControlText(control.textContent);
  const combined = `${descriptor} ${textContent}`;

  if (!/(capitul|chapter)/.test(combined)) return false;
  if (/(anterior|previous|proxim|next|skip)/.test(combined)) return false;

  return true;
}

function isBottomMenuBookmarkControl(control) {
  if (!(control instanceof Element)) return false;
  if (!control.closest("#adbl-cloud-player-bottom-menu-area")) return false;

  const descriptor = getControlDescriptor(control);
  const textContent = normalizeControlText(control.textContent);
  const combined = `${descriptor} ${textContent}`;

  if (!/(marcador|bookmark)/.test(combined)) return false;
  if (/(capitul|chapter|anterior|previous|proxim|next|skip)/.test(combined)) return false;

  return true;
}

function isBottomMenuSpeedControl(control) {
  if (!(control instanceof Element)) return false;
  if (!control.closest("#adbl-cloud-player-bottom-menu-area")) return false;

  const descriptor = getControlDescriptor(control);
  const textContent = normalizeControlText(control.textContent);
  const combined = `${descriptor} ${textContent}`;

  if (!/(velocidade|speed|narracao|narration|1\.0x|0\.9x|1\.1x|1\.2x|1\.3x|1\.4x|1\.5x|2\.0x)/.test(combined)) {
    return false;
  }
  if (/(capitul|chapter|marcador|bookmark|anterior|previous|proxim|next|skip)/.test(combined)) return false;

  return true;
}

function isBottomMenuActionCard(control) {
  return (
    isBottomMenuSpeedControl(control) ||
    isBottomMenuChapterControl(control) ||
    isBottomMenuBookmarkControl(control)
  );
}

function isInteractiveElement(element) {
  return (
    element instanceof Element &&
    element.matches("button, [role='button'], adbl-button, a[href], a[role='button'], input, select, textarea, label")
  );
}

function getBottomMenuActionElement(card) {
  if (!(card instanceof Element)) return null;
  if (isInteractiveElement(card)) return card;

  return (
    card.querySelector("button, [role='button'], adbl-button, a[href], a[role='button']") ||
    card.querySelector("[tabindex]:not([tabindex='-1'])")
  );
}

function bindBottomMenuCardClick(card) {
  if (!(card instanceof Element)) return;
  if (card.getAttribute(BOTTOM_MENU_CARD_CLICK_BOUND_ATTRIBUTE) === "true") return;

  card.setAttribute(BOTTOM_MENU_CARD_CLICK_BOUND_ATTRIBUTE, "true");
  card.style.cursor = "pointer";
  card.addEventListener("click", (event) => {
    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = event.target;
    if (target instanceof Element && target.closest("button, [role='button'], adbl-button, a[href], a[role='button']")) {
      return;
    }

    const actionElement = getBottomMenuActionElement(card);
    if (!(actionElement instanceof HTMLElement)) return;
    if (actionElement === card) return;
    if (actionElement.matches("[disabled], [aria-disabled='true']")) return;

    event.preventDefault();
    actionElement.dispatchEvent(
      new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
        composed: true
      })
    );
  });
}

function syncBottomMenuCardClickTargets() {
  if (currentSettings.theme === "original") return;

  const menu = document.getElementById("adbl-cloud-player-bottom-menu-area");
  if (!(menu instanceof Element)) return;

  const menuItems = Array.from(menu.children).filter((child) => child instanceof Element);
  menuItems.forEach((item) => {
    if (isBottomMenuActionCard(item)) {
      bindBottomMenuCardClick(item);
    }
  });
}

function isLikelyChapterPanelText(text) {
  return /^(capitulo|chapter)\b|^(creditos iniciais|opening credits)\b/.test(text);
}

function isLikelyChapterPanelHeaderText(text) {
  return /^(capitulos|chapters|fechar|close)\b/.test(text);
}

function findChapterPanelRowCandidate(element) {
  let node = element;
  while (node instanceof Element && node !== document.body && node !== document.documentElement) {
    if (node.closest("#adbl-cloud-player-bottom-menu-area")) return null;

    const rect = node.getBoundingClientRect();
    if (
      rect.width >= Math.max(260, window.innerWidth * 0.62) &&
      rect.height >= 34 &&
      rect.height <= Math.max(220, window.innerHeight * 0.28)
    ) {
      return node;
    }

    node = node.parentElement;
  }

  return null;
}

function findCommonAncestor(elements) {
  if (!elements.length) return null;

  let ancestor = elements[0]?.parentElement || null;
  while (ancestor && ancestor !== document.body && ancestor !== document.documentElement) {
    if (elements.every((element) => ancestor.contains(element))) {
      const rect = ancestor.getBoundingClientRect();
      if (
        rect.width >= Math.max(320, window.innerWidth * 0.7) &&
        rect.height >= Math.max(240, window.innerHeight * 0.34)
      ) {
        return ancestor;
      }
    }
    ancestor = ancestor.parentElement;
  }

  return null;
}

function clearChapterPanelThemeClasses() {
  document.querySelectorAll(`.${CHAPTER_PANEL_HOST_CLASS}`).forEach((element) => {
    element.classList.remove(CHAPTER_PANEL_HOST_CLASS);
  });

  document.querySelectorAll(`.${CHAPTER_PANEL_ROW_CLASS}`).forEach((element) => {
    element.classList.remove(CHAPTER_PANEL_ROW_CLASS);
  });
}

function syncChapterPanelTheme() {
  clearChapterPanelThemeClasses();
  if (currentSettings.theme === "original") return;

  const textCandidates = Array.from(
    document.querySelectorAll("span, p, div, h1, h2, h3, h4, h5, h6, button, a, li")
  ).filter((element) => {
    if (!(element instanceof Element)) return false;
    if (!element.isConnected) return false;
    if (element.closest("#adbl-cloud-player-bottom-menu-area")) return false;
    return true;
  });

  const rowCandidates = new Set();
  textCandidates.forEach((element) => {
    const text = normalizeControlText(element.textContent);
    if (!text || text.length > 140) return;
    if (!isLikelyChapterPanelText(text) && !isLikelyChapterPanelHeaderText(text)) return;

    const row = findChapterPanelRowCandidate(element);
    if (row) rowCandidates.add(row);
  });

  const rows = Array.from(rowCandidates);
  if (rows.length < 2) return;

  rows.forEach((row) => row.classList.add(CHAPTER_PANEL_ROW_CLASS));
  const host = findCommonAncestor(rows);
  if (host) {
    host.classList.add(CHAPTER_PANEL_HOST_CLASS);
  }
}

function collectBottomMenuControlIconCandidates(host, labelPattern) {
  if (!(host instanceof Element)) return [];

  const candidates = new Set();
  host.querySelectorAll("img, svg, picture, canvas").forEach((element) => {
    candidates.add(element);
  });

  host.querySelectorAll("*").forEach((element) => {
    if (!(element instanceof Element)) return;
    if (element.classList.contains(CHAPTERS_ICON_CLASS) || element.classList.contains(BOOKMARK_ICON_CLASS)) return;

    const textContent = normalizeControlText(element.textContent);
    if (labelPattern instanceof RegExp && labelPattern.test(textContent)) return;

    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    if (rect.width > 86 || rect.height > 86) return;

    const style = window.getComputedStyle(element);
    const backgroundImage = style.backgroundImage || "";
    const maskImage = style.maskImage || style.webkitMaskImage || "";
    const className =
      typeof element.className === "string" ? element.className : element.className?.baseVal || "";
    const classDescriptor = normalizeControlText(className);
    const isLikelyIconClass = /(icon|glyph|symbol|menu|chapter|capitul|lista|list)/.test(classDescriptor);
    const hasVisualBackground = backgroundImage !== "none" || maskImage !== "none";

    const rawText = String(element.textContent || "").trim();
    const isLikelySymbolText = rawText.length > 0 && rawText.length <= 4 && !/[a-z0-9]/i.test(rawText);

    if (hasVisualBackground || isLikelyIconClass || isLikelySymbolText) {
      candidates.add(element);
    }
  });

  return Array.from(candidates);
}

function restoreBottomMenuCustomIconReplacements() {
  document.querySelectorAll(`.${CHAPTERS_ICON_HOST_CLASS}, .${BOOKMARK_ICON_HOST_CLASS}`).forEach((host) => {
    host.classList.remove(CHAPTERS_ICON_HOST_CLASS);
    host.classList.remove(BOOKMARK_ICON_HOST_CLASS);
  });

  document.querySelectorAll(`svg.${CHAPTERS_ICON_CLASS}, svg.${BOOKMARK_ICON_CLASS}, svg.audible-tools-detail-icon, svg.audible-tools-library-icon`).forEach((replacement) => {
    replacement.remove();
  });

  document.querySelectorAll(`.${CHAPTERS_ICON_ORIGINAL_HIDDEN_CLASS}`).forEach((element) => {
    const originalDisplay = element.getAttribute(CHAPTERS_ICON_ORIGINAL_DISPLAY_ATTRIBUTE);
    if (originalDisplay === "__none__") {
      element.style.removeProperty("display");
    } else if (originalDisplay !== null) {
      element.style.display = originalDisplay;
    }
    element.removeAttribute(CHAPTERS_ICON_ORIGINAL_DISPLAY_ATTRIBUTE);
    element.classList.remove(CHAPTERS_ICON_ORIGINAL_HIDDEN_CLASS);
  });
}

function applyBottomMenuCustomIcon(menuItems, isTargetControl, hostClass, replacementClass, svgMarkup, labelPattern) {
  menuItems.forEach((item) => {
    if (!isTargetControl(item)) return;

    item.classList.add(hostClass);

    const iconCandidates = collectBottomMenuControlIconCandidates(item, labelPattern);
    iconCandidates.forEach((iconElement) => {
      if (!(iconElement instanceof Element)) return;
      if (iconElement.classList.contains(CHAPTERS_ICON_CLASS) || iconElement.classList.contains(BOOKMARK_ICON_CLASS)) {
        return;
      }

      if (!iconElement.hasAttribute(CHAPTERS_ICON_ORIGINAL_DISPLAY_ATTRIBUTE)) {
        const originalDisplay = iconElement.style.display;
        iconElement.setAttribute(
          CHAPTERS_ICON_ORIGINAL_DISPLAY_ATTRIBUTE,
          originalDisplay ? originalDisplay : "__none__"
        );
      }

      iconElement.style.display = "none";
      iconElement.classList.add(CHAPTERS_ICON_ORIGINAL_HIDDEN_CLASS);
    });

    if (item.querySelector(`.` + replacementClass)) return;

    const wrapper = document.createElement("span");
    wrapper.className = "audible-tools-injected-svg-wrapper";
    wrapper.style.display = "inline-flex";
    wrapper.innerHTML = svgMarkup;
    
    const svgElement = wrapper.firstElementChild;
    
    const firstContentChild = item.firstElementChild;
    if (firstContentChild) {
      item.insertBefore(svgElement, firstContentChild);
      return;
    }

    item.appendChild(svgElement);
  });
}

const DETAIL_ICON_ASSET_PATH = "assets/detail.svg";
const LIBRARY_ICON_ASSET_PATH = "assets/library.svg";

function applyDrawerCustomIcon(selector, replacementClass, svgMarkup) {
  document.querySelectorAll(selector).forEach((item) => {
    // Only apply if looking at a drawer item container that has the icon inside
    const iconContainer = item.querySelector('.bc-icon');
    if (!iconContainer) return;

    // Hide original icon
    if (!iconContainer.hasAttribute(CHAPTERS_ICON_ORIGINAL_DISPLAY_ATTRIBUTE)) {
      const originalDisplay = iconContainer.style.display;
      iconContainer.setAttribute(
        CHAPTERS_ICON_ORIGINAL_DISPLAY_ATTRIBUTE,
        originalDisplay ? originalDisplay : "__none__"
      );
    }
    iconContainer.style.display = "none";
    iconContainer.classList.add(CHAPTERS_ICON_ORIGINAL_HIDDEN_CLASS);

    // Prevent adding multiple times
    if (item.querySelector(`.` + replacementClass)) return;

    const wrapper = document.createElement("span");
    wrapper.innerHTML = svgMarkup;
    const svgElement = wrapper.firstElementChild;
    svgElement.classList.add(replacementClass);
    svgElement.classList.add("audible-tools-drawer-icon");
    
    // Insert where the old icon was
    iconContainer.parentNode.insertBefore(svgElement, iconContainer);
  });
}

function syncDrawerCustomIcons() {
  if (currentSettings.theme === "original") return;

  applyDrawerCustomIcon('.adblCpTitleDetail', 'audible-tools-detail-icon', SVG_DETAIL);
  applyDrawerCustomIcon('.adblManageInLibrary, .adblAddToLibrary', 'audible-tools-library-icon', SVG_LIBRARY);
  applyDrawerCustomIcon('.adblCPMenuClipsBookmarksTray', BOOKMARK_ICON_CLASS, SVG_BOOKMARK);
}

function syncBottomMenuCustomIcons() {
  if (currentSettings.theme === "original") {
    restoreBottomMenuCustomIconReplacements();
    return;
  }

  const menu = document.getElementById("adbl-cloud-player-bottom-menu-area");
  if (!(menu instanceof Element)) return;

  const menuItems = Array.from(menu.children).filter((child) => child instanceof Element);
  applyBottomMenuCustomIcon(
    menuItems,
    isBottomMenuChapterControl,
    CHAPTERS_ICON_HOST_CLASS,
    CHAPTERS_ICON_CLASS,
    SVG_CHAPTERS,
    /(capitul|chapter)/
  );
  applyBottomMenuCustomIcon(
    menuItems,
    isBottomMenuBookmarkControl,
    BOOKMARK_ICON_HOST_CLASS,
    BOOKMARK_ICON_CLASS,
    SVG_BOOKMARK,
    /(marcador|bookmark|adicionar um marcador|add bookmark)/
  );

  syncBottomMenuCardClickTargets();
  syncDrawerCustomIcons();
}

function clearIconControlStyling() {
  document.querySelectorAll(`.${ICON_BUTTON_CLASS}`).forEach((element) => {
    element.classList.remove(ICON_BUTTON_CLASS);
  });

  document.querySelectorAll(`.${TEXT_ACCENT_CLASS}`).forEach((element) => {
    element.classList.remove(TEXT_ACCENT_CLASS);
  });

  document.querySelectorAll(`.${CUSTOM_ICON_CLASS}`).forEach((element) => {
    removeCustomIcon(element);
  });

  document.querySelectorAll(`.${ICON_OVERLAY_CLASS}`).forEach((element) => {
    if (element.closest(`.${CUSTOM_ICON_CLASS}`)) {
      return;
    }
    element.remove();
  });

  restoreBottomMenuCustomIconReplacements();
  clearChapterPanelThemeClasses();
}

function styleIconControls(root = document) {
  if (!(root instanceof Element || root instanceof Document)) return;

  const candidates = collectControls(root);

  candidates.forEach((candidate) => {
    if (candidate.closest(`#${SPEED_POPOVER_ID}`)) {
      candidate.classList.remove(ICON_BUTTON_CLASS);
      candidate.classList.remove(TEXT_ACCENT_CLASS);
      removeCustomIcon(candidate);
      return;
    }

    candidate.classList.toggle(
      TEXT_ACCENT_CLASS,
      Boolean(currentSettings.theme !== "original" && shouldUseTextAccent(candidate))
    );

    if (isIconLikeControl(candidate)) {
      candidate.classList.add(ICON_BUTTON_CLASS);
    } else {
      candidate.classList.remove(ICON_BUTTON_CLASS);
      removeCustomIcon(candidate);
    }
  });

  syncBottomMenuCustomIcons();
  syncBottomMenuSpeedLabel();
  syncChapterPanelTheme();

  if (currentSettings.theme === "original") return;

  const transportIconMap = buildTransportIconMap(candidates);
  candidates.forEach((candidate) => {
    if (candidate.classList.contains(ICON_BUTTON_CLASS)) {
      refreshControlIcon(candidate, transportIconMap);
    }
  });
}

function scheduleIconRefresh() {
  if (currentSettings.theme === "original" || iconRefreshPending) return;

  iconRefreshPending = true;
  requestAnimationFrame(() => {
    iconRefreshPending = false;
    styleIconControls(document);
  });
}

function applyNewTabTarget(link) {
  if (!link.dataset.audibleToolsOriginalTarget) {
    const existingTarget = link.getAttribute("target");
    link.dataset.audibleToolsOriginalTarget = existingTarget ?? "__none__";
  }

  if (!link.dataset.audibleToolsOriginalRel) {
    const existingRel = link.getAttribute("rel");
    link.dataset.audibleToolsOriginalRel = existingRel ?? "__none__";
  }

  link.setAttribute("target", "_blank");

  const existingRel = link.getAttribute("rel") || "";
  const relTokens = new Set(existingRel.split(/\s+/).filter(Boolean));
  relTokens.add("noopener");
  relTokens.add("noreferrer");
  link.setAttribute("rel", Array.from(relTokens).join(" "));
}

function restoreOriginalLinkTarget(link) {
  if (link.dataset.audibleToolsOriginalTarget) {
    const originalTarget = link.dataset.audibleToolsOriginalTarget;
    if (originalTarget === "__none__") {
      link.removeAttribute("target");
    } else {
      link.setAttribute("target", originalTarget);
    }
    delete link.dataset.audibleToolsOriginalTarget;
  }

  if (link.dataset.audibleToolsOriginalRel) {
    const originalRel = link.dataset.audibleToolsOriginalRel;
    if (originalRel === "__none__") {
      link.removeAttribute("rel");
    } else {
      link.setAttribute("rel", originalRel);
    }
    delete link.dataset.audibleToolsOriginalRel;
  }
}

function syncLinkBehavior(link) {
  const url = parseLinkUrl(link);
  if (!url || !isNavigableAudibleUrl(url) || isCurrentPageHashNavigation(url)) {
    restoreOriginalLinkTarget(link);
    return;
  }

  if (currentSettings.openInNewTab) {
    applyNewTabTarget(link);
    return;
  }

  restoreOriginalLinkTarget(link);
}

function collectAndApplyLinks(root = document) {
  if (root instanceof HTMLAnchorElement) {
    syncLinkBehavior(root);
  }

  if (root instanceof Element || root instanceof Document) {
    root.querySelectorAll("a[href]").forEach((link) => {
      syncLinkBehavior(link);
    });
  }
}

function normalizeVolumeBoost(rawValue) {
  const parsed = Number(rawValue);
  if (!Number.isFinite(parsed)) return DEFAULT_SETTINGS.volumeBoost;
  return Math.max(0, Math.min(300, parsed));
}

function normalizePlaybackSpeed(rawValue) {
  const parsed = Number(rawValue);
  if (!Number.isFinite(parsed)) return DEFAULT_SETTINGS.playbackSpeed;

  const clamped = Math.max(PLAYBACK_SPEED_MIN, Math.min(PLAYBACK_SPEED_MAX, parsed));
  const stepped = Math.round(clamped / PLAYBACK_SPEED_STEP) * PLAYBACK_SPEED_STEP;
  return Number(stepped.toFixed(2));
}

function formatPlaybackSpeed(value) {
  const normalized = normalizePlaybackSpeed(value);
  const raw = Number.isInteger(normalized * 10) ? normalized.toFixed(1) : normalized.toFixed(2);
  return `${raw.replace(/\.00$/, ".0")}x`;
}

function safeSetLocalSettings(nextValues) {
  if (!nextValues || typeof nextValues !== "object") return;

  try {
    if (typeof chrome === "undefined" || !chrome.runtime?.id) return;
    chrome.storage.local.set(nextValues);
  } catch {
    // Ignore context invalidation from stale content scripts after extension reload.
  }
}

function ensureSpeedPopoverStyles() {
  const existing = document.getElementById(SPEED_POPOVER_STYLE_ID);
  if (existing) return;

  const styleTag = document.createElement("style");
  styleTag.id = SPEED_POPOVER_STYLE_ID;
  styleTag.textContent = SPEED_POPOVER_STYLES;

  if (document.head) {
    document.head.appendChild(styleTag);
    return;
  }

  document.documentElement.appendChild(styleTag);
}

function getSpeedPopoverParts() {
  const popover = document.getElementById(SPEED_POPOVER_ID);
  if (!(popover instanceof HTMLElement)) return null;

  const range = popover.querySelector(`.${SPEED_POPOVER_RANGE_CLASS}`);
  const value = popover.querySelector(`.${SPEED_POPOVER_VALUE_CLASS}`);
  const presets = popover.querySelectorAll(`button.${SPEED_POPOVER_PRESET_CLASS}`);
  if (!(range instanceof HTMLInputElement) || !(value instanceof HTMLElement)) return null;

  return { popover, range, value, presets: Array.from(presets) };
}

function isSpeedPopoverOpen() {
  const parts = getSpeedPopoverParts();
  return Boolean(parts?.popover.dataset.open === "true");
}

function closeSpeedPopover() {
  const parts = getSpeedPopoverParts();
  if (!parts) return;

  parts.popover.dataset.open = "false";
  speedPopoverAnchor = null;
}

function removeSpeedPopover() {
  closeSpeedPopover();
  const popover = document.getElementById(SPEED_POPOVER_ID);
  if (popover) popover.remove();
}

function syncSpeedPopoverUi() {
  const parts = getSpeedPopoverParts();
  if (!parts) return;

  const speed = normalizePlaybackSpeed(currentSettings.playbackSpeed);
  const rangePercent = Math.round(((speed - PLAYBACK_SPEED_MIN) / (PLAYBACK_SPEED_MAX - PLAYBACK_SPEED_MIN)) * 100);
  parts.popover.dataset.theme = currentSettings.theme === "original" ? "light" : "dark";
  parts.range.value = String(Math.round(speed * 100));
  parts.range.style.setProperty("--value", `${rangePercent}%`);
  parts.range.setAttribute("aria-valuetext", formatPlaybackSpeed(speed));
  parts.value.textContent = formatPlaybackSpeed(speed);

  parts.presets.forEach((presetButton) => {
    const presetValue = Number(presetButton.dataset.speedValue);
    presetButton.setAttribute("aria-pressed", String(Math.abs(presetValue - speed) < 0.001));
  });
}

function syncBottomMenuSpeedLabel() {
  const menu = document.getElementById("adbl-cloud-player-bottom-menu-area");
  if (!(menu instanceof Element)) return;

  const speedLabel = formatPlaybackSpeed(currentSettings.playbackSpeed);
  const menuItems = Array.from(menu.children).filter((child) => child instanceof Element);
  menuItems.forEach((item) => {
    if (!isBottomMenuSpeedControl(item)) return;

    const textTargets = item.querySelectorAll("span, p, small, strong, b, div");
    for (const target of textTargets) {
      const currentText = normalizeControlText(target.textContent);
      if (!/^\d+(?:\.\d+)?x$/.test(currentText)) continue;
      target.textContent = speedLabel;
      break;
    }
  });
}

function positionSpeedPopover(anchor = speedPopoverAnchor) {
  const parts = getSpeedPopoverParts();
  if (!parts || !(anchor instanceof Element)) return;

  const anchorRect = anchor.getBoundingClientRect();
  const popoverWidth = Math.min(328, window.innerWidth - 20);
  const safeLeft = Math.min(
    Math.max(anchorRect.left + anchorRect.width / 2 - popoverWidth / 2, 10),
    window.innerWidth - popoverWidth - 10
  );

  parts.popover.style.width = `${Math.round(popoverWidth)}px`;
  parts.popover.style.left = `${Math.round(safeLeft)}px`;
  parts.popover.style.top = "-9999px";

  const popoverHeight = parts.popover.getBoundingClientRect().height || 220;
  const preferredTop = anchorRect.top - popoverHeight - 12;
  const fallbackTop = anchorRect.bottom + 10;
  const safeTop = preferredTop >= 10
    ? preferredTop
    : Math.min(fallbackTop, window.innerHeight - popoverHeight - 10);

  parts.popover.style.top = `${Math.round(Math.max(10, safeTop))}px`;
}

function applyPlaybackSpeedToMedia(mediaElement) {
  if (!(mediaElement instanceof HTMLMediaElement)) return;

  const speed = normalizePlaybackSpeed(currentSettings.playbackSpeed);
  if (Math.abs(mediaElement.playbackRate - speed) > 0.001) {
    mediaElement.playbackRate = speed;
  }
  if (Math.abs(mediaElement.defaultPlaybackRate - speed) > 0.001) {
    mediaElement.defaultPlaybackRate = speed;
  }
}

function applyPlaybackSpeed(value, { persist = false } = {}) {
  const normalized = normalizePlaybackSpeed(value);
  currentSettings.playbackSpeed = normalized;
  document.querySelectorAll("audio, video").forEach((mediaElement) => {
    applyPlaybackSpeedToMedia(mediaElement);
  });
  syncSpeedPopoverUi();
  syncBottomMenuSpeedLabel();

  if (persist) {
    safeSetLocalSettings({ playbackSpeed: normalized });
  }
}

function ensureSpeedPopover() {
  if (!isSupportedWebplayerUrl(window.location.href)) return;

  ensureSpeedPopoverStyles();

  if (getSpeedPopoverParts()) {
    syncSpeedPopoverUi();
    return;
  }

  const popover = document.createElement("section");
  popover.id = SPEED_POPOVER_ID;
  popover.dataset.open = "false";
  popover.setAttribute("aria-label", "Playback speed");
  popover.innerHTML = `
    <div class="audible-tools-speed-popover-title">Playback speed</div>
    <div class="${SPEED_POPOVER_VALUE_CLASS}">1.0x</div>
    <div class="audible-tools-speed-popover-controls">
      <button type="button" class="audible-tools-speed-popover-step" data-step="-">−</button>
      <input class="${SPEED_POPOVER_RANGE_CLASS}" type="range" min="${Math.round(PLAYBACK_SPEED_MIN * 100)}" max="${Math.round(PLAYBACK_SPEED_MAX * 100)}" step="${Math.round(PLAYBACK_SPEED_STEP * 100)}" />
      <button type="button" class="audible-tools-speed-popover-step" data-step="+">+</button>
    </div>
    <div class="audible-tools-speed-popover-presets"></div>
  `;

  const presetsContainer = popover.querySelector(".audible-tools-speed-popover-presets");
  if (presetsContainer) {
    SPEED_PRESET_VALUES.forEach((value) => {
      const preset = document.createElement("button");
      preset.type = "button";
      preset.className = SPEED_POPOVER_PRESET_CLASS;
      preset.dataset.speedValue = String(value);
      preset.textContent = formatPlaybackSpeed(value).replace(/x$/, "");
      presetsContainer.appendChild(preset);
    });
  }

  const stepButtons = popover.querySelectorAll("button.audible-tools-speed-popover-step");
  stepButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.getAttribute("data-step") === "+" ? 1 : -1;
      applyPlaybackSpeed(currentSettings.playbackSpeed + direction * PLAYBACK_SPEED_STEP, { persist: true });
    });
  });

  const range = popover.querySelector(`.${SPEED_POPOVER_RANGE_CLASS}`);
  if (range instanceof HTMLInputElement) {
    range.addEventListener("input", (event) => {
      applyPlaybackSpeed(Number(event.target.value) / 100);
    });
    range.addEventListener("change", (event) => {
      applyPlaybackSpeed(Number(event.target.value) / 100, { persist: true });
    });
  }

  const presetButtons = popover.querySelectorAll(`button.${SPEED_POPOVER_PRESET_CLASS}`);
  presetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const presetValue = Number(button.dataset.speedValue);
      applyPlaybackSpeed(presetValue, { persist: true });
    });
  });

  (document.body || document.documentElement).appendChild(popover);
  syncSpeedPopoverUi();
}

function ensureVolumeWidgetStyles() {
  const existing = document.getElementById(VOLUME_WIDGET_STYLE_ID);
  if (existing) return;

  const styleTag = document.createElement("style");
  styleTag.id = VOLUME_WIDGET_STYLE_ID;
  styleTag.textContent = VOLUME_WIDGET_STYLES;

  if (document.head) {
    document.head.appendChild(styleTag);
    return;
  }

  document.documentElement.appendChild(styleTag);
}

function removeVolumeWidget() {
  const widget = document.getElementById(VOLUME_WIDGET_ID);
  if (widget) widget.remove();
}

function getVolumeWidgetParts() {
  const widget = document.getElementById(VOLUME_WIDGET_ID);
  if (!widget) return null;

  const slider = widget.querySelector(`.${VOLUME_WIDGET_SLIDER_CLASS}`);
  if (!(slider instanceof HTMLInputElement)) return null;

  return { widget, slider };
}

function syncVolumeSliderVisual(slider, rawValue) {
  if (!(slider instanceof HTMLInputElement)) return;
  const normalized = normalizeVolumeBoost(rawValue);
  const percent = Math.round((normalized / 300) * 100);
  slider.style.setProperty("--value", `${percent}%`);
  slider.setAttribute("aria-valuetext", `${normalized}%`);
}

function mountVolumeWidget(widget) {
  const bottomMenu = document.getElementById("adbl-cloud-player-bottom-menu-area");
  if (bottomMenu?.parentElement) {
    bottomMenu.parentElement.insertBefore(widget, bottomMenu);
    widget.dataset.layout = "inline";
    return;
  }

  (document.body || document.documentElement).appendChild(widget);
  widget.dataset.layout = "floating";
}

function applyVolumeBoost(value) {
  const normalized = normalizeVolumeBoost(value);
  currentSettings.volumeBoost = normalized;

  const widgetParts = getVolumeWidgetParts();
  if (widgetParts) {
    widgetParts.slider.value = String(normalized);
    syncVolumeSliderVisual(widgetParts.slider, normalized);
  }

  document.querySelectorAll("audio, video").forEach((mediaElement) => {
    applyVolumeToMedia(mediaElement);
  });
}

function ensureVolumeWidget() {
  if (!isSupportedWebplayerUrl(window.location.href)) {
    removeVolumeWidget();
    return;
  }

  ensureVolumeWidgetStyles();

  const existingWidget = document.getElementById(VOLUME_WIDGET_ID);
  if (existingWidget) {
    mountVolumeWidget(existingWidget);
    syncVolumeWidget();
    return;
  }

  const widget = document.createElement("section");
  widget.id = VOLUME_WIDGET_ID;
  widget.setAttribute("aria-label", "Audible Tools volume control");

  const label = document.createElement("label");
  label.className = "audible-tools-webplayer-volume-sr";
  label.textContent = "Volume";

  const icon = document.createElement("span");
  icon.className = "audible-tools-webplayer-volume-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML =
    '<svg viewBox="0 0 24 24" focusable="false"><path d="M4 9v6h4l5 4V5L8 9H4zm12.2 3a3.8 3.8 0 0 0-1.6-3.1v6.2c1-.7 1.6-1.8 1.6-3.1zm1.8 0a5.9 5.9 0 0 1-3.4 5.4v-2a4 4 0 0 0 0-6.8v-2A5.9 5.9 0 0 1 18 12z"/></svg>';

  const slider = document.createElement("input");
  slider.className = VOLUME_WIDGET_SLIDER_CLASS;
  slider.type = "range";
  slider.min = "0";
  slider.max = "300";
  slider.step = "5";
  slider.id = `${VOLUME_WIDGET_ID}-input`;
  slider.setAttribute("aria-label", "Volume");
  label.setAttribute("for", slider.id);

  slider.addEventListener("input", (event) => {
    applyVolumeBoost(event.target.value);
  });

  slider.addEventListener("change", (event) => {
    const normalized = normalizeVolumeBoost(event.target.value);
    applyVolumeBoost(normalized);
    safeSetLocalSettings({ volumeBoost: normalized });
  });

  widget.append(label, icon, slider);
  mountVolumeWidget(widget);
  syncVolumeWidget();
}

function syncVolumeWidget() {
  const widgetParts = getVolumeWidgetParts();
  if (!widgetParts) return;

  widgetParts.widget.dataset.theme = currentSettings.theme === "original" ? "light" : "dark";
  const normalized = normalizeVolumeBoost(currentSettings.volumeBoost);
  widgetParts.slider.value = String(normalized);
  syncVolumeSliderVisual(widgetParts.slider, normalized);
}

function ensureDarkModeStyles() {
  const existing = document.getElementById(DARK_MODE_STYLE_ID);
  if (existing) return;

  const styleTag = document.createElement("style");
  styleTag.id = DARK_MODE_STYLE_ID;
  styleTag.textContent = DARK_MODE_STYLES;

  if (document.head) {
    document.head.appendChild(styleTag);
    return;
  }

  document.documentElement.appendChild(styleTag);
}

function applyDarkModeToPage(theme, customTheme) {
  if (!document.documentElement) return;

  if (theme !== "original") {
    ensureDarkModeStyles();
    document.documentElement.classList.add(DARK_MODE_CLASS);
    
    if (theme === "custom" && customTheme) {
      document.documentElement.style.setProperty("--audible-tools-bg", customTheme.bg);
      // We also update the elevated bg to match bg
      document.documentElement.style.setProperty("--audible-tools-bg-elevated", customTheme.bg);
      document.documentElement.style.setProperty("--audible-tools-surface", customTheme.surface);
      // Raised/strong surfaces derive from surface in custom mode for simplicity, 
      // or we can just map them to surface
      document.documentElement.style.setProperty("--audible-tools-surface-raised", customTheme.surface);
      document.documentElement.style.setProperty("--audible-tools-surface-strong", customTheme.surface);
      document.documentElement.style.setProperty("--audible-tools-border", "transparent");
      document.documentElement.style.setProperty("--audible-tools-copy", customTheme.copy);
      // Muted text gets same color but relies on opacity or we just use copy
      document.documentElement.style.setProperty("--audible-tools-muted", customTheme.copy);
      document.documentElement.style.setProperty("--audible-tools-icon", customTheme.copy);
    } else {
      // Remove inline styles to fall back to the stylesheet defaults (for "dark" theme)
      document.documentElement.style.removeProperty("--audible-tools-bg");
      document.documentElement.style.removeProperty("--audible-tools-bg-elevated");
      document.documentElement.style.removeProperty("--audible-tools-surface");
      document.documentElement.style.removeProperty("--audible-tools-surface-raised");
      document.documentElement.style.removeProperty("--audible-tools-surface-strong");
      document.documentElement.style.removeProperty("--audible-tools-border");
      document.documentElement.style.removeProperty("--audible-tools-copy");
      document.documentElement.style.removeProperty("--audible-tools-muted");
      document.documentElement.style.removeProperty("--audible-tools-icon");
    }
    return;
  }

  document.documentElement.classList.remove(DARK_MODE_CLASS);
  document.documentElement.style.removeProperty("--audible-tools-bg");
  document.documentElement.style.removeProperty("--audible-tools-bg-elevated");
  document.documentElement.style.removeProperty("--audible-tools-surface");
  document.documentElement.style.removeProperty("--audible-tools-surface-raised");
  document.documentElement.style.removeProperty("--audible-tools-surface-strong");
  document.documentElement.style.removeProperty("--audible-tools-border");
  document.documentElement.style.removeProperty("--audible-tools-copy");
  document.documentElement.style.removeProperty("--audible-tools-muted");
  document.documentElement.style.removeProperty("--audible-tools-icon");
}

function ensureAudioContext() {
  if (audioContext) return audioContext;

  const Context = window.AudioContext || window.webkitAudioContext;
  if (!Context) return null;

  try {
    audioContext = new Context();
    return audioContext;
  } catch {
    return null;
  }
}

function resumeAudioContextIfNeeded() {
  if (audioContext?.state === "suspended") {
    audioContext.resume().catch(() => {});
  }
}

function connectMedia(mediaElement) {
  if (connectedMedia.has(mediaElement)) {
    return connectedMedia.get(mediaElement);
  }

  const context = ensureAudioContext();
  if (!context) return null;

  try {
    const sourceNode = context.createMediaElementSource(mediaElement);
    const gainNode = context.createGain();
    sourceNode.connect(gainNode).connect(context.destination);

    const connection = { gainNode };
    connectedMedia.set(mediaElement, connection);
    return connection;
  } catch {
    return null;
  }
}

function applyVolumeToMedia(mediaElement) {
  const boost = normalizeVolumeBoost(currentSettings.volumeBoost);

  if (boost <= 100) {
    mediaElement.volume = boost / 100;
    const existingConnection = connectedMedia.get(mediaElement);
    if (existingConnection) {
      existingConnection.gainNode.gain.value = 1;
    }
    return;
  }

  mediaElement.volume = 1;
  const connection = connectMedia(mediaElement);
  if (!connection) return;

  connection.gainNode.gain.value = boost / 100;
  resumeAudioContextIfNeeded();
}

function attachMediaWatch(mediaElement) {
  if (observedMedia.has(mediaElement)) return;
  observedMedia.add(mediaElement);

  const enforceVolume = () => {
    applyVolumeToMedia(mediaElement);
    applyPlaybackSpeedToMedia(mediaElement);
    if (currentSettings.theme !== "original") {
      scheduleIconRefresh();
    }
  };
  mediaElement.addEventListener("play", enforceVolume);
  mediaElement.addEventListener("pause", enforceVolume);
  mediaElement.addEventListener("ended", enforceVolume);
  mediaElement.addEventListener("loadedmetadata", enforceVolume);

  applyVolumeToMedia(mediaElement);
  applyPlaybackSpeedToMedia(mediaElement);
}

function collectAndApplyMedia(root = document) {
  root.querySelectorAll("audio, video").forEach((mediaElement) => {
    attachMediaWatch(mediaElement);
  });
}

function startMediaObserver() {
  const observer = new MutationObserver((mutations) => {
    let shouldRefreshIcons = false;
    let shouldRefreshLogo = false;

    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;

          if (node.matches("audio, video")) {
            attachMediaWatch(node);
          }

          collectAndApplyMedia(node);
          collectAndApplyLinks(node);
          shouldRefreshIcons = true;
          shouldRefreshLogo = true;
        });
        return;
      }

      if (mutation.type === "attributes" && mutation.target instanceof Element) {
        if (mutation.target.matches("audio, video")) {
          attachMediaWatch(mutation.target);
        }
        shouldRefreshIcons = true;
        if (mutation.target instanceof HTMLImageElement) {
          shouldRefreshLogo = true;
        }
      }
    });

    if (currentSettings.theme !== "original" && shouldRefreshIcons) {
      scheduleIconRefresh();
    }
    if (currentSettings.theme !== "original" && shouldRefreshLogo) {
      applyTopLogoReplacement(document);
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "style", "aria-label", "aria-pressed", "title", "src", "data-testid"]
  });
}

function normalizeSettings(incoming) {
  return {
    openInNewTab:
      typeof incoming.openInNewTab === "boolean"
        ? incoming.openInNewTab
        : currentSettings.openInNewTab,
    theme:
      typeof incoming.theme === "string"
        ? incoming.theme
        : currentSettings.theme,
    customTheme:
      typeof incoming.customTheme === "object" && incoming.customTheme !== null
        ? { ...currentSettings.customTheme, ...incoming.customTheme }
        : currentSettings.customTheme,
    volumeBoost:
      incoming.volumeBoost !== undefined
        ? normalizeVolumeBoost(incoming.volumeBoost)
        : currentSettings.volumeBoost,
    playbackSpeed:
      incoming.playbackSpeed !== undefined
        ? normalizePlaybackSpeed(incoming.playbackSpeed)
        : currentSettings.playbackSpeed
  };
}

function applySettings(incoming) {
  currentSettings = normalizeSettings(incoming);

  if (!isSupportedWebplayerUrl(window.location.href)) {
    applyDarkModeToPage("original");
    clearIconControlStyling();
    removeCustomLogoReplacements();
    removeVolumeWidget();
    removeSpeedPopover();
    return;
  }

  ensureSpeedPopover();
  syncSpeedPopoverUi();
  applyPlaybackSpeed(currentSettings.playbackSpeed);
  ensureVolumeWidget();
  syncVolumeWidget();
  applyVolumeBoost(currentSettings.volumeBoost);
  applyDarkModeToPage(currentSettings.theme, currentSettings.customTheme);
  if (currentSettings.theme !== "original") {
    styleIconControls(document);
    scheduleIconRefresh();
    applyTopLogoReplacement(document);
  } else {
    clearIconControlStyling();
    removeCustomLogoReplacements();
  }
  collectAndApplyLinks(document);
  collectAndApplyMedia(document);
}

function getLinkFromEvent(event) {
  if (typeof event.composedPath === "function") {
    const path = event.composedPath();
    for (const node of path) {
      if (node instanceof HTMLAnchorElement && node.href) {
        return node;
      }
      if (node instanceof Element) {
        const nearestAnchor = node.closest("a[href]");
        if (nearestAnchor) return nearestAnchor;
      }
    }
  }

  if (event.target instanceof Element) {
    return event.target.closest("a[href]");
  }

  return null;
}

function getPlayNowButtonFromEvent(event) {
  const isPlayButtonElement = (node) => node instanceof Element && node.matches(PLAY_NOW_BUTTON_SELECTOR);

  if (typeof event.composedPath === "function") {
    const path = event.composedPath();
    for (const node of path) {
      if (isPlayButtonElement(node)) {
        return node;
      }
      if (node instanceof Element) {
        const closestPlayButton = node.closest(PLAY_NOW_BUTTON_SELECTOR);
        if (closestPlayButton) return closestPlayButton;
      }
    }
  }

  if (event.target instanceof Element) {
    return event.target.closest(PLAY_NOW_BUTTON_SELECTOR);
  }

  return null;
}

function getPlayButtonAsin(button) {
  const asinCandidates = [
    button.getAttribute("asin"),
    button.getAttribute("audibleasin"),
    button.getAttribute("data-asin")
  ];

  for (const candidate of asinCandidates) {
    const asin = String(candidate || "").trim();
    if (asin) return asin;
  }

  return "";
}

function buildWebplayerUrlForAsin(button, asin) {
  const webplayerUrl = new URL(`${window.location.origin}${WEBPLAYER_PATH}`);
  const rawContentDeliveryType =
    button.getAttribute("contentdeliverytype") || button.getAttribute("contentDeliveryType");
  const contentDeliveryType = String(rawContentDeliveryType || DEFAULT_CONTENT_DELIVERY_TYPE).trim();

  webplayerUrl.searchParams.set("asin", asin);
  webplayerUrl.searchParams.set(
    "contentDeliveryType",
    contentDeliveryType || DEFAULT_CONTENT_DELIVERY_TYPE
  );
  webplayerUrl.searchParams.set("isSample", "false");
  webplayerUrl.searchParams.set("ref_", `a_minerva_cloudplayer_${asin}`);
  webplayerUrl.searchParams.set("overrideLph", "false");
  webplayerUrl.searchParams.set("initialCPLaunch", "true");

  return webplayerUrl.href;
}

function maybeHandlePlayNowClick(event) {
  const playButton = getPlayNowButtonFromEvent(event);
  if (!playButton) return false;

  const asin = getPlayButtonAsin(playButton);
  if (!asin) return false;

  const webplayerUrl = buildWebplayerUrlForAsin(playButton, asin);
  event.preventDefault();
  event.stopImmediatePropagation();
  window.open(webplayerUrl, "_blank", "noopener");

  return true;
}

function getSpeedControlCardFromEvent(event) {
  const extractSpeedCard = (node) => {
    if (!(node instanceof Element)) return null;

    const menuCard = node.closest("#adbl-cloud-player-bottom-menu-area > *");
    if (menuCard && isBottomMenuSpeedControl(menuCard)) return menuCard;
    if (isBottomMenuSpeedControl(node)) return node;
    return null;
  };

  if (typeof event.composedPath === "function") {
    for (const node of event.composedPath()) {
      const speedCard = extractSpeedCard(node);
      if (speedCard) return speedCard;
    }
  }

  return extractSpeedCard(event.target);
}

function openSpeedPopover(anchor) {
  if (!(anchor instanceof Element)) return;
  ensureSpeedPopover();

  const parts = getSpeedPopoverParts();
  if (!parts) return;

  speedPopoverAnchor = anchor;
  syncSpeedPopoverUi();
  parts.popover.dataset.open = "true";
  positionSpeedPopover(anchor);
}

function toggleSpeedPopover(anchor) {
  if (!(anchor instanceof Element)) return;

  const isSameAnchor = speedPopoverAnchor === anchor;
  if (isSameAnchor && isSpeedPopoverOpen()) {
    closeSpeedPopover();
    return;
  }

  openSpeedPopover(anchor);
}

function handleSpeedControlClick(event) {
  if (!isSupportedWebplayerUrl(window.location.href)) return false;

  const existingParts = getSpeedPopoverParts();

  if (existingParts && event.target instanceof Element && event.target.closest(`#${SPEED_POPOVER_ID}`)) {
    return true;
  }

  const speedCard = getSpeedControlCardFromEvent(event);
  if (speedCard && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
    ensureSpeedPopover();
    event.preventDefault();
    event.stopImmediatePropagation();
    toggleSpeedPopover(speedCard);
    return true;
  }

  if (existingParts && isSpeedPopoverOpen()) {
    closeSpeedPopover();
  }

  return false;
}

function handleDocumentKeydown(event) {
  if (event.key !== "Escape") return;
  if (!isSpeedPopoverOpen()) return;

  closeSpeedPopover();
}

function handleSpeedPopoverViewportChange() {
  if (!isSpeedPopoverOpen()) return;
  positionSpeedPopover();
}

function handleDocumentClick(event) {
  const isWebplayerPage = isSupportedWebplayerUrl(window.location.href);
  if (isWebplayerPage && currentSettings.theme !== "original") {
    scheduleIconRefresh();
  }

  if (isWebplayerPage && handleSpeedControlClick(event)) {
    return;
  }

  if (!currentSettings.openInNewTab) return;
  if (event.defaultPrevented) return;
  if (event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (maybeHandlePlayNowClick(event)) return;
  if (!isWebplayerPage) return;

  const link = getLinkFromEvent(event);
  if (!link || link.hasAttribute("download")) return;
  if (link.target && link.target.toLowerCase() === "_blank") return;

  let nextUrl;
  try {
    nextUrl = new URL(link.href, window.location.href);
  } catch {
    return;
  }

  if (!isAudibleUrl(nextUrl)) return;
  if (isCurrentPageHashNavigation(nextUrl)) return;

  event.preventDefault();
  window.open(nextUrl.href, "_blank", "noopener");
}

function loadSettingsFromStorage() {
  chrome.storage.local.get(DEFAULT_SETTINGS, (stored) => {
    applySettings(stored);
  });
}

chrome.runtime.onMessage.addListener((message) => {
  if (message?.type !== "apply-settings") return;
  applySettings(message.settings || {});
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local") return;

  const nextSettings = {};
  if (changes.openInNewTab) nextSettings.openInNewTab = changes.openInNewTab.newValue;
  if (changes.theme) nextSettings.theme = changes.theme.newValue;
  if (changes.customTheme) nextSettings.customTheme = changes.customTheme.newValue;
  if (changes.volumeBoost) nextSettings.volumeBoost = changes.volumeBoost.newValue;
  if (changes.playbackSpeed) nextSettings.playbackSpeed = changes.playbackSpeed.newValue;

  applySettings(nextSettings);
});

if (isSupportedAudibleUrl(window.location.href)) {
  document.addEventListener("click", handleDocumentClick, true);

  chrome.runtime.sendMessage({ type: "request-settings" }, (response) => {
    if (chrome.runtime.lastError) {
      loadSettingsFromStorage();
      return;
    }

    if (response?.settings) {
      applySettings(response.settings);
      return;
    }

    loadSettingsFromStorage();
  });
}

if (isSupportedWebplayerUrl(window.location.href)) {
  window.addEventListener("pointerdown", resumeAudioContextIfNeeded, { passive: true });
  window.addEventListener("keydown", resumeAudioContextIfNeeded, { passive: true });
  window.addEventListener("resize", handleSpeedPopoverViewportChange, { passive: true });
  window.addEventListener("scroll", handleSpeedPopoverViewportChange, { passive: true });
  document.addEventListener("keydown", handleDocumentKeydown, true);
  ensureSpeedPopover();
  ensureVolumeWidget();
  styleIconControls(document);
  collectAndApplyLinks(document);
  collectAndApplyMedia(document);
  startMediaObserver();
}
