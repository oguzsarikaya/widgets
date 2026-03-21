(function () {
  "use strict";

  const BASE_URL = "https://oguzsarikaya.github.io/widgets";
  const WIDGETS = {
    "sal-ruyasi-urun-sosyal-kanit":        BASE_URL + "/sal-ruyasi/urun-sayfasi/sosyal-kanit/index.html",
    "tablolife-urun-sosyal-kanit":         BASE_URL + "/tablolife/urun-sayfasi/sosyal-kanit/index.html",
    "zuum-urun-sosyal-kanit":              BASE_URL + "/zuum-accessories/urun-sayfasi/sosyal-kanit/index.html",
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

  function injectWidget(widgetId) {
    const widgetUrl = WIDGETS[widgetId];
    if (!widgetUrl) return;
    if (document.querySelector('[data-widget-id="' + widgetId + '"]')) return;

    const iframe = document.createElement("iframe");
    iframe.setAttribute("data-widget-id", widgetId);
    iframe.src = widgetUrl;
    iframe.style.cssText = "border:none;width:100%;min-height:0;display:block;overflow:hidden;background:transparent;";
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("allowtransparency", "true");

    const currentScript = document.currentScript || (function () {
      const all = document.querySelectorAll("script[src*='widget.js']");
      return all[all.length - 1];
    })();

    if (currentScript && currentScript.parentNode) {
      currentScript.parentNode.insertBefore(iframe, currentScript.nextSibling);
    } else {
      document.body.appendChild(iframe);
    }

    iframe.addEventListener("load", function () {
      try {
        const h = iframe.contentDocument.body.scrollHeight;
        if (h) iframe.style.height = h + "px";
      } catch (_) {}
    });
  }

  window.addEventListener("message", function (e) {
    if (e.data && e.data.type === "widget-resize") {
      const iframe = document.querySelector('[data-widget-id="' + e.data.id + '"]');
      if (iframe) iframe.style.height = e.data.height + "px";
    }
