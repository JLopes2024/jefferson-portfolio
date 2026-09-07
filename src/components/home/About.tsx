"use client";

import { motion, useReducedMotion } from "motion/react";

import styles from "./About.module.css";

const pillars = [
  {
    number: "01",
    title: "Educação",
    text: "Experiência com ensino, metodologias ativas, projetos integradores e desenvolvimento de experiências de aprendizagem.",
  },
  {
    number: "02",
    title: "Tecnologia",
    text: "Formação em Tecnologia da Informação e uso de ferramentas digitais para transformar ideias e processos.",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    text: "Criação de sites, aplicações web, automações, games e soluções digitais voltadas a necessidades reais.",
  },
];

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="sobre" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.label}>
          <span>07</span>
          <span className={styles.line} />
          <span>Sobre Jefferson</span>
        </div>

        <div className={styles.intro}>
          <motion.h2
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 50,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            Minha trajetória não começou
            <span> escrevendo código.</span>
          </motion.h2>

          <motion.div
            className={styles.story}
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
              amount: 0.4,
            }}
            transition={{
              duration: 0.75,
              delay: 0.12,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <p>
              Começou tentando encontrar formas melhores de ensinar,
              criar e resolver problemas.
            </p>

            <p>
              Com o tempo, educação, tecnologia e desenvolvimento
              começaram a se encontrar. Hoje uso essa combinação para
              criar sites, sistemas, automações e experiências digitais
              que precisam ser úteis antes de serem apenas tecnicamente
              interessantes.
            </p>
          </motion.div>
        </div>

        <div className={styles.intersection}>
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            EDUCAÇÃO
          </motion.span>

          <span className={styles.symbol}>×</span>

          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.65,
              delay: 0.1,
            }}
          >
            TECNOLOGIA
          </motion.span>

          <span className={styles.symbol}>×</span>

          <motion.span
            initial={reduceMotion ? false : { opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.65,
              delay: 0.2,
            }}
          >
            DESENVOLVIMENTO
          </motion.span>
        </div>

        <div className={styles.pillars}>
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.number}
              className={styles.pillar}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 40,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.65,
                delay: index * 0.08,
              }}
            >
              <span className={styles.number}>
                {pillar.number}
              </span>

              <h3>{pillar.title}</h3>

              <p>{pillar.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}