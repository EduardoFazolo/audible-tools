const DEFAULT_SETTINGS = {
  openInNewTab: false,
  darkTheme: false,
  volumeBoost: 100
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
const CHAPTERS_ICON_ORIGINAL_HIDDEN_CLASS = "audible-tools-chapters-icon-original-hidden";
const CHAPTERS_ICON_ASSET_PATH = "assets/chapters.svg";
const BOOKMARK_ICON_ASSET_PATH = "assets/bookmark.svg";
const CHAPTERS_ICON_ORIGINAL_DISPLAY_ATTRIBUTE = "data-audible-tools-original-display";
const LOGO_REPLACEMENT_CLASS = "audible-tools-logo-replacement";
const LOGO_ORIGINAL_CLASS = "audible-tools-logo-original";
const LOGO_ASSET_PATH = "assets/audible-logo.svg";
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
  --audible-tools-border: #333d4f;
  --audible-tools-copy: #e7eaf1;
  --audible-tools-muted: #a2a9b8;
  --audible-tools-icon: #ffa100;
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

html.${DARK_MODE_CLASS} :where(button, [role="button"], a[role="button"], input, textarea, select) {
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
  border-color: rgba(255, 161, 0, 0.44) !important;
}

html.${DARK_MODE_CLASS} :where(progress, meter) {
  accent-color: var(--audible-tools-icon) !important;
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
  color: var(--audible-tools-icon) !important;
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
  color: var(--audible-tools-icon) !important;
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
  color: var(--audible-tools-icon) !important;
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
  fill: currentColor !important;
  stroke: none !important;
}

html.${DARK_MODE_CLASS} .${ICON_BUTTON_CLASS} :where([style*="background"]) {
  background: transparent !important;
}

html.${DARK_MODE_CLASS} .${CUSTOM_ICON_CLASS} {
  position: relative !important;
  color: var(--audible-tools-icon) !important;
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
  color: var(--audible-tools-icon) !important;
}

html.${DARK_MODE_CLASS} .${ICON_OVERLAY_CLASS} :where(svg, img.${ICON_ASSET_CLASS}) {
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

html.${DARK_MODE_CLASS} .${ICON_OVERLAY_CLASS} :where(img.${ICON_ASSET_CLASS}) {
  object-fit: contain !important;
}

html.${DARK_MODE_CLASS} .${CUSTOM_ICON_CLASS}[${ICON_TYPE_ATTRIBUTE}="play"] .${ICON_OVERLAY_CLASS} :where(svg, img.${ICON_ASSET_CLASS}),
html.${DARK_MODE_CLASS} .${CUSTOM_ICON_CLASS}[${ICON_TYPE_ATTRIBUTE}="pause"] .${ICON_OVERLAY_CLASS} :where(svg, img.${ICON_ASSET_CLASS}) {
  width: 74% !important;
  height: 74% !important;
}

html.${DARK_MODE_CLASS} .${CUSTOM_ICON_CLASS}[${ICON_TYPE_ATTRIBUTE}="rewind30"] .${ICON_OVERLAY_CLASS} :where(svg, img.${ICON_ASSET_CLASS}),
html.${DARK_MODE_CLASS} .${CUSTOM_ICON_CLASS}[${ICON_TYPE_ATTRIBUTE}="forward30"] .${ICON_OVERLAY_CLASS} :where(svg, img.${ICON_ASSET_CLASS}) {
  width: 76% !important;
  height: 76% !important;
}

html.${DARK_MODE_CLASS} .${ICON_OVERLAY_CLASS} .fill-current {
  fill: currentColor !important;
  stroke: none !important;
}

html.${DARK_MODE_CLASS} .${ICON_OVERLAY_CLASS} :where(text, tspan) {
  fill: currentColor !important;
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
  background: linear-gradient(180deg, rgba(52, 63, 88, 0.86), rgba(36, 45, 63, 0.94)) !important;
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

html.${DARK_MODE_CLASS} #adbl-cloud-player-bottom-menu-area > *:has(.${TEXT_ACCENT_CLASS}) :where(svg, img),
html.${DARK_MODE_CLASS} #adbl-cloud-player-bottom-menu-area > .${TEXT_ACCENT_CLASS} :where(svg, img) {
  max-width: 20px !important;
  max-height: 20px !important;
}

html.${DARK_MODE_CLASS} #adbl-cloud-player-bottom-menu-area img.${CHAPTERS_ICON_CLASS} {
  display: inline-block !important;
  object-position: center !important;
  object-fit: contain !important;
}

html.${DARK_MODE_CLASS} #adbl-cloud-player-bottom-menu-area img.${BOOKMARK_ICON_CLASS} {
  display: inline-block !important;
  object-position: center !important;
  object-fit: contain !important;
}

html.${DARK_MODE_CLASS} #adbl-cloud-player-bottom-menu-area .${CHAPTERS_ICON_HOST_CLASS}
  :where(*):not(.${CHAPTERS_ICON_CLASS})::before,
html.${DARK_MODE_CLASS} #adbl-cloud-player-bottom-menu-area .${CHAPTERS_ICON_HOST_CLASS}
  :where(*):not(.${CHAPTERS_ICON_CLASS})::after {
  content: none !important;
}

html.${DARK_MODE_CLASS} #adbl-cloud-player-bottom-menu-area .${BOOKMARK_ICON_HOST_CLASS}
  :where(*):not(.${BOOKMARK_ICON_CLASS})::before,
html.${DARK_MODE_CLASS} #adbl-cloud-player-bottom-menu-area .${BOOKMARK_ICON_HOST_CLASS}
  :where(*):not(.${BOOKMARK_ICON_CLASS})::after {
  content: none !important;
}

html.${DARK_MODE_CLASS} .${LOGO_ORIGINAL_CLASS} {
  display: none !important;
}

html.${DARK_MODE_CLASS} .${LOGO_REPLACEMENT_CLASS} {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  line-height: 0 !important;
  color: var(--audible-tools-icon) !important;
  pointer-events: none !important;
  object-fit: contain !important;
}

html.${DARK_MODE_CLASS} .${LOGO_REPLACEMENT_CLASS} :where(svg, img) {
  width: 100% !important;
  height: 100% !important;
}

html.${DARK_MODE_CLASS} :where(button, [role="button"], a[role="button"]):focus-visible {
  outline: 2px solid var(--audible-tools-focus) !important;
  outline-offset: 2px !important;
}
`;

let currentSettings = { ...DEFAULT_SETTINGS };
let audioContext = null;
let iconRefreshPending = false;

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

function getIconMarkup(type) {
  const iconSrc = chrome.runtime.getURL(getControlIconAssetPath(type));
  return `<img class="${ICON_ASSET_CLASS}" src="${iconSrc}" alt="" aria-hidden="true">`;
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

  overlay.innerHTML = getIconMarkup(iconType);
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

  const replacement = document.createElement("img");
  replacement.className = LOGO_REPLACEMENT_CLASS;
  replacement.setAttribute("aria-hidden", "true");
  replacement.setAttribute("alt", "");
  replacement.setAttribute("src", chrome.runtime.getURL(LOGO_ASSET_PATH));
  replacement.style.width = `${Math.round(rect.width)}px`;
  replacement.style.height = `${Math.round(rect.height)}px`;

  image.after(replacement);
  image.classList.add(LOGO_ORIGINAL_CLASS);
}

function applyTopLogoReplacement(root = document) {
  if (!currentSettings.darkTheme) return;

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

  document.querySelectorAll(`img.${CHAPTERS_ICON_CLASS}, img.${BOOKMARK_ICON_CLASS}`).forEach((replacement) => {
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

function applyBottomMenuCustomIcon(menuItems, isTargetControl, hostClass, replacementClass, assetPath, labelPattern) {
  const iconUrl = chrome.runtime.getURL(assetPath);
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

    const replacement = document.createElement("img");
    replacement.className = replacementClass;
    replacement.setAttribute("src", iconUrl);
    replacement.setAttribute("alt", "");
    replacement.setAttribute("aria-hidden", "true");

    const firstContentChild = item.firstElementChild;
    if (firstContentChild) {
      item.insertBefore(replacement, firstContentChild);
      return;
    }

    item.appendChild(replacement);
  });
}

function syncBottomMenuCustomIcons() {
  restoreBottomMenuCustomIconReplacements();
  if (!currentSettings.darkTheme) return;

  const menu = document.getElementById("adbl-cloud-player-bottom-menu-area");
  if (!(menu instanceof Element)) return;

  const menuItems = Array.from(menu.children).filter((child) => child instanceof Element);
  applyBottomMenuCustomIcon(
    menuItems,
    isBottomMenuChapterControl,
    CHAPTERS_ICON_HOST_CLASS,
    CHAPTERS_ICON_CLASS,
    CHAPTERS_ICON_ASSET_PATH,
    /(capitul|chapter)/
  );
  applyBottomMenuCustomIcon(
    menuItems,
    isBottomMenuBookmarkControl,
    BOOKMARK_ICON_HOST_CLASS,
    BOOKMARK_ICON_CLASS,
    BOOKMARK_ICON_ASSET_PATH,
    /(marcador|bookmark|adicionar um marcador|add bookmark)/
  );
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
}

function styleIconControls(root = document) {
  if (!(root instanceof Element || root instanceof Document)) return;

  const candidates = collectControls(root);

  candidates.forEach((candidate) => {
    candidate.classList.toggle(
      TEXT_ACCENT_CLASS,
      Boolean(currentSettings.darkTheme && shouldUseTextAccent(candidate))
    );

    if (isIconLikeControl(candidate)) {
      candidate.classList.add(ICON_BUTTON_CLASS);
    } else {
      candidate.classList.remove(ICON_BUTTON_CLASS);
      removeCustomIcon(candidate);
    }
  });

  syncBottomMenuCustomIcons();

  if (!currentSettings.darkTheme) return;

  const transportIconMap = buildTransportIconMap(candidates);
  candidates.forEach((candidate) => {
    if (candidate.classList.contains(ICON_BUTTON_CLASS)) {
      refreshControlIcon(candidate, transportIconMap);
    }
  });
}

function scheduleIconRefresh() {
  if (!currentSettings.darkTheme || iconRefreshPending) return;

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

function applyDarkModeToPage(isDarkModeEnabled) {
  if (!document.documentElement) return;

  if (isDarkModeEnabled) {
    ensureDarkModeStyles();
    document.documentElement.classList.add(DARK_MODE_CLASS);
    return;
  }

  document.documentElement.classList.remove(DARK_MODE_CLASS);
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
    if (currentSettings.darkTheme) {
      scheduleIconRefresh();
    }
  };
  mediaElement.addEventListener("play", enforceVolume);
  mediaElement.addEventListener("pause", enforceVolume);
  mediaElement.addEventListener("ended", enforceVolume);
  mediaElement.addEventListener("loadedmetadata", enforceVolume);

  applyVolumeToMedia(mediaElement);
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

    if (currentSettings.darkTheme && shouldRefreshIcons) {
      scheduleIconRefresh();
    }
    if (currentSettings.darkTheme && shouldRefreshLogo) {
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
    darkTheme:
      typeof incoming.darkTheme === "boolean"
        ? incoming.darkTheme
        : currentSettings.darkTheme,
    volumeBoost:
      incoming.volumeBoost !== undefined
        ? normalizeVolumeBoost(incoming.volumeBoost)
        : currentSettings.volumeBoost
  };
}

function applySettings(incoming) {
  if (!isSupportedWebplayerUrl(window.location.href)) {
    applyDarkModeToPage(false);
    clearIconControlStyling();
    removeCustomLogoReplacements();
    return;
  }

  currentSettings = normalizeSettings(incoming);
  applyDarkModeToPage(currentSettings.darkTheme);
  if (currentSettings.darkTheme) {
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

function handleDocumentClick(event) {
  if (currentSettings.darkTheme) {
    scheduleIconRefresh();
  }

  if (!isSupportedWebplayerUrl(window.location.href)) return;
  if (!currentSettings.openInNewTab) return;
  if (event.defaultPrevented) return;
  if (event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

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
  if (changes.darkTheme) nextSettings.darkTheme = changes.darkTheme.newValue;
  if (changes.volumeBoost) nextSettings.volumeBoost = changes.volumeBoost.newValue;

  applySettings(nextSettings);
});

if (isSupportedWebplayerUrl(window.location.href)) {
  document.addEventListener("click", handleDocumentClick, true);
  window.addEventListener("pointerdown", resumeAudioContextIfNeeded, { passive: true });
  window.addEventListener("keydown", resumeAudioContextIfNeeded, { passive: true });
  styleIconControls(document);
  collectAndApplyLinks(document);
  collectAndApplyMedia(document);
  startMediaObserver();

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
