// CSS enjekte et
var spwStyle = document.createElement('style');
spwStyle.innerHTML = `
#spw {
  position: fixed;
  bottom: 80px;
  right: 16px;
  z-index: 99999;
  opacity: 0;
  transform: translateX(120%);
  transition: opacity 0.5s ease, transform 0.55s cubic-bezier(.36,1.2,.64,1);
}
#spw.spw-on {
  opacity: 1;
  transform: translateX(0);
}
#spw.spw-off {
  opacity: 0;
  transform: translateX(120%);
}
#spw-box {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 10px;
  padding: 12px 38px 12px 14px;
  border-radius: 50px;
  background: linear-gradient(135deg, #B8860B, #FFD700, #B8860B);
  box-shadow: 0 6px 28px rgba(184,134,11,0.45), 0 2px 8px rgba(0,0,0,0.18);
  width: 265px;
  max-width: calc(100vw - 32px);
  box-sizing: border-box;
  overflow: hidden;
}
#spw-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: -60%;
  width: 40%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: spw-shine 3.5s ease-in-out infinite;
}
#spw-icon {
  font-size: 20px;
  line-height: 1;
  flex-shrink: 0;
  display: block;
  transition: transform 0.25s cubic-bezier(.36,1.56,.64,1);
}
#spw-track {
  flex: 1;
  min-width: 0;
  position: relative;
  height: 44px;
  overflow: hidden;
  display: block;
}
.spw-msg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(.36,1.3,.64,1);
}
.spw-msg.spw-active {
  opacity: 1;
  transform: translateY(0);
}
.spw-msg.spw-exit {
  opacity: 0;
  transform: translateY(-14px);
}
.spw-msg-top {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #3a2500;
  line-height: 1.3;
  white-space: normal;
  display: block;
  margin: 0;
  padding: 0;
}
.spw-msg-top b {
  font-size: 14px;
  font-weight: 800;
  color: #3a2500;
}
.spw-msg-top .spw-small {
  font-size: 11px;
  font-weight: 600;
  color: #3a2500;
}
.spw-msg-top .spw-small b {
  font-size: 11px;
  font-weight: 800;
  color: #3a2500;
}
.spw-msg-sub {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 10px;
  font-weight: 500;
  color: rgba(58,37,0,0.65);
  margin: 3px 0 0 0;
  padding: 0;
  display: block;
  white-space: nowrap;
}
.spw-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3a2500;
  margin-right: 5px;
  vertical-align: middle;
  animation: spw-pulse 1.5s ease-in-out infinite;
}
#spw-x {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  color: rgba(58,37,0,0.5);
  font-size: 13px;
  cursor: pointer;
  line-height: 1;
  transition: color 0.15s;
  padding: 4px;
  display: block;
}
#spw-x:hover { color: #3a2500; }
@keyframes spw-pulse {
  0%,100% { opacity:1; transform:scale(1); }
  50%     { opacity:.4; transform:scale(1.6); }
}
@keyframes spw-shine {
  0%   { left: -60%; }
  50%  { left: 120%; }
  100% { left: 120%; }
}
@media (min-width: 768px) {
  #spw { bottom: 100px; right: 24px; }
  #spw-box { width: 305px; }
  #spw-track { height: 52px; }
  .spw-msg-top { font-size: 14px; }
  .spw-msg-top b { font-size: 15px; }
  .spw-msg-top .spw-small { font-size: 14px; }
  .spw-msg-top .spw-small b { font-size: 14px; }
}
@media (max-width: 767px) {
  #spw { bottom: 80px; right: 12px; }
  #spw-box { width: 265px; }
}
`;
document.head.appendChild(spwStyle);

// HTML enjekte et
var spwDiv = document.createElement('div');
spwDiv.innerHTML = '<div id="spw"><div id="spw-box"><span id="spw-icon">👁</span><div id="spw-track"></div><span id="spw-x">✕</span></div></div>';
document.body.appendChild(spwDiv);

// Widget JS
(function(){
  var r = function(a,b){ return Math.floor(Math.random()*(b-a+1))+a; };
  var data = { viewers: r(40,58), cart: r(10,20), sold: r(4,10) };
  var closed = false;
  var rotateTimer = null;
  var current = 0;
  var widget = document.getElementById('spw');
  var iconEl = document.getElementById('spw-icon');
  var track  = document.getElementById('spw-track');

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
        top: '<span class="spw-small">Son 24 saatte <b>' + data.sold + ' kişi</b> satın aldı</span>',
        sub: 'Hızla tükeniyor!'
      };}
    }
  ];

  for (var i = 0; i < messages.length; i++) {
    var div = document.createElement('div');
    div.className = 'spw-msg' + (i === 0 ? ' spw-active' : '');
    div.id = 'spw-m-' + i;
    track.appendChild(div);
  }

  function updateContent(idx) {
    var d = messages[idx].render();
    var el = document.getElementById('spw-m-' + idx);
    if (!el) return;
    el.innerHTML = '<div class="spw-msg-top">' + d.top + '</div><div class="spw-msg-sub">' + d.sub + '</div>';
  }

  function go(next) {
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
  }

  function startRotate() {
    if (rotateTimer) clearInterval(rotateTimer);
    rotateTimer = setInterval(function(){
      go((current + 1) % messages.length);
    }, 3000);
  }

  function stopRotate() {
    if (rotateTimer) { clearInterval(rotateTimer); rotateTimer = null; }
  }

  function showWidget() {
    if (closed) return;
    widget.classList.remove('spw-off');
    widget.classList.add('spw-on');
    startRotate();
    setTimeout(hideWidget, 10000);
  }

  function hideWidget() {
    if (closed) return;
    widget.classList.remove('spw-on');
    widget.classList.add('spw-off');
    stopRotate();
    setTimeout(showWidget, 20000);
  }

  for (var j = 0; j < messages.length; j++) { updateContent(j); }

  setTimeout(showWidget, 1000);

  setInterval(function(){
    data.viewers = Math.max(2, data.viewers + r(-4, 5));
    if (current === 0) updateContent(0);
  }, r(5000, 9000));

  setInterval(function(){
    if (r(0,1)) { data.cart += r(1,3); if (current === 1) updateContent(1); }
    else        { data.sold += 1;      if (current === 2) updateContent(2); }
  }, r(10000, 18000));

  document.getElementById('spw-x').addEventListener('click', function(){
    closed = true;
    stopRotate();
    widget.classList.remove('spw-on');
    widget.classList.add('spw-off');
  });
})();
