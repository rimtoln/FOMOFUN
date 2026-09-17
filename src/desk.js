(function(){
  var stage=document.getElementById('stage');
  function fit(){stage.style.transform='scale('+Math.min(innerWidth/1920,innerHeight/1080)+')';}
  addEventListener('resize',fit);fit();

  var hue=160;
  function paintHue(){
    hue=(hue+0.22)%360;
    var acc='hsl('+hue+' 90% 62%)';
    var acc2='hsl('+hue+' 80% 48%)';
    var root=document.documentElement.style;
    root.setProperty('--h', hue);
    root.setProperty('--accent', acc);
    root.setProperty('--accent2', acc2);
    root.setProperty('--glow', 'hsla('+hue+',90%,50%,.22)');
    root.setProperty('--ink', 'hsl('+hue+' 28% 88%)');
    root.setProperty('--mute', 'hsl('+hue+' 12% 48%)');
    root.setProperty('--border', 'hsl('+hue+' 28% 22%)');
  }

  var WHALES=[
    {n:'UNIPCS', pnl:'$11.8M', bag:'BONK', clone:'$UNIPCS'},
    {n:'DCRAYON', pnl:'$8.8M', bag:'WIF', clone:'$DCRAYON'},
    {n:'SALEM', pnl:'$6.3M', bag:'POPCAT', clone:'$SALEM'},
    {n:'NATE', pnl:'$4.9M', bag:'MEW', clone:'$NATE'},
    {n:'BURGZ', pnl:'$4.4M', bag:'PNUT', clone:'$BURGZ'},
    {n:'AJC', pnl:'$4.0M', bag:'FARTCOIN', clone:'$AJC'}
  ];
  var wbox=document.getElementById('whales');
  WHALES.forEach(function(w){
    var d=document.createElement('div');d.className='whale';
    d.innerHTML='<i></i><span>'+w.n+'</span><small>bought '+w.bag+'</small><b>'+w.clone+'</b>';
    wbox.appendChild(d);
  });

  var AGENTS=[
    {n:'HUNTER',j:'WATCH'},
    {n:'MIDAS',j:'SIZE'},
    {n:'FORGE',j:'MINT'},
    {n:'MERCURY',j:'C1 BUY'},
    {n:'CERBERUS',j:'NO BAG'}
  ];
  var abox=document.getElementById('agents');
  AGENTS.forEach(function(a,i){
    var d=document.createElement('div');d.className='agent';
    d.innerHTML='<i style="animation-delay:-'+(i*.12)+'s"></i><span>'+a.n+'</span><small>'+a.j+'</small><div class="load"><em style="animation-delay:-'+(i*.2)+'s"></em></div>';
    abox.appendChild(d);
  });

  var L1=[
    'HUNTER UNIPCS print on fomo.family · BONK',
    'FORGE mint $UNIPCS on pump.fun · curve 3%',
    'MERCURY first candle BUY · skip their bag',
    'MIDAS SALEM flipped POPCAT · clone $SALEM',
    'CERBERUS reject copy-the-bag · clone only',
    'HUNTER NATE wallet hot · MEW',
    'FORGE $NATE live · first tick',
    'MERCURY hype coin still cooking · we already in',
    'MIDAS BURGZ size 4.4M pnl · mint $BURGZ',
    'HUNTER AJC FARTCOIN print · clone ready'
  ];
  var L2=[
    'FILL $UNIPCS c1 +41% TP',
    'HOLD $SALEM 12s then cut +19%',
    'FILL $NATE c1 +27% before timeline',
    'SKIP BONK bag · late',
    'FILL $BURGZ +33% · copycats still naming it',
    'TP $AJC +22% · curve 11%',
    'MISS $DCRAYON · CERBERUS gate thin book',
    'FILL $UNIPCS reprint +18%',
    'PAPER only · no keys on this desk',
    'LAG to hype mint 41s · we already out'
  ];
  function fillLog(el,rows,seed){
    el.innerHTML='';
    for(var i=0;i<14;i++){
      var p=document.createElement('p');
      var t=new Date(Date.now()-(14-i)*700);
      var hh=('0'+t.getHours()).slice(-2)+':'+('0'+t.getMinutes()).slice(-2)+':'+('0'+t.getSeconds()).slice(-2);
      var line=rows[(i+seed)%rows.length];
      var who=line.split(' ')[0];
      p.innerHTML='<time>'+hh+'</time><b>'+who+'</b> '+line.replace(who,'').trim();
      el.appendChild(p);
    }
    var cur=document.createElement('p');cur.innerHTML='<time>--</time><b>_</b> <i class="cursor"></i>';el.appendChild(cur);
  }
  var s1=0,s2=4,log1=document.getElementById('log1'),log2=document.getElementById('log2');
  fillLog(log1,L1,s1);fillLog(log2,L2,s2);
  setInterval(function(){s1++;fillLog(log1,L1,s1);},700);
  setInterval(function(){s2++;fillLog(log2,L2,s2);},820);

  var clones=12;
  setInterval(function(){
    clones+=1;
    document.getElementById('cloneChip').textContent='CLONES '+('0'+clones).slice(-2);
    document.getElementById('lagChip').textContent='LAG '+(0.3+Math.random()*0.6).toFixed(1)+'s';
    document.getElementById('stTp').textContent='+'+(24+Math.floor(Math.random()*28))+'%';
    document.getElementById('stLag').textContent=(28+Math.floor(Math.random()*24))+'s';
    document.getElementById('stHit').textContent=(64+Math.floor(Math.random()*14))+'%';
    document.getElementById('modeChip').textContent=Math.random()>.45?'LIVE COPY':'C1 BUY';
  },1600);

  var news='  ·  FOMOFUN  ·  FOMO.FAMILY TOP WALLETS  ·  DO NOT BUY THEIR BAG  ·  MINT THE PUMP.FUN CLONE UNDER THEIR NAME  ·  FIRST CANDLE  ·  TP BEFORE THE HYPE TOKEN EXISTS  ·  UNIPCS $11.8M → $UNIPCS  ·  SALEM $6.3M → $SALEM  ·  NATE $4.9M → $NATE  ·  PAPER DESK  ·  ';
  document.getElementById('ticker').innerHTML='<span>'+news+'</span><span>'+news+'</span>';

  var clk=document.getElementById('clock');
  setInterval(function(){
    var d=new Date();
    clk.textContent=('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2)+':'+('0'+d.getSeconds()).slice(-2);
  },250);

  var bars=document.getElementById('bars');
  for(var i=0;i<18;i++){
    var b=document.createElement('i');
    b.style.height=(30+Math.random()*70)+'%';
    b.style.animationDelay=(-i*.07)+'s';
    bars.appendChild(b);
  }

  function drawCandles(cv,hist,upHex,slots){
    var cx=cv.getContext('2d');
    var w=cv.width,h=cv.height;
    cx.clearRect(0,0,w,h);
    if(!hist.length) return;
    var min=Math.min.apply(null,hist.map(function(x){return x.l;}));
    var max=Math.max.apply(null,hist.map(function(x){return x.h;}));
    var pad=Math.max((max-min)*0.45, 0.18);
    min-=pad; max+=pad;
    var span=max-min;
    var n=slots||46;
    var bw=Math.max(3,(w-10)/n-2);
    var start=n-hist.length;
    hist.forEach(function(c,i){
      var x=6+(start+i)*(bw+2);
      var y=function(v){return 6+((max-v)/span)*(h-12);};
      var up=c.c>=c.o;
      cx.strokeStyle=up?upHex:'#ff6259';
      cx.fillStyle=cx.strokeStyle;
      cx.beginPath();cx.moveTo(x+bw/2,y(c.h));cx.lineTo(x+bw/2,y(c.l));cx.stroke();
      var top=y(Math.max(c.o,c.c)), bot=y(Math.min(c.o,c.c));
      cx.fillRect(x,Math.min(top,bot),bw,Math.max(1,Math.abs(bot-top)));
    });
  }
  var price=1, hist=[], spark=[];
  function tickBook(){
    var o=price, c=price+(Math.random()-.46)*0.08; price=Math.max(0.2,c);
    var row={o:o,c:c,h:Math.max(o,c)+Math.random()*0.04,l:Math.min(o,c)-Math.random()*0.04};
    hist.push(row); spark.push(row);
    if(hist.length>46) hist.shift();
    if(spark.length>38) spark.shift();
    var acc=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#7effe6';
    drawCandles(document.getElementById('candles'), hist, acc, 46);
    drawCandles(document.getElementById('spark'), spark, acc, 38);
  }
  setInterval(tickBook,420);
  for(var k=0;k<40;k++) tickBook();

  var core=document.getElementById('core');
  var cctx=core.getContext('2d');
  var parts=[];
  function resetParts(){
    parts=[];
    var n=2200;
    for(var i=0;i<n;i++){
      var r=Math.pow(Math.random(),0.72)*0.96;
      if(i<700) r=Math.pow(Math.random(),1.6)*0.28;
      parts.push({
        a:Math.random()*Math.PI*2,
        r:r,
        s:0.0004+Math.random()*0.0018,
        spin:(Math.random()-.5)*0.004,
        z:0.4+Math.random()*1.4,
        tw:Math.random()*Math.PI*2
      });
    }
  }
  resetParts();
  function drawCore(){
    var w=core.width,h=core.height;
    var cx=w/2, cy=h/2-10;
    var max=Math.min(w,h)*0.42;
    cctx.fillStyle='#020405';
    cctx.fillRect(0,0,w,h);
    var g=cctx.createRadialGradient(cx,cy,8,cx,cy,max*1.35);
    g.addColorStop(0,'hsla('+hue+',90%,48%,.55)');
    g.addColorStop(0.22,'hsla('+hue+',80%,38%,.28)');
    g.addColorStop(0.55,'hsla('+hue+',70%,18%,.08)');
    g.addColorStop(1,'rgba(2,4,5,0)');
    cctx.fillStyle=g;
    cctx.beginPath();cctx.arc(cx,cy,max*1.35,0,Math.PI*2);cctx.fill();
    for(var i=0;i<parts.length;i++){
      var p=parts[i];
      p.a+=p.spin;
      p.r+=p.s;
      if(p.r>1){p.r=Math.random()*0.12;p.a=Math.random()*Math.PI*2;}
      p.tw+=0.05;
      var dens=1-p.r;
      var x=cx+Math.cos(p.a)*p.r*max*(0.85+0.2*Math.sin(p.tw));
      var y=cy+Math.sin(p.a)*p.r*max*(0.85+0.2*Math.cos(p.tw*0.7));
      var a=0.15+dens*0.85;
      var sz=(p.r<0.18?1.8:0.7)*p.z*(0.7+0.3*Math.sin(p.tw));
      cctx.fillStyle='hsla('+hue+',95%,'+(60+dens*20)+'%,'+a+')';
      cctx.fillRect(x,y,sz,sz);
    }
  }

  function loop(){
    paintHue();
    drawCore();
    requestAnimationFrame(loop);
  }
  loop();
})();
