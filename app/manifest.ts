import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Onochu",
    short_name: "Onochu",
    description: "Taste archive for sharing recommendations across platforms.",
    start_url: "/",
    display: "standalone",
    background_color: "#EBE6D8",
    theme_color: "#C15843",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    share_target: {
      action: "/recommendations/new",
      method: "GET",
      enctype: "application/x-www-form-urlencoded",
      params: {
        title: "title",
        text: "text",
        url: "url",
      },
    },
  };
}
