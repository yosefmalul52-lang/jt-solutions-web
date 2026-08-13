import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JT Solutions",
    short_name: "JT Solutions",
    description: "תשתית דיגיטלית לפניות מסודרות - אתר, מדידה ומעקב",
    start_url: "/",
    display: "standalone",
    background_color: "#F9FAFB",
    theme_color: "#F9FAFB",
    lang: "he",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
