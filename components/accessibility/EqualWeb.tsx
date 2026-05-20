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
    // EqualWeb: ערך ראשון = top בדסקטופ, שני = bottom במובייל — נכפה לתחתית ב-CSS/JS בכל המסכים
    vPosition: ["calc(100dvh - 5rem)", "1.25rem"],
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

(function (doc, head, body) {
  var coreCall = doc.createElement("script");
  coreCall.src = interdeal.domains.js + "core/5.2.8/accessibility.js";
  coreCall.defer = true;
  coreCall.integrity =
    "sha512-ka0NgF7zDksnhoZ5ZCKlm+t0F7KTih5lCfXwuzQDnrwu/EdKZSsJotoJvQPd0cuVmV63s0q2cgoUjeki688PuQ==";
  coreCall.crossOrigin = "anonymous";
  coreCall.setAttribute("data-cfasync", true);
  body ? body.appendChild(coreCall) : head.appendChild(coreCall);
})(document, document.head, document.body);

(function pinEqualWebBtnBottom() {
  function apply() {
    var btn = document.getElementById("INDmenu-btn");
    if (!btn) return;
    var isMobile = window.matchMedia("(max-width: 768px)").matches;
    var scale = isMobile ? "0.38" : "0.5";
    btn.style.setProperty("top", "auto", "important");
    btn.style.setProperty("bottom", "1.25rem", "important");
    btn.style.setProperty("left", "auto", "important");
    btn.style.setProperty("--indscale", scale, "important");
    btn.style.setProperty("transform", "scale(" + scale + ")", "important");
    btn.style.setProperty("transform-origin", "bottom right", "important");
    if (isMobile) btn.style.setProperty("padding", "8px", "important");
  }
  apply();
  window.addEventListener("resize", apply);
  document.addEventListener("DOMContentLoaded", apply);
  new MutationObserver(apply).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["style", "class"],
  });
  setInterval(apply, 1200);
})();
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
