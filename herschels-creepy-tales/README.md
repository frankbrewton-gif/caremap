# Herschel’s Creepy Tales

An offline touchscreen soundboard for reading the physical Jasper Rabbit books aloud. Nine boards, eight illustrated pads each (72 pads), with 12 unique bundled real foley recordings and optional animated read-along scenes. No accounts, server, installation, build step, remote audio, tracking, or runtime libraries.

## Windows 11: launch in about a minute

1. Download **Herschels-Creepy-Tales.zip**. Right-click it and choose **Extract All**. Do not launch from inside the ZIP.
2. Open the extracted `herschels-creepy-tales` folder. Double-click **index.html**, or **Launch Soundboard.bat**. If needed, right-click index.html → Open with → Microsoft Edge or Google Chrome. No Python, Node.js, terminal, or internet is required.
3. Put your Lenovo in landscape/tablet mode, choose the physical book you are reading, and tap a large pad. Start with Windows volume low. The app starts at 35% playback volume, peaks in bundled files are normalized to -9 dBFS, and the app slider stops at 80%. Actual loudness also depends on your speakers and Windows settings; this is not a hearing protection limiter.
4. Tap **Full screen** or press **F11**. Tap Stop sounds for quiet. Escape exits full screen. A click or tap starts each recording; there is no autoplay.

Keep index.html, app.js, boards.js, styles.css and the assets folder together. You can put the folder on your Desktop, USB drive, or another PC. Once extracted, it works with Wi-Fi turned off from its first launch. This is a portable local app, not a website that needs a cache or a service worker.

## Reading together

The child is the sound storyteller. Before a page, agree on one or two clues: a bite → Crunch; following → Sneaky steps; hiding place → Cupboard creak. These are optional scene cues, not exact book quotations, page cues, or a synchronized retelling. No score or punishment, flashing effects, sudden autoplay, background drone, or frightening screams. The same sound may serve different story moments.

- One sound effect at a time; another tap immediately replaces or restarts it. An optional reading may continue alongside effects, with its volume lowered temporarily while an effect plays.
- Mouse, touchscreen, Enter/Space on a focused button, or number keys **1–8**.
- **Space** stops sound when focus is outside a control. **Escape** also stops sound when the settings dialog is closed. Stop sounds is always a large visible button.
- Changing book, opening settings, hiding the browser tab, or Stop pauses both the reading and sound effect. Stop rewinds the reading; Pause in the theater preserves its position.
- Full screen does not lock the child into the app; Escape/F11 exits.
- Grown-ups includes a **Calm visuals** setting; OS reduced-motion preferences are respected.
- Volume and calm preferences are saved when browser local storage is available. Exploration stars last for the current session and are just feedback for pads used, not listening accuracy.

## Books included

Choose from the **Tonight’s book** menu:

1. Creepy Carrots!
2. Creepy Pair of Underwear!
3. Creepy Crayon!
4. The Halloween Tree (general Halloween-tree cues; edition/author unconfirmed)
5. Splat the Cat · Halloween (general cues; exact Splat title unconfirmed)
6. Spookley the Square Pumpkin (Joe Troiano)
7. The Little Old Lady Who Was Not Afraid of Anything
8. Big Pumpkin
9. Room on the Broom

These are sound companions, not exact page-by-page adaptations. Story cues use the available recorded foley. For example, the old lady board uses footsteps for clomping, sand rustle for wiggling, and a metal rattle for shaking; literal handclaps, nods and a spoken “boo” are not bundled.

## Optional moving pictures and reading aloud

Open **Moving pictures & reading**. Each book has an original illustrated scene (for example, an autumn tree, a cat, a square pumpkin, boots, or a broom). Pictures move while a sound effect or reading plays. These are original generic illustrations, not book pages, character likenesses, a film of the book, or animation synchronized to specific words. Calm visuals and OS reduced-motion settings stop the movement.

**No full-book narration is bundled.** To hear someone reading, use a recording you or a family member makes, or an audio file you have permission to use. Merely owning the physical book does not authorize us to distribute its published audiobook. There is no text-to-speech substitute or remote stream.

1. Select the book.
2. Open **Grown-ups → Add a book reading**, or open the theater and choose **Add your reading…**.
3. Choose a local MP3, WAV, OGG or M4A file, up to 150 MB. The browser verifies that it can decode the file. Format support can vary; PCM WAV or MP3 is the safest choice.
4. Close settings, open the theater, then press **Play reading**. Use Pause, Start over, or the position slider. Each book keeps its own reading when browser storage is available.
5. You can tap effects while the reading continues. Stop sounds stops both tracks. Closing the theater pauses the reading; changing book also stops the effect and resets the reading.

To make a reading on Windows: open **Sound Recorder**, record yourself reading, save/export the recording, then select that file in the app. M4A can be used when supported by the browser. Narration imports are not normalized; preview at a low Windows volume. Browser storage is not a backup; keep the original audio file. Nothing is uploaded to GitHub or another server. **Remove reading** deletes the selected book’s stored reading.

## Recordings and honest limits

All shipped WAVs are downloaded physical recordings from the open Minetest Game collection, with upstream per-file license evidence copied into `licenses/`. Several originate on Freesound. See **SOUND-CREDITS.md** and **assets/audio-manifest.json** for authors, source links, licenses, edits and SHA-256 hashes. We did not download from random commercial soundboard pages or assume that freely playable means licensed for redistribution.

All nine boards reuse these 12 recorded effects; adding books does not add new recordings. The boards use recorded foley: crunch, footsteps, knock, splash, gate creak, door opening/closing, rattle, gravel scrape, metal clatter, cupboard creak, and sand rustle. These are not literal recordings of the fictional objects. “Scratch, scratch” uses a gravel scrape. No synthesized tones or pitch-shifted placeholder sounds are used. There are **no bundled ghost voices, thunder, literal crayon scribbles, owl hoots, or narration**. Those specialized recordings were not obtained with verified licenses.

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
