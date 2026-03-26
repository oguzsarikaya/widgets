(function () {
  /* ─── AYARLAR ─────────────────────────────────────────────────── */
  var CONFIG = {
    phone:        '905449467818',
    message:      'Merhaba, bilgi almak istiyorum.',
    agentName:    'Narpiem',
    agentInitial: 'N',
    bubbleText:   'Merhaba! 👋<br>Ürünler hakkında <strong>detaylı bilgi</strong> ve <strong>teknik destek</strong> için bize yazın!',
    accentColor:  '#25D366',
    side:         'left',
    autoHideMs:   5000,
    autoShowMs:   60000
  };
  /* ────────────────────────────────────────────────────────────── */

  var SIDE          = CONFIG.side === 'right' ? 'right' : 'left';
  var BUBBLE_RADIUS = SIDE === 'left' ? '12px 12px 12px 3px' : '12px 12px 3px 12px';

  var css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

#narpiem-wa-root {
  position: fixed;
  bottom: 24px;
  ${SIDE}: 16px;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: flex-${SIDE === 'left' ? 'start' : 'end'};
  gap: 8px;
  font-family: 'DM Sans', sans-serif;
}

#narpiem-wa-bubble {
  background: #fff;
  border-radius: ${BUBBLE_RADIUS};
  padding: 10px 14px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
  max-width: 220px;
  position: relative;
  opacity: 0;
  transform: translateY(8px) scale(0.95);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
  border: 1px solid #f0f0f0;
}

#narpiem-wa-bubble.nwa-active {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: all;
}

.nwa-bubble-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  padding-bottom: 6px;
  border-bottom: 1px solid #f5f5f5;
}

.nwa-avatar {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, ${CONFIG.accentColor}, #1ebe5d);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: #fff;
  font-weight: 700;
  flex-shrink: 0;
}

.nwa-name  { font-size: 11px; font-weight: 500; color: #111; line-height: 1.2; }
.nwa-role  { font-size: 10px; color: #25D366; font-weight: 400; }

.nwa-text {
  font-size: 11px;
  color: #555;
  line-height: 1.5;
  font-weight: 300;
}

.nwa-text strong { color: #111; font-weight: 500; }

.nwa-time {
  font-size: 9px;
  color: #ccc;
  text-align: ${SIDE};
  margin-top: 4px;
}

#narpiem-wa-close {
  position: absolute;
  top: -7px;
  ${SIDE === 'left' ? 'right' : 'left'}: -7px;
  width: 16px;
  height: 16px;
  background: #bbb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 9px;
  color: #fff;
  line-height: 1;
  transition: background 0.2s;
}

#narpiem-wa-close:hover { background: #555; }

#narpiem-wa-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #25D366;
  border-radius: 50px;
  padding: 10px 18px 10px 12px;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(37,211,102,0.35);
  transition: all 0.25s ease;
  position: relative;
}

#narpiem-wa-btn:hover {
  background: #1ebe5d;
  box-shadow: 0 6px 24px rgba(37,211,102,0.5);
  transform: translateY(-2px);
}

#narpiem-wa-btn svg { width: 22px; height: 22px; flex-shrink: 0; }

.nwa-btn-text  { display: flex; flex-direction: column; line-height: 1.2; }
.nwa-btn-label { font-size: 10px; color: rgba(255,255,255,0.8); font-weight: 300; letter-spacing: 0.4px; }
.nwa-btn-cta   { font-size: 12px; color: #fff; font-weight: 500; letter-spacing: 0.2px; }

#narpiem-wa-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50px;
  background: #25D366;
  animation: narpiemWaPulse 2.5s ease-out infinite;
  z-index: -1;
}

@keyframes narpiemWaPulse {
  0%   { transform: scale(1);   opacity: 0.6; }
  100% { transform: scale(1.5); opacity: 0; }
}

@media (max-width: 768px) {
  #narpiem-wa-root {
    bottom: 60px;
    ${SIDE}: 12px;
    gap: 6px;
  }

  #narpiem-wa-bubble {
    max-width: 170px;
    padding: 8px 11px;
  }

  .nwa-avatar { width: 24px; height: 24px; font-size: 10px; }
  .nwa-name   { font-size: 10px; }
  .nwa-role   { font-size: 9px; }
  .nwa-text   { font-size: 10px; line-height: 1.4; }
  .nwa-time   { font-size: 8px; }

  #narpiem-wa-btn {
    width: 46px;
    height: 46px;
    padding: 0;
    border-radius: 50%;
    justify-content: center;
  }

  .nwa-btn-text { display: none; }
  #narpiem-wa-btn svg { width: 22px; height: 22px; }
}
`;

  var waUrl = 'https://wa.me/' + CONFIG.phone
    + '?text=' + encodeURIComponent(CONFIG.message);

  var html = `
<div id="narpiem-wa-root">
  <div id="narpiem-wa-bubble" class="nwa-active">
    <div id="narpiem-wa-close">✕</div>
    <div class="nwa-bubble-header">
      <div class="nwa-avatar">${CONFIG.agentInitial}</div>
      <div>
        <div class="nwa-name">${CONFIG.agentName}</div>
        <div class="nwa-role">● Online</div>
      </div>
    </div>
    <div class="nwa-text">${CONFIG.bubbleText}</div>
    <div class="nwa-time">Şimdi</div>
  </div>

  <a id="narpiem-wa-btn" href="${waUrl}" target="_blank" rel="noopener">
    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    <div class="nwa-btn-text">
      <span class="nwa-btn-label">Bize ulaşın</span>
      <span class="nwa-btn-cta">İletişime Geçin</span>
    </div>
  </a>
</div>
`;

  var autoShowTimer = null;
  var userClosed    = false;

  function hideBubble() {
    var bubble = document.getElementById('narpiem-wa-bubble');
    if (bubble) bubble.classList.remove('nwa-active');
  }

  function showBubble() {
    var bubble = document.getElementById('narpiem-wa-bubble');
    if (bubble) bubble.classList.add('nwa-active');
  }

  function scheduleReopen() {
    clearTimeout(autoShowTimer);
    autoShowTimer = setTimeout(function () {
      showBubble();
      setTimeout(function () {
        hideBubble();
        scheduleReopen();
      }, CONFIG.autoHideMs);
    }, CONFIG.autoShowMs);
  }

  function inject() {
    if (document.getElementById('narpiem-wa-root')) return;

    var style = document.createElement('style');
    style.id  = 'narpiem-wa-style';
    style.textContent = css;
    document.head.appendChild(style);

    var wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper.firstElementChild);

    var closeBtn = document.getElementById('narpiem-wa-close');
    var btn      = document.getElementById('narpiem-wa-btn');

    setTimeout(function () {
      hideBubble();
      scheduleReopen();
    }, CONFIG.autoHideMs);

    closeBtn.addEventListener('click', function () {
      userClosed = true;
      hideBubble();
      scheduleReopen();
    });

    btn.addEventListener('click', function () {
      userClosed = true;
      hideBubble();
      scheduleReopen();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
