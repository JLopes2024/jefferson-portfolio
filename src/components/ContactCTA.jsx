import { profile } from '../data/profile'

export default function ContactCTA() {
  const message = encodeURIComponent(
    'Olá Jefferson! Vim pelo seu portfólio e gostaria de conversar sobre um projeto.',
  )

  const whatsappUrl =
    `${profile.whatsapp}?text=${message}`

  return (
    <section
      className="contact-cta"
      id="contact"
    >
      <div>
        <p className="eyebrow dark">
          VAMOS CONSTRUIR?
        </p>

        <h2>
          Sua próxima ideia
          <br />
          pode sair do papel.
        </h2>
      </div>

      <a
        className="contact-button"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
      >
        Falar sobre um projeto ↗
      </a>
    </section>
  )
}