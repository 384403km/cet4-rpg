const fs = require("fs");
let h = fs.readFileSync("index.html","utf8");

// Add card front art icon positioning
h = h.replace(
  '.card-front .word{font-size:1.15rem',
  '.card-front .art-bg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:3.5rem;opacity:.06;pointer-events:none;z-index:0}.card-front .word{font-size:1.15rem'
);

// Add card front art to card generation
h = h.replace(
  '<div class="card-front"><div class="word">${w.w}</div><div class="pos">${w.p}</div></div>',
  '<div class="card-front"><div class="art-bg">${VOCAB_DATA[currentDeck].icon}</div><div class="word">${w.w}</div><div class="pos">${w.p}</div></div>'
);

// Add decorative pattern to card back
h = h.replace(
  '<div class="card-back"><span class="themed-tag">${d.name}</span>',
  '<div class="card-back"><div class="art-pat" style="position:absolute;bottom:8px;left:8px;font-size:1.8rem;opacity:.06;pointer-events:none">${VOCAB_DATA[currentDeck].icon}</div><span class="themed-tag">${d.name}</span>'
);

// Add landing page deck card background art
h = h.replace(
  '.deck-card{position:relative;border-radius:16px;padding:32px 24px 24px;cursor:pointer;transition:all .4s cubic-bezier(.22,1,.36,1);overflow:hidden;border:1px solid transparent;min-height:200px;display:flex;flex-direction:column;justify-content:flex-end}',
  '.deck-card{position:relative;border-radius:16px;padding:32px 24px 24px;cursor:pointer;transition:all .4s cubic-bezier(.22,1,.36,1);overflow:hidden;border:1px solid transparent;min-height:200px;display:flex;flex-direction:column;justify-content:flex-end}.deck-card .bg-art{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:5rem;opacity:.04;z-index:0;pointer-events:none;transition:opacity .4s}.deck-card:hover .bg-art{opacity:.08}'
);

// Add bg-art to deck card generation
h = h.replace(
  'card.innerHTML=`<div class="icon">${v.icon}</div><h2>${v.name}</h2>',
  'card.innerHTML=`<div class="bg-art">${v.icon}</div><div class="icon">${v.icon}</div><h2>${v.name}</h2>'
);

fs.writeFileSync("index.html", h);
console.log("Art decorations added");
