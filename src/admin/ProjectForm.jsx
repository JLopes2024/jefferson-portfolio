import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'

const BUCKET = 'project-images'
const TECHNOLOGY_OPTIONS = [
  'React',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'Vue.js',

  'HTML',
  'CSS',
  'Bootstrap',

  'Supabase',
  'PostgreSQL',
  'MySQL',
  'SQL Server',

  'REST API',
  'JSON',

  'Python',
  'Flask',

  'Vite',
  'Git',
  'GitHub',

  'Vercel',
]

const CATEGORY_OPTIONS = [
  'Landing Pages',
  'Apps Educacionais',
  'Sistemas Web',
  'Sites Institucionais',
  'Ferramentas Digitais',
  'APIs e Back-end',
]

const LABEL_OPTIONS = [
  'LANDING PAGE',
  'APP EDUCACIONAL',
  'SISTEMA WEB',
  'SITE INSTITUCIONAL',
  'FERRAMENTA DIGITAL',
  'API / BACK-END',
]

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

  function toggleTechnology(technology) {
  const currentTechnologies =
    normalizeTechnologies(form.technologies)

  const alreadySelected =
    currentTechnologies.includes(technology)

  const nextTechnologies = alreadySelected
    ? currentTechnologies.filter(
        (item) => item !== technology,
      )
    : [
        ...currentTechnologies,
        technology,
      ]

  updateField(
    'technologies',
    nextTechnologies.join(', '),
  )
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
  <main
    className="min-vh-100 bg-dark text-light"
    data-bs-theme="dark"
  >
    <nav className="navbar bg-black border-bottom border-secondary">
      <div className="container py-2">
        <span className="navbar-brand text-light fw-bold mb-0">
          JL.ADMIN
        </span>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onCancel}
        >
          ← Voltar
        </button>
      </div>
    </nav>

    <div className="container py-5">

      <div className="mb-5">
        <span className="badge text-bg-success mb-3">
          {editing ? 'EDITAR PROJETO' : 'NOVO PROJETO'}
        </span>

        <h1 className="display-4 fw-bold mb-0">
          {editing ? project.title : 'Novo projeto'}
        </h1>
      </div>

      <form
        className="row g-4"
        onSubmit={handleSubmit}
      >

        {/* TÍTULO */}
        <div className="col-12 col-md-6">
          <label
            htmlFor="title"
            className="form-label"
          >
            Título *
          </label>

          <input
            id="title"
            type="text"
            className="form-control form-control-lg"
            value={form.title}
            onChange={(event) =>
              handleTitleChange(event.target.value)
            }
            required
          />
        </div>

        {/* SLUG */}
        <div className="col-12 col-md-6">
          <label
            htmlFor="slug"
            className="form-label"
          >
            Slug *
          </label>

          <input
            id="slug"
            type="text"
            className="form-control form-control-lg"
            value={form.slug}
            onChange={(event) =>
              handleSlugChange(event.target.value)
            }
            placeholder="meu-projeto"
            required
          />
        </div>

      {/* CATEGORIA */}
<div className="col-12 col-md-6">
  <label
    htmlFor="category"
    className="form-label"
  >
    Categoria *
  </label>

  <select
    id="category"
    className="form-select"
    value={form.category}
    onChange={(event) =>
      updateField(
        'category',
        event.target.value,
      )
    }
    required
  >
    <option value="">
      Selecione uma categoria
    </option>

    {CATEGORY_OPTIONS.map((category) => (
      <option
        key={category}
        value={category}
      >
        {category}
      </option>
    ))}
  </select>
</div>

{/* LABEL */}
<div className="col-12 col-md-6">
  <label
    htmlFor="label"
    className="form-label"
  >
    Label
  </label>

  <select
    id="label"
    className="form-select"
    value={form.label}
    onChange={(event) =>
      updateField(
        'label',
        event.target.value,
      )
    }
  >
    <option value="">
      Selecione uma label
    </option>

    {LABEL_OPTIONS.map((label) => (
      <option
        key={label}
        value={label}
      >
        {label}
      </option>
    ))}
  </select>
</div>

       
        {/* DESCRIÇÃO */}
        <div className="col-12">
          <label
            htmlFor="description"
            className="form-label"
          >
            Descrição *
          </label>

          <textarea
            id="description"
            className="form-control"
            rows="5"
            value={form.description}
            onChange={(event) =>
              updateField(
                'description',
                event.target.value,
              )
            }
            required
          />
        </div>
{/* TECNOLOGIAS */}
<div className="col-12">

  <label className="form-label mb-3">
    Tecnologias
  </label>

  <div className="card bg-black border-secondary">

    <div className="card-body">

      <div className="row g-3">

        {TECHNOLOGY_OPTIONS.map(
          (technology) => {

            const checked =
              technologiesPreview.includes(
                technology,
              )

            const id =
              `technology-${technology
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')}`

            return (
              <div
                key={technology}
                className="col-6 col-md-4 col-lg-3"
              >
                <div className="form-check">

                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={() =>
                      toggleTechnology(
                        technology,
                      )
                    }
                  />

                  <label
                    className="form-check-label"
                    htmlFor={id}
                  >
                    {technology}
                  </label>

                </div>
              </div>
            )
          },
        )}

      </div>

    </div>
  </div>

  {technologiesPreview.length > 0 && (
    <div className="d-flex flex-wrap gap-2 mt-3">

      {technologiesPreview.map(
        (technology) => (
          <span
            key={technology}
            className="badge text-bg-success"
          >
            {technology}
          </span>
        ),
      )}

    </div>
  )}

</div>

        {/* GITHUB */}
        <div className="col-12 col-md-6">
          <label
            htmlFor="github"
            className="form-label"
          >
            GitHub
          </label>

          <input
            id="github"
            type="url"
            className="form-control"
            value={form.github_url}
            onChange={(event) =>
              updateField(
                'github_url',
                event.target.value,
              )
            }
            placeholder="https://github.com/..."
          />
        </div>

        {/* DEMO */}
        <div className="col-12 col-md-6">
          <label
            htmlFor="demo"
            className="form-label"
          >
            Projeto publicado
          </label>

          <input
            id="demo"
            type="url"
            className="form-control"
            value={form.demo_url}
            onChange={(event) =>
              updateField(
                'demo_url',
                event.target.value,
              )
            }
            placeholder="https://..."
          />
        </div>

        {/* ORDEM */}
        <div className="col-12 col-md-4">
          <label
            htmlFor="order"
            className="form-label"
          >
            Ordem
          </label>

          <input
            id="order"
            type="number"
            min="1"
            className="form-control"
            value={form.display_order}
            onChange={(event) =>
              updateField(
                'display_order',
                event.target.value,
              )
            }
          />
        </div>

        {/* DESTAQUE */}
        <div className="col-12 col-md-8 d-flex align-items-end">
          <div className="form-check form-switch mb-2">

            <input
              id="featured"
              type="checkbox"
              className="form-check-input"
              role="switch"
              checked={form.featured}
              onChange={(event) =>
                updateField(
                  'featured',
                  event.target.checked,
                )
              }
            />

            <label
              htmlFor="featured"
              className="form-check-label"
            >
              Projeto em destaque
            </label>

          </div>
        </div>

        {/* IMAGEM */}
        <div className="col-12">

          <div className="card bg-black border-secondary">
            <div className="card-body p-4">

              <div className="row g-4 align-items-center">

                <div className="col-12 col-md">

                  <label
                    htmlFor="image"
                    className="form-label"
                  >
                    Imagem do projeto
                  </label>

                  <input
                    id="image"
                    type="file"
                    className="form-control"
                    accept="image/webp,image/png,image/jpeg"
                    onChange={handleImageChange}
                  />

                  <div className="form-text">
                    WebP, PNG ou JPEG. Máximo de 5 MB.
                  </div>

                </div>

                {previewUrl && (
                  <div className="col-12 col-md-5">

                    <img
                      src={previewUrl}
                      alt="Preview do projeto"
                      className="img-fluid rounded border border-secondary"
                    />

                  </div>
                )}

              </div>
            </div>
          </div>

        </div>

        {/* ERRO */}
        {error && (
          <div className="col-12">

            <div
              className="alert alert-danger mb-0"
              role="alert"
            >
              {error}
            </div>

          </div>
        )}

        {/* SUCESSO */}
        {success && (
          <div className="col-12">

            <div
              className="alert alert-success mb-0"
              role="alert"
            >
              {success}
            </div>

          </div>
        )}

        {/* BOTÕES */}
        <div className="col-12">

          <hr className="border-secondary my-2" />

          <div className="d-flex flex-column flex-sm-row justify-content-end gap-2">

            <button
              type="button"
              className="btn btn-outline-secondary btn-lg"
              onClick={onCancel}
              disabled={saving}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn btn-success btn-lg"
              disabled={saving}
            >
              {saving
                ? 'Salvando...'
                : editing
                  ? 'Salvar alterações'
                  : 'Criar projeto'}
            </button>

          </div>

        </div>

      </form>

    </div>
  </main>
)
}