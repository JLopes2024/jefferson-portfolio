import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const BUCKET = 'project-images'

export default function Dashboard({
  onLogout,
  onNewProject,
  onEditProject,
}) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)
  const [ordering, setOrdering] = useState(false)

  async function loadProjects() {
    setLoading(true)
    setError('')

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', {
        ascending: true,
      })

    if (error) {
      console.error(error)

      setError(
        'Não foi possível carregar os projetos.',
      )

      setLoading(false)
      return
    }

    setProjects(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    loadProjects()
  }, [])

  /*
    Salva a ordem atual dos projetos.

    Como temos poucos projetos,
    atualizar um por um mantém
    a implementação simples
    e sem dependências extras.
  */
  async function saveOrder(nextProjects) {
    const orderedProjects =
      nextProjects.map(
        (project, index) => ({
          ...project,
          display_order: index + 1,
        }),
      )

    const results =
      await Promise.all(
        orderedProjects.map(
          (project) =>
            supabase
              .from('projects')
              .update({
                display_order:
                  project.display_order,
              })
              .eq(
                'id',
                project.id,
              ),
        ),
      )

    const failedRequest =
      results.find(
        (result) => result.error,
      )

    if (failedRequest) {
      throw failedRequest.error
    }

    setProjects(orderedProjects)
  }

  async function moveProject(
    currentIndex,
    direction,
  ) {
    const targetIndex =
      currentIndex + direction

    if (
      targetIndex < 0 ||
      targetIndex >= projects.length
    ) {
      return
    }

    setOrdering(true)
    setError('')

    const reordered =
      [...projects]

    ;[
      reordered[currentIndex],
      reordered[targetIndex],
    ] = [
      reordered[targetIndex],
      reordered[currentIndex],
    ]

    try {
      await saveOrder(reordered)
    } catch (error) {
      console.error(
        'Erro ao ordenar:',
        error,
      )

      setError(
        'Não foi possível alterar a ordem.',
      )

      await loadProjects()
    } finally {
      setOrdering(false)
    }
  }

  async function handleDelete(project) {
    const confirmed =
      window.confirm(
        `Deseja realmente excluir "${project.title}"?`,
      )

    if (!confirmed) {
      return
    }

    setDeletingId(project.id)
    setError('')

    /*
      Primeiro excluímos o registro.

      Se a remoção da imagem falhar depois,
      teremos apenas um arquivo órfão no
      Storage, o que é melhor do que
      apagar a imagem e falhar no banco.
    */
    const { error: deleteError } =
      await supabase
        .from('projects')
        .delete()
        .eq('id', project.id)

    if (deleteError) {
      console.error(deleteError)

      setError(
        'Não foi possível excluir o projeto.',
      )

      setDeletingId(null)
      return
    }

    /*
      Remove a imagem apenas se ela
      tiver sido enviada pelo admin
      e possuir image_path.
    */
    if (project.image_path) {
      const { error: storageError } =
        await supabase.storage
          .from(BUCKET)
          .remove([
            project.image_path,
          ])

      if (storageError) {
        console.warn(
          'Projeto excluído, mas a imagem não pôde ser removida:',
          storageError,
        )
      }
    }

    const remainingProjects =
      projects.filter(
        (item) =>
          item.id !== project.id,
      )

    try {
      /*
        Aproveitamos para normalizar
        a ordem após excluir.
      */
      if (
        remainingProjects.length > 0
      ) {
        await saveOrder(
          remainingProjects,
        )
      } else {
        setProjects([])
      }
    } catch (orderError) {
      console.error(
        orderError,
      )

      await loadProjects()
    }

    setDeletingId(null)
  }

  return (
    <main className="admin-dashboard">

      <header className="admin-header">

        <strong>
          JL.ADMIN
        </strong>

        <div className="admin-header-actions">

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
          >
            Ver portfólio ↗
          </a>

          <button
            type="button"
            onClick={onLogout}
          >
            Sair
          </button>

        </div>

      </header>

      <section className="admin-dashboard-content">

        <div className="admin-page-heading">

          <div>

            <p className="eyebrow">
              PAINEL ADMINISTRATIVO
            </p>

            <h1>
              Projetos
            </h1>

            <p>
              Cadastre, edite, exclua
              e organize os projetos
              exibidos no portfólio.
            </p>

          </div>

          <button
            className="button button-primary"
            type="button"
            onClick={onNewProject}
          >
            + Novo projeto
          </button>

        </div>

        {error && (
          <div className="admin-alert admin-alert--error">
            {error}
          </div>
        )}

        {loading ? (

          <div className="admin-loading-box">
            Carregando projetos...
          </div>

        ) : projects.length === 0 ? (

          <div className="admin-empty">

            <strong>
              Nenhum projeto cadastrado.
            </strong>

            <p>
              Cadastre seu primeiro projeto.
            </p>

          </div>

        ) : (

          <div className="admin-project-list">

            {projects.map(
              (project, index) => (

                <article
                  className="admin-project-card"
                  key={project.id}
                >

                  <div className="admin-project-preview">

                    {project.image_url ? (

                      <img
                        src={project.image_url}
                        alt={`Preview de ${project.title}`}
                      />

                    ) : (

                      <span>
                        {project.title
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>

                    )}

                  </div>

                  <div className="admin-project-info">

                    <div className="admin-project-meta">

                      <span>
                        {String(
                          index + 1,
                        ).padStart(
                          2,
                          '0',
                        )}
                      </span>

                      <span>
                        {project.label ||
                          project.category}
                      </span>

                    </div>

                    <h2>
                      {project.title}
                    </h2>

                    <p>
                      {project.description}
                    </p>

                    {Array.isArray(
                      project.technologies,
                    ) && (
                      <div className="admin-project-techs">

                        {project.technologies.map(
                          (technology) => (

                            <span
                              key={technology}
                            >
                              {technology}
                            </span>

                          ),
                        )}

                      </div>
                    )}

                  </div>

                  <div className="admin-project-actions">

                    <div className="admin-order-buttons">

                      <button
                        type="button"
                        disabled={
                          index === 0 ||
                          ordering
                        }
                        onClick={() =>
                          moveProject(
                            index,
                            -1,
                          )
                        }
                        title="Mover para cima"
                        aria-label={`Mover ${project.title} para cima`}
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        disabled={
                          index ===
                            projects.length -
                              1 ||
                          ordering
                        }
                        onClick={() =>
                          moveProject(
                            index,
                            1,
                          )
                        }
                        title="Mover para baixo"
                        aria-label={`Mover ${project.title} para baixo`}
                      >
                        ↓
                      </button>

                    </div>

                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Abrir ↗
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        onEditProject(
                          project,
                        )
                      }
                    >
                      Editar
                    </button>

                    <button
                      className="admin-delete-button"
                      type="button"
                      disabled={
                        deletingId ===
                        project.id
                      }
                      onClick={() =>
                        handleDelete(
                          project,
                        )
                      }
                    >
                      {deletingId ===
                      project.id
                        ? 'Excluindo...'
                        : 'Excluir'}
                    </button>

                  </div>

                </article>

              ),
            )}

          </div>

        )}

      </section>

    </main>
  )
}