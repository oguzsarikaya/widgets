(function () {

  /* ===== DEĞİŞTİ: B2B isim havuzu - kişi + işletme tipi karması ===== */
  var fem = [
    "Ayşe","Fatma","Zeynep","Elif","Emine","Merve","Büşra","Selin","Esra",
    "Neslihan","Gamze","Özlem","Dilek","Derya","Tuğba","Şeyma","Pınar","Cemre",
    "İrem","Hilal","Gizem","Buse","Ceren","Melis","Ece","Dilara","Yasemin",
    "Aslı","Bahar","Naz","Leyla","Seda","Özge","Hande","Begüm","Melisa","Duygu",
    "Tuba","Şule","Nuray","Gönül","Sevgi","Hatice","Filiz","Sibel","Arzu","Serap"
  ];
  var mal = [
    "Ahmet","Mehmet","Mustafa","Ali","Hasan","Emre","Mert","Burak","Serkan",
    "Tolga","Onur","Barış","Enes","Kaan","Berk","Furkan","Volkan","Umut",
    "Murat","Cem","Tunç","Hakan","Erkan","Yusuf","Selim","Cenk","İbrahim"
  ];
  var uni = ["Deniz","Özgür","Ege","İlkay","Yağmur"];

  /* ===== DEĞİŞTİ: İşletme tipi havuzu (toptan müşteri profili) ===== */
  var biz = [
    "Aksesuar Dünyası","Takı Butiği","Boutique Star","Kuyumcu",
    "Hediyelik Eşya","Stil Aksesuar","Moda Takı","Şık Aksesuar",
    "Glamour Shop","Trend Takı","Lüks Aksesuar","Butik",
    "Aksesuar Center","Takı Atölyesi","Vitrin","Mağaza",
    "Online Mağaza","Kuyum","Pırlanta Butik","Gümüş Dünyası",
    "Aksesuar Evi","Moda Evi","Concept Store","Bijuteri"
  ];
  /* ===== /DEĞİŞTİ ===== */

  var ini = "ABCDEFGHİKLMNOPRSTYZ".split("");

  /* ===== DEĞİŞTİ: Zaman havuzu - toptan ritmine göre ===== */
  var tms = [
    "5 dk önce","8 dk önce","12 dk önce","15 dk önce","20 dk önce",
    "25 dk önce","30 dk önce","45 dk önce","1 saat önce","1 saat önce",
    "2 saat önce","2 saat önce","3 saat önce","bugün"
  ];
  /* ===== /DEĞİŞTİ ===== */

  var cits = [
    ["İstanbul","'dan"],["Ankara","'dan"],["İzmir","'den"],["Bursa","'dan"],
    ["Antalya","'dan"],["Adana","'dan"],["Konya","'dan"],["Gaziantep","'ten"],
    ["Kocaeli","'den"],["Mersin","'den"],["Eskişehir","'den"],["Samsun","'dan"],
    ["Trabzon","'dan"],["Kayseri","'den"],["Denizli","'den"],["Manisa","'dan"],
    ["Edirne","'den"],["Erzurum","'dan"],["Malatya","'dan"],["Sakarya","'dan"],
    ["Balıkesir","'den"],["Muğla","'dan"],["Aydın","'dan"],["Tekirdağ","'dan"],
    ["Çanakkale","'den"],["Rize","'den"],["Ordu","'dan"],["Giresun","'den"],
    ["Isparta","'dan"],["Afyon","'dan"],["Hatay","'dan"],["Kahramanmaraş","'tan"],
    ["Diyarbakır","'dan"],["Şanlıurfa","'dan"],["Van","'dan"],["Mardin","'den"]
  ];

  /* ===== DEĞİŞTİ: İkonlar toptan vurgulu ===== */
  var icons = ["\uD83D\uDCE6","\u2728","\uD83D\uDC8E","\uD83D\uDCBC","\uD83C\uDFEA"];
  // 📦 (koli)  ✨ (parıltı)  💎 (mücevher)  💼 (iş çantası)  🏪 (dükkan)
  /* ===== /DEĞİŞTİ ===== */

  var iconIdx = 0;

  /* ===== DEĞİŞTİ: Toptan adet aralıkları (düzine/koli rakamları) ===== */
  var qtys = [12, 24, 24, 36, 36, 48, 48, 60, 72, 96, 120, 144];
  // Tekrarlar daha küçük rakamların daha sık çıkması için (gerçekçilik)
  /* ===== /DEĞİŞTİ ===== */

  /* ===== DEĞİŞTİ: Ortalama birim fiyat - tutar hesaplamak için ===== */
  var avgPrices = [85, 105, 125, 145, 165, 195, 220, 280];
  // Zuum ürün fiyat aralığı (KDV hariç)
  /* ===== /DEĞİŞTİ ===== */

  function p(a) { return a[Math.floor(Math.random() * a.length)]; }
  function r(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }

  /* ===== DEĞİŞTİ: İsim üretici - artık kişi + işletme döndürüyor ===== */
  function genName() {
    var rv = Math.random(), name;
    if (rv < 0.55)      name = p(fem);
    else if (rv < 0.65) name = p(uni);
    else                name = p(mal);
    // %70 ihtimalle işletme adı ekle (B2B vurgusu)
    if (Math.random() < 0.7) {
      return name + " " + p(ini) + ". · " + p(biz);
    }
    return name + " " + p(ini) + ".";
  }
  /* ===== /DEĞİŞTİ ===== */

  /* ===== DEĞİŞTİ: Toplam tutar hesaplama + formatlama ===== */
  function genTotal(qty) {
    var price = p(avgPrices);
    var raw = qty * price;
    // 50 TL'ye yuvarla (gerçekçi)
    raw = Math.round(raw / 50) * 50;
    return raw.toLocaleString("tr-TR") + "₺";
  }
  /* ===== /DEĞİŞTİ ===== */

  var css = [
    "#_zpw{",
      "position:fixed;",
      "bottom:50px;right:24px;",
      "width:320px;",       /* ===== DEĞİŞTİ: 300 → 320 (iş.adı için ekstra yer) ===== */
      "z-index:2147483647;",
      "font-family:Arial,sans-serif;",
      "transform:translateX(360px);",
      "opacity:0;",
      "transition:transform 0.5s cubic-bezier(.22,1,.36,1),opacity 0.5s ease;",
      "pointer-events:none;",
    "}",
    "#_zpw.zp-on{transform:translateX(0);opacity:1;pointer-events:auto;}",

    "#_zpt{",
      "width:100%;border-radius:14px;overflow:hidden;",
      "box-shadow:0 4px 28px rgba(0,0,0,0.22);",
    "}",
    ".zp-c{",
      "background:linear-gradient(135deg,#7a4f00,#3d2600);",
      "padding:14px 46px 14px 14px;",
      "display:flex;align-items:center;gap:12px;",
      "position:relative;min-height:82px;",   /* ===== DEĞİŞTİ: 76 → 82 (3 satır için) ===== */
    "}",

    ".zp-c::after{",
      "content:'';",
      "position:absolute;top:0;left:0;right:0;height:2px;",
      "background:linear-gradient(90deg,transparent,#f5c842,transparent);",
    "}",

    ".zp-c::before{",
      "content:'';position:absolute;top:0;left:-60%;",
      "width:35%;height:100%;",
      "background:linear-gradient(90deg,transparent,rgba(245,200,66,.12),transparent);",
      "animation:zpshine 4s ease-in-out infinite;",
    "}",
    "@keyframes zpshine{0%{left:-60%}55%{left:120%}100%{left:120%}}",

    ".zp-i{",
      "width:44px;height:44px;border-radius:11px;",
      "background:rgba(245,200,66,.15);",
      "border:1px solid rgba(245,200,66,.4);",
      "display:flex;align-items:center;justify-content:center;",
      "font-size:22px;flex-shrink:0;",
      "transition:transform .3s ease;",
    "}",
    ".zp-i.flip{transform:rotateY(90deg)}",

    ".zp-b{flex:1;min-width:0;height:60px;overflow:hidden}",   /* ===== DEĞİŞTİ: 54 → 60 ===== */
    ".zp-s{display:flex;flex-direction:column;will-change:transform}",
    ".zp-r{height:60px;display:flex;flex-direction:column;justify-content:center;flex-shrink:0}",  /* ===== DEĞİŞTİ: 54 → 60 ===== */

    ".zp-nm{",
      "font-size:13px;font-weight:700;",
      "color:#f5c842;",
      "line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;",
    "}",
    ".zp-cy{",
      "font-size:12px;",
      "color:#f5ead0;",
      "margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;",
    "}",

    /* ===== DEĞİŞTİ: Tutar satırı için yeni stil ===== */
    ".zp-tt{",
      "font-size:11px;",
      "color:#f5c842;",
      "font-weight:600;",
      "margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;",
    "}",
    /* ===== /DEĞİŞTİ ===== */

    ".zp-sb{",
      "font-size:11px;",
      "color:rgba(245,234,208,.6);",
      "margin-top:3px;display:flex;align-items:center;gap:5px;",
    "}",
    ".zp-dot{",
      "width:6px;height:6px;border-radius:50%;",
      "background:#f5c842;flex-shrink:0;",
      "animation:zpdp 2s infinite;",
    "}",
    "@keyframes zpdp{0%,100%{opacity:1}50%{opacity:.25}}",

    ".zp-x{",
      "position:absolute;top:10px;right:10px;",
      "width:22px;height:22px;border-radius:50%;",
      "background:rgba(245,200,66,.2);border:none;cursor:pointer;",
      "display:flex;align-items:center;justify-content:center;",
      "padding:0;color:#f5c842;font-size:14px;line-height:1;",
    "}",
    ".zp-x:hover{background:rgba(245,200,66,.35)}",

    "@media(max-width:767px){",
      "#_zpw{bottom:60px;right:10px;width:260px;transform:translateX(280px);}",   /* ===== DEĞİŞTİ: 240→260 (mobilde de iş.adı sığsın) ===== */
      ".zp-c{padding:9px 34px 9px 10px;gap:8px;min-height:0}",
      ".zp-i{width:32px;height:32px;border-radius:8px;font-size:16px}",
      ".zp-b{height:46px}",     /* ===== DEĞİŞTİ: 40→46 ===== */
      ".zp-r{height:46px}",     /* ===== DEĞİŞTİ: 40→46 ===== */
      ".zp-nm{font-size:11px}",
      ".zp-cy{font-size:10px;margin-top:1px}",
      ".zp-tt{font-size:10px;margin-top:1px}",   /* ===== DEĞİŞTİ: yeni ===== */
      ".zp-sb{font-size:9px;margin-top:2px}",
      ".zp-dot{width:5px;height:5px}",
      ".zp-x{width:18px;height:18px;font-size:11px;top:7px;right:7px}",
    "}"
  ].join("");

  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  var wrap = document.createElement("div");
  wrap.id = "_zpw";
  wrap.innerHTML = ""
    + "<div id='_zpt'>"
    +   "<div class='zp-c'>"
    +     "<div class='zp-i' id='_zpico'>\uD83D\uDCE6</div>"   /* ===== DEĞİŞTİ: 💍 → 📦 ===== */
    +     "<div class='zp-b'><div class='zp-s' id='zp-s'></div></div>"
    +     "<button class='zp-x' id='_zpx'>\u00D7</button>"
    +   "</div>"
    + "</div>";
  document.body.appendChild(wrap);

  var busy   = false;
  var closed = false;
  var icoEl  = document.getElementById("_zpico");
  var sl     = document.getElementById("zp-s");

  document.getElementById("_zpx").addEventListener("click", function () {
    closed = true;
    slideOut();
  });

  function slideIn()  { wrap.classList.add("zp-on"); }
  function slideOut() { wrap.classList.remove("zp-on"); }

  function flipIcon() {
    icoEl.classList.add("flip");
    setTimeout(function () {
      iconIdx = (iconIdx + 1) % icons.length;
      icoEl.textContent = icons[iconIdx];
      icoEl.classList.remove("flip");
    }, 300);
  }

  /* ===== DEĞİŞTİ: mkRow - artık tutar bilgisi de gösteriyor ===== */
  function mkRow(name, city, ek, qty, total, time) {
    var d = document.createElement("div");
    d.className = "zp-r";
    d.innerHTML = "<div class='zp-nm'>" + name + "</div>"
      + "<div class='zp-cy'>" + city + ek + " \u2022 " + qty + " adet sipari\u015F</div>"
      + "<div class='zp-tt'>Toplam: " + total + "</div>"
      + "<div class='zp-sb'><div class='zp-dot'></div><span>" + time + "</span></div>";
    return d;
  }
  /* ===== /DEĞİŞTİ ===== */

  /* ===== DEĞİŞTİ: spinContent - toptan adetler + tutar hesabı ===== */
  function spinContent() {
    if (busy) return;
    busy = true;
    var c = p(cits);
    var qty = p(qtys);               // 12-144 arası toptan rakam
    var total = genTotal(qty);       // adet × ort. fiyat
    var time = p(tms);
    var newRow = mkRow(genName(), c[0], c[1], qty, total, time);
    var h = window.innerWidth < 768 ? 46 : 60;
    flipIcon();
    if (sl.children.length === 0) {
      sl.appendChild(newRow);
      sl.style.transform = "translateY(0)";
      busy = false;
      return;
    }
    sl.appendChild(newRow);
    sl.style.transition = "none";
    sl.style.transform = "translateY(0)";
    setTimeout(function () {
      sl.style.transition = "transform 500ms cubic-bezier(.22,1,.36,1)";
      sl.style.transform = "translateY(-" + h + "px)";
      setTimeout(function () {
        while (sl.children.length > 1) sl.removeChild(sl.firstChild);
        sl.style.transition = "none";
        sl.style.transform = "translateY(0)";
        busy = false;
      }, 540);
    }, 20);
  }
  /* ===== /DEĞİŞTİ ===== */

  /* ===== DEĞİŞTİ: Timing - toptanda daha rahat ritim ===== */
  var SHOW_DELAY  = 2000;     // 1000 → 2000 (sayfa yüklensin, hemen üstüne atlamasın)
  var VISIBLE_DUR = 12000;    // 10000 → 12000 (3 satır okumak için biraz daha)
  var HIDE_DUR    = 30000;    // 20000 → 30000 (toptanda popup baskısı az olmalı)
  var SLOT_INT    = 4000;     // 3000 → 4000 (slot geçişi biraz yavaş)
  /* ===== /DEĞİŞTİ ===== */

  var slotTimer = null;

  function startSlot() {
    spinContent();
    slotTimer = setInterval(function () {
      if (!closed) spinContent();
    }, SLOT_INT);
  }
  function stopSlot() { clearInterval(slotTimer); slotTimer = null; }

  function cycle() {
    if (closed) return;
    spinContent();
    slideIn();
    startSlot();
    setTimeout(function () {
      if (closed) return;
      slideOut();
      stopSlot();
      setTimeout(function () {
        if (closed) return;
        cycle();
      }, HIDE_DUR);
    }, VISIBLE_DUR);
  }

  setTimeout(cycle, SHOW_DELAY);

})();
