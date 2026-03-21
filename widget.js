(function () {
  "use strict";

  const BASE_URL = "https://oguzsarikaya.github.io/widgets";
  const WIDGETS = {
    "sal-ruyasi-urun-sosyal-kanit": BASE_URL + "/sal-ruyasi/urun-sayfasi/sosyal-kanit/index.js",
    "tablolife-urun-sosyal-kanit":  BASE_URL + "/tablolife/urun-sayfasi/sosyal-kanit/index.js",
    "zuum-urun-sosyal-kanit":       BASE_URL + "/zuum-accessories/urun-sayfasi/sosyal-kanit/index.js",
  };

  function getWidgetId() {
    // Yöntem 1: document.currentScript
    if (document.currentScript) {
      const url = new URL(document.currentScript.src);
      const id = url.searchParams.get("id");
      if (id) return id;
    }
    // Yöntem 2: Tüm script taglerini tara
    const scripts = document.querySelectorAll("script[src*='widget.js']");
    for (const s of scripts) {
      try {
        const url = new URL(s.src);
        const id = url.searchParams.get("id");
        if (id) return id;
      } catch (_) {}
    }
    // Yöntem 3: data-id attribute
    const scripts2 = document.querySelectorAll("script[data-id]");
    for (const s of scripts2) {
      const id = s.getAttribute("data-id");
      if (id) return id;
    }
    return null;
  }

  function loadWidget(widgetUrl) {
    const script = document.createElement("script");
    script.src = widgetUrl + "?t=" + Date.now(); // cache engelle
    document.head.appendChild(script);
  }

  function init() {
    const id = getWidgetId();
    if (id && WIDGETS[id]) {
      loadWidget(WIDGETS[id]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
