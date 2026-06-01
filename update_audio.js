const fs = require("fs");
let h = fs.readFileSync("index.html","utf8");

// 1. Add audio.js script tag
h = h.replace('<script src="data.js"></script>', '<script src="data.js"></script><script src="audio.js"></script>');

// 2. Add music button in game header
h = h.replace(
  'id="gameSubtitle">已掌握 0/0</small></h1>',
  'id="gameSubtitle">已掌握 0/0</small></h1><button onclick="AudioSys.toggle()" id="musicBtn" style="background:none;border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:8px 14px;color:var(--text2);cursor:pointer;font-size:.8rem;font-family:inherit;transition:all .3s" title="背景音乐">\uD83D\uDD07 音乐</button>'
);

// 3. Add header art icon
h = h.replace(
  '<button class="back" onclick="backToLanding()">←</button>',
  '<button class="back" onclick="backToLanding()">←</button><span id="headerArt" style="font-size:1.5rem;opacity:.5"></span>'
);

// 4. init - also init audio
h = h.replace(
  "function init(){",
  "function init(){AudioSys.init();"
);

// 5. openDeck - play bg music, set header art
h = h.replace(
  "function openDeck(deckKey){",
  "function openDeck(deckKey){AudioSys.sfx(\"enter\");AudioSys.playBg(VOCAB_DATA[deckKey].theme);document.getElementById(\"headerArt\").textContent=VOCAB_DATA[deckKey].icon;"
);

// 6. backToLanding - stop music
h = h.replace(
  "function backToLanding(){",
  "function backToLanding(){AudioSys.stopBg();"
);

// 7. toggleCard - flip sound
h = h.replace(
  "function toggleCard(el,word){",
  "function toggleCard(el,word){AudioSys.sfx(\"flip\");"
);

// 8. quiz correct sound
h = h.replace(
  'if(correct){btn.classList.add("correct");quizCorrect++;',
  'if(correct){AudioSys.sfx("correct");btn.classList.add("correct");quizCorrect++;'
);

// 9. quiz wrong sound
h = h.replace(
  'btn.classList.add("wrong");\n    const correctDef',
  'AudioSys.sfx("wrong");btn.classList.add("wrong");\n    const correctDef'
);

// 10. mastery sound
h = h.replace(
  'if(confirm(`掌握 \\"${word}\\" 了吗？\\n「确定」→ ⭐掌握  「取消」→ 仅已阅`)){const m2=getM();',
  'if(confirm(`掌握 \\"${word}\\" 了吗？\\n「确定」→ ⭐掌握  「取消」→ 仅已阅`)){AudioSys.sfx("master");const m2=getM();'
);

fs.writeFileSync("index.html", h);
console.log("Updated OK - audio system integrated");
