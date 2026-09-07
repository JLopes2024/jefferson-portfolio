"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";

import styles from "./Header.module.css";

const navigation = [
  { number: "01", label: "Projetos", href: "/#projetos" },
  { number: "02", label: "Serviços", href: "/#servicos" },
  { number: "03", label: "Sobre", href: "/#sobre" },
  { number: "04", label: "Contato", href: "/#contato" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  function openMenu() {
    setIsOpen(true);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const overlay = overlayRef.current;

      if (!overlay) {
        return;
      }

      const focusableElements = Array.from(
        overlay.querySelectorAll<HTMLElement>(
          [
            "a[href]",
            "button:not([disabled])",
            "[tabindex]:not([tabindex='-1'])",
          ].join(",")
        )
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !== "true"
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1];

      const activeElement = document.activeElement;

      if (
        event.shiftKey &&
        activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      }

      if (
        !event.shiftKey &&
        activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);

      document.body.style.overflow = previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      menuButtonRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <header className={styles.header}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="Jefferson Lopes - início"
        >
          JEFFERSON LOPES
          <span className={styles.logoDot}>.</span>
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          className={styles.menuButton}
          onClick={openMenu}
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          aria-haspopup="dialog"
        >
          <span>MENU</span>

          <span
            className={styles.menuIcon}
            aria-hidden="true"
          >
            <span />
            <span />
          </span>
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={overlayRef}
            id="main-navigation"
            className={styles.overlay}
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.65,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <div className={styles.overlayHeader}>
              <span className={styles.logo}>
                JEFFERSON LOPES
                <span className={styles.logoDot}>.</span>
              </span>

              <button
                ref={closeButtonRef}
                type="button"
                className={styles.closeButton}
                onClick={closeMenu}
                aria-label="Fechar menu"
              >
                FECHAR

                <X
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </button>
            </div>

            <nav
              className={styles.navigation}
              aria-label="Navegação principal"
            >
              {navigation.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + index * 0.07,
                  }}
                >
                  <Link
                    href={item.href}
                    className={styles.navItem}
                    onClick={closeMenu}
                  >
                    <span className={styles.navNumber}>
                      {item.number}
                    </span>

                    <span className={styles.navLabel}>
                      {item.label}
                    </span>

                    <ArrowUpRight
                      className={styles.navArrow}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className={styles.overlayFooter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span>São Paulo, Brasil</span>

              <div className={styles.socials}>
                <a
                  href="https://www.linkedin.com/in/jefferson-lopes-silva"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>

                <a
                  href="https://github.com/JLopes2024"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}