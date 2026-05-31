#!/usr/bin/env node
// Generate CET-4 vocab game HTML
const fs = require('fs');
const words = JSON.parse(fs.readFileSync(__dirname + '/vocab_clean.json', 'utf-8'));

const themes = {TM:'Type-Moon',AN:'Anime',AI:'AI/Tech',GE:'General'};
const perDay = Math.ceil(words.length / 8);

let html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
<title>CET-4 核心词汇 x ACG/TM/AI</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0a0e1a;--card:#131a2e;--gold:#ffd700}
body{background:var(--bg);color:#e8e0d0;font-family:Segoe UI,Microsoft YaHei,sans-serif;padding:12px;max-width:900px;margin:0 auto}
h1{text-align:center;color:var(--gold);padding:16px 0 4px;font-size:1.8rem}
.sub{text-align:center;color:#8880a0;font-size:.8rem;margin-bottom:12px}
.sbar{display:flex;gap:8px;margin-bottom:10px}
.sbar input{flex:1;background:#131a2e;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:10px;color:#e8e0d0;font-size:.9rem}
.sbar input:focus{border-color:var(--gold)}
.tabs,.days{display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap}
.tab,.dayb{background:#131a2e;border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:7px 14px;cursor:pointer;font-size:.82rem;color:#8880a0}
.tab.active,.dayb.active{border-color:var(--gold);color:var(--gold)}
.days{margin-bottom:12px;display:grid;grid-template-columns:repeat(4,1fr);gap:6px}@media(max-width:480px){.days{grid-template-columns:repeat(2,1fr)}}
.dayb{text-align:center;padding:10px}.dayb .n{font-size:1.2rem;font-weight:700;color:var(--gold)}.dayb .c{font-size:.65rem;color:#8880a0}
.stats{display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap}
.sb{background:#131a2e;border-radius:6px;padding:6px 12px;text-align:center;font-size:.8rem}
.sb .n{font-size:1.1rem;font-weight:700}
.leg{display:flex;gap:10px;margin-bottom:10px;flex-wrap:wrap;font-size:.75rem;align-items:center}
.dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:3px}
.card{background:#131a2e;border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:12px 14px;margin-bottom:8px}
.card .h{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px}
.card .w{font-size:1.1rem;font-weight:700}.card .m{font-size:.85rem;color:var(--gold);margin-left:6px}
.card .t{font-size:.6rem;padding:2px 6px;border-radius:4px}
.card .tm{background:rgba(255,68,136,.15);color:#f48}
.card .an{background:rgba(68,204,255,.15);color:#4cf}
.card .ai{background:rgba(68,255,136,.15);color:#4f8}
.card .ge{background:rgba(136,136,204,.15);color:#aac}
.card .e{font-size:.8rem;color:#8880a0;font-style:italic;border-left:2px solid rgba(255,215,0,.2);padding-left:10px;margin:4px 0;line-height:1.5}
.card .co{font-size:.7rem;color:#666}.card .co s{color:#8880a0}
.none{text-align:center;color:#666;padding:30px}
</style></head><body>
<h1>CET-4 \\u6838\\u5fc3\\u8bcd\\u6c47</h1>
<div class=sub>ACG x Type-Moon x AI \\u8054\\u60f3\\u8bb0\\u5fc6\\u6cd5</div>
<div class=leg>
<span><span class=dot style=background:#f48></span>TM</span>
<span><span class=dot style=background:#4cf></span>AN</span>
<span><span class=dot style=background:#4f8></span>AI</span>
<span><span class=dot style=background:#aac></span>GE</span>
<span style=color:#8880a0>|</span>
<span><span class=dot style=background:var(--gold)></span>${words.length} \\u8bcd</span>
</div>
<div class=sbar><input id=inp placeholder="\\u641c\\u7d22 \\u8bcd/many/\\u4f8b\\u53e5" oninput=render()></div>
<div class=tabs id=tabs></div>
<div class=days id=days></div>
<div id=list></div>
<script>
const W=${JSON.stringify(words)};
const TH={TM:'Type-Moon',AN:'Anime',AI:'AI/Tech',GE:'General'};
const TC={TM:'tm',AN:'an',AI:'ai',GE:'ge'};
let curDay=null,curT=null;
const PD=${perDay};

function init(){
  let h='<div class=tab onclick=setT(null)>\\u{1F3F0}\\u5168\\u90e8</div>';
  for(const[k,v]of Object.entries(TH))
    h+='<div class=tab'+(curT===k?' active':'')+' onclick=setT("'+k+'")>'+(k==='TM'?'\\u{1F3F0}':k==='AN'?'\\u{1F5BC}\\uFE0F':k==='AI'?'\\u{1F916}':'\\u{1F4DA}')+' '+v+'</div>';
  document.getElementById('tabs').innerHTML=h;
  h='';
  for(let i=0;i<8;i++){const s=i*PD,e=Math.min(s+PD,W.length);h+='<div class=dayb'+(curDay===i?' active':'')+' onclick=setD('+i+')><div class=n>Day '+(i+1)+'</div><div class=c>'+(e-s)+'\\u8bcd</div></div>'}
  document.getElementById('days').innerHTML=h;
  render();
}
function setT(t){curT=t;init()}
function setD(d){curDay=d;init()}
function render(){
  let f=W;const q=document.getElementById('inp').value.toLowerCase();
  if(q)f=f.filter(w=>w[0].includes(q)||w[1].includes(q)||w[3].toLowerCase().includes(q));
  if(curT)f=f.filter(w=>w[4]===curT);
  if(curDay!==null)f=f.slice(curDay*PD,(curDay+1)*PD);
  document.getElementById('list').innerHTML=f.map(w=>{
    const[wd,mn,ex,co,th]=w;
    return '<div class=card><div class=h><div><span class=w>'+wd+'</span><span class=m>'+mn+'</span></div><span class=t '+TC[th]+'>'+(TH[th]||th)+'</span></div><div class=e>'+ex.replace(/</g,'&lt;')+'</div><div class=co><s>\\u{1F517}\\u642d\\u914d\\uff1a</s>'+co+'</div></div>';
  }).join('');
  if(!document.getElementById('list').innerHTML)document.getElementById('list').innerHTML='<div class=none>\\u6ca1\\u6709\\u5339\\u914d\\u7684\\u8bcd\\u6c47</div>';
}
init();
<\\/script>
</body></html>`;

fs.writeFileSync(__dirname + '/index.html', html);
console.log('Written index.html, size:', html.length, 'bytes');
