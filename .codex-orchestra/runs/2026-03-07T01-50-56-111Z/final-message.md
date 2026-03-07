**Plan**
1. Unify the custom-theme accent path so popup controls, player controls, and volume UI use the same icon color source.
2. Reduce long-running webplayer churn and clean up media-node lifecycle to address the crash/leak behavior.
3. Validate with tester and reviewer before closing.

**Execution**
- Planner split the work into popup theme propagation and webplayer/content-script stability.
- Popup theme tokens now derive from the selected/custom accent in [popup/popup.js#L66](/Users/eduardoverona/hackaton/audible-tools/popup/popup.js#L66), and the selected theme chip plus popup volume slider now consume those tokens in [popup/popup.css#L229](/Users/eduardoverona/hackaton/audible-tools/popup/popup.css#L229) and [popup/popup.css#L323](/Users/eduardoverona/hackaton/audible-tools/popup/popup.css#L323).
- Webplayer speed and volume UI now read from shared theme accent tokens in [content/audible.js#L2059](/Users/eduardoverona/hackaton/audible-tools/content/audible.js#L2059) and [content/audible.js#L2365](/Users/eduardoverona/hackaton/audible-tools/content/audible.js#L2365), and custom mode explicitly maps the icon/text color into `--audible-tools-accent` in [content/audible.js#L2416](/Users/eduardoverona/hackaton/audible-tools/content/audible.js#L2416).
- The stability fix now throttles icon rescans in [content/audible.js#L1898](/Users/eduardoverona/hackaton/audible-tools/content/audible.js#L1898), keeps reconnectable media graph state in [content/audible.js#L2473](/Users/eduardoverona/hackaton/audible-tools/content/audible.js#L2473), defers cleanup for transient removals but performs immediate teardown when the observer stops in [content/audible.js#L2606](/Users/eduardoverona/hackaton/audible-tools/content/audible.js#L2606) and [content/audible.js#L2643](/Users/eduardoverona/hackaton/audible-tools/content/audible.js#L2643), and restarts the observer from settings application in [content/audible.js#L2736](/Users/eduardoverona/hackaton/audible-tools/content/audible.js#L2736).
- Tester and reviewer both came back with no blocking findings.

**Summary**
Changed files:
- [content/audible.js](/Users/eduardoverona/hackaton/audible-tools/content/audible.js)
- [popup/popup.js](/Users/eduardoverona/hackaton/audible-tools/popup/popup.js)
- [popup/popup.css](/Users/eduardoverona/hackaton/audible-tools/popup/popup.css)

Tests run:
- `node --check popup/popup.js`
- `node --check content/audible.js`
- `git diff --check -- popup/popup.js popup/popup.css content/audible.js`
- `node -e 'JSON.parse(require("fs").readFileSync("manifest.json","utf8"))'`

Unresolved risks:
- No live browser soak test was possible here, so the leak fix is statically validated, not runtime-proven against a long Audible session.

Follow-up:
- Run a 10-15 minute manual soak on `www.audible.<tld>/webplayer` with `Custom` theme enabled and verify the popup, speed popover, and injected volume control all match the icon color while heap/listener counts stay stable.