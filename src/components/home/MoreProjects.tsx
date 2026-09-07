"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "motion/react";

import { moreProjects } from "@/data/projects";

import styles from "./MoreProjects.module.css";

export default function MoreProjects() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <div className={styles.label}>
            <span>06</span>

            <span className={styles.line} />

            <span>Mais projetos</span>
          </div>

          <div
            className={
              styles.headingContent
            }
          >
            <h2>
              Experimentos,
              <span>
                {" "}
                ideias e soluções.
              </span>
            </h2>

            <p>
              Nem todo projeto precisa ser
              grande para ensinar algo,
              resolver uma necessidade ou
              experimentar uma ideia.
            </p>
          </div>
        </div>

        <div className={styles.grid}>
          {moreProjects.map(
            (project, index) => (
              <motion.article
                key={project.slug}
                className={styles.card}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 45,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.65,
                  delay:
                    index * 0.06,
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
                    styles.cardLink
                  }
                  aria-label={`Ver projeto ${project.title}`}
                />

                <div
                  className={
                    styles.cardTop
                  }
                >
                  <span>
                    {project.number}
                  </span>

                  <span
                    className={
                      styles.arrow
                    }
                    aria-hidden="true"
                  >
                    <ArrowUpRight
                      size={22}
                      strokeWidth={1.4}
                    />
                  </span>
                </div>

                <div
                  className={
                    styles.visual
                  }
                >
                  <span>
                    {project.title}
                  </span>
                </div>

                <div
                  className={
                    styles.cardContent
                  }
                >
                  <span
                    className={
                      styles.type
                    }
                  >
                    {project.type}
                  </span>

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
              </motion.article>
            )
          )}
        </div>
      </div>
    </section>
  );
}