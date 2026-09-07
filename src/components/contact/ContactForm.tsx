"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  ArrowUpRight,
  Check,
  LoaderCircle,
} from "lucide-react";

import styles from "./ContactForm.module.css";

type SubmitState =
  | "idle"
  | "loading"
  | "success"
  | "error";

export default function ContactForm() {
  const [submitState, setSubmitState] =
    useState<SubmitState>("idle");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSubmitState("loading");

    try {
      const formData =
        new FormData(form);

      const body =
        new URLSearchParams();

      formData.forEach(
        (value, key) => {
          body.append(
            key,
            value.toString()
          );
        }
      );

      const response =
        await fetch("/", {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body: body.toString(),
        });

      if (!response.ok) {
        throw new Error(
          "Falha ao enviar formulário."
        );
      }

      form.reset();

      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <form
      name="portfolio-contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <input
        type="hidden"
        name="form-name"
        value="portfolio-contact"
      />

      <p className={styles.honeypot}>
        <label>
          Não preencha este campo:
          <input
            name="bot-field"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </p>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-name">
            Nome
          </label>

          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Seu nome"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-email">
            E-mail
          </label>

          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="voce@email.com"
            required
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-phone">
            WhatsApp
            <span> opcional</span>
          </label>

          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(11) 99999-9999"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="project-type">
            Sobre o que vamos falar?
          </label>

          <select
            id="project-type"
            name="projectType"
            defaultValue=""
            required
          >
            <option
              value=""
              disabled
            >
              Selecione
            </option>

            <option value="site">
              Site / Landing Page
            </option>

            <option value="system">
              Sistema / Aplicativo
            </option>

            <option value="automation">
              Automação
            </option>

            <option value="education">
              Projeto educacional
            </option>

            <option value="other">
              Outro
            </option>
          </select>
        </div>
      </div>

      <div
        className={`${styles.field} ${styles.messageField}`}
      >
        <label htmlFor="contact-message">
          Conte um pouco sobre sua ideia
        </label>

        <textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder="O que você precisa, qual problema quer resolver ou qual ideia pretende tirar do papel?"
          required
          minLength={10}
        />
      </div>

      <div className={styles.footer}>
        <div
          className={styles.feedback}
          aria-live="polite"
        >
          {submitState ===
            "success" && (
            <span
              className={
                styles.success
              }
            >
              <Check
                size={17}
                aria-hidden="true"
              />

              Mensagem enviada.
              Retorno assim que
              possível.
            </span>
          )}

          {submitState ===
            "error" && (
            <span
              className={styles.error}
            >
              Não consegui enviar
              agora. Você pode usar
              o WhatsApp ou e-mail.
            </span>
          )}
        </div>

        <button
          type="submit"
          className={styles.submit}
          disabled={
            submitState ===
            "loading"
          }
        >
          {submitState ===
          "loading" ? (
            <>
              Enviando

              <LoaderCircle
                size={19}
                className={
                  styles.spinner
                }
                aria-hidden="true"
              />
            </>
          ) : (
            <>
              Enviar mensagem

              <ArrowUpRight
                size={19}
                aria-hidden="true"
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
}