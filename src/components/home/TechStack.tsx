"use client";

import { motion, useReducedMotion } from "motion/react";

import styles from "./TechStack.module.css";

const technologies = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Flask",
  "PHP",
  "MySQL",
  "PostgreSQL",
  "SQL Server",
];

const groups = [
  {
    title: "Frontend",
    items: ["JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Python", "Flask", "PHP"],
  },
  {
    title: "Dados",
    items: ["MySQL", "PostgreSQL", "SQL Server"],
  },
];

export default function TechStack() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.label}>
          <span>08</span>
          <span className={styles.line} />
          <span>Tecnologias</span>
        </div>

        <div className={styles.heading}>
          <h2>
            Ferramentas mudam.
            <span> Resolver continua.</span>
          </h2>

          <p>
            Escolho a tecnologia de acordo com o problema, a manutenção
            necessária e a realidade de cada projeto.
          </p>
        </div>
      </div>

      <div className={styles.marquee} aria-hidden="true">
        <motion.div
          className={styles.track}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: ["0%", "-50%"],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 22,
                  ease: "linear",
                  repeat: Infinity,
                }
          }
        >
          {[...technologies, ...technologies].map((technology, index) => (
            <span key={`${technology}-${index}`}>
              {technology}
              <strong>✳</strong>
            </span>
          ))}
        </motion.div>
      </div>

      <div className={styles.container}>
        <div className={styles.groups}>
          {groups.map((group, index) => (
            <motion.article
              key={group.title}
              className={styles.group}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 35,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.5,
              }}
              transition={{
                duration: 0.65,
                delay: index * 0.08,
              }}
            >
              <span className={styles.number}>
                0{index + 1}
              </span>

              <h3>{group.title}</h3>

              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}