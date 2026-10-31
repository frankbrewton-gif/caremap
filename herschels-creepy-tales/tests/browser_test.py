"""Functional Chromium tests; no dependencies needed by the app itself.
Run: python tests/browser_test.py
Set CHROMIUM_EXECUTABLE if not using the system /usr/bin/chromium.
The managed test browser disallows file navigation. A temporary
loopback server tests identical assets; fullscreen is checked where supported.
"""
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
import json
import os
import tempfile
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args): pass
server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
Thread(target=server.serve_forever, daemon=True).start()
BASE = f'http://127.0.0.1:{server.server_port}'
checks = []
def passed(message):
    checks.append(message)
    print('PASS', message, flush=True)

TRACK = """
window.__audio = [];
window.__external = [];
const OriginalAudio = window.Audio;
window.Audio = new Proxy(OriginalAudio, {construct(target,args) {
 const a = new target(...args); const record={a,started:false,ended:false,error:false};
 a.addEventListener('playing',()=>record.started=true);
 a.addEventListener('ended',()=>record.ended=true);
 a.addEventListener('error',()=>record.error=true);
 window.__audio.push(record);return a;
}});
"""
try:
 with sync_playwright() as p:
    executable=os.environ.get('CHROMIUM_EXECUTABLE','/usr/bin/chromium')
    browser=p.chromium.launch(headless=True,executable_path=executable,args=['--no-sandbox'])
    context=browser.new_context(viewport={'width':1366,'height':768},has_touch=True)
    external=[]; errors=[]; console_errors=[]
    def route(r):
        if r.request.url.startswith(BASE) or r.request.url.startswith(('blob:','data:')): r.continue_()
        else: external.append(r.request.url);r.abort()
    context.route('**/*',route)
    context.add_init_script(TRACK)
    page=context.new_page()
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.on('console',lambda e:console_errors.append(e.text) if e.type=='error' else None)
    page.goto(BASE+'/index.html');page.wait_for_timeout(200)
    expect(page).to_have_title('Herschel’s Creepy Tales')
    expect(page.locator('.sound-pad')).to_have_count(8)
    passed('App loads with eight pads and no runtime dependencies')
    for board in ['carrots','underwear','crayon']:
        page.locator(f'.book-tab[data-board={board}]').tap()
        expect(page.locator(f'.book-tab[data-board={board}]')).to_have_attribute('aria-pressed','true')
        for i in range(8):
            previous=page.evaluate('window.__audio.length')
            page.locator('.sound-pad').nth(i).tap()
            page.wait_for_function('(n)=>window.__audio.length>n && window.__audio.at(-1).started',arg=previous)
            page.wait_for_function('()=>window.__audio.at(-1).a.currentTime>0.02 || window.__audio.at(-1).ended')
            assert page.evaluate('!window.__audio.at(-1).error')
            assert page.evaluate('window.__audio.at(-1).a.duration>0')
            assert page.locator('.sound-pad').nth(i).get_attribute('aria-pressed')=='true' or page.evaluate('window.__audio.at(-1).ended')
            page.locator('#stop').tap()
            assert page.evaluate('window.__audio.every(r=>r.a.paused)')
        expect(page.locator('#explored')).to_contain_text('8 of 8')
        passed(f'{board}: all eight touch pads actually play decoded local audio and stop (24 total)')
    page.locator('.book-tab[data-board=carrots]').click()
    page.locator('.sound-pad').nth(1).click()
    page.locator('.sound-pad').nth(0).click()
    page.locator('.sound-pad').nth(1).click()
    page.wait_for_function('()=>window.__audio.at(-1).started')
    assert page.evaluate('window.__audio.filter(r=>!r.a.paused).length<=1')
    page.locator('#stop').click();expect(page.locator('.sound-pad.playing')).to_have_count(0)
    passed('Rapid mouse input replaces playback; no stacking; Stop resets visual state')
    page.locator('.sound-pad').nth(1).click()
    page.locator('.book-tab[data-board=underwear]').click()
    assert page.evaluate('window.__audio.every(r=>r.a.paused)')
    passed('Changing stories stops the current sound')
    page.locator('#volume').fill('23')
    expect(page.locator('#volume-value')).to_have_text('23%')
    page.locator('.sound-pad').nth(0).click();page.wait_for_function('()=>window.__audio.at(-1).started')
    assert abs(page.evaluate('window.__audio.at(-1).a.volume')-.23)<.001
    page.locator('#mute').click();assert page.evaluate('window.__audio.at(-1).a.volume==0')
    expect(page.locator('#mute')).to_have_attribute('aria-pressed','true')
    page.locator('#mute').click();assert abs(page.evaluate('window.__audio.at(-1).a.volume')-.23)<.001
    page.locator('#stop').click()
    passed('Volume and mute affect the live audio element')
    page.locator('h1').click();page.keyboard.press('2');page.wait_for_function('()=>window.__audio.at(-1).started')
    page.keyboard.press('Space');assert page.evaluate('window.__audio.every(r=>r.a.paused)')
    passed('Keyboard pads and Space stop work without scrolling or autoplay')
    page.locator('#help').click();expect(page.locator('#settings')).to_be_visible()
    assert page.evaluate('window.__audio.every(r=>r.a.paused)')
    page.locator('#calm').check();expect(page.locator('body')).to_have_class('calm')
    page.locator('#custom-pad').select_option('0')
    page.locator('#custom-file').set_input_files(str(ROOT/'assets/audio/footsteps.wav'))
    expect(page.locator('#import-status')).to_have_text('Recording saved in this browser. Tap the pad to try it.',timeout=15000)
    page.locator('#close-settings').click()
    expect(page.locator('.custom-tag')).to_have_count(1)
    page.locator('.sound-pad').nth(0).click();page.wait_for_function('()=>window.__audio.at(-1).started')
    assert page.evaluate('window.__audio.at(-1).a.src.startsWith("blob:")')
    page.locator('#stop').click()
    passed('Parent dialog pauses playback; calm mode and validated custom recording work')
    page.reload();page.wait_for_timeout(200)
    expect(page.locator('.custom-tag')).to_have_count(0) # initial story is carrots
    expect(page.locator('#volume')).to_have_value('23');expect(page.locator('body')).to_have_class('calm')
    page.locator('.book-tab[data-board=underwear]').click();expect(page.locator('.custom-tag')).to_have_count(1)
    page.locator('#help').click();page.locator('#custom-pad').select_option('0');page.locator('#restore').click()
    expect(page.locator('#import-status')).to_have_text('Bundled recording restored.')
    page.locator('#custom-file').set_input_files({'name':'broken.wav','mimeType':'audio/wav','buffer':b'not an audio file'})
    expect(page.locator('#import-status')).to_contain_text('not playable',timeout=15000)
    page.locator('#close-settings').click()
    expect(page.locator('.custom-tag')).to_have_count(0)
    passed('Volume, calm mode and per-book imports persist across reload; restore and invalid-file rejection work')
    page.locator('.book-tab[data-board=carrots]').click()
    page.locator('.sound-pad').nth(0).click();page.wait_for_function('()=>window.__audio.at(-1).ended')
    expect(page.locator('.sound-pad.playing')).to_have_count(0)
    expect(page.locator('#status-label')).to_have_text('READY TO READ')
    passed('Natural playback completion resets the playing state')
    page.locator('#fullscreen').click()
    page.wait_for_timeout(200)
    if page.evaluate('!!document.fullscreenElement'):
        passed('Fullscreen request succeeds')
        page.evaluate('document.exitFullscreen()')
    else:
        expect(page.locator('#status')).to_contain_text('F11')
        passed('Fullscreen restriction handled with visible F11 fallback (managed browser disallows fullscreen)')
    page.locator('#stop').click();page.locator('h1').click()
    page.set_viewport_size({'width':1366,'height':768})
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    assert page.locator('#stop').bounding_box()['y']+page.locator('#stop').bounding_box()['height']<=768
    page.screenshot(path=str(ROOT/'tests/desktop.png'),full_page=True)
    for width,height in [(1280,800),(1024,768),(1920,1080),(800,600),(390,844)]:
        page.set_viewport_size({'width':width,'height':height});page.wait_for_timeout(50)
        assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'), (width,height)
        boxes=page.locator('.sound-pad').evaluate_all('(els)=>els.map(e=>({w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height}))')
        assert all(b['w']>=100 and b['h']>=140 for b in boxes)
    page.screenshot(path=str(ROOT/'tests/portrait.png'),full_page=True)
    passed('No horizontal overflow at six screen sizes; large touch targets; 1366×768 controls visible')
    assert not external,external
    assert not errors,errors
    # Expected error: the deliberately invalid custom audio. CSP/runtime errors are not expected.
    unexpected=[e for e in console_errors if 'Content Security Policy' in e or 'Refused to' in e]
    assert not unexpected,unexpected
    passed('Zero external resource requests, JavaScript exceptions or CSP violations')
    browser.close()
 finally_result={'passed':len(checks),'checks':checks,'external_requests':external,'javascript_errors':errors}
 (ROOT/'tests/browser-results.json').write_text(json.dumps(finally_result,indent=2)+'\n')
 print(f'PASS: {len(checks)} functional groups completed.')
finally:
 server.shutdown();server.server_close()
