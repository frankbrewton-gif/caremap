# Verification results

Run: 2026-10-31. Environment: Linux, Python 3.12, system Chromium controlled through Playwright. These results describe tests actually executed, not Windows hardware validation.

## Passed

- JavaScript syntax: `node --check app.js` and `node --check boards.js`.
- `python tests/verify_assets.py`: **12/12 recordings passed** SHA-256 checksum, PCM WAV decoding, non-silence, duration, and sample peak checks. All peak levels are approximately **-9 dBFS**. No file is synthesized. These checks establish valid audio signals, not subjective listening quality.
- `python tests/browser_test.py`: **24/24 functional groups passed**, including:
  - All **72 pads** across all nine modes were tapped using touch emulation. Each generated the browser's `playing` event, decoded a positive-duration recording, advanced its playback time, and stopped successfully.
  - Mouse clicks, rapid replacement/restart, at most one active effect audio element, Stop, keyboard pad selection and Space stop.
  - Switching story stops playback; natural completion clears active UI state.
  - Volume slider changes the actual media volume; mute/unmute works.
  - Grown-up dialog stops audio; calm visuals work.
  - A real local WAV import decoded, played through a local Blob URL, persisted after reload, and was restored to the bundled sound.
  - A deliberately corrupt audio upload was rejected.
  - Volume and calm preferences persisted across reload.
  - Optional per-book narration: validated a local test WAV, saved and restored it across reload, played, paused, sought, restarted, reached the natural end, and removed it. A corrupt narration file was rejected. A reading from one book did not appear in another.
  - Original scene animation runs during reading playback and stops under OS reduced-motion settings. The theater opens/closes; closing pauses reading.
  - Effects play alongside a reading, with reading volume temporarily reduced to 35% of its selected level. Mute and Stop apply to both tracks. Switching books stops playback.
  - The narration fixture repeats a real bundled WAV to exercise controls. It is test data, not a human reading and not a bundled story narration.
  - Fullscreen request entered fullscreen in headless Chromium and successfully exited.
  - Six viewport sizes checked: 1366×768, 1280×800, 1024×768, 1920×1080, 800×600, 390×844. No horizontal overflow; all sound targets were at least 100×140 CSS pixels. Stop is visible at 1366×768. Small viewports can scroll; the console stays at the bottom of the viewport.
  - Zero external HTTP resource requests, zero JavaScript exceptions, and zero CSP violations. External requests were blocked by the test harness.
- Desktop, portrait and theater screenshots were generated from the current app. The desktop and theater layouts were visually inspected.

## Diagnosed and corrected during development

- OGG float decoding can exceed full scale before PCM conversion. An initial integer-based volume measurement clipped its measurement. The conversion was corrected to measure floating-point peaks before normalization. All final WAVs pass the independent PCM peak check.
- The initial landscape layout put controls below the fold at 1366×768. Compact styles and a sticky console corrected it.
- An initial test used a string expression incompatible with the app's strict CSP. The test now uses function predicates; the app's policy was not weakened.

## Limits

The managed Chromium installation blocks top-level `file://` navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`. Browser tests therefore used a temporary HTTP server on the loopback interface to serve the exact shipped files. **Direct double-click launch was not browser-tested here.** The app deliberately uses classic local scripts and local media paths, with no fetch, ES modules, server APIs, service worker, or build dependency, so direct local-file launch is the intended Windows workflow.

Tests did not run on Windows 11, Microsoft Edge, a physical Lenovo touchscreen, or real speakers. Touch input was emulated. Fullscreen on a physical Windows desktop and subjective sound recognition/loudness still need your short hands-on check. Browser tests establish media decoding and playback progression; they are not a claim of human audition. All recorded foley is identified by the upstream asset credits and source files.

No network-disconnected `file://` session was executed because of the managed-browser restriction. Zero remote runtime dependencies and zero external resource requests were verified; launching and listening with Wi-Fi off on Windows remains the recommended final check.

Tests and their current machine-readable results are included. Developer test tooling is not required to run the app.
