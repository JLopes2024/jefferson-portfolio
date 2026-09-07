"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import styles from "./Manifesto.module.css";

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const firstLineX = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [-80, 0, 70]
  );

  const secondLineX = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [80, 0, -70]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [0.94, 1, 1.04]
  );

  return (
    <section ref={sectionRef} className={styles.manifesto}>
      <div className={styles.sticky}>
        <motion.div
          className={styles.content}
          style={
            reduceMotion
              ? undefined
              : {
                  opacity,
                  scale,
                }
          }
        >
          <div className={styles.label}>
            <span>02</span>
            <span className={styles.line} />
            <span>Manifesto</span>
          </div>

          <div className={styles.statement}>
            <motion.div
              className={styles.row}
              style={reduceMotion ? undefined : { x: firstLineX }}
            >
              <span>Não é sobre</span>
            </motion.div>

            <motion.div
              className={`${styles.row} ${styles.muted}`}
              style={reduceMotion ? undefined : { x: secondLineX }}
            >
              <span>usar tecnologia.</span>
            </motion.div>

            <motion.div
              className={`${styles.row} ${styles.highlight}`}
              style={reduceMotion ? undefined : { x: firstLineX }}
            >
              <span>É sobre</span>
            </motion.div>

            <motion.div
              className={`${styles.row} ${styles.highlight}`}
              style={reduceMotion ? undefined : { x: secondLineX }}
            >
              <span>resolver algo.</span>
            </motion.div>
          </div>

          <motion.p
            className={styles.description}
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{
              duration: 0.7,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            Sites, sistemas, automações e experiências educacionais
            são meios. O ponto de partida é entender o problema.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}