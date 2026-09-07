"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import {
  projects,
  type ProjectCategory,
} from "@/data/projects";

import styles from "./ProjectsExplorer.module.css";

type Filter = "todos" | ProjectCategory;

const filters: {
  value: Filter;
  label: string;
}[] = [
  {
    value: "todos",
    label: "Todos",
  },
  {
    value: "clientes",
    label: "Clientes",
  },
  {
    value: "sistemas",
    label: "Sistemas",
  },
  {
    value: "educacao",
    label: "Educação & Games",
  },
];

export default function ProjectsExplorer() {
  const [activeFilter, setActiveFilter] =
    useState<Filter>("todos");

  const reduceMotion = useReducedMotion();

  const filteredProjects = useMemo(() => {
    if (activeFilter === "todos") {
      return projects;
    }

    return projects.filter(
      (project) =>
        project.category === activeFilter
    );
  }, [activeFilter]);

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <Link
          href="/"
          className={styles.back}
        >
          <ArrowLeft
            size={17}
            aria-hidden="true"
          />

          Voltar para Home
        </Link>

        <header className={styles.hero}>
          <div className={styles.label}>
            <span>PORTFÓLIO</span>

            <span className={styles.line} />

            <span>Jefferson Lopes</span>
          </div>

          <motion.h1
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 50,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            Todos os
            <span> projetos.</span>
          </motion.h1>

          <div className={styles.heroBottom}>
            <p>
              Sites, sistemas, automações e
              experiências educacionais criadas
              para diferentes contextos, públicos
              e necessidades.
            </p>

            <strong>
              {projects.length
                .toString()
                .padStart(2, "0")}

              <span>projetos</span>
            </strong>
          </div>
        </header>

        <div className={styles.filters}>
          <div
            className={styles.filterButtons}
            role="group"
            aria-label="Filtrar projetos"
          >
            {filters.map((filter) => {
              const active =
                activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  className={`${styles.filterButton} ${
                    active
                      ? styles.active
                      : ""
                  }`}
                  onClick={() =>
                    setActiveFilter(
                      filter.value
                    )
                  }
                  aria-pressed={active}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <span
            className={styles.resultCount}
            aria-live="polite"
          >
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1
              ? "projeto"
              : "projetos"}
          </span>
        </div>

        <motion.div
          layout
          className={styles.grid}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map(
              (project) => (
                <motion.article
                  layout
                  key={project.slug}
                  className={styles.card}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 30,
                          scale: 0.98,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 0,
                          scale: 0.96,
                        }
                  }
                  transition={{
                    duration: 0.4,
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
                      styles.cardHeader
                    }
                  >
                    <div>
                      <span
                        className={
                          styles.number
                        }
                      >
                        {project.number}
                      </span>

                      <span
                        className={
                          styles.type
                        }
                      >
                        {project.type}
                      </span>
                    </div>

                    <span
                      className={
                        styles.arrow
                      }
                      aria-hidden="true"
                    >
                      <ArrowUpRight
                        size={21}
                        strokeWidth={1.4}
                      />
                    </span>
                  </div>

                  <div
                    className={styles.visual}
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`Projeto ${project.title}`}
                        fill
                        sizes="
                          (max-width: 700px) 100vw,
                          (max-width: 1100px) 50vw,
                          50vw
                        "
                        className={
                          styles.image
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
                  </div>

                  <div
                    className={
                      styles.cardContent
                    }
                  >
                    <h2>
                      {project.title}
                    </h2>

                    <p>
                      {project.description}
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
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}