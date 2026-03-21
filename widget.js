(function () {
  "use strict";

  const BASE_URL = "https://oguzsarikaya.github.io/widgets";
  const WIDGETS = {
    "sal-ruyasi-urun-sosyal-kanit": BASE_URL + "/sal-ruyasi/urun-sayfasi/sosyal-kanit/index.js",
    "tablolife-urun-sosyal-kanit":  BASE_URL + "/tablolife/urun-sayfasi/sosyal-kanit/index.js",
    "zuum-urun-sosyal-kanit":       BASE_URL + "/zuum-accessories/urun-sayfasi/sosyal-kanit/index.js",
  };

  function getWidgetId() {
    const scripts = document.querySelectorAll("script[src]");
    for (const s of scripts) {
      try {
        const url = new URL(s.src);
        const id = url.searchParams.get("id");
        if (id) return id;
      } catch (_) {}
    }
    return null;
  }

  function loadWidget(widgetUrl) {
    const script = document.createElement("script");
    script.src = widgetUrl;
    document.head.appendChild(script);
  }

  const id = getWidgetId();
  if (id && WIDGETS[id]) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { loadWidget(WIDGETS[id]); });
    } else {
      loadWidget(WIDGETS[id]);
    }
  }
})();
