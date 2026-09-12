import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'

const BUCKET = 'project-images'

function createSlug(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalizeTechnologies(value) {
  return [
    ...new Set(
      value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ]
}

function sanitizeFileName(name) {
  const extension =
    name.split('.').pop()?.toLowerCase() || 'webp'

  const baseName = name
    .replace(/\.[^/.]+$/, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `${baseName || 'imagem'}.${extension}`
}

export default function ProjectForm({
  project,
  onCancel,
  onSaved,
}) {
  const editing = Boolean(project)

  const [form, setForm] = useState({
    title: project?.title ?? '',
    slug: project?.slug ?? '',
    label: project?.label ?? '',
    description: project?.description ?? '',
    category: project?.category ?? '',
    technologies:
      project?.technologies?.join(', ') ?? '',
    github_url: project?.github_url ?? '',
    demo_url: project?.demo_url ?? '',
    featured: project?.featured ?? true,
    display_order:
      project?.display_order ?? 999,
  })

  const [imageFile, setImageFile] =
    useState(null)

  const [previewUrl, setPreviewUrl] =
    useState(project?.image_url ?? '')

  const [slugEdited, setSlugEdited] =
    useState(editing)

  const [saving, setSaving] =
    useState(false)

  const [error, setError] =
    useState('')

  const [success, setSuccess] =
    useState('')

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(project?.image_url ?? '')
      return
    }

    const objectUrl =
      URL.createObjectURL(imageFile)

    setPreviewUrl(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [imageFile, project])

  const technologiesPreview =
    useMemo(
      () =>
        normalizeTechnologies(
          form.technologies,
        ),
      [form.technologies],
    )

  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleTitleChange(value) {
    updateField('title', value)

    if (!slugEdited) {
      updateField(
        'slug',
        createSlug(value),
      )
    }
  }

  function handleSlugChange(value) {
    setSlugEdited(true)

    updateField(
      'slug',
      createSlug(value),
    )
  }

  function handleImageChange(event) {
    const file =
      event.target.files?.[0]

    if (!file) {
      return
    }

    const allowedTypes = [
      'image/webp',
      'image/png',
      'image/jpeg',
    ]

    if (!allowedTypes.includes(file.type)) {
      setError(
        'Use uma imagem WebP, PNG ou JPEG.',
      )
      return
    }

    const maxSize =
      5 * 1024 * 1024

    if (file.size > maxSize) {
      setError(
        'A imagem deve ter no máximo 5 MB.',
      )
      return
    }

    setError('')
    setImageFile(file)
  }

  async function uploadImage() {
    if (!imageFile) {
      return {
        imageUrl:
          project?.image_url ?? null,

        imagePath:
          project?.image_path ?? null,

        uploadedPath: null,
      }
    }

    const safeName =
      sanitizeFileName(imageFile.name)

    const uniqueName =
      `${Date.now()}-${crypto.randomUUID()}-${safeName}`

    const path =
      `projects/${uniqueName}`

    const {
      error: uploadError,
    } = await supabase.storage
      .from(BUCKET)
      .upload(
        path,
        imageFile,
        {
          cacheControl: '3600',
          upsert: false,
        },
      )

    if (uploadError) {
      throw uploadError
    }

    const {
      data,
    } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(path)

    return {
      imageUrl:
        data.publicUrl,

      imagePath:
        path,

      uploadedPath:
        path,
    }
  }

  async function removeUploadedFile(path) {
    if (!path) {
      return
    }

    await supabase.storage
      .from(BUCKET)
      .remove([path])
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setSuccess('')

    if (
      !form.title.trim() ||
      !form.slug.trim() ||
      !form.description.trim() ||
      !form.category.trim()
    ) {
      setError(
        'Preencha título, slug, descrição e categoria.',
      )

      return
    }

    setSaving(true)

    let uploadedPath = null

    try {
      const {
        imageUrl,
        imagePath,
        uploadedPath:
          newUploadedPath,
      } = await uploadImage()

      uploadedPath =
        newUploadedPath

      const payload = {
        title:
          form.title.trim(),

        slug:
          createSlug(form.slug),

        label:
          form.label.trim() ||
          null,

        description:
          form.description.trim(),

        category:
          form.category.trim(),

        technologies:
          normalizeTechnologies(
            form.technologies,
          ),

        image_url:
          imageUrl,

        image_path:
          imagePath,

        github_url:
          form.github_url.trim() ||
          null,

        demo_url:
          form.demo_url.trim() ||
          null,

        featured:
          Boolean(form.featured),

        display_order:
          Number(
            form.display_order,
          ) || 999,
      }

      let databaseError

      if (editing) {
        const {
          error,
        } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', project.id)

        databaseError = error
      } else {
        const {
          error,
        } = await supabase
          .from('projects')
          .insert(payload)

        databaseError = error
      }

      if (databaseError) {
        if (uploadedPath) {
          await removeUploadedFile(
            uploadedPath,
          )
        }

        throw databaseError
      }

      /*
        Se editamos o projeto,
        enviamos uma nova imagem
        e a antiga também estava no Storage,
        removemos a antiga apenas depois
        do UPDATE dar certo.
      */
      if (
        editing &&
        imageFile &&
        project?.image_path &&
        project.image_path !== imagePath
      ) {
        await removeUploadedFile(
          project.image_path,
        )
      }

      setSuccess(
        editing
          ? 'Projeto atualizado com sucesso.'
          : 'Projeto criado com sucesso.',
      )

      setTimeout(() => {
        onSaved()
      }, 500)
    } catch (err) {
      console.error(err)

      if (
        err?.code === '23505'
      ) {
        setError(
          'Já existe um projeto com este slug.',
        )
      } else {
        setError(
          err?.message ||
            'Não foi possível salvar o projeto.',
        )
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="admin-dashboard">

      <header className="admin-header">

        <strong>
          JL.ADMIN
        </strong>

        <button
          type="button"
          onClick={onCancel}
        >
          ← Voltar
        </button>

      </header>

      <section className="admin-dashboard-content">

        <div className="admin-form-heading">

          <div>
            <p className="eyebrow">
              {editing
                ? 'EDITAR PROJETO'
                : 'NOVO PROJETO'}
            </p>

            <h1>
              {editing
                ? project.title
                : 'Novo projeto'}
            </h1>
          </div>

        </div>

        <form
          className="admin-project-form"
          onSubmit={handleSubmit}
        >

          <div className="admin-form-grid">

            <label>
              <span>
                Título *
              </span>

              <input
                type="text"
                value={form.title}
                onChange={(event) =>
                  handleTitleChange(
                    event.target.value,
                  )
                }
                required
              />
            </label>

            <label>
              <span>
                Slug *
              </span>

              <input
                type="text"
                value={form.slug}
                onChange={(event) =>
                  handleSlugChange(
                    event.target.value,
                  )
                }
                placeholder="meu-projeto"
                required
              />
            </label>

            <label>
              <span>
                Categoria *
              </span>

              <input
                type="text"
                value={form.category}
                onChange={(event) =>
                  updateField(
                    'category',
                    event.target.value,
                  )
                }
                placeholder="Apps Educacionais"
                required
              />
            </label>

            <label>
              <span>
                Label
              </span>

              <input
                type="text"
                value={form.label}
                onChange={(event) =>
                  updateField(
                    'label',
                    event.target.value,
                  )
                }
                placeholder="APP EDUCACIONAL"
              />
            </label>

          </div>

          <label className="admin-form-full">
            <span>
              Descrição *
            </span>

            <textarea
              value={form.description}
              onChange={(event) =>
                updateField(
                  'description',
                  event.target.value,
                )
              }
              rows="5"
              required
            />
          </label>

          <label className="admin-form-full">
            <span>
              Tecnologias
            </span>

            <input
              type="text"
              value={form.technologies}
              onChange={(event) =>
                updateField(
                  'technologies',
                  event.target.value,
                )
              }
              placeholder="React, TypeScript, Supabase"
            />

            <small>
              Separe por vírgulas.
            </small>
          </label>

          {technologiesPreview.length > 0 && (
            <div className="admin-form-tech-preview">
              {technologiesPreview.map(
                (technology) => (
                  <span key={technology}>
                    {technology}
                  </span>
                ),
              )}
            </div>
          )}

          <div className="admin-form-grid">

            <label>
              <span>
                GitHub
              </span>

              <input
                type="url"
                value={form.github_url}
                onChange={(event) =>
                  updateField(
                    'github_url',
                    event.target.value,
                  )
                }
                placeholder="https://github.com/..."
              />
            </label>

            <label>
              <span>
                Projeto publicado
              </span>

              <input
                type="url"
                value={form.demo_url}
                onChange={(event) =>
                  updateField(
                    'demo_url',
                    event.target.value,
                  )
                }
                placeholder="https://..."
              />
            </label>

          </div>

          <div className="admin-form-grid">

            <label>
              <span>
                Ordem
              </span>

              <input
                type="number"
                min="1"
                value={form.display_order}
                onChange={(event) =>
                  updateField(
                    'display_order',
                    event.target.value,
                  )
                }
              />
            </label>

            <label className="admin-checkbox-label">

              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  updateField(
                    'featured',
                    event.target.checked,
                  )
                }
              />

              <div>
                <strong>
                  Projeto em destaque
                </strong>

                <small>
                  Marque para priorizar
                  este projeto.
                </small>
              </div>

            </label>

          </div>

          <div className="admin-image-field">

            <div>
              <span className="admin-field-label">
                Imagem
              </span>

              <p>
                WebP, PNG ou JPEG.
                Máximo de 5 MB.
              </p>

              <input
                type="file"
                accept="
                  image/webp,
                  image/png,
                  image/jpeg
                "
                onChange={
                  handleImageChange
                }
              />
            </div>

            {previewUrl && (
              <div className="admin-image-preview">

                <img
                  src={previewUrl}
                  alt="Preview do projeto"
                />

              </div>
            )}

          </div>

          {error && (
            <div className="admin-alert admin-alert--error">
              {error}
            </div>
          )}

          {success && (
            <div className="admin-alert admin-alert--success">
              {success}
            </div>
          )}

          <div className="admin-form-actions">

            <button
              type="button"
              className="button button-secondary"
              onClick={onCancel}
              disabled={saving}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="button button-primary"
              disabled={saving}
            >
              {saving
                ? 'Salvando...'
                : editing
                  ? 'Salvar alterações'
                  : 'Criar projeto'}
            </button>

          </div>

        </form>

      </section>

    </main>
  )
}