import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  ExternalLink,
} from "lucide-react";

import { projects } from "@/data/projects";

import styles from "./ProjectPage.module.css";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = projects.find(
    (item) => item.slug === slug
  );

  if (!project) {
    return {
      title: "Projeto não encontrado",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const projectUrl =
    `/projetos/${project.slug}`;

  const socialImage = project.image
    ? [
        {
          url: project.image,
          alt: `Projeto ${project.title} desenvolvido por Jefferson Lopes`,
        },
      ]
    : undefined;

  return {
    title: project.title,

    description:
      project.description,

    alternates: {
      canonical: projectUrl,
    },

    openGraph: {
      title: `${project.title} | Jefferson Lopes`,

      description:
        project.description,

      url: projectUrl,

      siteName: "Jefferson Lopes",

      locale: "pt_BR",

      type: "article",

      images: socialImage,
    },

    twitter: {
      card: project.image
        ? "summary_large_image"
        : "summary",

      title: `${project.title} | Jefferson Lopes`,

      description:
        project.description,

      images: project.image
        ? [project.image]
        : undefined,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const currentIndex = projects.findIndex(
    (item) => item.slug === slug
  );

  if (currentIndex === -1) {
    notFound();
  }

  const project =
    projects[currentIndex];

  const previousProject =
    currentIndex > 0
      ? projects[currentIndex - 1]
      : null;

  const nextProject =
    currentIndex <
    projects.length - 1
      ? projects[currentIndex + 1]
      : null;

  return (
    <article className={styles.page}>
      <div className={styles.container}>
        <Link
          href="/projetos"
          className={styles.back}
        >
          <ArrowLeft
            size={17}
            aria-hidden="true"
          />

          Todos os projetos
        </Link>

        <header className={styles.hero}>
          <div className={styles.meta}>
            <span>
              {project.number} /{" "}
              {projects.length
                .toString()
                .padStart(2, "0")}
            </span>

            <span>
              {project.type}
            </span>
          </div>

          <h1>
            {project.title}
          </h1>

          <div
            className={
              styles.heroBottom
            }
          >
            <p>
              {project.description}
            </p>

            {(project.demoUrl ||
              project.githubUrl) && (
              <div
                className={
                  styles.actions
                }
              >
                {project.demoUrl && (
                  <a
                    href={
                      project.demoUrl
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ver projeto

                    <ExternalLink
                      size={17}
                      aria-hidden="true"
                    />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={
                      project.githubUrl
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub

                    <Code2
                      size={17}
                      aria-hidden="true"
                    />
                  </a>
                )}
              </div>
            )}
          </div>
        </header>

        <section
          className={styles.cover}
          aria-label={`Imagem de apresentação do projeto ${project.title}`}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={`Projeto ${project.title}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1440px"
              className={
                styles.coverImage
              }
            />
          ) : (
            <div
              className={
                styles.placeholder
              }
            >
              <span>
                {project.number}
              </span>

              <strong>
                {project.title}
              </strong>
            </div>
          )}
        </section>

        <section
          className={styles.case}
        >
          <div
            className={
              styles.caseLabel
            }
          >
            <span>CASE</span>

            <span
              className={styles.line}
            />
          </div>

          <div
            className={
              styles.caseGrid
            }
          >
            <div
              className={
                styles.caseBlock
              }
            >
              <span
                className={
                  styles.caseNumber
                }
              >
                01
              </span>

              <h2>
                O desafio
              </h2>

              <p>
                {project.challenge ??
                  "Os detalhes deste projeto serão adicionados em breve."}
              </p>
            </div>

            <div
              className={
                styles.caseBlock
              }
            >
              <span
                className={
                  styles.caseNumber
                }
              >
                02
              </span>

              <h2>
                A solução
              </h2>

              <p>
                {project.solution ??
                  "Os detalhes desta solução serão adicionados em breve."}
              </p>
            </div>
          </div>
        </section>

        {project.technologies &&
          project.technologies.length >
            0 && (
            <section
              className={
                styles.technologies
              }
            >
              <span
                className={
                  styles.sectionLabel
                }
              >
                Tecnologias
              </span>

              <div
                className={
                  styles.techList
                }
              >
                {project.technologies.map(
                  (
                    technology
                  ) => (
                    <span
                      key={
                        technology
                      }
                    >
                      {
                        technology
                      }
                    </span>
                  )
                )}
              </div>
            </section>
          )}

        <nav
          className={
            styles.projectNavigation
          }
          aria-label="Navegação entre projetos"
        >
          <div
            className={
              styles.navigationSide
            }
          >
            {previousProject ? (
              <Link
                href={`/projetos/${previousProject.slug}`}
                className={
                  styles.projectNavLink
                }
              >
                <span
                  className={
                    styles.navDirection
                  }
                >
                  <ArrowLeft
                    size={16}
                    aria-hidden="true"
                  />

                  Projeto anterior
                </span>

                <strong>
                  {
                    previousProject.title
                  }
                </strong>
              </Link>
            ) : (
              <div
                className={
                  styles.navPlaceholder
                }
                aria-hidden="true"
              />
            )}
          </div>

          <Link
            href="/projetos"
            className={
              styles.allProjects
            }
          >
            Todos
            <span>
              os projetos
            </span>
          </Link>

          <div
            className={`${styles.navigationSide} ${styles.navigationRight}`}
          >
            {nextProject ? (
              <Link
                href={`/projetos/${nextProject.slug}`}
                className={`${styles.projectNavLink} ${styles.nextLink}`}
              >
                <span
                  className={
                    styles.navDirection
                  }
                >
                  Próximo projeto

                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                  />
                </span>

                <strong>
                  {
                    nextProject.title
                  }
                </strong>
              </Link>
            ) : (
              <div
                className={
                  styles.navPlaceholder
                }
                aria-hidden="true"
              />
            )}
          </div>
        </nav>

        <section
          className={
            styles.contactCTA
          }
        >
          <span>
            Gostou do projeto?
          </span>

          <Link href="/#contato">
            Vamos conversar

            <ArrowUpRight
              size={24}
              aria-hidden="true"
            />
          </Link>
        </section>
      </div>
    </article>
  );
}