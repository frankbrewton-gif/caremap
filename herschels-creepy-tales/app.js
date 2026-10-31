'use strict';
(() => {
 const $ = id => document.getElementById(id);
 const settings = $('settings');
 const narration = new Audio();
 let readingKey = null, readingRecord = null, readingURL = null;
 narration.preload = 'metadata';
 let board = 'carrots', active = null, generation = 0, muted = false, volume = 35, db = null;
 let custom = new Map(), sessionURLs = new Map(), seen = Object.fromEntries(Object.keys(TALES).map(key=>[key,new Set()]));
 try { const saved = JSON.parse(localStorage.getItem('herschel-settings') || '{}'); volume = Number.isFinite(saved.volume) ? Math.max(0,Math.min(80,saved.volume)) : 35; $('calm').checked = !!saved.calm; } catch { /* Private browser sessions can refuse storage. */ }
 document.body.classList.toggle('calm',$('calm').checked);
 function saveSettings() { try { localStorage.setItem('herschel-settings',JSON.stringify({volume,calm:$('calm').checked})); } catch { /* Session controls still work. */ } }
 function status(label,message) { $('status-label').textContent=label; $('status').textContent=message; }
 function resetVisuals() { document.querySelectorAll('.sound-pad').forEach(p => {p.classList.remove('playing');p.setAttribute('aria-pressed','false');}); document.body.classList.remove('is-playing'); updateNarrationVolume(); }
 function stop(message='Your next sound is a tap away.', includeReading=true) {
  if(includeReading){narration.pause();if(Number.isFinite(narration.duration))narration.currentTime=0;updateReadingState();}
  generation++;
  if (active) { const old=active;active=null;old.pause();old.removeAttribute('src');old.load(); }
  resetVisuals();status('READY TO READ',message);
 }
 function keyFor(index) {return board+':'+index;}
 function render() {
  const b=TALES[board]; document.body.dataset.board=board;
  $('chapter-number').textContent=b.chapter; $('board-title').textContent=b.title; $('board-description').textContent=b.description;
  document.querySelectorAll('[data-board]').forEach(el => el.setAttribute('aria-pressed',String(el.dataset.board===board)));
  $('sound-grid').replaceChildren();$('custom-pad').replaceChildren();
  b.pads.forEach((pad,index) => {
   const [label,cue,sound,icon,color]=pad, key=keyFor(index), customSound=custom.get(key);
   const button=document.createElement('button');button.className='sound-pad';button.dataset.index=index;
   button.style.setProperty('--tile-bg',PALETTE[color][0]);button.style.setProperty('--tile-accent',PALETTE[color][1]);
   button.setAttribute('aria-pressed','false');button.setAttribute('aria-label',`Play ${label}${customSound?' (your recording)':''}. ${cue}`);
   button.innerHTML=`<span class="pad-number" aria-hidden="true">0${index+1}</span><span class="pad-check" aria-hidden="true">${seen[board].has(index)?'✦':''}</span><span class="pad-art">${taleIcon(icon)}</span><span class="pad-label"></span><span class="pad-cue"></span>`;
   button.querySelector('.pad-label').textContent=label;button.querySelector('.pad-cue').textContent=customSound?'Your recording · tap to play':cue;
   if(customSound){const tag=document.createElement('span');tag.className='custom-tag';tag.textContent='PERSONAL SOUND';button.append(tag);}
   button.addEventListener('click',()=>play(index));$('sound-grid').append(button);
   const option=document.createElement('option');option.value=index;option.textContent=`${index+1}. ${label}${customSound?' — your recording':''}`;$('custom-pad').append(option);
  });
  updateExplored();renderReading();
  $('book-picker').value=board;
 }
 function updateExplored(){ $('explored').replaceChildren(document.createTextNode(`${seen[board].size} of 8 sounds explored `));const star=document.createElement('span');star.setAttribute('aria-hidden','true');star.textContent='✧';$('explored').append(star); }
 async function play(index) {
  const pad=TALES[board].pads[index];if(!pad)return;
  stop(undefined,false);const token=generation, playingBoard=board, button=$('sound-grid').children[index];
  const key=keyFor(index), recording=custom.get(key); let src=`assets/audio/${pad[2]}.wav`;
  if(recording){if(!sessionURLs.has(key))sessionURLs.set(key,URL.createObjectURL(recording.blob));src=sessionURLs.get(key);}
  const audio=new Audio(src);active=audio;audio.volume=muted?0:volume/100;audio.preload='auto';
  button.classList.add('playing');button.setAttribute('aria-pressed','true');status('LOADING SOUND',pad[0]+'…');
  function finish(){if(token!==generation||active!==audio)return;active=null;resetVisuals();status('READY TO READ','Listen for your next clue.');}
  audio.addEventListener('ended',finish,{once:true});
  audio.addEventListener('error',()=>{if(token!==generation||active!==audio)return;stop();status('SOUND NEEDS HELP',recording?'That recording cannot play. Ask a grown-up to choose another file.':'Could not play this sound. Extract the whole ZIP and keep the assets folder next to index.html.');},{once:true});
  try{
   await audio.play();if(token!==generation||active!==audio)return;
   document.body.classList.add('is-playing');updateNarrationVolume();status(muted||volume===0?'PLAYING SILENTLY':'NOW PLAYING',pad[0]+(muted||volume===0?' · turn up the volume to hear it.':''));
   seen[playingBoard].add(index);button.querySelector('.pad-check').textContent='✦';updateExplored();
  }catch(error){if(token!==generation||active!==audio)return;stop();status('SOUND NEEDS HELP',error.name==='NotAllowedError'?'Tap the sound again to allow browser audio.':'This sound could not play. Ask a grown-up to check the audio file.');}
 }
 function updateVolume(){ $('volume').value=volume;$('volume-value').textContent=volume+'%';$('mute').setAttribute('aria-pressed',String(muted));$('mute').setAttribute('aria-label',muted?'Unmute sounds':'Mute sounds');$('mute').textContent=muted?'×':'♪';if(active)active.volume=muted?0:volume/100;updateNarrationVolume(); }
 function selectBoard(next){if(board===next||!TALES[next])return;stop();board=next;$('import-status').textContent='';$('reading-import-status').textContent='';render();}
 Object.entries(TALES).forEach(([key,b])=>{
  const button=document.createElement('button');button.className='book-tab';button.dataset.board=key;button.setAttribute('aria-pressed',String(board===key));
  const art=document.createElement('span');art.className='tab-art';art.setAttribute('aria-hidden','true');art.innerHTML=taleIcon(b.icon);button.append(art,document.createTextNode(b.book));button.addEventListener('click',()=>selectBoard(key));document.querySelector('.book-tabs').append(button);
  const option=document.createElement('option');option.value=key;option.textContent=b.book;$('book-picker').append(option);
 });
 $('book-picker').addEventListener('change',()=>selectBoard($('book-picker').value));
 $('stop').addEventListener('click',()=>stop('All quiet. Ready when you are.'));
 $('volume').addEventListener('input',()=>{volume=Number($('volume').value);muted=false;updateVolume();saveSettings();});
 $('mute').addEventListener('click',()=>{muted=!muted;updateVolume();});
 $('calm').addEventListener('change',()=>{document.body.classList.toggle('calm',$('calm').checked);saveSettings();});
 $('help').addEventListener('click',()=>{stop();settings.showModal();});$('close-settings').addEventListener('click',()=>settings.close());
 settings.addEventListener('click',e=>{if(e.target===settings){const r=settings.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)settings.close();}});
 $('fullscreen').addEventListener('click',async()=>{
  try{ if(document.fullscreenElement) await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else status('FULL SCREEN','Press F11 in Chrome or Edge for full screen.');}
  catch{status('FULL SCREEN','Press F11 in Chrome or Edge for full screen.');}
 });
 document.addEventListener('fullscreenchange',()=>{$('fullscreen').setAttribute('aria-label',document.fullscreenElement?'Exit full screen':'Enter full screen');$('fullscreen').querySelector('span').textContent=document.fullscreenElement?'Exit full screen':'Full screen';});
 document.addEventListener('keydown',e=>{
  const interactive=/INPUT|SELECT|TEXTAREA|BUTTON/.test(document.activeElement.tagName);
  if(e.code==='Escape'&&!settings.open){stop();return;}
  if(settings.open||interactive||e.ctrlKey||e.altKey||e.metaKey||e.repeat)return;
  if(e.code==='Space'){e.preventDefault();stop('All quiet. Ready when you are.');}
  else if(/^[1-8]$/.test(e.key)){e.preventDefault();play(Number(e.key)-1);}
 });
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});window.addEventListener('pagehide',()=>stop());
 SOUND_CREDITS.forEach(([sound,author,license])=>{const p=document.createElement('p');p.textContent=`${sound} — ${author} · ${license}`;$('credits').append(p);});
 function openDatabase(){return new Promise((resolve,reject)=>{if(!window.indexedDB){reject(new Error('Storage unavailable'));return;}const request=indexedDB.open('herschel-recordings',1);request.onupgradeneeded=()=>request.result.createObjectStore('sounds');request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);request.onblocked=()=>reject(new Error('Close other copies of this soundboard and try again.'));});}
 function storageWrite(key,value){return new Promise((resolve,reject)=>{if(!db){reject(new Error('Storage unavailable'));return;}const tx=db.transaction('sounds','readwrite');const store=tx.objectStore('sounds');if(value)store.put(value,key);else store.delete(key);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Storage full'));});}
 async function loadCustom(){
  try{db=await openDatabase();const values=await new Promise((resolve,reject)=>{const request=db.transaction('sounds','readonly').objectStore('sounds').openCursor();const entries=[];request.onsuccess=()=>{const cursor=request.result;if(cursor){entries.push([cursor.key,cursor.value]);cursor.continue();}else resolve(entries);};request.onerror=()=>reject(request.error);});custom=new Map([...custom,...values]);if(!active)render();else renderReading();}
  catch{$('import-status').textContent='Browser storage is unavailable. Imported sounds will work for this session only.';}
 }
 function validateAudio(file){return new Promise((resolve,reject)=>{const url=URL.createObjectURL(file),test=new Audio();let done=false;const timer=setTimeout(()=>finish(false),10000);function finish(ok){if(done)return;done=true;clearTimeout(timer);test.removeAttribute('src');test.load();URL.revokeObjectURL(url);ok?resolve():reject(new Error('This file is not playable in this browser. Try a PCM WAV or MP3 recording.'));}test.addEventListener('loadedmetadata',()=>finish(Number.isFinite(test.duration)&&test.duration>0),{once:true});test.addEventListener('error',()=>finish(false),{once:true});test.preload='metadata';test.src=url;});}
 $('custom-file').addEventListener('change',async()=>{
  const file=$('custom-file').files[0];if(!file)return;const selected=$('custom-pad').value,key=board+':'+selected;stop();
  if(file.size>10*1024*1024||file.size===0){$('import-status').textContent='Choose a nonempty audio file no larger than 10 MB.';$('custom-file').value='';return;}
  $('restore').disabled=true;$('custom-pad').disabled=true;$('custom-file').disabled=true;$('import-status').textContent='Checking your recording…';
  try{await validateAudio(file);const record={blob:file,name:file.name};let saved=false;try{await storageWrite(key,record);saved=true;}catch{}if(sessionURLs.has(key)){URL.revokeObjectURL(sessionURLs.get(key));sessionURLs.delete(key);}custom.set(key,record);render();$('custom-pad').value=selected;$('import-status').textContent=saved?'Recording saved in this browser. Tap the pad to try it.':'Recording added for this session only. Browser storage could not save it.';}
  catch(error){$('import-status').textContent=error.message;}
  finally{$('restore').disabled=false;$('custom-pad').disabled=false;$('custom-file').disabled=false;$('custom-file').value='';}
 });
 $('restore').addEventListener('click',async()=>{
  const selected=$('custom-pad').value,key=board+':'+selected;stop();
  try{if(db)await storageWrite(key,null);if(sessionURLs.has(key)){URL.revokeObjectURL(sessionURLs.get(key));sessionURLs.delete(key);}custom.delete(key);render();$('custom-pad').value=selected;$('import-status').textContent='Bundled recording restored.';}
  catch{$('import-status').textContent='Browser storage could not remove this recording. Try again or clear this app’s browser storage.';}
 });

 function timeLabel(seconds){const n=Number.isFinite(seconds)?Math.max(0,Math.floor(seconds)):0;return Math.floor(n/60)+':'+String(n%60).padStart(2,'0');}
 function updateNarrationVolume(){narration.volume=muted?0:(volume/100)*(active && !active.paused ? 0.35 : 1);}
 function updateReadingState(){
  const has=!!readingRecord,playing=has&&!narration.paused&&!narration.ended;
  document.body.classList.toggle('reading-playing',playing);
  $('reading-play').disabled=!has||playing;$('reading-pause').disabled=!has||!playing;$('reading-restart').disabled=!has;
  const duration=Number.isFinite(narration.duration)?narration.duration:0;
  $('reading-seek').disabled=!has||duration===0;
  $('reading-seek').value=duration?100*narration.currentTime/duration:0;
  $('reading-time').textContent=timeLabel(narration.currentTime)+' / '+timeLabel(duration);
 }
 function renderReading(){
  const b=TALES[board],key='reading:'+board,record=custom.get(key)||null;
  if(key!==readingKey||record!==readingRecord){
   narration.pause();narration.removeAttribute('src');narration.load();if(readingURL)URL.revokeObjectURL(readingURL);
   readingKey=key;readingRecord=record;readingURL=record?URL.createObjectURL(record.blob):null;
   if(readingURL)narration.src=readingURL;
   $('reading-status').textContent=record?'Reading ready: '+record.name:'No reading added for this book. A grown-up can add a recording.';
  }
  $('reading-book-name').textContent=b.book;$('scene-main').innerHTML=taleIcon(b.icon);$('scene-left').innerHTML=taleIcon(board==='broom'?'hat':'leaves');$('scene-right').innerHTML=taleIcon(board==='oldlady'?'shirt':board==='broom'?'pot':'pumpkin');
  $('scene-caption').textContent=b.book;$('story-scene').setAttribute('aria-label','Original moving illustration for '+b.book);
  updateNarrationVolume();updateReadingState();
 }
 function openTheater(open){$('theater').hidden=!open;$('theater-toggle').setAttribute('aria-expanded',String(open));if(!open){narration.pause();updateReadingState();}}
 $('theater-toggle').addEventListener('click',()=>openTheater($('theater').hidden));$('theater-close').addEventListener('click',()=>openTheater(false));
 $('reading-add').addEventListener('click',()=>{stop();settings.showModal();$('reading-import').scrollIntoView({block:'nearest'});$('reading-file').focus();});
 $('reading-play').addEventListener('click',async()=>{
  if(!readingRecord)return;const key=readingKey;
  try{if(narration.ended)narration.currentTime=0;await narration.play();if(key===readingKey)$('reading-status').textContent='Reading aloud: '+readingRecord.name;}
  catch(error){if(key===readingKey&&error.name!=='AbortError')$('reading-status').textContent='This reading could not play. Try another MP3, WAV, OGG or M4A file.';}
  updateReadingState();
 });
 $('reading-pause').addEventListener('click',()=>{narration.pause();$('reading-status').textContent='Reading paused. Press Play reading to continue.';updateReadingState();});
 $('reading-restart').addEventListener('click',()=>{narration.pause();narration.currentTime=0;$('reading-status').textContent='Back at the beginning. Press Play reading when ready.';updateReadingState();});
 $('reading-seek').addEventListener('input',()=>{if(Number.isFinite(narration.duration)&&narration.duration>0)narration.currentTime=Number($('reading-seek').value)/100*narration.duration;updateReadingState();});
 ['play','playing','pause','ended','loadedmetadata','timeupdate','emptied'].forEach(event=>narration.addEventListener(event,updateReadingState));
 narration.addEventListener('ended',()=>{$('reading-status').textContent='Reading finished. Press Play reading to hear it again.';});
 narration.addEventListener('error',()=>{if(readingRecord){narration.pause();$('reading-status').textContent='This recording cannot play. Ask a grown-up to choose another file.';updateReadingState();}});
 $('reading-file').addEventListener('change',async()=>{
  const file=$('reading-file').files[0];if(!file)return;const key='reading:'+board;stop();
  if(file.size===0||file.size>150*1024*1024){$('reading-import-status').textContent='Choose a nonempty audio recording no larger than 150 MB.';$('reading-file').value='';return;}
  $('reading-file').disabled=true;$('reading-remove').disabled=true;$('reading-import-status').textContent='Checking your reading…';
  try{await validateAudio(file);const record={blob:file,name:file.name};let saved=false;try{await storageWrite(key,record);saved=true;}catch{}custom.set(key,record);renderReading();$('reading-import-status').textContent=saved?'Reading saved for this book. Open Moving pictures & reading to listen.':'Reading added for this session only. Keep your original recording; browser storage could not save it.';}
  catch(error){$('reading-import-status').textContent=error.message;}
  finally{$('reading-file').disabled=false;$('reading-remove').disabled=false;$('reading-file').value='';}
 });
 $('reading-remove').addEventListener('click',async()=>{
  const key='reading:'+board;stop();
  try{if(db)await storageWrite(key,null);custom.delete(key);renderReading();$('reading-import-status').textContent='Reading removed for this book.';}
  catch{$('reading-import-status').textContent='Browser storage could not remove this reading. Try again.';}
 });
 updateVolume();render();loadCustom();
})();
