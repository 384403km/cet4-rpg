#!/usr/bin/env python3
# Generate vocab game HTML with proper UTF-8 encoding
import json, os

HERE = os.path.dirname(__file__)
with open(os.path.join(HERE, 'vocab_clean.json'), 'r', encoding='utf-8') as f:
    words = json.load(f)

print(f'Total: {len(words)} words')

# Build HTML
html = '<!DOCTYPE html>\n'
html += '<html lang="zh-CN">\n'
html += '<head>\n'
html += '<meta charset="UTF-8">\n'
html += '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">\n'
html += '<title>CET-4 核心词汇 x ACG/TM/AI</title>\n'

# CSS
html += '<style>\n'
html += '*{margin:0;padding:0;box-sizing:border-box}:root{--bg:#0a0e1a;--card:#131a2e;--gold:#ffd700}\n'
html += 'body{background:var(--bg);color:#e8e0d0;font-family:Segoe UI,Microsoft YaHei,sans-serif;padding:12px;max-width:900px;margin:0 auto}\n'
html += 'h1{text-align:center;color:var(--gold);padding:16px 0 4px;font-size:1.8rem}\n'
html += '.sub{text-align:center;color:#8880a0;font-size:.8rem;margin-bottom:12px}\n'
html += '.sbar{display:flex;gap:8px;margin-bottom:10px}\n'
html += '.sbar input{flex:1;background:#131a2e;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:10px;color:#e8e0d0;font-size:.9rem}\n'
html += '.sbar input:focus{border-color:var(--gold)}\n'
html += '.tabs,.days{display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap}\n'
html += '.tab,.dayb{background:#131a2e;border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:7px 14px;cursor:pointer;font-size:.82rem;color:#8880a0}\n'
html += '.tab.active,.dayb.active{border-color:var(--gold);color:var(--gold)}\n'
html += '.days{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px}\n'
html += '@media(max-width:480px){.days{grid-template-columns:repeat(2,1fr)}}\n'
html += '.dayb{text-align:center;padding:10px}.dayb .n{font-size:1.2rem;font-weight:700;color:var(--gold)}.dayb .c{font-size:.65rem;color:#8880a0}\n'
html += '.stats{display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap}\n'
html += '.sb{background:#131a2e;border-radius:6px;padding:6px 12px;text-align:center;font-size:.8rem}\n'
html += '.sb .n{font-size:1.1rem;font-weight:700}\n'
html += '.leg{display:flex;gap:10px;margin-bottom:10px;flex-wrap:wrap;font-size:.75rem;align-items:center}\n'
html += '.dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:3px}\n'
html += '.card{background:#131a2e;border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:12px 14px;margin-bottom:8px}\n'
html += '.card .h{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px}\n'
html += '.card .w{font-size:1.1rem;font-weight:700}.card .m{font-size:.85rem;color:var(--gold);margin-left:6px}\n'
html += '.card .t{font-size:.6rem;padding:2px 6px;border-radius:4px}\n'
html += '.card .tm{background:rgba(255,68,136,.15);color:#f48}\n'
html += '.card .an{background:rgba(68,204,255,.15);color:#4cf}\n'
html += '.card .ai{background:rgba(68,255,136,.15);color:#4f8}\n'
html += '.card .ge{background:rgba(136,136,204,.15);color:#aac}\n'
html += '.card .e{font-size:.8rem;color:#8880a0;font-style:italic;border-left:2px solid rgba(255,215,0,.2);padding-left:10px;margin:4px 0;line-height:1.5}\n'
html += '.card .co{font-size:.7rem;color:#666}.card .co s{color:#8880a0}\n'
html += '.none{text-align:center;color:#666;padding:30px}\n'
html += '</style>\n'
html += '</head>\n'
html += '<body>\n'
html += '<h1>CET-4 \u6838\u5fc3\u8bcd\u6c47</h1>\n'
html += '<div class="sub">ACG \u00d7 Type-Moon \u00d7 AI \u8054\u60f3\u8bb0\u5fc6\u6cd5</div>\n'

# Theme legend
html += '<div class="leg">\n'
html += '<span><span class="dot" style="background:#f48"></span> Type-Moon</span>\n'
html += '<span><span class="dot" style="background:#4cf"></span> Anime</span>\n'
html += '<span><span class="dot" style="background:#4f8"></span> AI/Tech</span>\n'
html += '<span><span class="dot" style="background:#aac"></span> General</span>\n'
html += ' | <span id="totalWords">' + str(len(words)) + ' \u8bcd</span>\n'
html += '</div>\n'

# Search, tabs, days, list containers
html += '<div class="sbar"><input id="inp" placeholder="\u641c\u7d22 \u82f1\u6587/\u4e2d\u6587/\u4f8b\u53e5" oninput="render()"></div>\n'
html += '<div class="tabs" id="tabs"></div>\n'
html += '<div class="days" id="days"></div>\n'
html += '<div id="list"></div>\n'

# JavaScript - embed words as JSON
html += '<script>\n'
# Use ensure_ascii=False to keep Chinese readable, then replace problematic chars
words_json = json.dumps(words, ensure_ascii=False)
html += 'var W = ' + words_json + ';\n'
html += 'var TH = {TM:"Type-Moon",AN:"Anime",AI:"AI/Tech",GE:"General"};\n'
html += 'var TC = {TM:"tm",AN:"an",AI:"ai",GE:"ge"};\n'
html += 'var curDay = null, curT = null;\n'
html += 'var PD = Math.ceil(W.length / 8);\n'
html += 'function init(){\n'
html += '  var h = "<div class=tab onclick=setT(null)>\\uD83C\\uDFF0 \\u5168\\u90E8</div>";\n'
html += '  for(var k in TH) h += "<div class=tab"+(curT===k?" active":"")+" onclick=setT(\'"+k+"\')>"+(k==="TM"?"\\uD83C\\uDFF0":k==="AN"?"\\uD83D\\uDDBC\\uFE0F":k==="AI"?"\\uD83E\\uDD16":"\\uD83D\\uDCDA")+" "+TH[k]+"</div>";\n'
html += '  document.getElementById("tabs").innerHTML = h;\n'
html += '  h = "";\n'
html += '  for(var i=0;i<8;i++){\n'
html += '    var s = i*PD, e = Math.min(s+PD, W.length);\n'
html += '    h += "<div class=dayb"+(curDay===i?" active":"")+" onclick=setD("+i+")><div class=n>Day "+(i+1)+"</div><div class=c>"+(e-s)+" \\u8BCD</div></div>";\n'
html += '  }\n'
html += '  document.getElementById("days").innerHTML = h;\n'
html += '  render();\n'
html += '}\n'
html += 'function setT(t){curT=t;init()}\n'
html += 'function setD(d){curDay=d;init()}\n'
html += 'function render(){\n'
html += '  var f = W;\n'
html += '  var q = document.getElementById("inp").value.toLowerCase().trim();\n'
html += '  if(q) f = f.filter(function(w){return w[0].toLowerCase().indexOf(q)>=0||w[1].indexOf(q)>=0||w[3].toLowerCase().indexOf(q)>=0||w[2].toLowerCase().indexOf(q)>=0});\n'
html += '  if(curT) f = f.filter(function(w){return w[4]===curT});\n'
html += '  if(curDay!==null) f = f.slice(curDay*PD, (curDay+1)*PD);\n'
html += '  var html = "";\n'
html += '  for(var i=0;i<f.length;i++){\n'
html += '    var w = f[i];\n'
html += '    html += "<div class=card><div class=h><div><span class=w>"+w[0]+"</span><span class=m>"+w[1]+"</span></div><span class=t "+TC[w[4]]+">"+TH[w[4]]+"</span></div><div class=e>"+esc(w[2])+"</div><div class=co><span style=color:#8880a0>\\uD83D\\uDD17 \\u642D\\u914D\\uFF1A</span>"+esc(w[3])+"</div></div>";\n'
html += '  }\n'
html += '  document.getElementById("list").innerHTML = html || "<div class=none>\\u6CA1\\u6709\\u5339\\u914D\\u7684\\u8BCD\\u6C47</div>";\n'
html += '}\n'
html += 'function esc(s){return s.replace(/</g,"&lt;").replace(/>/g,"&gt;")}\n'
html += 'init();\n'
html += '</script>\n'
html += '</body>\n'
html += '</html>\n'

with open(os.path.join(HERE, 'index.html'), 'w', encoding='utf-8') as f:
    f.write(html)

print(f'Written: {len(html)} bytes')
print('Done!')
