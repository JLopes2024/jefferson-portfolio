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
              .eq('id', project.id),
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

    const reordered = [...projects]

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

    if (!confirmed) return

    setDeletingId(project.id)
    setError('')

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
      if (remainingProjects.length > 0) {
        await saveOrder(
          remainingProjects,
        )
      } else {
        setProjects([])
      }
    } catch (orderError) {
      console.error(orderError)

      await loadProjects()
    }

    setDeletingId(null)
  }

  return (
    <main
      className="min-vh-100 bg-dark text-light"
      data-bs-theme="dark"
    >
      <nav className="navbar navbar-expand border-bottom border-secondary bg-black">

        <div className="container py-2">

          <a
            href="/admin"
            className="navbar-brand text-light fw-bold"
          >
            JL.ADMIN
          </a>

          <div className="d-flex align-items-center gap-2">

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-secondary"
            >
              Portfólio ↗
            </a>

            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={onLogout}
            >
              Sair
            </button>

          </div>

        </div>

      </nav>

      <div className="container py-5">

        <div className="row align-items-end g-4 mb-5">

          <div className="col">

            <span className="badge text-bg-success mb-3">
              PAINEL ADMINISTRATIVO
            </span>

            <h1 className="display-4 fw-bold mb-2">
              Projetos
            </h1>

            <p className="text-secondary mb-0">
              Cadastre, edite, exclua e organize os
              projetos exibidos no portfólio.
            </p>

          </div>

          <div className="col-12 col-md-auto">

            <button
              type="button"
              className="btn btn-success btn-lg w-100"
              onClick={onNewProject}
            >
              + Novo projeto
            </button>

          </div>

        </div>

        {error && (
          <div
            className="alert alert-danger"
            role="alert"
          >
            {error}
          </div>
        )}

        {loading ? (

          <div className="text-center py-5">

            <div
              className="spinner-border text-success"
              role="status"
            >
              <span className="visually-hidden">
                Carregando...
              </span>
            </div>

            <p className="text-secondary mt-3">
              Carregando projetos...
            </p>

          </div>

        ) : projects.length === 0 ? (

          <div className="card bg-black border-secondary">

            <div className="card-body text-center py-5">

              <h5>
                Nenhum projeto cadastrado.
              </h5>

              <p className="text-secondary mb-4">
                Cadastre seu primeiro projeto.
              </p>

              <button
                type="button"
                className="btn btn-success"
                onClick={onNewProject}
              >
                + Novo projeto
              </button>

            </div>

          </div>

        ) : (

          <div className="vstack gap-3">

            {projects.map(
              (project, index) => (

                <article
                  className="card bg-black border-secondary"
                  key={project.id}
                >

                  <div className="card-body">

                    <div className="row g-4 align-items-center">

                      <div className="col-12 col-md-3 col-lg-2">

                        {project.image_url ? (

                          <img
                            src={project.image_url}
                            alt={`Preview de ${project.title}`}
                            className="img-fluid rounded border border-secondary w-100"
                            style={{
                              aspectRatio: '16 / 9',
                              objectFit: 'cover',
                            }}
                          />

                        ) : (

                          <div
                            className="ratio ratio-16x9 border border-secondary rounded bg-dark"
                          >
                            <div className="d-flex align-items-center justify-content-center text-success fw-bold">
                              {project.title
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>
                          </div>

                        )}

                      </div>

                      <div className="col">

                        <div className="d-flex gap-2 flex-wrap mb-2">

                          <span className="badge text-bg-success">
                            {String(
                              index + 1,
                            ).padStart(2, '0')}
                          </span>

                          <span className="badge text-bg-secondary">
                            {project.label ||
                              project.category}
                          </span>

                        </div>

                        <h2 className="h4 mb-2">
                          {project.title}
                        </h2>

                        <p className="text-secondary mb-3">
                          {project.description}
                        </p>

                        <div className="d-flex flex-wrap gap-2">

                          {project.technologies?.map(
                            (technology) => (
                              <span
                                key={technology}
                                className="badge border border-secondary text-secondary fw-normal"
                              >
                                {technology}
                              </span>
                            ),
                          )}

                        </div>

                      </div>

                      <div className="col-12 col-lg-auto">

                        <div className="d-flex flex-wrap gap-2 justify-content-lg-end">

                          <button
                            type="button"
                            className="btn btn-outline-secondary"
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
                          >
                            ↑
                          </button>

                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            disabled={
                              index ===
                                projects.length - 1 ||
                              ordering
                            }
                            onClick={() =>
                              moveProject(
                                index,
                                1,
                              )
                            }
                          >
                            ↓
                          </button>

                          {project.demo_url && (
                            <a
                              href={project.demo_url}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-outline-light"
                            >
                              Abrir ↗
                            </a>
                          )}

                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() =>
                              onEditProject(
                                project,
                              )
                            }
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className="btn btn-outline-danger"
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

                      </div>

                    </div>

                  </div>

                </article>

              ),
            )}

          </div>

        )}

      </div>
    </main>
  )
}