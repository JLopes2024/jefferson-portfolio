"use client";

import type { CSSProperties } from "react";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { featuredProjects } from "@/data/projects";

import styles from "./FeaturedProjects.module.css";

export default function FeaturedProjects() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="projetos"
      className={styles.section}
    >
      <div className={styles.container}>
        <div className={styles.heading}>
          <div className={styles.label}>
            <span>03</span>

            <span className={styles.line} />

            <span>
              Projetos selecionados
            </span>
          </div>

          <h2>
            Projetos com
            <span> propósito.</span>
          </h2>

          <p>
            Sites, sistemas e experiências
            criadas a partir de necessidades
            reais.
          </p>
        </div>

        <div className={styles.projects}>
          {featuredProjects.map(
            (project, index) => (
              <motion.article
                key={project.slug}
                className={styles.project}
                style={
                  {
                    "--project-index": index,
                  } as CSSProperties
                }
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 80,
                        scale: 0.97,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.75,
                  ease: [
                    0.76,
                    0,
                    0.24,
                    1,
                  ],
                }}
              >
                <Link
                  href={`/projetos/${project.slug}`}
                  className={
                    styles.projectLink
                  }
                  aria-label={`Ver case de ${project.title}`}
                />

                <div
                  className={
                    styles.projectHeader
                  }
                >
                  <div>
                    <span
                      className={
                        styles.number
                      }
                    >
                      {project.number} / 05
                    </span>

                    <p
                      className={
                        styles.type
                      }
                    >
                      {project.type}
                    </p>
                  </div>

                  <span
                    className={
                      styles.caseButton
                    }
                    aria-hidden="true"
                  >
                    <ArrowUpRight
                      size={22}
                      strokeWidth={1.5}
                    />
                  </span>
                </div>

                <div
                  className={
                    styles.projectBody
                  }
                >
                  <div
                    className={styles.info}
                  >
                    <h3>
                      {project.title}
                    </h3>

                    <p>
                      {
                        project.description
                      }
                    </p>

                    <div
                      className={
                        styles.tags
                      }
                    >
                      {project.tags.map(
                        (tag) => (
                          <span key={tag}>
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div
                    className={`${
                      styles.preview
                    } ${
                      styles[
                        `preview${
                          index + 1
                        }`
                      ]
                    }`}
                  >
                    {project.image ? (
                      <Image
                        src={
                          project.image
                        }
                        alt={`Projeto ${project.title}`}
                        fill
                        sizes="(max-width: 900px) 100vw, 60vw"
                        className={
                          styles.projectImage
                        }
                      />
                    ) : (
                      <>
                        <span
                          className={
                            styles.previewNumber
                          }
                        >
                          {
                            project.number
                          }
                        </span>

                        <span
                          className={
                            styles.previewTitle
                          }
                        >
                          {
                            project.title
                          }
                        </span>

                        <span
                          className={
                            styles.previewHint
                          }
                        >
                          imagem do projeto
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </motion.article>
            )
          )}
        </div>
      </div>
    </section>
  );
}