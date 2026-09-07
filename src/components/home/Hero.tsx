"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import styles from "./Hero.module.css";

const areas = [
  "Websites",
  "Sistemas",
  "Automações",
  "Educação",
  "Games",
];

const projects = [
  {
    number: "01",
    title: "InclusivaMente",
    category: "Website institucional",
    featured: true,
  },
  {
    number: "02",
    title: "Segurança Web",
    category: "Game educacional",
  },
  {
    number: "03",
    title: "Automação Excel",
    category: "Sistema & automação",
  },
];

const titleContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.15,
    },
  },
};

const titleLine = {
  hidden: {
    y: "110%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const projectsY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const projectsRotate = useTransform(scrollYProgress, [0, 1], [0, -2]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.45]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <motion.div
        className={styles.glow}
        aria-hidden="true"
        style={
          reduceMotion
            ? undefined
            : {
                scale: glowScale,
                opacity: glowOpacity,
              }
        }
      />

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          style={reduceMotion ? undefined : { y: contentY }}
        >
          <motion.div
            className={styles.eyebrow}
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
          >
            <span className={styles.status} />

            <span>
              Desenvolvimento web • automação • educação
            </span>
          </motion.div>

          <motion.h1
            className={styles.title}
            variants={titleContainer}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
          >
            <span className={styles.titleClip}>
              <motion.span variants={titleLine}>
                Transformo
              </motion.span>
            </span>

            <span className={styles.titleClip}>
              <motion.span variants={titleLine}>
                ideias em
              </motion.span>
            </span>

            <span className={styles.titleClip}>
              <motion.span
                className={styles.accent}
                variants={titleLine}
              >
                soluções
              </motion.span>
            </span>

            <span className={styles.titleClip}>
              <motion.span
                className={styles.accent}
                variants={titleLine}
              >
                digitais.
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            className={styles.description}
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.65,
            }}
          >
            Sites, sistemas, automações e experiências digitais para
            negócios, profissionais e projetos educacionais.
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.78,
            }}
          >
            <Link href="#projetos" className={styles.primaryButton}>
              Explorar projetos
              <ArrowDown size={18} />
            </Link>

            <Link href="#contato" className={styles.secondaryButton}>
              Tenho uma ideia
              <ArrowUpRight size={17} />
            </Link>
          </motion.div>

          <motion.div
            className={styles.stats}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.9,
            }}
          >
            <div>
              <strong>10+</strong>
              <span>Projetos desenvolvidos</span>
            </div>

            <div>
              <strong>5</strong>
              <span>Áreas de atuação</span>
            </div>

            <div>
              <strong>∞</strong>
              <span>Possibilidades de criar</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.projects}
          style={
            reduceMotion
              ? undefined
              : {
                  y: projectsY,
                  rotate: projectsRotate,
                }
          }
        >
          <motion.div
            className={styles.projectsLabel}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.5,
            }}
          >
            <span className={styles.status} />
            Projeto em destaque
          </motion.div>

          <div className={styles.projectStack}>
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                className={`${styles.projectCard} ${
                  project.featured ? styles.featured : ""
                }`}
                style={
                  {
                    "--index": index,
                  } as React.CSSProperties
                }
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: 90,
                        y: 30,
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                transition={{
                  duration: 0.85,
                  delay: 0.4 + index * 0.12,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                <div className={styles.cardTop}>
                  <span>{project.number} / 05</span>
                  <ArrowUpRight size={18} />
                </div>

                <div className={styles.preview}>
                  <span>{project.title}</span>
                </div>

                <div className={styles.cardContent}>
                  <h2>{project.title}</h2>
                  <p>{project.category}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className={styles.areas}
        initial={reduceMotion ? false : { opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.05,
        }}
      >
        {areas.map((area) => (
          <span key={area}>{area}</span>
        ))}
      </motion.div>
    </section>
  );
}