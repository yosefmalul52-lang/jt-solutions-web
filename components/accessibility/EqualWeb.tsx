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
  draggable: true,
  btnStyle: {
    // [desktop: CSS top, mobile: CSS bottom] — EqualWeb defaults: desktop=top, mobile=bottom
    vPosition: ["calc(100dvh - 5.5rem)", "5.5rem"],
    margin: ["0", "0"],
    scale: ["0.5", "0.5"],
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
