import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ai.rekhagyan.online";
  const currentDate = new Date().toISOString();

  const routes = [
    "",
    "/ask-rekha",
    "/about",
    "/blog",
    "/contact",
    "/disclaimer",
    "/privacy-policy",
    "/terms-and-conditions",
    "/refund-policy",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" || route === "/ask-rekha" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/ask-rekha" ? 0.9 : 0.7,
  }));
}
