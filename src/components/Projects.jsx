import { useEffect, useMemo, useState } from 'react'
import { fallbackProjects } from '../data/projects'
import { hasSupabaseConfig, supabase } from '../lib/supabase'

const highlightedProjects = [
  'inclusivamente',
  'larissa-photographer',
  'colo-de-deus-sp',
]

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects)
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [status, setStatus] = useState('ready')

  useEffect(() => {
    if (!hasSupabaseConfig) return

    async function loadProjects() {
      setStatus('loading')
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .order('display_order', {
    ascending: true,
  })

      if (error) {
        console.error('Erro ao carregar projetos:', error.message)
        setStatus('fallback')
        return
      }

      if (data?.length) {
        setProjects(data)
      }

      setStatus('ready')
    }

    loadProjects()
  }, [])

  const categories = useMemo(() => {
    const projectCategories = projects
      .map((project) => project.category)
      .filter(Boolean)

    return ['Todos', ...new Set(projectCategories)]
  }, [projects])

  const visibleProjects = useMemo(() => {
    if (activeCategory === 'Todos') {
      return projects
    }

    return projects.filter(
      (project) => project.category === activeCategory,
    )
  }, [projects, activeCategory])

  return (
    <section className="section projects" id="projects">

      {/* CABEÇALHO */}
      <div className="section-heading-grid">
        <div>
          <p className="eyebrow">
            TRABALHO SELECIONADO
          </p>

          <h2>
            Ideias que
            <br />
            viraram produto.
          </h2>
        </div>

        <p className="section-intro">
          Landing pages, produtos digitais, aplicações educacionais
          e experiências conectadas a APIs e bancos de dados.
        </p>
      </div>

      {/* FILTROS */}
      <div
        className="filters"
        aria-label="Filtrar projetos"
      >
        {categories.map((category) => {
          const isActive = activeCategory === category

          return (
            <button
              key={category}
              type="button"
              className={
                isActive
                  ? 'filter active'
                  : 'filter'
              }
              aria-pressed={isActive}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          )
        })}
      </div>

      {/* STATUS */}
      {status === 'loading' && (
        <p className="status-message">
          Carregando projetos...
        </p>
      )}

      {status === 'fallback' && (
        <p className="status-message">
          Não foi possível acessar o banco agora.
          Exibindo os projetos locais.
        </p>
      )}

      {/* PROJETOS */}
      {visibleProjects.length > 0 ? (
        <div className="projects-grid">
          {visibleProjects.map((project, index) => {
            const isHighlighted =
              highlightedProjects.includes(project.slug)

            const hasImage = Boolean(project.image_url)

            const projectLink =
              project.demo_url || project.github_url

            return (
              <article
                key={project.id ?? project.slug}
                className={`project-card ${
                  isHighlighted
                    ? 'project-card--large'
                    : ''
                }`}
              >

                {/* IMAGEM */}
                {hasImage ? (
                  <a
                    className="project-image"
                    href={projectLink || undefined}
                    target={
                      projectLink
                        ? '_blank'
                        : undefined
                    }
                    rel={
                      projectLink
                        ? 'noreferrer'
                        : undefined
                    }
                    aria-label={
                      projectLink
                        ? `Abrir projeto ${project.title}`
                        : undefined
                    }
                  >
                    <img
                      src={project.image_url}
                      alt={`Preview do projeto ${project.title}`}
                      loading="lazy"
                    />

                    <span className="project-image-overlay">
                      Ver projeto ↗
                    </span>
                  </a>
                ) : (
                  <div
                    className="project-image project-image--empty"
                    aria-hidden="true"
                  >
                    <span>
                      {project.label || project.category}
                    </span>

                    <strong>
                      {project.title}
                    </strong>
                  </div>
                )}

                {/* NUMERAÇÃO */}
                <div className="project-index">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* CONTEÚDO */}
                <div className="project-card-body">

                  <span className="project-category">
                    {project.label || project.category}
                  </span>

                  <h3>
                    {project.title}
                  </h3>

                  <p>
                    {project.description}
                  </p>

                  {/* STACK DO PROJETO */}
                  {Array.isArray(project.technologies) &&
                    project.technologies.length > 0 && (
                      <div
                        className="project-techs"
                        aria-label={`Tecnologias utilizadas em ${project.title}`}
                      >
                        {project.technologies.map(
                          (technology) => (
                            <span key={technology}>
                              {technology}
                            </span>
                          ),
                        )}
                      </div>
                    )}

                  {/* LINKS */}
                  <div className="project-links">

                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Ver projeto ↗
                      </a>
                    )}

                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub ↗
                      </a>
                    )}

                    {!project.github_url &&
                      project.demo_url && (
                        <span className="private-project">
                          Código privado
                        </span>
                      )}

                  </div>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <div className="projects-empty">
          <p>
            Nenhum projeto encontrado nesta categoria.
          </p>
        </div>
      )}
    </section>
  )
}