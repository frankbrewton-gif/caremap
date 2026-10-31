'use strict';
// Original vector illustrations, not book artwork. All audio paths are local.
window.TALES = {
  carrots: { chapter:'STORY ONE · THE CARROT PATCH', title:'Something’s in the garden…', description:'Listen to the story. Hear a clue? Give it a sound!', pads:[
    ['Crunch, crunch','When someone takes a bite','crunch','carrot','orange'],
    ['Sneaky steps','When someone follows along','footsteps','footsteps','green'],
    ['Rustle, rustle','Something in the patch?','rustle','leaves','purple'],
    ['Creeeak!','When a gate creaks open','creak','gate','sand'],
    ['Knock, knock','When you hear a wooden tap','knock','wood','sand'],
    ['Splash!','A watery story moment','splash','water','blue'],
    ['Clink & clatter','Time to build something','clatter','tools','purple'],
    ['Door shuts','A door closes behind you','slam','door','orange']
  ]},
  underwear: { chapter:'STORY TWO · A GLOW IN THE DARK', title:'Who turned on that glow?', description:'A little spooky, a little silly. You choose the sounds!', pads:[
    ['Sneaky steps','Something is following!','footsteps','footsteps','green'],
    ['Creeeak!','A creak in the quiet','creak','underwear','green'],
    ['Door opens','Peek into the dark','door','door','purple'],
    ['Rustle, rustle','Something is moving','rustle','leaves','sand'],
    ['Rattle, rattle','A mysterious little rattle','rattle','rattle','orange'],
    ['Splash!','Into the water it goes','splash','water','blue'],
    ['Cupboard creak','What’s hiding inside?','cupboard','cupboard','purple'],
    ['Door shuts','Close it… and listen','slam','door','green']
  ]},
  crayon: { chapter:'STORY THREE · A PURPLE MYSTERY', title:'A very curious color…', description:'Listen for a clue, then bring the moment to life.', pads:[
    ['Scratch, scratch','A gravel scrape for drawing','scrape','crayon','purple'],
    ['Sneaky steps','Off to the next adventure','footsteps','footsteps','sand'],
    ['Knock, knock','A little wooden tapping','knock','wood','orange'],
    ['Rustle, rustle','A tiny shuffle in the quiet','rustle','paper','green'],
    ['Cupboard creak','Open a mysterious hiding place','cupboard','cupboard','purple'],
    ['Clink & clatter','Something tumbles down','clatter','tools','sand'],
    ['Splash!','A watery story moment','splash','water','blue'],
    ['Door shuts','Is the mystery over?','slam','door','purple']
  ]}
};
window.SOUND_CREDITS = [
 ['Crunch','blukotek','CC0 1.0'],['Footsteps','Mito551','CC BY-SA 3.0'],['Knock','Sheyvan','CC0 1.0'],['Splash','AGFX','CC BY 3.0'],['Gate creak','mhtaylor67','CC0 1.0'],['Door opens','CGEffex; modified by BlockMen','CC BY 3.0'],['Door shuts','bennstir','CC BY 3.0'],['Rattle','HazMatt','CC BY 3.0'],['Scrape','lolamadeus','CC0 1.0'],['Clatter','Iwan Gabovitch (qubodup)','CC0 1.0'],['Cupboard','sofar; Sevin7; Percy Duke; kingsamas; bulbastre; Yoyodaman234','CC BY 3.0'],['Rustle','worthahep88','CC0 1.0']
];
window.PALETTE = {orange:['#493541','#ffc28b'],green:['#353d39','#cee3a9'],purple:['#40334f','#d3b0f2'],sand:['#443b3c','#ebc79e'],blue:['#303c4a','#a0cfdd']};
window.taleIcon = function(name) {
 const art = {
 carrot:'<path d="M50 32Q47 9 39 9M53 31Q63 11 69 17M49 28Q29 13 26 21" fill="none" stroke="#b6d895" stroke-width="7" stroke-linecap="round"/><path d="M25 39Q42 21 65 36Q72 51 37 84Q24 97 26 78Z" fill="#f3a466" stroke="#e28153" stroke-width="3"/><path d="m31 49 11 5m-13 8 8 4m19-23 7 4" stroke="#bf6b4c" stroke-width="3" stroke-linecap="round"/><ellipse cx="43" cy="41" rx="2" ry="3" fill="#4c3440"/><ellipse cx="55" cy="43" rx="2" ry="3" fill="#4c3440"/><path d="m44 48 6 1" stroke="#4c3440" stroke-width="2" stroke-linecap="round"/>',
 underwear:'<path d="m17 26 66 0-5 25q-13-1-18 23H40Q35 51 22 51Z" fill="#b8d591" stroke="#8dac6c" stroke-width="3"/><path d="M18 29h64M23 40q16 3 19 32m35-32Q63 43 59 72" fill="none" stroke="#78995e" stroke-width="3"/><path d="M46 40v17h9" fill="none" stroke="#e2f2bc" stroke-width="3"/><path d="m11 14-4-5m83 6 5-6M50 8V2M13 66l-7 5m83-5 7 5" stroke="#d7eca8" stroke-width="3" stroke-linecap="round"/>',
 crayon:'<g transform="rotate(24 50 50)"><path d="m35 27 15-22 15 22v59H35Z" fill="#b38ada" stroke="#8662ae" stroke-width="3"/><path d="m44 14 6-9 6 9" fill="#74518e"/><path d="M35 37h30v36H35Z" fill="#d5b6ed"/><path d="m41 43 18 24m-18 0 18-24" stroke="#9771b6" stroke-width="2"/><path d="M35 79h30" stroke="#74518e" stroke-width="4"/></g><path d="M16 78q-8 9 5 10t-6 7" fill="none" stroke="#b38ada" stroke-width="4" stroke-linecap="round"/>',
 footsteps:'<g transform="rotate(-25 29 49)" fill="#d6bf9b"><ellipse cx="30" cy="40" rx="12" ry="19"/><rect x="20" y="65" width="20" height="14" rx="6"/><path d="M21 40h18" stroke="#a48b6f" stroke-width="3"/></g><g transform="rotate(20 69 43)" fill="#b9d29f"><ellipse cx="67" cy="29" rx="12" ry="19"/><rect x="57" y="54" width="20" height="14" rx="6"/><path d="M58 29h18" stroke="#829970" stroke-width="3"/></g>',
 leaves:'<path d="M48 77Q7 70 18 25q39 4 30 52Z" fill="#b9cd92"/><path d="M48 77q-8-23-21-38" fill="none" stroke="#708959" stroke-width="3"/><path d="M51 71q-6-45 31-56 13 41-31 56" fill="#d9a779"/><path d="M51 71q11-19 24-41" fill="none" stroke="#a67158" stroke-width="3"/><path d="M43 88q2-9 8-17M7 56l-5-4m85 20 9-2" fill="none" stroke="#d2bcac" stroke-width="3" stroke-linecap="round"/>',
 gate:'<path d="M16 31v54m68-54v54" stroke="#b89b80" stroke-width="9" stroke-linecap="round"/><path d="M23 40h54v34H23Z" fill="#7c665c"/><path d="m27 40 46 34M28 76V33m14 43V33m15 43V33m15 43V33" stroke="#d7b28a" stroke-width="7"/><path d="m22 19 8-7m48 7-8-7" stroke="#ead4aa" stroke-width="3" stroke-linecap="round"/>',
 wood:'<rect x="18" y="24" width="59" height="57" rx="7" fill="#bf9875" transform="rotate(-9 48 52)"/><path d="m29 35 32-5M27 52l43-7M29 70l32-6" stroke="#8f6b54" stroke-width="3" stroke-linecap="round"/><path d="m79 19 6-8m2 22 9-2m-27-15V6" stroke="#f7dba5" stroke-width="4" stroke-linecap="round"/>',
 water:'<path d="M50 10Q20 44 20 60a30 30 0 0 0 60 0Q80 44 50 10" fill="#9fcedc"/><path d="M31 59q-2 14 12 19" fill="none" stroke="#d2eef0" stroke-width="5" stroke-linecap="round"/><path d="M9 47 3 37m87 10 7-10M14 78l-9 2m81 0 9 2" stroke="#9fcedc" stroke-width="4" stroke-linecap="round"/>',
 tools:'<path d="m27 76 40-45" stroke="#c6a880" stroke-width="12" stroke-linecap="round"/><path d="m49 18 24 20 15-17-8-7-9 6-12-9Z" fill="#bac5c5" stroke="#7e8e9c" stroke-width="3"/><path d="m21 31 43 44" stroke="#d9bc8f" stroke-width="10" stroke-linecap="round"/><path d="m13 29 14-13 12 17-12 13Z" fill="#b29bc7"/><path d="m13 65-8 4m79-14 10 1" stroke="#f1d8ac" stroke-width="3" stroke-linecap="round"/>',
 door:'<path d="M21 86V15h57v71" fill="#706074" stroke="#b79ba6" stroke-width="5"/><path d="m24 17 40 10v64L24 83Z" fill="#c09579" stroke="#916d60" stroke-width="3"/><path d="m34 31 20 5v26l-20-4Z" fill="#d7b08c"/><circle cx="55" cy="68" r="3" fill="#f4d38c"/><path d="M13 87h72" stroke="#998494" stroke-width="4" stroke-linecap="round"/>',
 rattle:'<path d="m21 69 31-30m-11 10 25 26" stroke="#bbc4c5" stroke-width="7" stroke-linecap="round"/><circle cx="62" cy="29" r="17" fill="none" stroke="#ead095" stroke-width="8"/><path d="m63 62 9 1m-1 10 8 1M20 21l-9-3m13 16-13 2m69 11 10 5" stroke="#dfbd94" stroke-width="4" stroke-linecap="round"/>',
 cupboard:'<path d="M16 38 45 24l39 13v44L49 91 16 76Z" fill="#b58b6b" stroke="#795c53" stroke-width="3"/><path d="m16 38 33 14 35-15M49 52v39" fill="none" stroke="#795c53" stroke-width="3"/><path d="m14 32 30-19 42 15-35 17Z" fill="#ddbc8b" stroke="#99765d" stroke-width="3"/><rect x="41" y="55" width="15" height="15" rx="3" fill="#dec795"/><path d="M28 12 25 4m46 9 5-8" stroke="#e7d5aa" stroke-width="3" stroke-linecap="round"/>',
 paper:'<path d="m23 11 51 3 8 72-61 2Z" fill="#eedfc5"/><path d="m23 11 5 66 54 9-10-18" fill="none" stroke="#c6b396" stroke-width="3"/><path d="m36 28 25 1m-24 12 30 1m-30 12 26 1" stroke="#a69bb9" stroke-width="3" stroke-linecap="round"/><path d="m10 37-7-4m83 17 10-3" stroke="#c8b3da" stroke-width="3" stroke-linecap="round"/>'
 };
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" aria-hidden="true" focusable="false">'+(art[name] || art.carrot)+'</svg>';
};
