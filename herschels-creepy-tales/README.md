# Herschel’s Creepy Tales

An offline touchscreen soundboard for reading the physical Jasper Rabbit books aloud. Three boards, eight illustrated pads each, with 12 unique bundled real foley recordings. No accounts, server, installation, build step, remote audio, tracking, or runtime libraries.

## Windows 11: launch in about a minute

1. Download **Herschels-Creepy-Tales.zip**. Right-click it and choose **Extract All**. Do not launch from inside the ZIP.
2. Open the extracted `herschels-creepy-tales` folder. Double-click **index.html**, or **Launch Soundboard.bat**. If needed, right-click index.html → Open with → Microsoft Edge or Google Chrome. No Python, Node.js, terminal, or internet is required.
3. Put your Lenovo in landscape/tablet mode, choose the physical book you are reading, and tap a large pad. Start with Windows volume low. The app starts at 35% playback volume, peaks in bundled files are normalized to -9 dBFS, and the app slider stops at 80%. Actual loudness also depends on your speakers and Windows settings; this is not a hearing protection limiter.
4. Tap **Full screen** or press **F11**. Tap Stop sounds for quiet. Escape exits full screen. A click or tap starts each recording; there is no autoplay.

Keep index.html, app.js, boards.js, styles.css and the assets folder together. You can put the folder on your Desktop, USB drive, or another PC. Once extracted, it works with Wi-Fi turned off from its first launch. This is a portable local app, not a website that needs a cache or a service worker.

## Reading together

The child is the sound storyteller. Before a page, agree on one or two clues: a bite → Crunch; following → Sneaky steps; hiding place → Cupboard creak. These are optional scene cues, not exact book quotations, page cues, or a synchronized retelling. No score or punishment, flashing effects, sudden autoplay, background drone, or frightening screams. The same sound may serve different story moments.

- One sound at a time; another tap immediately replaces or restarts it.
- Mouse, touchscreen, Enter/Space on a focused button, or number keys **1–8**.
- **Space** stops sound when focus is outside a control. **Escape** also stops sound when the settings dialog is closed. Stop sounds is always a large visible button.
- Changing book, opening settings, or hiding the browser tab stops playback.
- Full screen does not lock the child into the app; Escape/F11 exits.
- Grown-ups includes a **Calm visuals** setting; OS reduced-motion preferences are respected.
- Volume and calm preferences are saved when browser local storage is available. Exploration stars last for the current session and are just feedback for pads used, not listening accuracy.

## Recordings and honest limits

All shipped WAVs are downloaded physical recordings from the open Minetest Game collection, with upstream per-file license evidence copied into `licenses/`. Several originate on Freesound. See **SOUND-CREDITS.md** and **assets/audio-manifest.json** for authors, source links, licenses, edits and SHA-256 hashes. We did not download from random commercial soundboard pages or assume that freely playable means licensed for redistribution.

The boards use recorded foley: crunch, footsteps, knock, splash, gate creak, door opening/closing, rattle, gravel scrape, metal clatter, cupboard creak, and sand rustle. These are not literal recordings of the fictional objects. “Scratch, scratch” uses a gravel scrape. No synthesized tones or pitch-shifted placeholder sounds are used. There are **no bundled ghost voices, thunder, literal crayon scribbles, owl hoots, or narration**. Those specialized recordings were not obtained with verified licenses.

To add your own effect: Grown-ups → choose a pad → Choose audio file. MP3, PCM WAV, or OGG, up to 10 MB. A successful import validates browser decoding. Files remain local and are stored in IndexedDB when available. Storage may be cleared by the browser or behave differently when moving the app folder; keep your original files. “Restore bundled sound” reverses an import. Names and images remain the original pad’s story cue; a “Personal sound” marker identifies imported audio. No uploads occur. Your files are not automatically licensed for redistribution. Custom recordings are not normalized; lower Windows volume before previewing them.

## Troubleshooting

- **No sound:** test another pad, raise the app volume slightly, unmute its music button, check Windows volume and the browser tab’s mute status, and check the selected output device/headphones. Click a pad again if the browser requests permission.
- **Sound needs help:** extract the entire ZIP, keep assets alongside index.html, and open using a current Edge/Chrome. If a personal file fails, restore the bundled recording.
- **Small interface:** use Full screen/F11, rotate to landscape, and reset browser zoom (Ctrl+0). On smaller screens the layout scrolls; all pads remain reachable.
- **Settings forgotten:** browser storage can be unavailable in private modes or cleared. Controls still work for the session.
- **Windows warns about the BAT:** open index.html directly. The optional BAT just opens that local file; it installs nothing and requires no administrator rights.

## Development and verification

The app is plain HTML/CSS/JS. No npm install or build is required. You can edit and reopen index.html directly. Optional local testing: `python -m http.server 8765 --directory .` (not required for normal use).

`python tests/verify_assets.py` verifies checksums, WAV decoding, durations, non-silence and peak levels using the Python standard library. `python tests/browser_test.py` uses Playwright Chromium (a developer-only test dependency, not needed to launch). See TEST-RESULTS.md for actual coverage and limits. Real Lenovo touch hardware, Windows 11, and Edge are not available in the build environment and are not claimed as tested.

## Rights

App code and original vector illustrations: MIT; see LICENSE. Sound assets have their own CC0, CC BY 3.0, or CC BY-SA 3.0 terms; see SOUND-CREDITS.md. No book cover art, book text, audiobook recordings, or character likenesses are included. Independent family reading companion; no affiliation or endorsement.
