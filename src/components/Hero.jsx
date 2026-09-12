import { profile } from '../data/profile'

export default function Hero() {
  return (
    <section className="hero section" id="top">
      <div className="hero-copy">
        <p className="eyebrow">{profile.eyebrow}</p>

        <h1>
          {profile.headlineStart}{' '}
          <span>{profile.headlineAccent}</span>
        </h1>

        <p className="hero-description">{profile.description}</p>

        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            Ver projetos ↓
          </a>
          <a className="button button-secondary" href="#about">
            Conhecer meu trabalho
          </a>
        </div>
      </div>

      <div className="code-card-wrap" aria-hidden="true">
        <div className="code-card shadow-card">
          <div className="window-dots">
            <i />
            <i />
            <i />
          </div>

          <pre>
            <code>
{`01 perfil {
  nome: "${profile.name}",
  base: "${profile.location}",
  foco: [
    "interfaces",
    "experiências",
    "resultado"
  ]
}

✓ disponível para novos projetos`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}
