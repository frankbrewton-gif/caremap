"""Verify every shipped recording without third-party dependencies."""
import array
import hashlib
import json
import math
import sys
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / 'assets/audio-manifest.json').read_text())
assert len(manifest) == 12
for item in manifest:
    path = ROOT / item['file']
    assert hashlib.sha256(path.read_bytes()).hexdigest() == item['sha256'], path
    with wave.open(str(path), 'rb') as wav:
        assert wav.getcomptype() == 'NONE'
        assert wav.getsampwidth() == 2 and wav.getnchannels() == 1
        duration = wav.getnframes() / wav.getframerate()
        assert 0.1 < duration < 15
        samples = array.array('h', wav.readframes(wav.getnframes()))
        if sys.byteorder != 'little':
            samples.byteswap()
        peak = max(abs(s) for s in samples) / 32768
        rms = math.sqrt(sum(s*s for s in samples) / len(samples)) / 32768
        assert 0.01 < peak <= 0.36, (path, peak)
        assert rms > 0.001, (path, rms)
    print(f'PASS {path.name}: {duration:.2f}s, peak {20*math.log10(peak):.1f} dBFS, non-silent PCM')
print(f'PASS: {len(manifest)} / {len(manifest)} recordings; checksums, PCM decode, non-silence, duration, peak headroom')
