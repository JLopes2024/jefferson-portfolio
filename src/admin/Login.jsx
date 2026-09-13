import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setLoading(true)

    const {
      data,
      error: loginError,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (loginError) {
      setError('E-mail ou senha inválidos.')
      setLoading(false)
      return
    }

    const userId = data.user?.id

    const {
      data: admin,
      error: adminError,
    } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle()

    if (adminError || !admin) {
      await supabase.auth.signOut()

      setError(
        'Este usuário não possui acesso administrativo.',
      )

      setLoading(false)
      return
    }

    setLoading(false)

    onLogin(data.session)
  }

  return (
    <main
      className="container-fluid min-vh-100 bg-dark text-light"
      data-bs-theme="dark"
    >
      <div className="row min-vh-100 align-items-center justify-content-center py-5">

        <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">

          <div className="card bg-black border-secondary rounded-4 shadow-lg">

            <div className="card-body p-4 p-md-5">

              <a
                href="/"
                className="text-light text-decoration-none fw-bold fs-5"
              >
                JL.ADMIN
              </a>

              <div className="mt-5 mb-4">

                <span className="badge text-bg-success mb-3">
                  ÁREA RESTRITA
                </span>

                <h1 className="display-5 fw-bold lh-1 mb-3">
                  Gerencie seu portfólio.
                </h1>

                <p className="text-secondary mb-0">
                  Entre com sua conta administrativa
                  para cadastrar, editar e organizar
                  seus projetos.
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label
                    htmlFor="email"
                    className="form-label"
                  >
                    E-mail
                  </label>

                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    value={email}
                    placeholder="seu@email.com"
                    autoComplete="email"
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    required
                  />

                </div>

                <div className="mb-4">

                  <label
                    htmlFor="password"
                    className="form-label"
                  >
                    Senha
                  </label>

                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    value={password}
                    placeholder="Digite sua senha"
                    autoComplete="current-password"
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    required
                  />

                </div>

                {error && (
                  <div
                    className="alert alert-danger"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                <div className="d-grid">

                  <button
                    type="submit"
                    className="btn btn-success btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        />

                        Entrando...
                      </>
                    ) : (
                      'Entrar no painel →'
                    )}
                  </button>

                </div>

              </form>

              <div className="text-center mt-4">

                <a
                  href="/"
                  className="link-secondary text-decoration-none"
                >
                  ← Voltar para o portfólio
                </a>

              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  )
}