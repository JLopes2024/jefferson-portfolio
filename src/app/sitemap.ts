import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap =
    [
      {
        url: siteConfig.url,
        changeFrequency:
          "monthly",
        priority: 1,
      },

      {
        url: `${siteConfig.url}/projetos`,
        changeFrequency:
          "monthly",
        priority: 0.9,
      },
    ];

  const projectPages: MetadataRoute.Sitemap =
    projects.map(
      (project) => ({
        url: `${siteConfig.url}/projetos/${project.slug}`,

        changeFrequency:
          "monthly",

        priority:
          project.featured
            ? 0.8
            : 0.7,
      })
    );

  return [
    ...staticPages,
    ...projectPages,
  ];
}