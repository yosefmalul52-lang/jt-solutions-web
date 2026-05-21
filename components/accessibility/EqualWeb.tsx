"use client";

import { useEffect } from "react";
import {
  FLOATING_BOTTOM,
  FLOATING_INSET_END,
} from "@/lib/floating-buttons";

const SITE_KEY = "925c8c9ec3014adac0359dd896ccd5f5";
const SCRIPT_URL = "https://cdn.equalweb.com/core/5.2.8/accessibility.js";
const SCRIPT_INTEGRITY =
  "sha512-ka0NgF7zDksnhoZ5ZCKlm+t0F7KTih5lCfXwuzQDnrwu/EdKZSsJotoJvQPd0cuVmV63s0q2cgoUjeki688PuQ==";
const PIN_STYLE_ID = "jt-ind-pin-style";

const PIN_CSS = `
#INDmenu-btn,
#INDmenu-btn.INDmenu-btn,
#INDWrap #INDmenu-btn{
  position:fixed!important;
  display:flex!important;
  visibility:visible!important;
  opacity:1!important;
  pointer-events:auto!important;
  inset-block-start:auto!important;
  top:auto!important;
  margin-top:0!important;
  bottom:var(--jt-fab-bottom)!important;
  inset-block-end:var(--jt-fab-bottom)!important;
  left:auto!important;
  inset-inline-start:auto!important;
  right:var(--jt-fab-end)!important;
  inset-inline-end:var(--jt-fab-end)!important;
  transform-origin:bottom right!important;
  z-index:2147483647!important;
}
@media (max-width:768px){
  #INDmenu-btn,#INDmenu-btn.INDmenu-btn{
    --indscale:0.55!important;
    transform:scale(0.55)!important;
  }
}
@media (min-width:769px){
  #INDmenu-btn,#INDmenu-btn.INDmenu-btn{
    --indscale:0.5!important;
    transform:scale(0.5)!important;
  }
}
#INDWrap,
#INDWrap.INDWrap{
  position:fixed!important;
  top:auto!important;
  bottom:0!important;
  left:auto!important;
  right:0!important;
  inset:auto 0 0 auto!important;
  width:auto!important;
  height:auto!important;
  max-height:none!important;
  transform:none!important;
  overflow:visible!important;
  pointer-events:none!important;
  z-index:2147483646!important;
}
#INDWrap #INDmenu-btn{pointer-events:auto!important;}
`;

declare global {
  interface Window {
    interdeal?: Record<string, unknown>;
    __jtEqualWebInit?: boolean;
    __jtIndPinInterval?: ReturnType<typeof setInterval>;
    __jtIndBtnObserver?: MutationObserver;
    __jtIndRafId?: number;
  }
}

function ensurePinStyles() {
  const root = document.documentElement;
  root.style.setProperty("--jt-fab-bottom", FLOATING_BOTTOM);
  root.style.setProperty("--jt-fab-end", FLOATING_INSET_END);

  if (document.getElementById(PIN_STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = PIN_STYLE_ID;
  el.textContent = PIN_CSS;
  document.head.appendChild(el);
}

function pinAccessibilityButton() {
  const btn = document.getElementById("INDmenu-btn");
  if (!btn) return false;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const scale = isMobile ? "0.55" : "0.5";

  btn.style.setProperty("position", "fixed", "important");
  btn.style.setProperty("display", "flex", "important");
  btn.style.setProperty("visibility", "visible", "important");
  btn.style.setProperty("opacity", "1", "important");
  btn.style.setProperty("pointer-events", "auto", "important");
  btn.style.setProperty("margin-top", "0", "important");
  btn.style.setProperty("top", "auto", "important");
  btn.style.setProperty("bottom", FLOATING_BOTTOM, "important");
  btn.style.setProperty("left", "auto", "important");
  btn.style.setProperty("right", FLOATING_INSET_END, "important");
  btn.style.setProperty("transform-origin", "bottom right", "important");
  btn.style.setProperty("z-index", "2147483647", "important");
  btn.style.setProperty("--indscale", scale, "important");
  btn.style.setProperty("transform", `scale(${scale})`, "important");

  const wrap = document.getElementById("INDWrap");
  if (wrap) {
    wrap.style.setProperty("transform", "none", "important");
    wrap.style.setProperty("position", "fixed", "important");
    wrap.style.setProperty("top", "auto", "important");
    wrap.style.setProperty("margin-top", "0", "important");
    wrap.style.setProperty("bottom", "0", "important");
    wrap.style.setProperty("left", "auto", "important");
    wrap.style.setProperty("right", "0", "important");
    wrap.style.setProperty("width", "auto", "important");
    wrap.style.setProperty("height", "auto", "important");
    wrap.style.setProperty("overflow", "visible", "important");
    wrap.style.setProperty("pointer-events", "none", "important");
    wrap.style.setProperty("z-index", "2147483646", "important");
  }

  return true;
}

function startPinWatchers() {
  ensurePinStyles();
  pinAccessibilityButton();

  if (!window.__jtIndBtnObserver) {
    window.__jtIndBtnObserver = new MutationObserver(() => {
      pinAccessibilityButton();
    });
    window.__jtIndBtnObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });
  }

  if (!window.__jtIndPinInterval) {
    window.__jtIndPinInterval = setInterval(pinAccessibilityButton, 500);
  }

  let frames = 0;
  const rafPin = () => {
    pinAccessibilityButton();
    frames += 1;
    if (frames < 240) {
      window.__jtIndRafId = requestAnimationFrame(rafPin);
    }
  };
  if (window.__jtIndRafId) cancelAnimationFrame(window.__jtIndRafId);
  window.__jtIndRafId = requestAnimationFrame(rafPin);
}

function loadEqualWebScript(onReady: () => void) {
  const existing = document.querySelector<HTMLScriptElement>(
    'script[data-jt-equalweb="true"]',
  );
  if (existing) {
    if (existing.dataset.loaded === "true") onReady();
    else existing.addEventListener("load", onReady, { once: true });
    return;
  }

  const script = document.createElement("script");
  script.src = SCRIPT_URL;
  script.defer = true;
  script.crossOrigin = "anonymous";
  script.integrity = SCRIPT_INTEGRITY;
  script.setAttribute("data-cfasync", "true");
  script.dataset.jtEqualweb = "true";
  script.onload = () => {
    script.dataset.loaded = "true";
    onReady();
  };
  script.onerror = () => {
    const fallback = document.createElement("script");
    fallback.src = SCRIPT_URL;
    fallback.defer = true;
    fallback.crossOrigin = "anonymous";
    fallback.dataset.jtEqualweb = "true";
    fallback.onload = () => {
      fallback.dataset.loaded = "true";
      onReady();
    };
    document.body.appendChild(fallback);
  };
  document.body.appendChild(script);
}

function initEqualWeb() {
  if (window.__jtEqualWebInit) return;
  window.__jtEqualWebInit = true;

  window.interdeal = {
    get sitekey() {
      return SITE_KEY;
    },
    get domains() {
      return {
        js: "https://cdn.equalweb.com/",
        acc: "https://access.equalweb.com/",
      };
    },
    Position: "right",
    Menulang: "HE",
    draggable: false,
    btnStyle: {
      // [desktop, mobile] — ערך ראשון = מלמעלה בדסקטופ; שני = מלמטה במובייל. 100% = תחתית בדסקטופ.
      vPosition: ["100%", "1.5rem"],
      margin: ["0", "0"],
      scale: [0.5, 0.55],
      color: {
        main: "#0a51f2",
        second: "#ffffff",
      },
      icon: {
        outline: false,
        outlineColor: "#ffffff",
        type: 11,
        shape: "circle",
      },
    },
  };

  startPinWatchers();

  loadEqualWebScript(() => {
    [0, 100, 300, 700, 1500, 3000, 5000].forEach((ms) => {
      setTimeout(startPinWatchers, ms);
    });
  });
}

export default function EqualWeb() {
  useEffect(() => {
    initEqualWeb();
    const onResize = () => pinAccessibilityButton();
    const onScroll = () => pinAccessibilityButton();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      if (window.__jtIndPinInterval) {
        clearInterval(window.__jtIndPinInterval);
        window.__jtIndPinInterval = undefined;
      }
      if (window.__jtIndBtnObserver) {
        window.__jtIndBtnObserver.disconnect();
        window.__jtIndBtnObserver = undefined;
      }
      if (window.__jtIndRafId) {
        cancelAnimationFrame(window.__jtIndRafId);
        window.__jtIndRafId = undefined;
      }
    };
  }, []);

  return null;
}
