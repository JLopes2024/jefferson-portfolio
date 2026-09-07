"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import styles from "./Services.module.css";

const services = [
  {
    number: "01",
    title: "Sites & Presença Digital",
    description:
      "Sites rápidos, responsivos e pensados para apresentar negócios, profissionais, projetos e organizações com clareza.",
    items: [
      "Landing pages",
      "Sites institucionais",
      "Portfólios",
      "Páginas de projetos",
    ],
  },
  {
    number: "02",
    title: "Sistemas & Automações",
    description:
      "Ferramentas digitais para simplificar processos, reduzir tarefas repetitivas e transformar rotinas manuais em soluções práticas.",
    items: [
      "Sistemas web",
      "Automação de planilhas",
      "Ferramentas internas",
      "PDV simples",
    ],
  },
  {
    number: "03",
    title: "Educação & Experiências",
    description:
      "Tecnologia aplicada à aprendizagem por meio de aplicações, jogos, simuladores e experiências digitais interativas.",
    items: [
      "Games educacionais",
      "Aplicações educacionais",
      "Gamificação",
      "Simuladores",
    ],
  },
];

export default function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="servicos" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <div className={styles.label}>
            <span>04</span>
            <span className={styles.line} />
            <span>O que posso criar</span>
          </div>

          <div className={styles.headingContent}>
            <h2>
              Tecnologia como
              <span> ferramenta.</span>
            </h2>

            <p>
              A solução depende do problema. Nem todo projeto precisa
              de uma aplicação complexa — às vezes uma página bem feita
              ou uma automação simples já resolve.
            </p>
          </div>
        </div>

        <div className={styles.services}>
          {services.map((service, index) => (
            <motion.article
              key={service.number}
              className={styles.service}
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
                amount: 0.3,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <div className={styles.serviceTop}>
                <span className={styles.number}>
                  {service.number}
                </span>

                <ArrowUpRight
                  className={styles.arrow}
                  size={32}
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
              </div>

              <div className={styles.serviceMain}>
                <h3>{service.title}</h3>

                <div className={styles.details}>
                  <p>{service.description}</p>

                  <ul>
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}