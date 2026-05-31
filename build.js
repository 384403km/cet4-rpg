const fs = require('fs');

// Read questions data
const qRaw = fs.readFileSync('questions.js', 'utf-8');
const qStart = qRaw.indexOf('[');
const qEnd = qRaw.lastIndexOf(']') + 1;
const QDATA = qRaw.slice(qStart, qEnd);

console.log('Questions data length:', QDATA.length);

// Build complete HTML
const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
<title>四级魔法学院 - CET4 Reading RPG</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}:root{--bg:#0a0e1a;--card:#131a2e;--panel:#1a2340;--gold:#ffd700;--red:#ff4444;--blue:#4488ff;--green:#44ff88;--purple:#8844ff;--text:#e8e0d0;--dim:#8880a0;--rad:12px}
body{background:var(--bg);color:var(--text);font-family:Segoe UI,Microsoft YaHei,sans-serif;min-height:100vh;overflow-x:hidden}
body::before{content:"";position:fixed;top:0;left:0;width:100%;height:100%;background:radial-gradient(ellipse 20% 50%,rgba(100,60,180,0.08),transparent 60%),radial-gradient(ellipse 80% 50%,rgba(180,60,100,0.06),transparent 60%);pointer-events:none;z-index:0}
#stars{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden}.star{position:absolute;border-radius:50%;background:#fff;animation:tw var(--d,3s)ease infinite alternate}@keyframes tw{0%{opacity:.15}100%{opacity:.9}}.container{position:relative;z-index:1;max-width:900px;margin:0 auto;padding:10px}
.gold{background:linear-gradient(135deg,#b8960f,#ffd700);color:#1a0a2e;border:none;padding:12px 28px;border-radius:var(--rad);font-size:1rem;font-weight:700;cursor:pointer;transition:.3s}.gold:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(255,215,0,.4)}.gold:disabled{opacity:.5;cursor:default}
.purple{background:linear-gradient(135deg,#6633cc,#8844ff);color:#fff;border:none;padding:10px 22px;border-radius:var(--rad);cursor:pointer;font-weight:600;transition:.3s}.purple:hover{transform:translateY(-2px);box-shadow:0 4px 15px rgba(136,68,255,.4)}.red{background:linear-gradient(135deg,#c33,#f44);color:#fff;border:none;padding:10px 22px;border-radius:var(--rad);cursor:pointer;font-weight:600}
.back{background:none;border:1px solid rgba(255,255,255,.2);color:var(--dim);padding:8px 18px;border-radius:var(--rad);cursor:pointer;font-size:.85rem;transition:.3s}.back:hover{border-color:var(--text);color:var(--text)}
.scr{display:none}.scr.active{display:block;animation:fi .4s ease}@keyframes fi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.tit{text-align:center;padding:20px 0 8px}.tit h1{font-size:2.2rem;color:var(--gold);text-shadow:0 0 30px rgba(255,215,0,.3);letter-spacing:3px}.tit .sub{color:var(--dim);font-size:.85rem}
#bar{display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:var(--card);border-radius:var(--rad);margin-bottom:12px;border:1px solid var(--gold)}.pn{font-size:1.1rem;font-weight:700;color:var(--gold)}.pl{color:var(--dim);font-size:.8rem}.sr{display:flex;gap:12px;align-items:center;flex-wrap:wrap}.si{text-align:center;min-width:55px}.sl{font-size:.65rem;color:var(--dim)}.sv{font-size:1.2rem;font-weight:700}.sv.h{color:var(--red)}.sv.m{color:var(--blue)}.sv.x{color:var(--green)}.bc{width:100%;height:5px;background:rgba(255,255,255,.08);border-radius:3px;margin-top:2px;overflow:hidden}.bf{height:100%;border-radius:3px;transition:width .5s}.bf.h{background:linear-gradient(90deg,#c22,#f44)}.bf.m{background:linear-gradient(90deg,#24c,#48f)}.bf.x{background:linear-gradient(90deg,#2a4,#4f8)}
#menu{text-align:center;padding:50px 20px;min-height:75vh;display:none;flex-direction:column;align-items:center;justify-content:center}#menu.active{display:flex}
#menu .lg{font-size:4rem;margin-bottom:8px;animation:fl 3s ease-in-out infinite}@keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
#menu h2{font-size:1.2rem;color:var(--dim);font-weight:400;margin-bottom:30px}.mb{display:flex;flex-direction:column;gap:12px;width:260px}.mb .gold{width:100%}
.mh{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.mh h2{font-size:1.3rem}.mg{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px}@media(max-width:480px){.mg{grid-template-columns:repeat(2,1fr)}}
.lc{background:var(--card);border:1px solid rgba(255,255,255,.08);border-radius:var(--rad);padding:14px;text-align:center;cursor:pointer;transition:.3s}.lc:hover{transform:translateY(-3px)}.lc.lk{opacity:.4;cursor:default}.lc.lk:hover{transform:none}.lc.ok{border-color:var(--green);box-shadow:0 0 12px rgba(68,255,136,.15)}.lc.cur{border-color:var(--gold);box-shadow:0 0 12px rgba(255,215,0,.2)}
.ln{font-size:1.8rem;font-weight:700;color:var(--gold)}.lt{font-size:.75rem;color:var(--dim)}.ls{font-size:.65rem;padding:2px 6px;border-radius:4px;display:inline-block}.ls.ok{color:var(--green)}.ls.cur{color:var(--gold)}.ls.lk{color:var(--dim)}.lz{font-size:.65rem;background:rgba(136,68,255,.2);color:var(--purple);padding:2px 8px;border-radius:4px;display:inline-block;margin-top:4px}
.ip{background:var(--card);border-radius:var(--rad);padding:14px;margin-bottom:10px}.ip h3{color:var(--gold);margin-bottom:10px;font-size:1rem}.ig{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}@media(max-width:500px){.ig{grid-template-columns:repeat(4,1fr)}}
.is{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:8px;padding:6px;text-align:center;min-height:50px;display:flex;flex-direction:column;align-items:center;justify-content:center}.is.hi{border-color:rgba(255,215,0,.2)}.is .ii{font-size:1.3rem}.is .in{font-size:.6rem;color:var(--dim)}.is.em{opacity:.3}.is.em::after{content:"\\2014";color:var(--dim)}
.bt{display:flex;justify-content:space-between;align-items:center;background:var(--card);border-radius:var(--rad);padding:10px 16px;margin-bottom:10px}.bt .bl{color:var(--dim);font-size:.8rem}.bt .bp{color:var(--gold);font-size:.85rem}.bs{background:var(--panel);border-radius:var(--rad);padding:18px;margin-bottom:10px;min-height:300px}
.ma{text-align:center;padding:10px 0 14px;border-bottom:1px solid rgba(255,255,255,.06);margin-bottom:14px}.me{font-size:2.8rem;line-height:1}.mn{font-size:1.05rem;font-weight:700;color:var(--red)}.mhb{width:180px;height:7px;background:rgba(255,255,255,.08);border-radius:4px;margin:6px auto;overflow:hidden}.mhf{height:100%;background:linear-gradient(90deg,#c22,#f44);border-radius:4px;transition:width .4s}.mht{font-size:.75rem;color:var(--dim)}.mlt{font-size:.65rem;background:rgba(255,68,68,.12);color:var(--red);padding:2px 8px;border-radius:4px;display:inline-block;margin-top:3px}
.rw{text-align:center;padding:18px;background:linear-gradient(135deg,rgba(255,215,0,.05),rgba(255,215,0,.1));border-radius:var(--rad);margin-bottom:10px;border:1px solid rgba(255,215,0,.2)}.rw h3{color:var(--gold);margin-bottom:6px;font-size:1.1rem}.rw p{font-size:.9rem;line-height:1.5;margin-bottom:10px}.ri{display:flex;gap:14px;justify-content:center;margin:10px 0;flex-wrap:wrap}.rw-item{background:var(--card);border-radius:8px;padding:8px 14px;border:1px solid rgba(255,215,0,.12);text-align:center;min-width:70px}.rw-item .ri-i{font-size:1.3rem}.rw-item .ri-l{font-size:.65rem;color:var(--dim)}.rw-item .ri-v{font-size:.9rem;font-weight:700;color:var(--gold)}
.qh{font-size:.7rem;background:rgba(136,68,255,.15);color:var(--purple);padding:2px 8px;border-radius:4px;display:inline-block;margin-bottom:8px}.qp{background:rgba(0,0,0,.2);border-radius:8px;padding:10px 14px;margin-bottom:10px;font-size:.85rem;line-height:1.6;color:var(--dim);max-height:180px;overflow-y:auto}.qs{font-size:1rem;font-weight:600;margin-bottom:10px;line-height:1.4}.qo{display:flex;flex-direction:column;gap:7px}.qop{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:9px 12px;cursor:pointer;transition:.2s;display:flex;align-items:flex-start;gap:6px;font-size:.9rem}.qop:hover{background:rgba(255,255,255,.05)}.qop .ql{font-weight:700;color:var(--gold);min-width:18px;flex-shrink:0}.qop.sel{background:rgba(255,215,0,.08);border-color:var(--gold)}.qop.cr{background:rgba(68,255,136,.08);border-color:var(--green)}.qop.wr{background:rgba(255,68,68,.08);border-color:var(--red)}.qop.di{cursor:default;pointer-events:none}.qa{margin-top:12px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap}.qf{margin-top:12px;padding:10px;border-radius:8px;text-align:center;font-size:.9rem;line-height:1.4}.qf.cr{background:rgba(68,255,136,.06);border:1px solid rgba(68,255,136,.15);color:var(--green)}.qf.wr{background:rgba(255,68,68,.06);border:1px solid rgba(255,68,68,.15);color:var(--red)}.qf .qe{color:var(--dim);font-size:.8rem;margin-top:4px}
.rs{text-align:center;padding:25px}.rs h2{font-size:1.5rem;margin-bottom:12px}.rs .rd{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:20px}@media(max-width:480px){.rs .rd{grid-template-columns:1fr}}.rs .rst{background:var(--card);border-radius:8px;padding:10px}.rs .rst .rv{font-size:1.4rem;font-weight:700}.rs .rst .rl{font-size:.7rem;color:var(--dim);margin-top:3px}.rr{font-size:1.1rem;margin-bottom:16px;padding:10px;border-radius:8px}.rr.S{color:var(--gold);text-shadow:0 0 20px rgba(255,215,0,.5)}.rr.A{color:var(--green)}.rr.B{color:var(--blue)}.rr.C{color:var(--dim)}.rr.D{color:var(--red)}
.modal{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.6);backdrop-filter:blur(3px);z-index:200;display:none;align-items:center;justify-content:center}.modal.active{display:flex}.mbox{background:var(--panel);border:1px solid rgba(255,215,0,.3);border-radius:var(--rad);padding:22px;max-width:420px;width:90%;max-height:80vh;overflow-y:auto}.mbox h3{color:var(--gold);margin-bottom:8px;text-align:center}.mbox p{color:var(--dim);font-size:.85rem;line-height:1.5;margin-bottom:10px}.ma2{display:flex;gap:8px;justify-content:center;margin-top:14px}.lcp{background:linear-gradient(135deg,rgba(255,215,0,.1),rgba(136,68,255,.1));border:1px solid rgba(255,215,0,.3);border-radius:var(--rad);padding:18px;text-align:center;margin-bottom:10px}.lcp h3{color:var(--gold);font-size:1.2rem;margin-bottom:6px}.lcp .ld{color:var(--dim);font-size:.85rem;line-height:1.5}.combo{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-size:2.8rem;font-weight:700;z-index:50;pointer-events:none;animation:cb 1s ease-out;text-shadow:0 0 20px rgba(255,215,0,.5)}@keyframes cb{0%{opacity:1;transform:translate(-50%,-50%)scale(.5)}40%{opacity:1;transform:translate(-50%,-50%)scale(1.2)}100%{opacity:0;transform:translate(-50%,-70%)scale(1)}}.flsh{position:fixed;top:0;left:0;width:100%;height:100%;z-index:80;pointer-events:none;animation:fla .6s ease-out}@keyframes fla{0%{background:radial-gradient(circle,rgba(136,68,255,.35),transparent 60%)}100%{background:transparent}}
</style></head><body>
<div id="stars"></div>
<div class="modal" id="resetModal"><div class="mbox"><h3>\u{1F52E} 重置命运</h3><p>确定要重置所有进度吗？</p><p style="color:var(--red)">不可撤销</p><div class="ma2"><button class="purple" onclick="closeModal('resetModal')">取消</button><button class="red" onclick="confirmReset()">确认重置</button></div></div></div>
<div class="modal" id="aboutModal"><div class="mbox"><h3>\u{1F4D6} 四级魔法学院</h3><p>答对=攻击怪物，答错=自己扣血。<br>每题都有详细解析！</p><div class="ma2"><button class="purple" onclick="closeModal('aboutModal')">知道了</button></div></div></div>
<div class="container">
<div class="tit"><h1>\u{1F3F0} 四级魔法学院</h1><div class="sub">CET-4 Reading RPG \u00B7 考前 <span id="examCountdown">14</span> 天</div></div>
<div id="bar"><div><div class="pn" id="pName">\u{1F9D9} 魔法学徒</div><div class="pl" id="pLevel">Lv.1</div></div>
<div class="sr"><div class="si"><div class="sl">HP</div><div class="sv h" id="hpD">100</div><div class="bc"><div class="bf h" id="hpB" style="width:100%"></div></div></div>
<div class="si"><div class="sl">MP</div><div class="sv m" id="mpD">50</div><div class="bc"><div class="bf m" id="mpB" style="width:50%"></div></div></div>
<div class="si"><div class="sl">XP</div><div class="sv x" id="xpD">0</div><div class="bc"><div class="bf x" id="xpB" style="width:0%"></div></div></div></div></div>
<div class="scr active" id="menu"><div class="lg">\u{1F9D9}</div><h2>踏上收集四级水晶的魔法之旅</h2>
<div class="mb"><button class="gold" onclick="startGame()">\u2694\uFE0F 开始冒险</button>
<button class="purple" onclick="showModal('aboutModal')">\u{1F4D6} 说明</button>
<button class="red" onclick="showModal('resetModal')" style="opacity:.5">\u{1F5D1}\uFE0F 重置</button></div></div>
<div class="scr" id="map"><div class="mh"><h2>\u{1F5FA}\uFE0F 魔法大陆</h2><button class="back" onclick="goMenu()">\u2190 返回</button></div>
<div class="mg" id="mapGrid"></div><div class="ip"><h3>背包</h3><div class="ig" id="bagGrid"></div></div></div>
<div class="scr" id="battle"><div class="bt"><div><span class="bl">Day <span id="bLv">1</span> \u00B7 <span id="bMonsterName">怪物</span></span><br><span class="bp">进度: <span id="bProg">0/0</span></span></div>
<button class="back" onclick="flee()">撤退</button></div><div class="bs" id="bScene"></div></div>
<div class="scr" id="result"><div class="rs" id="rContent"></div></div></div>
<script>
const QUESTIONS = ${QDATA};

const BASE_HP=100,BASE_MP=50,HP_PER_LV=15,MP_PER_LV=8;
const XP_TABLE=[0,80,160,280,400,550,700,900,1100,1400,2000];
const EQ={1:{n:"木法杖",i:"\\u{1FA84}",b:{mp:5}},2:{n:"铜纹戒指",i:"\\u{1F48D}",b:{hp:10}},3:{n:"知识长袍",i:"\\u{1F458}",b:{xp:0.1}},4:{n:"水晶护符",i:"\\u{1F4FF}",b:{mp:10}},5:{n:"银辉魔杖",i:"\\u2728",b:{atk:2}},6:{n:"符文石板",i:"\\u{1F4DC}",b:{xp:0.15}},7:{n:"秘法眼镜",i:"\\u{1F453}",b:{atk:3}},8:{n:"龙鳞法袍",i:"\\u{1F9E5}",b:{hp:25}}};
const MT=[{n:"词汇史莱姆",e:"\\u{1F7E2}"},{n:"语法哥布林",e:"\\u{1F47A}"},{n:"阅读石像鬼",e:"\\u{1F5FF}"},{n:"段落蛇妖",e:"\\u{1F40D}"},{n:"理解幽灵",e:"\\u{1F47B}"},{n:"逻辑恶魔",e:"\\u{1F47F}"},{n:"翻译巫师",e:"\\u{1F9D9}"},{n:"四级巨龙",e:"\\u{1F409}"}];
const TN={V:"词汇",R:"仔细阅读",M:"段落匹配"};

let S=loadGame();
function defaultState(){return{level:1,hp:100,maxHp:100,mp:50,maxMp:50,xp:0,bag:[],completed:[],streak:0,totalRight:0,totalWrong:0}}
function loadGame(){try{const r=localStorage.getItem("cet4_rpg");if(r)return JSON.parse(r)}catch(e){}return null}
function saveGame(){localStorage.setItem("cet4_rpg",JSON.stringify(S))}
function calcStats(){S.maxHp=100+(S.level-1)*15;S.maxMp=50+(S.level-1)*8;for(const eid of S.bag){const e=EQ[eid];if(e&&e.b){if(e.b.hp)S.maxHp+=e.b.hp;if(e.b.mp)S.maxMp+=e.b.mp}}if(S.hp>S.maxHp)S.hp=S.maxHp;if(S.mp>S.maxMp)S.mp=S.maxMp}
function updateUI(){calcStats();document.getElementById("pLevel").textContent="Lv."+S.level;document.getElementById("hpD").textContent=Math.floor(S.hp);document.getElementById("mpD").textContent=Math.floor(S.mp);document.getElementById("xpD").textContent=Math.floor(S.xp);const nx=XP_TABLE[S.level]||(S.level*200);document.getElementById("hpB").style.width=Math.min(100,S.hp/S.maxHp*100)+"%";document.getElementById("mpB").style.width=Math.min(100,S.mp/S.maxMp*100)+"%";document.getElementById("xpB").style.width=Math.min(100,S.xp/nx*100)+"%";const d=new Date();const e=new Date(2026,5,13);document.getElementById("examCountdown").textContent=Math.max(0,Math.ceil((e-d)/86400000))}
function showScreen(id){document.querySelectorAll(".scr").forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active")}
function showModal(id){document.getElementById(id).classList.add("active")}
function closeModal(id){document.getElementById(id).classList.remove("active")}
(function(){const c=document.getElementById("stars");for(let i=0;i<80;i++){const s=document.createElement("div");s.className="star";s.style.left=Math.random()*100+"%";s.style.top=Math.random()*100+"%";s.style.width=s.style.height=(0.5+Math.random()*2)+"px";s.style.setProperty("--d",(2+Math.random()*4)+"s");s.style.animationDelay=Math.random()*5+"s";c.appendChild(s)}})()
function startGame(){if(!S){S=defaultState();saveGame()}showScreen("map");renderMap();renderBag();updateUI()}
function goMenu(){showScreen("menu")}
function confirmReset(){localStorage.removeItem("cet4_rpg");S=defaultState();saveGame();closeModal("resetModal");showScreen("menu");updateUI()}
function renderMap(){const g=document.getElementById("mapGrid");g.innerHTML="";for(let i=0;i<8;i++){const c=document.createElement("div");c.className="lc";const comp=S.completed.includes(i);const avail=i===0||S.completed.includes(i-1)||S.completed.includes(i);if(comp)c.classList.add("ok");else if(avail)c.classList.add("cur");else c.classList.add("lk");c.innerHTML='<div class="ln">Day '+(i+1)+'</div><div class="lt">'+MT[i].n+'</div><div class="lz">'+MT[i].e+'</div><div class="ls '+(comp?"ok":avail?"cur":"lk")+'">'+(comp?"\\u2705":avail?"\\u2694\\ufe0f":"\\u{1F512}")+'</div>';if(avail)c.onclick=()=>enterLevel(i);g.appendChild(c)}}
function renderBag(){const g=document.getElementById("bagGrid");g.innerHTML="";for(let i=1;i<=8;i++){const c=document.createElement("div");const has=S.bag.includes(i);c.className="is"+(has?" hi":" em");if(has)c.innerHTML='<div class="ii">'+EQ[i].i+'</div><div class="in">'+EQ[i].n+'</div>';g.appendChild(c)}}
let B=null;
function enterLevel(day){const qs=QUESTIONS.slice(day*10,day*10+10);if(!qs.length){alert("fail");return}B={day,qi:0,monster:{name:MT[day].n,emoji:MT[day].e,hp:10+day*4,maxHp:10+day*4},questions:qs,results:[],answered:false};showScreen("battle");renderBattle();updateUI()}
function renderBattle(){const s=document.getElementById("bScene");if(!B)return;if(B.qi>=B.questions.length||B.monster.hp<=0){showLevelComplete();return}const done=B.results.filter(r=>r!==undefined).length;document.getElementById("bLv").textContent=""+(B.day+1);document.getElementById("bMonsterName").textContent=MT[B.day].n;document.getElementById("bProg").textContent=done+"/"+B.questions.length;const m=B.monster;const mhp=Math.max(0,m.hp/m.maxHp*100);const q=B.questions[B.qi];let h='<div class="ma"><div class="me">'+m.emoji+'</div><div class="mn">'+m.name+'</div><div class="mhb"><div class="mhf" style="width:'+mhp+'%"></div></div><div class="mht">'+Math.max(0,Math.floor(m.hp))+'/'+Math.floor(m.maxHp)+'</div><div class="mlt">Lv.'+(B.day+1)+'</div></div>';h+='<div class="qh">'+(TN[q[0]]||"??")+'</div>';if(q[1])h+='<div class="qp">'+q[1]+'</div>';h+='<div class="qs">'+q[2]+'</div><div class="qo">';for(let i=0;i<q[3].length;i++){const c="qop"+(B.answered&&B.selected===i?(i===q[4]?" cr":" wr"):"")+(B.answered?" di":"");h+='<div class="'+c+'" data-opt="'+i+'" onclick="selectOpt('+i+')"><span class="ql">'+"ABCDEFGHIJ"[i]+'</span><span>'+q[3][i]+'</span></div>'}h+='</div>';if(!B.answered){h+='<div class="qa"><button class="purple" id="confirmBtn" disabled onclick="confirmAnswer()">提交</button></div>'}else{const ok=B.selected===q[4];h+='<div class="qf '+(ok?"cr":"wr")+'">'+(ok?"\\u2714 +"+(3+B.day)+"伤害":"\\u2718 -"+Math.max(3,5-B.day)+"HP")+'<div class="qe">'+q[5]+'</div></div>';h+='<div class="qa"><button class="gold" onclick="nextQuestion()">'+(m.hp>0&&B.qi<B.questions.length-1?"下一题":"结算")+'</button></div>'}s.innerHTML=h;updateUI()}
function selectOpt(i){if(B.answered)return;B.selected=i;document.querySelectorAll(".qop").forEach(el=>{el.classList.toggle("sel",parseInt(el.dataset.opt)===i)});document.getElementById("confirmBtn").disabled=false}
function confirmAnswer(){if(B.answered||B.selected===undefined)return;B.answered=true;const q=B.questions[B.qi],ok=B.selected===q[4];B.results[B.qi]=ok;if(ok){S.totalRight++;S.streak++;B.monster.hp-=(3+B.day+Math.min(S.streak,5));S.xp+=8+B.day*2;checkLevelUp()}else{S.totalWrong++;S.streak=0;S.hp=Math.max(0,S.hp-Math.max(3,5-B.day));if(S.hp<=0){S.hp=Math.floor(S.maxHp*0.4);saveGame();showGameOver();return}}if(B.monster.hp<=0){B.monster.hp=0;saveGame();renderBattle();return}saveGame();renderBattle()}
function nextQuestion(){if(B.monster.hp<=0||B.qi+1>=B.questions.length){showLevelComplete();return}B.qi++;B.answered=false;B.selected=undefined;renderBattle()}
function showLevelComplete(){const c=B.results.filter(r=>r===true).length,t=B.results.length,p=t>0?Math.round(c/t*100):0;if(!S.completed.includes(B.day))S.completed.push(B.day);const eq=B.day+1;if(!S.bag.includes(eq))S.bag.push(eq);S.xp+=30+B.day*10;checkLevelUp();saveGame();const rt=p>=90?"S":p>=75?"A":p>=60?"B":"C";const txt={S:"\\u2728 完美!",A:"\\u2B50 优秀!",B:"\\u{1F44D} 不错!","C":"\\u{1F4AA} 加油!"};let h='<div class="lcp"><h3>Day '+(B.day+1)+' 通关!</h3><div class="ld">正确 '+c+'/'+t+' ('+p+'%) 评级 '+rt+'</div><div class="rr '+rt+'">'+txt[rt]+'</div></div>';h+='<div class="qa"><button class="gold" onclick="afterBattle()">返回</button></div>';document.getElementById("bScene").innerHTML=h;updateUI()}
function showGameOver(){document.getElementById("bScene").innerHTML='<div class="rw"><h3>\u{1F480} 体力耗尽</h3><p>已恢复40%</p></div><div class="qa"><button class="gold" onclick="afterBattle()">返回</button></div>'}
function afterBattle(){B=null;showScreen("map");renderMap();renderBag();updateUI()}
function flee(){if(confirm("撤退?")){B=null;saveGame();afterBattle()}}
function checkLevelUp(){let nx=XP_TABLE[S.level]||(S.level*200);while(S.xp>=nx&&S.level<10){S.xp-=nx;S.level++;S.hp=Math.min(S.hp+HP_PER_LV,S.maxHp+HP_PER_LV);S.mp=Math.min(S.mp+MP_PER_LV,S.maxMp+MP_PER_LV);nx=XP_TABLE[S.level]||(S.level*200)}}
function showCombo(t){const e=document.createElement("div");e.className="combo";e.textContent=t;document.body.appendChild(e);setTimeout(()=>e.remove(),1200)}
updateUI();
<\/script>
</body>
</html>`;

fs.writeFileSync('index.html', html, 'utf-8');
const stats = fs.statSync('index.html');
console.log('Written index.html:', stats.size, 'bytes');

// Verify
const written = fs.readFileSync('index.html', 'utf-8');
const scriptOpen = (written.match(/<script>/g) || []).length;
const scriptClose = (written.match(/<\/script>/g) || []).length;
console.log('Script tags:', scriptOpen, 'open,', scriptClose, 'close');
console.log('Has QUESTIONS:', written.includes('const QUESTIONS'));
console.log('Has /html:', written.includes('</html>'));
