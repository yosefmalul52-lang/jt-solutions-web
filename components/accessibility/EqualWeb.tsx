"use client";

import { useEffect } from "react";

const SITE_KEY = "925c8c9ec3014adac0359dd896ccd5f5";
const SCRIPT_URL = "https://cdn.equalweb.com/core/5.2.8/accessibility.js";
const SCRIPT_INTEGRITY =
  "sha512-ka0NgF7zDksnhoZ5ZCKlm+t0F7KTih5lCfXwuzQDnrwu/EdKZSsJotoJvQPd0cuVmV63s0q2cgoUjeki688PuQ==";
const PIN_STYLE_ID = "jt-ind-pin-style";

const PIN_CSS = `
#INDmenu-btn,
#INDmenu-btn.INDmenu-btn{
  position:fixed!important;
  display:flex!important;
  visibility:visible!important;
  opacity:1!important;
  pointer-events:auto!important;
  top:auto!important;
  bottom:max(1.25rem,env(safe-area-inset-bottom,0px))!important;
  left:auto!important;
  right:max(0.75rem,env(safe-area-inset-right,0px))!important;
  transform-origin:bottom right!important;
  z-index:2147483647!important;
}
@media (max-width:768px){
  #INDmenu-btn,#INDmenu-btn.INDmenu-btn{
    top:50%!important;
    bottom:auto!important;
    --indscale:0.55!important;
    transform:translateY(-50%) scale(0.55)!important;
    transform-origin:center right!important;
  }
}
@media (min-width:769px){
  #INDmenu-btn,#INDmenu-btn.INDmenu-btn{
    --indscale:0.5!important;
    transform:scale(0.5)!important;
  }
}
#INDWrap{
  position:fixed!important;
  inset:auto 0 0 auto!important;
  width:auto!important;
  height:auto!important;
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
  const bottom = "max(1.25rem, env(safe-area-inset-bottom, 0px))";
  const right = "max(0.75rem, env(safe-area-inset-right, 0px))";

  btn.style.setProperty("position", "fixed", "important");
  btn.style.setProperty("display", "flex", "important");
  btn.style.setProperty("visibility", "visible", "important");
  btn.style.setProperty("opacity", "1", "important");
  btn.style.setProperty("pointer-events", "auto", "important");
  btn.style.setProperty("left", "auto", "important");
  btn.style.setProperty("right", right, "important");
  btn.style.setProperty("z-index", "2147483647", "important");
  btn.style.setProperty("--indscale", scale, "important");

  if (isMobile) {
    btn.style.removeProperty("bottom");
    btn.style.setProperty("top", "50%", "important");
    btn.style.setProperty("bottom", "auto", "important");
    btn.style.setProperty("transform-origin", "center right", "important");
    btn.style.setProperty("transform", `translateY(-50%) scale(${scale})`, "important");
  } else {
    btn.style.removeProperty("top");
    btn.style.setProperty("top", "auto", "important");
    btn.style.setProperty("bottom", bottom, "important");
    btn.style.setProperty("transform-origin", "bottom right", "important");
    btn.style.setProperty("transform", `scale(${scale})`, "important");
  }

  const wrap = document.getElementById("INDWrap");
  if (wrap) {
    wrap.style.setProperty("position", "fixed", "important");
    wrap.style.setProperty("left", "auto", "important");
    wrap.style.setProperty("right", "0", "important");
    wrap.style.setProperty("width", "auto", "important");
    wrap.style.setProperty("height", "auto", "important");
    wrap.style.setProperty("overflow", "visible", "important");
    wrap.style.setProperty("pointer-events", "none", "important");
    wrap.style.setProperty("z-index", "2147483646", "important");
    if (isMobile) {
      wrap.style.setProperty("top", "50%", "important");
      wrap.style.setProperty("bottom", "auto", "important");
      wrap.style.setProperty("transform", "translateY(-50%)", "important");
    } else {
      wrap.style.removeProperty("transform");
      wrap.style.setProperty("top", "auto", "important");
      wrap.style.setProperty("bottom", "0", "important");
    }
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
      vPosition: ["100%", "50%"],
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
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
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
