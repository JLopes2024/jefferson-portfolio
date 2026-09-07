"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { createWhatsAppUrl } from "@/data/contact";
import styles from "./Needs.module.css";

const needs = [
  {
    number: "01",
    title: "Preciso de um site",
    description:
      "Landing page, site profissional, institucional ou presença digital para apresentar seu trabalho.",
    tag: "Web",
    message:
      "Olá Jefferson! Vi seu portfólio e gostaria de conversar sobre a criação de um site.",
  },
  {
    number: "02",
    title: "Quero automatizar uma tarefa",
    description:
      "Planilhas, dados ou processos repetitivos podem virar ferramentas mais rápidas e simples.",
    tag: "Automação",
    message:
      "Olá Jefferson! Vi seu portfólio e tenho uma tarefa ou processo que gostaria de automatizar.",
  },
  {
    number: "03",
    title: "Tenho uma ideia de aplicativo",
    description:
      "Podemos transformar uma necessidade em um MVP web simples, funcional e preparado para evoluir.",
    tag: "Sistemas",
    message:
      "Olá Jefferson! Vi seu portfólio e tenho uma ideia de aplicativo/sistema que gostaria de desenvolver.",
  },
  {
    number: "04",
    title: "Quero criar um projeto educacional",
    description:
      "Games, simuladores e experiências digitais para tornar conteúdos mais participativos.",
    tag: "Educação",
    message:
      "Olá Jefferson! Vi seu portfólio e gostaria de conversar sobre um projeto educacional digital.",
  },
];

export default function Needs() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <div className={styles.label}>
            <span>05</span>
            <span className={styles.line} />
            <span>Por onde começar?</span>
          </div>

          <h2>
            O que você
            <span> precisa?</span>
          </h2>

          <p>
            Você não precisa saber qual tecnologia usar. Podemos começar
            entendendo o problema.
          </p>
        </div>

        <div className={styles.list}>
          {needs.map((need, index) => (
            <motion.div
              key={need.number}
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
                duration: 0.65,
                delay: index * 0.06,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <a
                href={createWhatsAppUrl(need.message)}
                target="_blank"
                rel="noreferrer"
                className={styles.item}
              >
                <span className={styles.number}>
                  {need.number}
                </span>

                <div className={styles.content}>
                  <div className={styles.titleRow}>
                    <h3>{need.title}</h3>

                    <span className={styles.tag}>
                      {need.tag}
                    </span>
                  </div>

                  <p>{need.description}</p>
                </div>

                <span className={styles.arrow}>
                  <ArrowUpRight
                    size={30}
                    strokeWidth={1.3}
                  />
                </span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}