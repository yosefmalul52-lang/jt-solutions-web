import Script from "next/script";

/**
 * EqualWeb accessibility widget for jt-solutions.org
 * @see https://login.equalweb.com/custom-button
 */
const equalWebBootstrap = `
window.interdeal = {
  get sitekey() { return "925c8c9ec3014adac0359dd896ccd5f5"; },
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
    vPosition: [undefined, "1.25rem"],
    margin: ["0", "0"],
    scale: [0.5, 0.38],
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

(function injectIndPinStyles() {
  var css =
    "#INDmenu-btn{position:fixed!important;top:unset!important;left:auto!important;" +
    "right:max(0.75rem,env(safe-area-inset-right,0px))!important;" +
    "bottom:max(1.25rem,env(safe-area-inset-bottom,0px))!important;" +
    "transform-origin:bottom right!important;z-index:2147483646!important;}" +
    "@media (max-width:768px){#INDmenu-btn{--indscale:0.38!important;" +
    "transform:scale(0.38)!important;padding:8px!important;}}";
  var el = document.getElementById("jt-ind-pin-style");
  if (!el) {
    el = document.createElement("style");
    el.id = "jt-ind-pin-style";
    el.textContent = css;
    document.head.appendChild(el);
  }
})();

(function pinEqualWebBtnBottom() {
  var mq = window.matchMedia("(max-width: 768px)");

  function apply() {
    var btn = document.getElementById("INDmenu-btn");
    if (!btn) return;

    var isMobile = mq.matches;
    var scale = isMobile ? "0.38" : "0.5";
    var bottom = "max(1.25rem, env(safe-area-inset-bottom, 0px))";
    var right = "max(0.75rem, env(safe-area-inset-right, 0px))";

    btn.style.removeProperty("top");
    btn.style.setProperty("position", "fixed", "important");
    btn.style.setProperty("top", "auto", "important");
    btn.style.setProperty("bottom", bottom, "important");
    btn.style.setProperty("left", "auto", "important");
    btn.style.setProperty("right", right, "important");
    btn.style.setProperty("--indscale", scale, "important");
    btn.style.setProperty("transform", "scale(" + scale + ")", "important");
    btn.style.setProperty("transform-origin", "bottom right", "important");
    btn.style.setProperty("z-index", "2147483646", "important");

    if (isMobile) btn.style.setProperty("padding", "8px", "important");

    var wrap = document.getElementById("INDWrap");
    if (wrap) {
      wrap.style.setProperty("position", "fixed", "important");
      wrap.style.setProperty("top", "auto", "important");
      wrap.style.setProperty("bottom", "0", "important");
      wrap.style.setProperty("left", "0", "important");
      wrap.style.setProperty("right", "0", "important");
      wrap.style.setProperty("height", "0", "important");
      wrap.style.setProperty("pointer-events", "none", "important");
      btn.style.setProperty("pointer-events", "auto", "important");
    }
  }

  function startWatchers() {
    apply();
    var ticks = 0;
    var rafId = function tick() {
      apply();
      ticks += 1;
      if (ticks < 180) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    if (!window.__jtIndPinInterval) {
      window.__jtIndPinInterval = setInterval(apply, 400);
    }
  }

  startWatchers();
  window.addEventListener("resize", apply);
  document.addEventListener("DOMContentLoaded", startWatchers);
  new MutationObserver(apply).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["style", "class"],
  });
})();

(function loadEqualWeb() {
  var doc = document;
  var head = doc.head;
  var body = doc.body;
  var coreCall = doc.createElement("script");
  coreCall.src = interdeal.domains.js + "core/5.2.8/accessibility.js";
  coreCall.defer = true;
  coreCall.integrity =
    "sha512-ka0NgF7zDksnhoZ5ZCKlm+t0F7KTih5lCfXwuzQDnrwu/EdKZSsJotoJvQPd0cuVmV63s0q2cgoUjeki688PuQ==";
  coreCall.crossOrigin = "anonymous";
  coreCall.setAttribute("data-cfasync", "true");
  coreCall.onload = function () {
    setTimeout(function () {
      document.dispatchEvent(new Event("jt-ind-loaded"));
    }, 50);
  };
  body ? body.appendChild(coreCall) : head.appendChild(coreCall);
  document.addEventListener("jt-ind-loaded", function () {
    var el = document.getElementById("jt-ind-pin-style");
    if (el) document.head.appendChild(el);
  });
})(document, document.head, document.body);
`.trim();

export default function EqualWeb() {
  return (
    <Script
      id="equalweb-accessibility"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: equalWebBootstrap }}
    />
  );
}
