#!/usr/bin/env python3
"""Build CET4 RPG single-file index.html from questions.js + JS logic."""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
os.chdir(HERE)

# Read questions JSON
with open('questions.js') as f:
    raw = f.read()
start = raw.index('[')
end = raw.rindex(']') + 1
QJSON = raw[start:end]

# ====== HTML Template ======
HTML = r"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
<title>四级魔法学院 - CET4 Reading RPG</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0a0e1a;--card:#131a2e;--panel:#1a2340;--gold:#ffd700;--red:#ff4444;--blue:#4488ff;--green:#44ff88;--purple:#8844ff;--text:#e8e0d0;--dim:#8880a0;--rad:12px}
body{background:var(--bg);color:var(--text);font-family:Segoe UI,Microsoft YaHei,sans-serif;min-height:100vh;overflow-x:hidden}
body::before{content:"";position:fixed;top:0;left:0;width:100%;height:100%;background:radial-gradient(ellipse 20% 50%,rgba(100,60,180,0.08),transparent 60%),radial-gradient(ellipse 80% 50%,rgba(180,60,100,0.06),transparent 60%);pointer-events:none;z-index:0}
#stars{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden}.star{position:absolute;border-radius:50%;background:#fff;animation:tw var(--d,3s)ease infinite alternate}@keyframes tw{0%{opacity:.15}100%{opacity:.9}}
.container{position:relative;z-index:1;max-width:900px;margin:0 auto;padding:10px}
.gold{background:linear-gradient(135deg,#b8960f,#ffd700);color:#1a0a2e;border:none;padding:12px 28px;border-radius:var(--rad);font-size:1rem;font-weight:700;cursor:pointer;transition:.3s}.gold:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(255,215,0,.4)}.gold:disabled{opacity:.5;cursor:default}
.purple{background:linear-gradient(135deg,#6633cc,#8844ff);color:#fff;border:none;padding:10px 22px;border-radius:var(--rad);cursor:pointer;font-weight:600;transition:.3s}.purple:hover{transform:translateY(-2px);box-shadow:0 4px 15px rgba(136,68,255,.4)}
.red{background:linear-gradient(135deg,#c33,#f44);color:#fff;border:none;padding:10px 22px;border-radius:var(--rad);cursor:pointer;font-weight:600}
.back{background:0 0;border:1px solid rgba(255,255,255,.2);color:var(--dim);padding:8px 18px;border-radius:var(--rad);cursor:pointer;font-size:.85rem;transition:.3s}.back:hover{border-color:var(--text);color:var(--text)}
.scr{display:none}.scr.active{display:block;animation:fi .4s ease}@keyframes fi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.tit{text-align:center;padding:20px 0 8px}.tit h1{font-size:2.2rem;color:var(--gold);text-shadow:0 0 30px rgba(255,215,0,.3);letter-spacing:3px}.tit .sub{color:var(--dim);font-size:.85rem}
#bar{display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:var(--card);border-radius:var(--rad);margin-bottom:12px;border:1px solid var(--gold)}.pn{font-size:1.1rem;font-weight:700;color:var(--gold)}.pl{color:var(--dim);font-size:.8rem}
.sr{display:flex;gap:12px;align-items:center;flex-wrap:wrap}.si{text-align:center;min-width:55px}.sl{font-size:.65rem;color:var(--dim)}.sv{font-size:1.2rem;font-weight:700}.sv.h{color:var(--red)}.sv.m{color:var(--blue)}.sv.x{color:var(--green)}
.bc{width:100%;height:5px;background:rgba(255,255,255,.08);border-radius:3px;margin-top:2px;overflow:hidden}.bf{height:100%;border-radius:3px;transition:width .5s}.bf.h{background:linear-gradient(90deg,#c22,#f44)}.bf.m{background:linear-gradient(90deg,#24c,#48f)}.bf.x{background:linear-gradient(90deg,#2a4,#4f8)}
#menu{text-align:center;padding:50px 20px;min-height:75vh;display:none;flex-direction:column;align-items:center;justify-content:center}#menu.active{display:flex}
#menu .lg{font-size:4rem;margin-bottom:8px;animation:fl 3s ease-in-out infinite}@keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
#menu h2{font-size:1.2rem;color:var(--dim);font-weight:400;margin-bottom:30px}.mb{display:flex;flex-direction:column;gap:12px;width:260px}.mb .gold{width:100%}
.mh{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.mh h2{font-size:1.3rem}
.mg{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px}@media(max-width:480px){.mg{grid-template-columns:repeat(2,1fr)}}
.lc{background:var(--card);border:1px solid rgba(255,255,255,.08);border-radius:var(--rad);padding:14px;text-align:center;cursor:pointer;transition:.3s}.lc:hover{transform:translateY(-3px)}.lc.lk{opacity:.4;cursor:default}.lc.lk:hover{transform:none}.lc.ok{border-color:var(--green);box-shadow:0 0 12px rgba(68,255,136,.15)}.lc.cur{border-color:var(--gold);box-shadow:0 0 12px rgba(255,215,0,.2)}
.ln{font-size:1.8rem;font-weight:700;color:var(--gold)}.lt{font-size:.75rem;color:var(--dim)}
.ls{font-size:.65rem;padding:2px 6px;border-radius:4px;display:inline-block}.ls.ok{color:var(--green)}.ls.cur{color:var(--gold)}.ls.lk{color:var(--dim)}
.lz{font-size:.65rem;background:rgba(136,68,255,.2);color:var(--purple);padding:2px 8px;border-radius:4px;display:inline-block;margin-top:4px}
.ip{background:var(--card);border-radius:var(--rad);padding:14px;margin-bottom:10px}.ip h3{color:var(--gold);margin-bottom:10px;font-size:1rem}.ig{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}@media(max-width:500px){.ig{grid-template-columns:repeat(4,1fr)}}
.is{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:8px;padding:6px;text-align:center;min-height:50px;display:flex;flex-direction:column;align-items:center;justify-content:center}
.is.hi{border-color:rgba(255,215,0,.2)}.is .ii{font-size:1.3rem}.is .in{font-size:.6rem;color:var(--dim)}.is.em{opacity:.3}.is.em::after{content:"\2014";color:var(--dim)}
.bt{display:flex;justify-content:space-between;align-items:center;background:var(--card);border-radius:var(--rad);padding:10px 16px;margin-bottom:10px}.bt .bl{color:var(--dim);font-size:.8rem}.bt .bp{color:var(--gold);font-size:.85rem}
.bs{background:var(--panel);border-radius:var(--rad);padding:18px;margin-bottom:10px;min-height:300px}
.ma{text-align:center;padding:10px 0 14px;border-bottom:1px solid rgba(255,255,255,.06);margin-bottom:14px}.me{font-size:2.8rem;line-height:1}.mn{font-size:1.05rem;font-weight:700;color:var(--red)}
.mhb{width:180px;height:7px;background:rgba(255,255,255,.08);border-radius:4px;margin:6px auto;overflow:hidden}.mhf{height:100%;background:linear-gradient(90deg,#c22,#f44);border-radius:4px;transition:width .4s}.mht{font-size:.75rem;color:var(--dim)}.mlt{font-size:.65rem;background:rgba(255,68,68,.12);color:var(--red);padding:2px 8px;border-radius:4px;display:inline-block;margin-top:3px}
.rw{text-align:center;padding:18px;background:linear-gradient(135deg,rgba(255,215,0,.05),rgba(255,215,0,.1));border-radius:var(--rad);margin-bottom:10px;border:1px solid rgba(255,215,0,.2)}.rw h3{color:var(--gold);margin-bottom:6px;font-size:1.1rem}.rw p{font-size:.9rem;line-height:1.5;margin-bottom:10px}
.ri{display:flex;gap:14px;justify-content:center;margin:10px 0;flex-wrap:wrap}.rw-item{background:var(--card);border-radius:8px;padding:8px 14px;border:1px solid rgba(255,215,0,.12);text-align:center;min-width:70px}
.rw-item .ri-i{font-size:1.3rem}.rw-item .ri-l{font-size:.65rem;color:var(--dim)}.rw-item .ri-v{font-size:.9rem;font-weight:700;color:var(--gold)}
.qh{font-size:.7rem;background:rgba(136,68,255,.15);color:var(--purple);padding:2px 8px;border-radius:4px;display:inline-block;margin-bottom:8px}
.qp{background:rgba(0,0,0,.2);border-radius:8px;padding:10px 14px;margin-bottom:10px;font-size:.85rem;line-height:1.6;color:var(--dim);max-height:180px;overflow-y:auto}.qs{font-size:1rem;font-weight:600;margin-bottom:10px;line-height:1.4}.qo{display:flex;flex-direction:column;gap:7px}
.qop{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:9px 12px;cursor:pointer;transition:.2s;display:flex;align-items:flex-start;gap:6px;font-size:.9rem}.qop:hover{background:rgba(255,255,255,.05)}.qop .ql{font-weight:700;color:var(--gold);min-width:18px;flex-shrink:0}.qop.sel{background:rgba(255,215,0,.08);border-color:var(--gold)}.qop.cr{background:rgba(68,255,136,.08);border-color:var(--green)}.qop.wr{background:rgba(255,68,68,.08);border-color:var(--red)}.qop.di{cursor:default;pointer-events:none}
.qa{margin-top:12px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
.qf{margin-top:12px;padding:10px;border-radius:8px;text-align:center;font-size:.9rem;line-height:1.4}.qf.cr{background:rgba(68,255,136,.06);border:1px solid rgba(68,255,136,.15);color:var(--green)}.qf.wr{background:rgba(255,68,68,.06);border:1px solid rgba(255,68,68,.15);color:var(--red)}.qf .qe{color:var(--dim);font-size:.8rem;margin-top:4px}
.rs{text-align:center;padding:25px}.rs h2{font-size:1.5rem;margin-bottom:12px}.rs .rd{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:20px}@media(max-width:480px){.rs .rd{grid-template-columns:1fr}}.rs .rst{background:var(--card);border-radius:8px;padding:10px}.rs .rst .rv{font-size:1.4rem;font-weight:700}.rs .rst .rl{font-size:.7rem;color:var(--dim);margin-top:3px}.rr{font-size:1.1rem;margin-bottom:16px;padding:10px;border-radius:8px}.rr.S{color:var(--gold);text-shadow:0 0 20px rgba(255,215,0,.5)}.rr.A{color:var(--green)}.rr.B{color:var(--blue)}.rr.C{color:var(--dim)}.rr.D{color:var(--red)}
.modal{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.6);backdrop-filter:blur(3px);z-index:200;display:none;align-items:center;justify-content:center}.modal.active{display:flex}
.mbox{background:var(--panel);border:1px solid rgba(255,215,0,.3);border-radius:var(--rad);padding:22px;max-width:420px;width:90%;max-height:80vh;overflow-y:auto}.mbox h3{color:var(--gold);margin-bottom:8px;text-align:center}.mbox p{color:var(--dim);font-size:.85rem;line-height:1.5;margin-bottom:10px}.ma2{display:flex;gap:8px;justify-content:center;margin-top:14px}
.lcp{background:linear-gradient(135deg,rgba(255,215,0,.1),rgba(136,68,255,.1));border:1px solid rgba(255,215,0,.3);border-radius:var(--rad);padding:18px;text-align:center;margin-bottom:10px}.lcp h3{color:var(--gold);font-size:1.2rem;margin-bottom:6px}.lcp .ld{color:var(--dim);font-size:.85rem;line-height:1.5}
.combo{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-size:2.8rem;font-weight:700;z-index:50;pointer-events:none;animation:cb 1s ease-out;text-shadow:0 0 20px rgba(255,215,0,.5)}@keyframes cb{0%{opacity:1;transform:translate(-50%,-50%)scale(.5)}40%{opacity:1;transform:translate(-50%,-50%)scale(1.2)}100%{opacity:0;transform:translate(-50%,-70%)scale(1)}}
.flsh{position:fixed;top:0;left:0;width:100%;height:100%;z-index:80;pointer-events:none;animation:fla .6s ease-out}@keyframes fla{0%{background:radial-gradient(circle,rgba(136,68,255,.35),transparent 60%)}100%{background:transparent}}
</style>
</head>
<body>
<div id="stars"></div>
<div class="modal" id="resetModal"><div class="mbox"><h3>\U0001F52E 重置命运</h3><p>确定要重置所有进度吗？等级、装备、通关记录全部清空。</p><p style="color:var(--red);font-size:.8rem">\u26A0\uFE0F 不可撤销</p><div class="ma2"><button class="purple" onclick="closeModal('resetModal')">取消</button><button class="red" onclick="confirmReset()">确认重置</button></div></div></div>
<div class="modal" id="aboutModal"><div class="mbox"><h3>\U0001F4D6 四级魔法学院</h3><p>你是刚觉醒的魔法学徒，需要穿越8个魔法区域击败守护四级水晶的怪物！</p><p><b>\u2694\uFE0F 战斗规则</b><br>每道题 = 一次施法。答对 = 攻击怪物，答错 = 自己被反噬扣血。</p><p><b>\U0001F4D6 题型</b><br><span style="color:var(--green)">\U0001F4D6 词汇魔法</span> — 选词填空<br><span style="color:var(--blue)">\U0001F4CB 段落感知</span> — 长篇阅读匹配<br><span style="color:var(--gold)">\U0001F50D 深度解析</span> — 仔细阅读</p><p><b>\U0001F4DA 计划</b><br>每天1关 × 8天 = 阅读训练。之后冲刺翻译和写作！</p><div class="ma2"><button class="purple" onclick="closeModal('aboutModal')">知道了！</button></div></div></div>
<div class="container">
<div class="tit"><h1>\U0001F3F0 四级魔法学院</h1><div class="sub">CET-4 Reading RPG · 考前 <span id="examCountdown">14</span> 天</div></div>
<div id="bar"><div><div class="pn" id="pName">\U0001F9D9 魔法学徒</div><div class="pl" id="pLevel">Lv.1</div></div>
<div class="sr"><div class="si"><div class="sl">\u2764\uFE0F</div><div class="sv h" id="hpD">100</div><div class="bc"><div class="bf h" id="hpB" style="width:100%"></div></div></div>
<div class="si"><div class="sl">\U0001F4A7</div><div class="sv m" id="mpD">50</div><div class="bc"><div class="bf m" id="mpB" style="width:50%"></div></div></div>
<div class="si"><div class="sl">\u2B50</div><div class="sv x" id="xpD">0</div><div class="bc"><div class="bf x" id="xpB" style="width:0%"></div></div></div></div></div>
<div class="scr active" id="menu"><div class="lg">\U0001F9D9</div><h2>踏上收集四级水晶的魔法之旅</h2>
<div class="mb"><button class="gold" onclick="startGame()">\u2694\uFE0F 开始冒险</button>
<button class="purple" onclick="showModal('aboutModal')">\U0001F4D6 游戏说明</button>
<button class="red" onclick="showModal('resetModal')" style="opacity:.5">\U0001F5D1\uFE0F 重置进度</button></div></div>
<div class="scr" id="map"><div class="mh"><h2>\U0001F5FA\uFE0F 魔法大陆</h2><button class="back" onclick="goMenu()">\u2190 返回</button></div>
<div class="mg" id="mapGrid"></div><div class="ip"><h3>\U0001F392 魔法背包</h3><div class="ig" id="bagGrid"></div></div></div>
<div class="scr" id="battle"><div class="bt"><div><span class="bl">Day <span id="bLv">1</span> · <span id="bMonsterName">怪物</span></span><br><span class="bp">进度: <span id="bProg">0/0</span></span></div><button class="back" onclick="flee()">\U0001F3C3 撤退</button></div><div class="bs" id="bScene"></div></div>
<div class="scr" id="result"><div class="rs" id="rContent"></div></div></div>
<script>
// Questions data (80 questions, 8 days x 10)
__QUESTIONS_DATA__
// Game constants
const BASE_HP=100,BASE_MP=50,HP_PER_LV=15,MP_PER_LV=8;
const XP_TABLE=[0,80,160,280,400,550,700,900,1100,1400,2000];
const EQ={1:{n:'\u6728\u6cd5\u6756',i:'\uD83E\uDE84',d:'\u521D\u5B66\u8005\u6CD5\u6756',b:{mp:5}},2:{n:'\u94DC\u7EB9\u6212\u6307',i:'\uD83D\uDC8D',d:'\u57FA\u7840\u9B54\u6CD5\u94ED\u6587',b:{hp:10}},3:{n:'\u77E5\u8BC6\u957F\u888D',i:'\uD83D\uDC58',d:'\u6D78\u8FC7\u667A\u6167\u836F\u6C34',b:{xp:0.1}},4:{n:'\u6C34\u6676\u62A4\u7B26',i:'\uD83D\uDCFF',d:'\u51DD\u805A\u9605\u8BFB\u9B54\u6CD5',b:{mp:10}},5:{n:'\u94F6\u8F89\u9B54\u6756',i:'\u2728',d:'\u6CE8\u5165\u6708\u5149\u4E4B\u529B',b:{atk:2}},6:{n:'\u7B26\u6587\u77F3\u677F',i:'\uD83D\uDCDC',d:'\u8BB0\u8F7D\u4E0A\u53E4\u8BCD\u6C47',b:{xp:0.15}},7:{n:'\u79D8\u6CD5\u773C\u955C',i:'\uD83D\uDC53',d:'\u770B\u900F\u9690\u85CF\u4FE1\u606F',b:{atk:3}},8:{n:'\u9F99\u9CDE\u6CD5\u888D',i:'\uD83E\uDDE5',d:'\u9F99\u9CDE\u7F16\u7EC7',b:{hp:25}}};
const MT=[{n:'\u8BCD\u6C47\u53F2\u83B1\u59C6',e:'\uD83D\uDFE2'},{n:'\u8BED\u6CD5\u54E5\u5E03\u6797',e:'\uD83D\uDC7A'},{n:'\u9605\u8BFB\u77F3\u50CF\u9B3C',e:'\uD83D\uDDFF'},{n:'\u6BB5\u843D\u86C7\u5996',e:'\uD83D\uDC0D'},{n:'\u7406\u89E3\u5E7D\u7075',e:'\uD83D\uDC7B'},{n:'\u903B\u8F91\u6076\u9B54',e:'\uD83D\uDC7F'},{n:'\u7FFB\u8BD1\u5DEB\u5E08',e:'\uD83E\uDDD9'},{n:'\u56DB\u7EA7\u5DE8\u9F99',e:'\uD83D\uDC09'}];
const TN={V:'\uD83D\uDCD6 \u8BCD\u6C47\u9B54\u6CD5',R:'\uD83D\uDD0D \u6DF1\u5EA6\u89E3\u6790',M:'\uD83D\uDCCB \u6BB5\u843D\u611F\u77E5'};
// Game state & logic
__GAME_LOGIC__
</script>
</body>
</html>"""

# Read the game logic
# We'll extract it from the old build file or define it inline
JL = r"""
let S=loadGame();
function defaultState(){return{level:1,hp:100,maxHp:100,mp:50,maxMp:50,xp:0,bag:[],completed:[],streak:0,totalRight:0,totalWrong:0}}
function loadGame(){try{const r=localStorage.getItem('cet4_rpg');if(r)return JSON.parse(r)}catch(e){}return null}
function saveGame(){localStorage.setItem('cet4_rpg',JSON.stringify(S))}
function calcStats(){S.maxHp=100+(S.level-1)*15;S.maxMp=50+(S.level-1)*8;for(const eid of S.bag){const e=EQ[eid];if(e&&e.b){if(e.b.hp)S.maxHp+=e.b.hp;if(e.b.mp)S.maxMp+=e.b.mp}}if(S.hp>S.maxHp)S.hp=S.maxHp;if(S.mp>S.maxMp)S.mp=S.maxMp}
function updateUI(){calcStats();document.getElementById('pLevel').textContent='Lv.'+S.level;document.getElementById('hpD').textContent=Math.floor(S.hp);document.getElementById('mpD').textContent=Math.floor(S.mp);document.getElementById('xpD').textContent=Math.floor(S.xp);const nx=XP_TABLE[S.level]||(S.level*200);document.getElementById('hpB').style.width=Math.min(100,S.hp/S.maxHp*100)+'%';document.getElementById('mpB').style.width=Math.min(100,S.mp/S.maxMp*100)+'%';document.getElementById('xpB').style.width=Math.min(100,S.xp/nx*100)+'%';const d=new Date();const e=new Date(2026,5,13);document.getElementById('examCountdown').textContent=Math.max(0,Math.ceil((e-d)/86400000))}
function showScreen(id){document.querySelectorAll('.scr').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active')}
function showModal(id){document.getElementById(id).classList.add('active')}
function closeModal(id){document.getElementById(id).classList.remove('active')}
(function(){const c=document.getElementById('stars');for(let i=0;i<80;i++){const s=document.createElement('div');s.className='star';s.style.left=Math.random()*100+'%';s.style.top=Math.random()*100+'%';s.style.width=s.style.height=(0.5+Math.random()*2)+'px';s.style.setProperty('--d',(2+Math.random()*4)+'s');s.style.animationDelay=Math.random()*5+'s';c.appendChild(s)}})()
function startGame(){if(!S){S=defaultState();saveGame()}showScreen('map');renderMap();renderBag();updateUI()}
function goMenu(){showScreen('menu')}
function confirmReset(){localStorage.removeItem('cet4_rpg');S=defaultState();saveGame();closeModal('resetModal');showScreen('menu');updateUI()}
function renderMap(){const g=document.getElementById('mapGrid');g.innerHTML='';for(let i=0;i<8;i++){const c=document.createElement('div');c.className='lc';const comp=S.completed.includes(i);const avail=i===0||S.completed.includes(i-1)||S.completed.includes(i);if(comp)c.classList.add('ok');else if(avail)c.classList.add('cur');else c.classList.add('lk');c.innerHTML='<div class=\"ln\">Day '+(i+1)+'</div><div class=\"lt\">'+MT[i].n+'</div><div class=\"lz\">'+MT[i].e+'</div><div class=\"ls '+(comp?'ok':avail?'cur':'lk')+'\">'+(comp?'\u2705 \u5DF2\u901A\u5173':avail?'\u2694\uFE0F \u6311\u6218':'\uD83D\uDD12 \u672A\u89E3\u9501')+'</div>';if(avail)c.onclick=()=>enterLevel(i);g.appendChild(c)}}
function renderBag(){const g=document.getElementById('bagGrid');g.innerHTML='';for(let i=1;i<=8;i++){const c=document.createElement('div');const has=S.bag.includes(i);c.className='is'+(has?' hi':' em');if(has)c.innerHTML='<div class=\"ii\">'+EQ[i].i+'</div><div class=\"in\">'+EQ[i].n+'</div>';g.appendChild(c)}}
let B=null;
function enterLevel(day){const qs=QUESTIONS.slice(day*10,day*10+10);if(!qs.length){alert('\u9898\u76EE\u52A0\u8F7D\u5931\u8D25');return}B={day,qi:0,monster:{name:MT[day].n,emoji:MT[day].e,hp:10+day*4,maxHp:10+day*4},questions:qs,results:[],answered:false};showScreen('battle');renderBattle();updateUI()}
function renderBattle(){const s=document.getElementById('bScene');if(!B){s.innerHTML='<p>\u6218\u6597\u52A0\u8F7D\u5931\u8D25</p>';return}if(B.qi>=B.questions.length||B.monster.hp<=0){if(B.monster.hp<=0||B.qi>=B.questions.length){showLevelComplete();return}}const done=B.results.filter(r=>r!==undefined).length;document.getElementById('bLv').textContent=''+(B.day+1);document.getElementById('bMonsterName').textContent=MT[B.day].n;document.getElementById('bProg').textContent=done+'/'+B.questions.length;const m=B.monster;const mhpPct=Math.max(0,m.hp/m.maxHp*100);const q=B.questions[B.qi];let h='<div class=\"ma\"><div class=\"me\">'+m.emoji+'</div><div class=\"mn\">'+m.name+'</div><div class=\"mhb\"><div class=\"mhf\" style=\"width:'+mhpPct+'%\"></div></div><div class=\"mht\">\u2764\uFE0F '+Math.max(0,Math.floor(m.hp))+'/'+Math.floor(m.maxHp)+'</div><div class=\"mlt\">Lv.'+(B.day+1)+'</div></div>';h+='<div class=\"qh\">'+(TN[q[0]]||'\uD83D\uDCD6 \u9605\u8BFB')+'</div>';if(q[1]&&q[1].length)h+='<div class=\"qp\">'+q[1]+'</div>';h+='<div class=\"qs\">'+q[2]+'</div><div class=\"qo\">';for(let i=0;i<q[3].length;i++){const cl='qop'+(B.answered&&B.selected===i?(i===q[4]?' cr':' wr'):'')+(B.answered?' di':'');h+='<div class=\"'+cl+'\" data-opt=\"'+i+'\" onclick=\"selectOpt('+i+')\"><span class=\"ql\">'+'ABCDEFGHIJ'[i]+'</span><span>'+q[3][i]+'</span></div>'}h+='</div>';if(!B.answered){h+='<div class=\"qa\"><button class=\"purple\" id=\"confirmBtn\" disabled onclick=\"confirmAnswer()\">\u26A1 \u786E\u8BA4\u65BD\u6CD5</button></div>'}else{const cr=B.selected===q[4];h+='<div class=\"qf '+(cr?'cr':'wr')+'\">'+(cr?'\u2728 \u6CD5\u672F\u547D\u4E2D\uFF01+'+(3+B.day)+'\u4F24\u5BB3':'\uD83D\uDCA5 \u88AB\u53CD\u566C\uFF01-'+Math.max(3,5-B.day)+'HP')+'<div class=\"qe\">'+q[5]+'</div></div>';h+='<div class=\"qa\"><button class=\"gold\" onclick=\"nextQuestion()\">'+(m.hp>0&&B.qi<B.questions.length-1?'\u4E0B\u4E00\u9898 \u2192':'\u7ED3