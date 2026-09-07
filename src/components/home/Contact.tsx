import { ArrowUpRight } from "lucide-react";

import ContactForm from "@/components/contact/ContactForm";
import {
  contact,
  createWhatsAppUrl,
} from "@/data/contact";

import styles from "./Contact.module.css";

const whatsappUrl = createWhatsAppUrl(
  "Olá Jefferson! Vi seu portfólio e gostaria de conversar sobre um projeto."
);

export default function Contact() {
  return (
    <section
      id="contato"
      className={styles.section}
    >
      <div className={styles.container}>
        <header className={styles.heading}>
          <div className={styles.label}>
            <span>CONTATO</span>

            <span className={styles.line} />

            <span>Vamos conversar</span>
          </div>

          <h2>
            Tem uma ideia?
            <span> Vamos tirar do papel.</span>
          </h2>

          <p>
            Conte o que você precisa, qual
            problema quer resolver ou qual
            projeto pretende desenvolver.
          </p>
        </header>

        <div className={styles.content}>
          <aside className={styles.direct}>
            <span className={styles.eyebrow}>
              Contato direto
            </span>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.whatsapp}
            >
              <div>
                <span>WhatsApp</span>

                <strong>
                  Vamos conversar
                </strong>
              </div>

              <ArrowUpRight
                size={28}
                strokeWidth={1.4}
                aria-hidden="true"
              />
            </a>

            <div className={styles.links}>
              <a
                href={`mailto:${contact.email}`}
              >
                <div>
                  <span>E-mail</span>

                  <strong>
                    {contact.email}
                  </strong>
                </div>

                <ArrowUpRight
                  size={19}
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
              </a>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <div>
                  <span>LinkedIn</span>

                  <strong>
                    Perfil profissional
                  </strong>
                </div>

                <ArrowUpRight
                  size={19}
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
              </a>

              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
              >
                <div>
                  <span>GitHub</span>

                  <strong>
                    Ver repositórios
                  </strong>
                </div>

                <ArrowUpRight
                  size={19}
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
              </a>
            </div>

            <p className={styles.location}>
              São Paulo, Brasil
              <span>
                Disponível para projetos
                remotos.
              </span>
            </p>
          </aside>

          <div className={styles.formArea}>
            <div className={styles.formIntro}>
              <span>
                Prefere explicar com calma?
              </span>

              <h3>
                Me conte sobre
                <strong> o projeto.</strong>
              </h3>

              <p>
                Não precisa ter tudo definido.
                Uma ideia, necessidade ou
                problema já é um bom ponto de
                partida.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}