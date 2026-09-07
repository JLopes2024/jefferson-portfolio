import type { Metadata } from "next";

import ProjectsExplorer from "@/components/projects/ProjectsExplorer";

export const metadata: Metadata = {
  title: "Projetos",

  description:
    "Projetos de desenvolvimento web, sistemas, automações e experiências educacionais desenvolvidos por Jefferson Lopes.",

  alternates: {
    canonical: "/projetos",
  },

  openGraph: {
    title: "Projetos | Jefferson Lopes",

    description:
      "Sites, sistemas, automações e experiências digitais desenvolvidos para diferentes contextos e necessidades.",

    url: "/projetos",

    type: "website",
  },

  twitter: {
    card: "summary",

    title: "Projetos | Jefferson Lopes",

    description:
      "Sites, sistemas, automações e experiências digitais desenvolvidos por Jefferson Lopes.",
  },
};

export default function ProjectsPage() {
  return <ProjectsExplorer />;
}