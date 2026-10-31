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
// Additional book boards use the same licensed physical foley recordings.
Object.assign(window.TALES, {
 tree: {book:'The Halloween Tree',icon:'tree',chapter:'STORY FOUR · A HALLOWEEN TREE',title:'A tree full of autumn surprises',description:'A general Halloween-tree board. Listen for leaves, steps, and creaks.',pads:[
 ['Autumn leaves','Rustling leaves around the tree','rustle','leaves','orange'],
 ['Walking along','Listen for someone walking','footsteps','footsteps','green'],
 ['Branch knocks','Wooden tapping in the tree','knock','tree','sand'],
 ['Garden gate','A creaking gate nearby','creak','gate','purple'],
 ['Crunchy patch','A crunch in the autumn garden','crunch','carrot','orange'],
 ['Rattle, rattle','Something rattles in the night','rattle','rattle','sand'],
 ['Splash!','A puddle along the path','splash','water','blue'],
 ['Door shuts','Home after an adventure','slam','door','green']
 ]},
 splat: {book:'Splat the Cat · Halloween',icon:'cat',chapter:'STORY FIVE · A CAT’S HALLOWEEN',title:'A curious cat on Halloween',description:'A general Splat Halloween board. You decide when each sound belongs.',pads:[
 ['Soft steps','A cat-like tiptoe: recorded footsteps','footsteps','cat','purple'],
 ['Rustle, rustle','Something moves nearby','rustle','leaves','green'],
 ['Door opens','Who is behind the door?','door','door','sand'],
 ['Knock, knock','A visitor or a surprise','knock','wood','orange'],
 ['Creeeak!','A mysterious little creak','creak','gate','purple'],
 ['Rattle, rattle','Something rattles in the quiet','rattle','rattle','sand'],
 ['Cupboard creak','Peek in a hiding place','cupboard','cupboard','blue'],
 ['Door shuts','Back to a cozy place','slam','door','green']
 ]},
 spookley: {book:'Spookley the Square Pumpkin',icon:'squarepumpkin',chapter:'STORY SIX · THE PUMPKIN PATCH',title:'Every pumpkin belongs',description:'Square, round, big, or small — help the pumpkin patch make some noise!',pads:[
 ['Patch footsteps','A walk around the patch','footsteps','footsteps','green'],
 ['Leaf rustle','Leaves shuffle all around','rustle','leaves','orange'],
 ['Scratch & scrape','A gravel scrape for a rolling moment','scrape','squarepumpkin','sand'],
 ['Wooden knocks','Something bumps against wood','knock','wood','purple'],
 ['Gate creak','A gate in the pumpkin patch','creak','gate','sand'],
 ['Splash!','Water near the garden','splash','water','blue'],
 ['Clink & clatter','A tumbling, clattering moment','clatter','tools','orange'],
 ['Crunch!','A crunchy autumn sound','crunch','leaves','green']
 ]},
 oldlady: {book:'The Little Old Lady Who Was Not Afraid of Anything',icon:'boots',chapter:'STORY SEVEN · A WALK IN THE WOODS',title:'Clomp along the woodland path',description:'Listen for the moving clothes. Use these foley clues, or add your own voices.',pads:[
 ['Clomp, clomp','Recorded footsteps for the shoes','footsteps','boots','sand'],
 ['Wiggle, wiggle','Sand rustle for moving trousers','rustle','trousers','green'],
 ['Shake, shake','Metal rattle for shaking clothes','rattle','shirt','purple'],
 ['Wooden knocks','A tapping story moment','knock','wood','orange'],
 ['Scratch & scrape','A shuffling gravel scrape','scrape','hat','sand'],
 ['Creeeak!','A spooky creak: no recorded boo','creak','pumpkin','orange'],
 ['Door opens','When the door opens','door','door','blue'],
 ['Door shuts','Close the door behind you','slam','door','green']
 ]},
 bigpumpkin: {book:'Big Pumpkin',icon:'pumpkin',chapter:'STORY EIGHT · ONE VERY BIG PUMPKIN',title:'A pumpkin-sized team effort',description:'Listen for a big effort, a little helper, and everyone working together.',pads:[
 ['Garden steps','Someone comes to help','footsteps','footsteps','green'],
 ['Scratch & scrape','Gravel scrapes for a pulling effort','scrape','pumpkin','orange'],
 ['Rustle, rustle','Something stirs in the patch','rustle','leaves','purple'],
 ['Wooden knocks','A bump or tapping moment','knock','wood','sand'],
 ['Creeeak!','A creaky story moment','creak','hat','purple'],
 ['Clink & clatter','Things tumble and clatter','clatter','tools','orange'],
 ['Splash!','A watery moment you choose','splash','water','blue'],
 ['Crunch, crunch','A crunchy celebration','crunch','pumpkin','green']
 ]},
 broom: {book:'Room on the Broom',icon:'broom',chapter:'STORY NINE · FRIENDS ON A BROOM',title:'Make room for one more friend',description:'Listen for lost things, helpful friends, and a broomstick adventure.',pads:[
 ['Rustle, rustle','A sand rustle for a breezy moment','rustle','broom','purple'],
 ['Walking friends','Listen for someone coming along','footsteps','cat','green'],
 ['Rattle, rattle','A rattling story moment','rattle','hat','sand'],
 ['Splash!','Something lands in water','splash','water','blue'],
 ['Snap & crunch','A recorded snap for a sudden break','crunch','broom','orange'],
 ['Wooden knocks','A little wooden tapping','knock','wood','sand'],
 ['Clink & clatter','A pot or a clattering moment','clatter','pot','purple'],
 ['Creeeak!','A playful, creaky surprise','creak','gate','green']
 ]}
});
Object.assign(TALES.carrots,{book:'Creepy Carrots!',icon:'carrot'});
Object.assign(TALES.underwear,{book:'Creepy Pair of Underwear!',icon:'underwear'});
Object.assign(TALES.crayon,{book:'Creepy Crayon!',icon:'crayon'});
window.SOUND_CREDITS = [
 ['Crunch','blukotek','CC0 1.0'],['Footsteps','Mito551','CC BY-SA 3.0'],['Knock','Sheyvan','CC0 1.0'],['Splash','AGFX','CC BY 3.0'],['Gate creak','mhtaylor67','CC0 1.0'],['Door opens','CGEffex; modified by BlockMen','CC BY 3.0'],['Door shuts','bennstir','CC BY 3.0'],['Rattle','HazMatt','CC BY 3.0'],['Scrape','lolamadeus','CC0 1.0'],['Clatter','Iwan Gabovitch (qubodup)','CC0 1.0'],['Cupboard','sofar; Sevin7; Percy Duke; kingsamas; bulbastre; Yoyodaman234','CC BY 3.0'],['Rustle','worthahep88','CC0 1.0']
];
window.PALETTE = {orange:['#493541','#ffc28b'],green:['#353d39','#cee3a9'],purple:['#40334f','#d3b0f2'],sand:['#443b3c','#ebc79e'],blue:['#303c4a','#a0cfdd']};
window.taleIcon = function(name) {
 const art = {
 tree:'<path d="M50 89V46m0 19L26 43m24 10 23-25" stroke="#aa856b" stroke-width="10" fill="none" stroke-linecap="round"/><circle cx="28" cy="33" r="19" fill="#d69c64"/><circle cx="64" cy="24" r="23" fill="#c6ce91"/><circle cx="76" cy="48" r="16" fill="#e7b775"/><path d="m26 81 6 6m42-5-6 7" stroke="#c6ce91" stroke-width="5"/>',
 cat:'<path d="m23 40-5-27 26 15q10-3 19 0l22-15-4 30q12 42-29 43Q14 86 23 40" fill="#b3a7c6"/><path d="m25 29-3-8 12 10m39 0 8-10-2 12" fill="#e5b8bc"/><ellipse cx="38" cy="51" rx="5" ry="7" fill="#dce8ab"/><ellipse cx="65" cy="51" rx="5" ry="7" fill="#dce8ab"/><path d="m47 64 5 4 5-4m-22 0L12 60m24 11-24 5m55-12 23-5m-23 12 23 5" stroke="#645574" stroke-width="3" fill="none" stroke-linecap="round"/>',
 squarepumpkin:'<path d="M50 23q0-15 10-16" stroke="#a9c87f" stroke-width="7" fill="none"/><rect x="15" y="24" width="70" height="62" rx="12" fill="#edaa6d"/><path d="M34 27v54m32-54v54" stroke="#d78b57" stroke-width="3"/><circle cx="39" cy="49" r="4" fill="#4d3940"/><circle cx="62" cy="49" r="4" fill="#4d3940"/><path d="M37 65q14 13 28 0" stroke="#4d3940" stroke-width="3" fill="none" stroke-linecap="round"/>',
 pumpkin:'<path d="M50 23q0-15 10-16" stroke="#a9c87f" stroke-width="7" fill="none"/><ellipse cx="50" cy="56" rx="38" ry="31" fill="#edaa6d"/><ellipse cx="50" cy="56" rx="21" ry="31" stroke="#d78b57" stroke-width="3" fill="none"/><path d="m28 51 11-11 6 14m11 0 6-14 11 11M34 66q16 13 32 0" stroke="#69483e" stroke-width="3" fill="none" stroke-linecap="round"/>',
 boots:'<path d="M18 13h24v42l12 8v18H12V65l6-10Z" fill="#bf9e7c" stroke="#8b705f" stroke-width="3"/><path d="M56 22h24v42l12 8v16H51V72l5-10Z" fill="#cdb6d9" stroke="#8d729e" stroke-width="3"/><path d="M13 74h40m0 8h37M18 24h24m14 9h24" stroke="#e3ccac" stroke-width="4"/>',
 trousers:'<path d="m23 14 56 0 5 70H60L50 43 42 84H18Z" fill="#a3b9ba" stroke="#7b9399" stroke-width="3"/><path d="M24 25h54M50 25v18" stroke="#d1d9cb" stroke-width="4"/>',
 shirt:'<path d="m32 18-21 17 13 20 12-8-4 38h38l-4-38 12 8 13-20-22-17-17 7Z" fill="#c2d39d" stroke="#899e73" stroke-width="3"/><path d="M51 26v57" stroke="#e8e6bd" stroke-width="4"/><circle cx="57" cy="42" r="2" fill="#6c7e57"/><circle cx="57" cy="57" r="2" fill="#6c7e57"/>',
 hat:'<path d="m22 69 30-59 23 59Z" fill="#a58abb" stroke="#725985" stroke-width="3"/><ellipse cx="50" cy="73" rx="42" ry="12" fill="#b59bcb"/><path d="m28 59 43 1" stroke="#e2bc7e" stroke-width="9"/><rect x="47" y="54" width="12" height="12" rx="2" fill="#f0d6a0"/>',
 broom:'<path d="m70 14-37 52" stroke="#ba9671" stroke-width="8" stroke-linecap="round"/><path d="m34 52-24 29 34 12 8-36Z" fill="#dec38d" stroke="#b29972" stroke-width="3"/><path d="m31 66-9 19m18-16-7 19m1-31 16 6" stroke="#967f62" stroke-width="3"/><path d="m76 40 13-3m-19-9 7-9" stroke="#d0b7ed" stroke-width="3" stroke-linecap="round"/>',
 pot:'<path d="M17 44q-1 42 33 42t33-42Z" fill="#9988b3" stroke="#6b5b84" stroke-width="3"/><ellipse cx="50" cy="43" rx="35" ry="9" fill="#b6cf95"/><path d="m25 82-7 8m57-8 7 8M35 30q-10-10 0-20m20 19q10-10 0-20m20 20q-10-10 0-20" stroke="#c6cfa5" stroke-width="4" fill="none" stroke-linecap="round"/>',

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
