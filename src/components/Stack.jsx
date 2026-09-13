import {
  SiReact,
  SiVuedotjs,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiFlask,
  SiSupabase,
  SiFirebase,
  SiPostgresql,
  SiMysql,
  SiBootstrap,
  SiAxios,
  SiVite,
  SiGit,
  SiGithub,
  SiVercel,
  SiNetlify,
} from 'react-icons/si'

import {
  FaHtml5,
  FaCss3Alt,
  FaCode,
  FaServer,
  FaDatabase,
  FaLayerGroup,
  FaGlobe,
  FaRocket,
  FaMobileAlt,
  FaExchangeAlt,
  FaIcons,
} from 'react-icons/fa'

const stackGroups = [
  {
    id: 'frontend',
    number: '01',
    title: 'Front-end',
    short: 'FRONT',
    description:
      'Interfaces, experiências e aplicações web responsivas.',
    categoryIcon: FaCode,

    technologies: [
      {
        name: 'React',
        icon: SiReact,
        description: 'Interfaces componentizadas',
        featured: true,
      },
      {
        name: 'Vue.js',
        icon: SiVuedotjs,
        description: 'Interfaces reativas',
      },
      {
        name: 'JavaScript',
        icon: SiJavascript,
        description: 'Lógica no navegador',
        featured: true,
      },
      {
        name: 'TypeScript',
        icon: SiTypescript,
        description: 'JavaScript tipado',
      },
      {
        name: 'HTML5',
        icon: FaHtml5,
        description: 'Estrutura semântica',
      },
      {
        name: 'CSS3',
        icon: FaCss3Alt,
        description: 'Layout e experiência visual',
      },
    ],
  },

  {
    id: 'backend',
    number: '02',
    title: 'Back-end / APIs',
    short: 'BACK',
    description:
      'Regras de negócio, serviços e comunicação entre sistemas.',
    categoryIcon: FaServer,

    technologies: [
      {
        name: 'Node.js',
        icon: SiNodedotjs,
        description: 'Back-end JavaScript',
        featured: true,
      },
      {
        name: 'Python',
        icon: SiPython,
        description: 'Scripts e aplicações',
        featured: true,
      },
      {
        name: 'Flask',
        icon: SiFlask,
        description: 'APIs e aplicações Python',
      },
      {
        name: 'REST APIs',
        icon: FaExchangeAlt,
        description: 'Integração entre sistemas',
      },
    ],
  },

  {
    id: 'data',
    number: '03',
    title: 'Dados / BaaS',
    short: 'DATA',
    description:
      'Persistência, autenticação, consultas e serviços de dados.',
    categoryIcon: FaDatabase,

    technologies: [
      {
        name: 'Supabase',
        icon: SiSupabase,
        description: 'Banco, Auth e Storage',
        featured: true,
      },
      {
        name: 'Firebase',
        icon: SiFirebase,
        description: 'Backend as a Service',
        featured: true,
      },
      {
        name: 'PostgreSQL',
        icon: SiPostgresql,
        description: 'Banco relacional',
        featured: true,
      },
      {
        name: 'MySQL',
        icon: SiMysql,
        description: 'Banco relacional',
      },
      {
        name: 'SQL Server',
        icon: FaDatabase,
        description: 'Banco de dados Microsoft',
      },
    ],
  },

  {
    id: 'libraries',
    number: '04',
    title: 'Bibliotecas / UI',
    short: 'LIBS',
    description:
      'Ferramentas que aceleram a criação de interfaces e componentes.',
    categoryIcon: FaLayerGroup,

    technologies: [
      {
        name: 'Bootstrap',
        icon: SiBootstrap,
        description: 'UI e responsividade',
      },
      {
        name: 'React Icons',
        icon: FaIcons,
        description: 'Biblioteca de ícones',
      },
    ],
  },

  {
    id: 'web',
    number: '05',
    title: 'Web / Integrações',
    short: 'WEB',
    description:
      'Recursos para comunicação, aplicações instaláveis e consumo de serviços.',
    categoryIcon: FaGlobe,

    technologies: [
      {
        name: 'PWA',
        icon: FaMobileAlt,
        description: 'Aplicações web instaláveis',
      },
      {
        name: 'Fetch API',
        icon: FaExchangeAlt,
        description: 'Requisições HTTP nativas',
      },
      {
        name: 'Axios',
        icon: SiAxios,
        description: 'Cliente HTTP',
      },
    ],
  },

  {
    id: 'tooling',
    number: '06',
    title: 'Tooling / Deploy',
    short: 'DEPLOY',
    description:
      'Ferramentas que uso para desenvolver, versionar e publicar.',
    categoryIcon: FaRocket,

    technologies: [
      {
        name: 'Vite',
        icon: SiVite,
        description: 'Build e desenvolvimento',
      },
      {
        name: 'Git',
        icon: SiGit,
        description: 'Controle de versão',
      },
      {
        name: 'GitHub',
        icon: SiGithub,
        description: 'Código e colaboração',
      },
      {
        name: 'Vercel',
        icon: SiVercel,
        description: 'Deploy de aplicações',
        featured: true,
      },
      {
        name: 'Netlify',
        icon: SiNetlify,
        description: 'Deploy e hospedagem',
      },
    ],
  },
]

function OrbitNode({
  group,
  index,
}) {
  const Icon = group.categoryIcon

  return (
    <a
      className={`tech-orbit-node tech-orbit-node--${index + 1}`}
      href={`#stack-${group.id}`}
    >
      <span className="tech-orbit-icon">
        <Icon aria-hidden="true" />
      </span>

      <span className="tech-orbit-copy">
        <small>
          {group.number}
        </small>

        <strong>
          {group.short}
        </strong>
      </span>
    </a>
  )
}

function TechnologyCard({
  technology,
}) {
  const Icon = technology.icon

  return (
    <article
      className={`tech-card ${
        technology.featured
          ? 'tech-card--featured'
          : ''
      }`}
    >
      <div className="tech-card-icon">
        <Icon aria-hidden="true" />
      </div>

      <div className="tech-card-content">
        <strong>
          {technology.name}
        </strong>

        <span>
          {technology.description}
        </span>
      </div>

      <span
        className="tech-card-status"
        aria-hidden="true"
      />
    </article>
  )
}

function StackGroup({
  group,
}) {
  const CategoryIcon =
    group.categoryIcon

  return (
    <article
      className="tech-group"
      id={`stack-${group.id}`}
    >
      <div className="tech-group-heading">

        <div className="tech-group-number">
          {group.number}
        </div>

        <div className="tech-group-title">

          <div className="tech-group-icon">
            <CategoryIcon
              aria-hidden="true"
            />
          </div>

          <div>
            <h3>
              {group.title}
            </h3>

            <p>
              {group.description}
            </p>
          </div>

        </div>

        <span className="tech-group-count">
          {String(
            group.technologies.length,
          ).padStart(2, '0')}
          {' '}
          TECH
        </span>

      </div>

      <div className="tech-grid">
        {group.technologies.map(
          (technology) => (
            <TechnologyCard
              key={technology.name}
              technology={technology}
            />
          ),
        )}
      </div>
    </article>
  )
}

export default function Stack() {
  const totalTechnologies =
    stackGroups.reduce(
      (total, group) =>
        total +
        group.technologies.length,
      0,
    )

  return (
    <section
      className="section tech-section"
      id="stack"
    >

      <div className="tech-heading">

        <div>
          <p className="eyebrow">
            TECNOLOGIAS
          </p>

          <h2>
            Meu ecossistema
            <br />
            de construção
            <span> digital.</span>
          </h2>
        </div>

        <div className="tech-heading-copy">

          <p>
            Da interface ao banco de
            dados, estas são as
            tecnologias que fazem
            parte do meu processo de
            transformar ideias em
            produtos digitais.
          </p>

          <div className="tech-summary">

            <span>
              <strong>
                {stackGroups.length}
              </strong>

              ÁREAS
            </span>

            <span>
              <strong>
                {totalTechnologies}
              </strong>

              TECNOLOGIAS
            </span>

          </div>

        </div>

      </div>

     <div className="tech-system-map">

  <div className="tech-system-topbar">
    <span>
      JL.DEV // TECHNOLOGY SYSTEM
    </span>

    <span>
      STATUS:
      {' '}
      <strong>
        READY
      </strong>
    </span>
  </div>

  <div className="tech-system-grid">

    {stackGroups.map((group) => {
      const Icon = group.categoryIcon

      return (
        <a
          key={group.id}
          href={`#stack-${group.id}`}
          className="tech-system-item"
        >
          <div className="tech-system-item-top">

         


          </div>

          <div className="tech-system-item-icon">
            <Icon aria-hidden="true" />
          </div>

          <strong>
            {group.title}
          </strong>

          <small>
            {group.technologies.length}
            {' '}
            tecnologias
          </small>

        </a>
      )
    })}

  </div>

</div>

      {/* =========================
          CATEGORIAS
      ========================== */}

      <div className="tech-groups">

        {stackGroups.map(
          (group) => (
            <StackGroup
              key={group.id}
              group={group}
            />
          ),
        )}

      </div>

    </section>
  )
}