// CSS enjekte et
var spwStyle = document.createElement('style');
spwStyle.innerHTML = `
#spw {
  position: fixed !important;
  bottom: 80px !important;
  right: 16px !important;
  z-index: 99999 !important;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(.36,1.3,.64,1);
}
#spw.spw-on {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
#spw-box {
  position: relative !important;
  display: flex !important;
  align-items: center !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  gap: 10px !important;
  padding: 12px 38px 12px 14px !important;
  border-radius: 50px !important;
  background: linear-gradient(135deg, #E91E8C, #FF5722) !important;
  box-shadow: 0 6px 28px rgba(233,30,140,0.35), 0 2px 8px rgba(0,0,0,0.12) !important;
  width: 260px !important;
  max-width: calc(100vw - 32px) !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
  list-style: none !important;
  margin: 0 !important;
}
#spw-box::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: -60% !important;
  width: 40% !important;
  height: 100% !important;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent) !important;
  animation: spw-shine 3.5s ease-in-out infinite !important;
}
#spw-icon {
  font-size: 20px !important;
  line-height: 1 !important;
  flex-shrink: 0 !important;
  display: block !important;
  transition: transform 0.25s cubic-bezier(.36,1.56,.64,1) !important;
}
#spw-track {
  flex: 1 !important;
  min-width: 0 !important;
  position: relative !important;
  height: 44px !important;
  overflow: hidden !important;
  display: block !important;
}
.spw-msg {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  opacity: 0 !important;
  transform: translateY(14px) !important;
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(.36,1.3,.64,1) !important;
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
}
.spw-msg.spw-active {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
.spw-msg.spw-exit {
  opacity: 0 !important;
  transform: translateY(-14px) !important;
}
.spw-msg-top {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  color: #ffffff !important;
  line-height: 1.3 !important;
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
  display: block !important;
  margin: 0 !important;
  padding: 0 !important;
  list-style: none !important;
}
.spw-msg-top b {
  font-size: 14px !important;
  font-weight: 800 !important;
  color: #ffffff !important;
}
.spw-msg-sub {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 10px !important;
  font-weight: 500 !important;
  color: rgba(255,255,255,0.75) !important;
  margin: 3px 0 0 0 !important;
  padding: 0 !important;
  display: block !important;
  white-space: nowrap !important;
  list-style: none !important;
}
.spw-dot {
  display: inline-block !important;
  width: 6px !important;
  height: 6px !important;
  border-radius: 50% !important;
  background: #fff !important;
  margin-right: 5px !important;
  vertical-align: middle !important;
  animation: spw-pulse 1.5s ease-in-out infinite !important;
}
#spw-x {
  position: absolute !important;
  top: 50% !important;
  right: 12px !important;
  transform: translateY(-50%) !important;
  color: rgba(255,255,255,0.65) !important;
  font-size: 13px !important;
  font-family: sans-serif !important;
  cursor: pointer !important;
  line-height: 1 !important;
  transition: color 0.15s !important;
  padding: 4px !important;
  display: block !important;
}
#spw-x:hover { color: #fff !important; }
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
  #spw { bottom: 40px !important; right: 24px !important; }
  #spw-box { width: 280px !important; }
}
@media (max-width: 767px) {
  #spw { bottom: 80px !important; right: 12px !important; }
  #spw-box { width: 240px !important; }
  .spw-msg-top { font-size: 12px !important; }
  .spw-msg-top b { font-size: 13px !important; }
}
`;
document.head.appendChild(spwStyle);

// HTML enjekte et
var spwDiv = document.createElement('div');
spwDiv.innerHTML = '<div id="spw"><div id="spw-box"><span id="spw-icon">&#128065;</span><div id="spw-track"></div><span id="spw-x">&#10005;</span></div></div>';
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
  var iconEl = document.getElementById('spw-icon');

  // Mesaj div'lerini oluştur
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
    iconEl.style.cssText += '; transform: scale(0.7) rotate(-10deg) !important;';
    setTimeout(function(){
      iconEl.textContent = messages[current].icon;
      iconEl.style.cssText += '; transform: scale(1) rotate(0deg) !important;';
    }, 200);
    var prevEl = document.getElementById('spw-m-' + prev);
    var nextEl = document.getElementById('spw-m-' + current);
    updateContent(current);
    prevEl.classList.remove('spw-active');
    prevEl.classList.add('spw-exit');
    setTimeout(function(){ prevEl.classList.remove('spw-exit'); }, 400);
    nextEl.classList.add('spw-active');
  }

  // İlk içerikleri doldur
  for (var j = 0; j < messages.length; j++) { updateContent(j); }

  // Göster
  setTimeout(function(){
    document.getElementById('spw').classList.add('spw-on');
  }, 800);

  // Döngü
  setInterval(function(){
    go((current + 1) % messages.length);
  }, 3000);

  // Viewers güncelle
  setInterval(function(){
    data.viewers = Math.max(2, data.viewers + r(-4, 5));
    if (current === 0) updateContent(0);
  }, r(5000, 9000));

  // Cart/sold artır
  setInterval(function(){
    if (r(0,1)) { data.cart += r(1,3); if (current === 1) updateContent(1); }
    else        { data.sold += 1;      if (current === 2) updateContent(2); }
  }, r(10000, 18000));

  // Kapat
  document.getElementById('spw-x').addEventListener('click', function(){
    var w = document.getElementById('spw');
    w.style.opacity = '0';
    w.style.transform = 'translateY(16px)';
    setTimeout(function(){ w.style.display = 'none'; }, 500);
  });
})();
