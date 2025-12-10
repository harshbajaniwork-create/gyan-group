import { MetadataRoute } from "next";
import { Navlinks } from "@/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.gyangroup.com";

  const routes: MetadataRoute.Sitemap = [];

  Navlinks.forEach((link) => {
    if (typeof link.href === "string") {
      routes.push({
        url: `${baseUrl}${link.href}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: link.href === "/" ? 1 : 0.8,
      });
    } else if (Array.isArray(link.href)) {
      link.href.forEach((subLink) => {
        routes.push({
          url: `${baseUrl}${subLink.href}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        });
      });
    }
  });

  return routes;
}
