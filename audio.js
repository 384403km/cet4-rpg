// 🎵 Audio system for CET4 domain vocab game
(function(){
  const AS = {
    ctx: null, bgGain: null, sfxGain: null,
    playing: false, _timer: null, _initd: false,
    init(){
      if(this._initd) return;
      try {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        const mg = this.ctx.createGain();
        mg.gain.value = 0.25;
        mg.connect(this.ctx.destination);
        this.bgGain = this.ctx.createGain();
        this.bgGain.gain.value = 0.3;
        this.bgGain.connect(mg);
        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.value = 0.5;
        this.sfxGain.connect(mg);
        this._initd = true;
      } catch(e){}
    },
    note(freq, dur, type, delay){
      if(!this.ctx) return;
      const t = this.ctx.currentTime + (delay||0);
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = type||'sine';
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.001, t);
      g.gain.exponentialRampToValueAtTime(0.3, t+0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t+dur);
      o.connect(g);
      g.connect(this.sfxGain);
      o.start(t); o.stop(t+dur);
    },
    sfx(type){
      switch(type){
        case 'flip': this.note(880,0.06,'sine',0); this.note(1100,0.05,'sine',0.03); break;
        case 'correct': this.note(523,0.12,'sine',0); this.note(659,0.12,'sine',0.1); this.note(784,0.2,'sine',0.2); break;
        case 'wrong': this.note(300,0.15,'sawtooth',0); this.note(250,0.2,'sawtooth',0.12); break;
        case 'master': this.note(587,0.1,'sine',0); this.note(740,0.1,'sine',0.08); this.note(880,0.3,'sine',0.16); break;
        case 'enter': this.note(440,0.08,'triangle',0); this.note(660,0.1,'triangle',0.06); break;
      }
    },
    melodies: {
      df: {n:[110,110,146,110,110,110,110,146,110,110,110],d:[0.4,0.15,0.4,0.15,0.15,0.15,0.3,0.4,0.15,0.4,0.8],t:'sawtooth'},
      fgo: {n:[392,440,523,659,784,659,523,440],d:[0.3,0.3,0.3,0.3,0.4,0.2,0.2,0.6],t:'sine'},
      dev: {n:[220,0,220,0,261,0,220,0,293,0,261,0],d:[0.15,0.1,0.15,0.1,0.15,0.1,0.15,0.1,0.15,0.1,0.15,0.3],t:'square'},
      mys: {n:[196,261,330,392,330,261,196,330],d:[0.5,0.3,0.3,0.5,0.3,0.3,0.5,0.8],t:'triangle'},
      gl: {n:[523,659,784,659,784,880,784,659,523],d:[0.3,0.2,0.3,0.2,0.3,0.4,0.2,0.2,0.6],t:'sine'},
      bio: {n:[262,294,330,349,392,349,330,294],d:[0.4,0.3,0.3,0.3,0.5,0.3,0.3,0.6],t:'triangle'}
    },
    playBg(theme){
      this.stopBg();
      if(!this.ctx || !this.playing) return;
      const mel = this.melodies[theme];
      if(!mel) return;
      let idx = 0;
      const loop = () => {
        if(!this.playing || !this.ctx) { this.stopBg(); return; }
        const freq = mel.n[idx];
        const dur = mel.d[idx];
        if(freq > 0) {
          const t = this.ctx.currentTime;
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          o.type = mel.t;
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.001, t);
          g.gain.exponentialRampToValueAtTime(0.12, t+0.02);
          g.gain.exponentialRampToValueAtTime(0.001, t+dur);
          o.connect(g); g.connect(this.bgGain);
          o.start(t); o.stop(t+dur);
        }
        idx = (idx + 1) % mel.n.length;
        this._timer = setTimeout(loop, (dur||0.3)*1000*1.1);
      };
      loop();
    },
    stopBg(){ if(this._timer) { clearTimeout(this._timer); this._timer = null; } },
    toggle(){
      this.init();
      this.playing = !this.playing;
      const btn = document.getElementById('musicBtn');
      if(this.playing) {
        btn.innerHTML = '&#x1F3B5; 音乐';
        btn.style.color = 'var(--text)';
        if(typeof currentDeck !== 'undefined' && currentDeck) this.playBg(window.VOCAB_DATA[currentDeck].theme);
      } else {
        btn.innerHTML = '&#x1F507; 音乐';
        btn.style.color = 'var(--text2)';
        this.stopBg();
      }
    }
  };
  window.AudioSys = AS;
})();
