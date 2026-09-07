"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

import { contact } from "@/data/contact";
import styles from "./Footer.module.css";

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <Link
            href="/"
            className={styles.brand}
            aria-label="Jefferson Lopes - início"
          >
            JEFFERSON LOPES
            <span>.</span>
          </Link>

          <button
            type="button"
            className={styles.backToTop}
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
          >
            Voltar ao topo
            <span>
              <ArrowUp size={17} strokeWidth={1.5} />
            </span>
          </button>
        </div>

        <div className={styles.navigation}>
          <div className={styles.column}>
            <span className={styles.label}>Navegação</span>

       <Link href="/#projetos">Projetos</Link>
<Link href="/#servicos">Serviços</Link>
<Link href="/#sobre">Sobre</Link>
<Link href="/#contato">Contato</Link>
          </div>

          <div className={styles.column}>
            <span className={styles.label}>Contato</span>

            <a href={`mailto:${contact.email}`}>
              {contact.email}
            </a>

            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>

            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </div>

          <div className={styles.statement}>
            <span>São Paulo, Brasil</span>

            <p>
              Desenvolvimento web, sistemas, automações e
              experiências educacionais.
            </p>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            © {new Date().getFullYear()} Jefferson Lopes
          </span>

          <span>Desenvolvido com Next.js</span>
        </div>
      </div>
    </footer>
  );
}