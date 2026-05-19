import Script from "next/script";

const JT_PIXEL_SRC = "http://localhost:3000/api/v1/pixel";
const JT_PIXEL_ID = "jt_live_prod_998877665544";

export default function JtPixel() {
  return (
    <Script
      id="jt-analytics-pixel"
      src={JT_PIXEL_SRC}
      strategy="afterInteractive"
      data-jt-id={JT_PIXEL_ID}
    />
  );
}
