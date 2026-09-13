import { profile } from '../data/profile'

export default function Header() {
  return (
    <header className="site-header">
      <a
        className="brand"
        href="#top"
        aria-label="Ir para o início"
      >
        <img
          className="brand-logo"
          src="/favicon.png"
          alt=""
        />
        <span>
    {profile.brand}
  </span>
      </a>

      <nav
        className="nav"
        aria-label="Navegação principal"
      >
        <a href="#projects">
          Projetos
        </a>

        <a href="#stack">
          Stack
        </a>

        <a href="#about">
          Sobre
        </a>

        <a
          className="nav-cta"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
      </nav>
    </header>
  )
}