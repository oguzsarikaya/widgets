(function () {
  var fem = [
    "Ayşe","Fatma","Zeynep","Elif","Emine","Merve","Büşra","Selin","Esra",
    "Neslihan","Gamze","Özlem","Dilek","Derya","Tuğba","Şeyma","Pınar","Cemre",
    "İrem","Hilal","Gizem","Buse","Ceren","Melis","Ece","Dilara","Yasemin",
    "Aslı","Bahar","Naz","Leyla","Seda","Özge","Hande","Begüm","Melisa","Duygu",
    "Tuba","Şule","Nuray","Gönül","Sevgi","Hatice","Rukiye","Zübeyde","Rabia",
    "Havva","Hacer","Selma","Nermin","Filiz","Sibel","Arzu","Gülay","Serap",
    "Nazan","Nilüfer","Yeliz","Semra","Hülya","Güneş","Yıldız","Şirin"
  ];
  var ini = "ABCDEFGHİKLMNOPRSTYZ".split("");
  var tms = [
    "az önce","1 dk önce","2 dk önce","3 dk önce","5 dk önce",
    "7 dk önce","10 dk önce","15 dk önce","20 dk önce","30 dk önce","1 saat önce"
  ];
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

  function p(a) { return a[Math.floor(Math.random() * a.length)]; }
  function r(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }

  /* ── STYLE ── */
  var css = ""
    + "#_spw{position:fixed;bottom:24px;right:24px;z-index:2147483647;font-family:Arial,sans-serif}"
    + "#_spt{width:300px;border-radius:14px;overflow:hidden;box-shadow:0 4px 24px rgba(190,24,93,0.22)}"
    + ".sp-c{background:linear-gradient(135deg,#ec4899,#be185d);padding:14px 46px 14px 14px;display:flex;align-items:center;gap:12px;position:relative;min-height:76px}"
    + ".sp-i{width:44px;height:44px;border-radius:11px;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:23px;flex-shrink:0}"
    + ".sp-b{flex:1;min-width:0;height:54px;overflow:hidden}"
    + ".sp-s{display:flex;flex-direction:column;will-change:transform}"
    + ".sp-r{height:54px;display:flex;flex-direction:column;justify-content:center;flex-shrink:0}"
    + ".sp-nm{font-size:13px;font-weight:700;color:#fff;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"
    + ".sp-cy{font-size:12px;color:rgba(255,255,255,.9);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"
    + ".sp-sb{font-size:11px;color:rgba(255,255,255,.72);margin-top:3px;display:flex;align-items:center;gap:5px}"
    + ".sp-dt{width:6px;height:6px;border-radius:50%;background:#fde68a;animation:spdp 2s infinite}"
    + "@keyframes spdp{0%,100%{opacity:1}50%{opacity:.3}}"
    + ".sp-x{position:absolute;top:10px;right:10px;width:22px;height:22px;border-radius:50%;background:rgba(0,0,0,.2);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;color:#fff;font-size:14px;line-height:1}"
    + ".sp-x:hover{background:rgba(0,0,0,.35)}";

  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  /* ── HTML ── */
  var wrap = document.createElement("div");
  wrap.id = "_spw";
  wrap.innerHTML = ""
    + "<div id='_spt'>"
    +   "<div class='sp-c'>"
    +     "<div class='sp-i'>\uD83E\uDDE3</div>"
    +     "<div class='sp-b'><div class='sp-s' id='sp-s'></div></div>"
    +     "<button class='sp-x' onclick=\"document.getElementById('_spw').style.display='none'\">\u00D7</button>"
    +   "</div>"
    + "</div>";
  document.body.appendChild(wrap);

  /* ── SLOT ── */
  var busy = false;

  function mkRow(name, city, ek, qty, time) {
    var d = document.createElement("div");
    d.className = "sp-r";
    d.innerHTML = "<div class='sp-nm'>" + name + "</div>"
      + "<div class='sp-cy'>" + city + ek + " \u2022 " + qty + " \u00FCr\u00FCn sipari\u015F verdi</div>"
      + "<div class='sp-sb'><div class='sp-dt'></div><span>" + time + "</span></div>";
    return d;
  }

  function spin() {
    if (busy) return;
    busy = true;
    var c = p(cits), qty = r(1, 5), time = p(tms);
    var sl = document.getElementById("sp-s");
    var row = mkRow(p(fem) + " " + p(ini) + ".", c[0], c[1], qty, time);

    if (sl.children.length === 0) {
      sl.appendChild(row);
      busy = false;
      return;
    }

    sl.appendChild(row);
    sl.style.transition = "none";
    sl.style.transform = "translateY(0)";

    setTimeout(function () {
      sl.style.transition = "transform 500ms cubic-bezier(.22,1,.36,1)";
      sl.style.transform = "translateY(-54px)";
      setTimeout(function () {
        while (sl.children.length > 1) sl.removeChild(sl.firstChild);
        sl.style.transition = "none";
        sl.style.transform = "translateY(0)";
        busy = false;
      }, 540);
    }, 20);
  }

  spin();
  setInterval(spin, 5000);
})();
