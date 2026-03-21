// CSS enjekte et
var spwStyle = document.createElement('style');
spwStyle.innerHTML = `
#spw {
  position: fixed;
  bottom: 70px;
  right: 16px;
  z-index: 99999;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(.36,1.3,.64,1);
}
#spw.spw-on { opacity:1; transform:translateY(0); }
#spw-box {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 34px 11px 14px;
  border-radius: 50px;
  background: linear-gradient(135deg, #E91E8C, #FF5722);
  box-shadow: 0 6px 28px rgba(233,30,140,0.35), 0 2px 8px rgba(0,0,0,0.12);
  min-width: 220px;
  max-width: calc(100vw - 32px);
  overflow: hidden;
  cursor: default;
  user-select: none;
}
#spw-box::before {
  content: '';
  position: absolute;
  top: 0; left: -60%;
  width: 40%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
  animation: spw-shine 3.5s ease-in-out infinite;
}
#spw-icon {
  font-size: 18px;
  line-height: 1;
  flex-shrink: 0;
  transition: transform 0.25s cubic-bezier(.36,1.56,.64,1);
}
#spw-track {
  flex: 1;
  min-width: 0;
  position: relative;
  height: 38px;
  overflow: hidden;
}
.spw-msg {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(.36,1.3,.64,1);
}
.spw-msg.spw-active { opacity: 1; transform: translateY(0); }
.spw-msg.spw-exit   { opacity: 0; transform: translateY(-14px); }
.spw-msg-top {
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.spw-msg-top b { font-size: 15px; font-weight: 800; }
.spw-msg-sub {
  font-size: 10.5px;
  font-weight: 500;
  color: rgba(255,255,255,0.72);
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.spw-dot {
  display: inline-block;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #fff;
  margin-right: 4px;
  vertical-align: middle;
  animation: spw-pulse 1.5s ease-in-out infinite;
}
#spw-x {
  position: absolute;
  top: 50%; right: 10px;
  transform: translateY(-50%);
  color: rgba(255,255,255,0.6);
  font-size: 12px;
  cursor: pointer;
  line-height: 1;
  transition: color 0.15s;
  padding: 4px;
}
#spw-x:hover { color: #fff; }
#spw-dots {
  position: absolute;
  bottom: -18px;
  right: 14px;
  display: flex;
  gap: 4px;
}
.spw-d {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: rgba(233,30,140,0.25);
  transition: background 0.3s;
}
.spw-d.spw-d-on { background: #E91E8C; }
@keyframes spw-pulse {
  0%,100%{ opacity:1; transform:scale(1); }
  50%    { opacity:.4; transform:scale(1.6); }
}
@keyframes spw-shine {
  0%   { left: -60%; }
  50%  { left: 120%; }
  100% { left: 120%; }
}
@media (min-width: 768px) {
  #spw { bottom: 32px; right: 24px; }
}
@media (max-width: 767px) {
  #spw { bottom: 68px; right: 12px; }
  #spw-box { min-width: 0; max-width: calc(100vw - 24px); padding: 10px 32px 10px 12px; }
  .spw-msg-top { font-size: 12px; }
  .spw-msg-top b { font-size: 13px; }
  .spw-msg-sub { font-size: 10px; }
  #spw-icon { font-size: 16px; }
}
`;
document.head.appendChild(spwStyle);

// HTML enjekte et
var spwDiv = document.createElement('div');
spwDiv.innerHTML = `
<div id="spw">
  <div id="spw-box">
    <span id="spw-icon">👁</span>
    <div id="spw-track"></div>
    <span id="spw-x" title="Kapat">✕</span>
  </div>
  <div id="spw-dots"></div>
</div>
`;
document.body.appendChild(spwDiv);

// Widget JS
(function(){
  var r = function(a,b){ return Math.floor(Math.random()*(b-a+1))+a; };
  var data = { viewers: r(40,58), cart: r(10,20), sold: r(4,10) };
  var messages = [
    {
      icon: '👁',
      render: function(){ return {
        top: '<span class="spw-dot"></span> Şu an <b>' + data.viewers + ' kişi</b> inceliyor',
        sub: 'Canlı · son güncelleme az önce'
      };}
    },
    {
      icon: '🛒',
      render: function(){ return {
        top: '<b>' + data.cart + ' kişi</b> sepetine ekledi',
        sub: 'Bu ürün yoğun ilgi görüyor'
      };}
    },
    {
      icon: '✅',
      render: function(){ return {
        top: 'Son 24 saatte <b>' + data.sold + ' kişi</b> satın aldı',
        sub: 'Hızla tükeniyor!'
      };}
    }
  ];

  var current = 0;
  var track = document.getElementById('spw-track');
  var dotsEl = document.getElementById('spw-dots');
  var iconEl = document.getElementById('spw-icon');

  messages.forEach(function(_, i){
    var d = document.createElement('span');
    d.className = 'spw-d' + (i===0 ? ' spw-d-on' : '');
    d.id = 'spw-d-' + i;
    dotsEl.appendChild(d);
  });

  messages.forEach(function(m, i){
    var div = document.createElement('div');
    div.className = 'spw-msg' + (i===0 ? ' spw-active' : '');
    div.id = 'spw-m-' + i;
    track.appendChild(div);
  });

  function updateContent(idx){
    var m = messages[idx];
    var d = m.render();
    var el = document.getElementById('spw-m-' + idx);
    el.innerHTML = '<div class="spw-msg-top">' + d.top + '</div><div class="spw-msg-sub">' + d.sub + '</div>';
  }

  function go(next){
    var prev = current;
    current = next;
    iconEl.style.transform = 'scale(0.7) rotate(-10deg)';
    setTimeout(function(){
      iconEl.textContent = messages[current].icon;
      iconEl.style.transform = 'scale(1) rotate(0deg)';
    }, 200);
    var prevEl = document.getElementById('spw-m-' + prev);
    var nextEl = document.getElementById('spw-m-' + current);
    updateContent(current);
    prevEl.classList.remove('spw-active');
    prevEl.classList.add('spw-exit');
    setTimeout(function(){ prevEl.classList.remove('spw-exit'); }, 400);
    nextEl.classList.add('spw-active');
    document.getElementById('spw-d-' + prev).classList.remove('spw-d-on');
    document.getElementById('spw-d-' + current).classList.add('spw-d-on');
  }

  messages.forEach(function(_, i){ updateContent(i); });

  setTimeout(function(){
    document.getElementById('spw').classList.add('spw-on');
  }, 800);

  setInterval(function(){
    go((current + 1) % messages.length);
  }, 3000);

  setInterval(function(){
    data.viewers = Math.max(2, data.viewers + r(-4,5));
    if(current === 0) updateContent(0);
  }, r(5000,9000));

  setInterval(function(){
    if(r(0,1)){ data.cart += r(1,3); if(current===1) updateContent(1); }
    else      { data.sold += 1;      if(current===2) updateContent(2); }
  }, r(10000,18000));

  document.getElementById('spw-x').addEventListener('click', function(){
    var w = document.getElementById('spw');
    w.style.opacity = '0';
    w.style.transform = 'translateY(16px)';
    setTimeout(function(){ w.style.display='none'; }, 500);
  });
})();
