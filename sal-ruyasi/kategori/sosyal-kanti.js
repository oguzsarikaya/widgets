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

  /* ── CSS — ürün sayfasındaki spw-box ile birebir aynı ── */
  var css = [
    "#_spw{",
      "position:fixed;",
      "right:18px;bottom:100px;",
      "width:min(92vw,320px);",
      "z-index:2147483647;pointer-events:none;",
    "}",

    "#_spt{",
      "pointer-events:auto;",
      "display:grid;",
      "grid-template-columns:40px 1fr;",
      "gap:10px;align-items:center;",
      "padding:10px 38px 10px 12px;",
      "border-radius:50px;",                          /* ← pill */
      "background:linear-gradient(135deg,#E91E8C,#FF5722);",
      "box-shadow:0 6px 28px rgba(233,30,140,.35),0 2px 8px rgba(0,0,0,.12);",
      "position:relative;overflow:hidden;",
      "box-sizing:border-box;",
    "}",

    /* parlama — ürün sayfasıyla aynı */
    "#_spt::before{",
      "content:'';position:absolute;top:0;left:-60%;",
      "width:40%;height:100%;",
      "background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);",
      "animation:spshine 3.5s ease-in-out infinite;",
    "}",
    "@keyframes spshine{0%{left:-60%}50%{left:120%}100%{left:120%}}",

    /* ikon */
    "#_spico{",
      "width:40px;height:40px;border-radius:999px;",
      "background:radial-gradient(circle at 70% 30%,#fff 0 28%,transparent 30%),",
                 "radial-gradient(circle at 30% 70%,#fff 0 18%,transparent 18%),",
                 "#E91E8C;",
      "border:2px solid #fff;",
      "box-shadow:0 6px 18px rgba(233,30,140,.25),inset 0 0 0 1px rgba(255,255,255,.6);",
      "display:flex;align-items:center;justify-content:center;",
      "font-size:18px;flex-shrink:0;",
    "}",

    /* metin alanı */
    "#_sptrack{",
      "flex:1;min-width:0;",
      "height:44px;overflow:hidden;position:relative;",
    "}",

    ".sp-r{",
      "position:absolute;top:0;left:0;right:0;height:100%;",
      "display:flex;flex-direction:column;justify-content:center;",
      "opacity:0;transform:translateY(14px);",
      "transition:opacity .35s ease,transform .35s cubic-bezier(.36,1.3,.64,1);",
    "}",
    ".sp-r.sp-in{opacity:1;transform:translateY(0)}",
    ".sp-r.sp-out{opacity:0;transform:translateY(-14px)}",

    ".sp-nm{",
      "font:700 14px/1.35 system-ui,-apple-system,'Segoe UI',sans-serif;",
      "color:#fff;letter-spacing:.2px;",
      "white-space:nowrap;overflow:hidden;text-overflow:ellipsis;",
    "}",
    ".sp-cy{",
      "margin-top:3px;",
      "font:500 12px/1.3 system-ui,-apple-system,'Segoe UI',sans-serif;",
      "color:rgba(255,255,255,.9);",
      "white-space:nowrap;overflow:hidden;text-overflow:ellipsis;",
      "display:flex;align-items:center;gap:5px;",
    "}",
    ".sp-dot{",
      "display:inline-block;width:6px;height:6px;border-radius:50%;",
      "background:#fff;flex-shrink:0;",
      "animation:spdot 1.5s ease-in-out infinite;",
    "}",
    "@keyframes spdot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.6)}}",

    /* kapat */
    "#_spx{",
      "position:absolute;top:50%;right:12px;transform:translateY(-50%);",
      "color:rgba(255,255,255,.65);font-size:13px;cursor:pointer;",
      "line-height:1;padding:4px;background:none;border:none;",
    "}",
    "#_spx:hover{color:#fff}",

    /* masaüstü */
    "@media(min-width:768px){",
      "#_spw{bottom:100px;right:24px;}",
      "#_sptrack{height:52px}",
      ".sp-nm{font-size:14px}",
      ".sp-cy{font-size:12px}",
    "}",

    /* mobil */
    "@media(max-width:767px){",
      "#_spw{bottom:62px;right:12px;width:min(92vw,265px);}",
      "#_spt{grid-template-columns:32px 1fr;gap:8px;padding:8px 32px 8px 10px;}",
      "#_spico{width:32px;height:32px;font-size:15px;}",
      "#_sptrack{height:38px}",
      ".sp-nm{font-size:12px}",
      ".sp-cy{font-size:10px;margin-top:2px}",
    "}"
  ].join("");

  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  /* ── HTML ── */
  var wrap = document.createElement("div");
  wrap.id = "_spw";
  wrap.innerHTML = ""
    + "<div id='_spt'>"
    +   "<div id='_spico'>\uD83E\uDDE3</div>"
    +   "<div id='_sptrack'></div>"
    +   "<button id='_spx' onclick=\"document.getElementById('_spw').style.display='none'\">✕</button>"
    + "</div>";
  document.body.appendChild(wrap);

  /* ── SLOT ── */
  var track = document.getElementById("_sptrack");
  var current = null;

  function show() {
    var c = p(cits), qty = r(1, 5), time = p(tms);
    var name = p(fem) + " " + p(ini) + ".";

    var next = document.createElement("div");
    next.className = "sp-r";
    next.innerHTML = ""
      + "<div class='sp-nm'>" + name + " " + c[0] + c[1] + " " + qty + " ürün sipariş verdi</div>"
      + "<div class='sp-cy'><span class='sp-dot'></span>" + time + "</div>";
    track.appendChild(next);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        next.classList.add("sp-in");
        if (current) {
          var old = current;
          old.classList.remove("sp-in");
          old.classList.add("sp-out");
          setTimeout(function () { if (old.parentNode) old.parentNode.removeChild(old); }, 400);
        }
        current = next;
      });
    });
  }

  show();
  setInterval(show, 5000);

})();
