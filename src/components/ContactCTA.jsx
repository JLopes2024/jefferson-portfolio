import { profile } from '../data/profile'

export default function ContactCTA() {
  return (
    <section className="contact-cta" id="contact">
      <div>
        <p className="eyebrow dark">VAMOS CONSTRUIR?</p>
        <h2>
          Sua próxima ideia
          <br />
          pode sair do papel.
        </h2>
      </div>

      <a className="contact-button" href={`mailto:${profile.email}`}>
        Falar sobre um projeto ↗
      </a>
    </section>
  )
}
