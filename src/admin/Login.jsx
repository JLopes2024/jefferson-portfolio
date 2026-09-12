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

    const { data, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (loginError) {
      setError('E-mail ou senha inválidos.')
      setLoading(false)
      return
    }

    const userId = data.user?.id

    const { data: admin, error: adminError } =
      await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle()

    if (adminError || !admin) {
      await supabase.auth.signOut()

      setError('Este usuário não possui acesso administrativo.')
      setLoading(false)
      return
    }

    setLoading(false)
    onLogin(data.session)
  }

  return (
    <main className="admin-login">
      <section className="admin-login-card">

        <a href="/" className="admin-brand">
          JL.ADMIN
        </a>

        <p className="eyebrow">
          ÁREA RESTRITA
        </p>

        <h1>
          Gerencie seu
          <span> portfólio.</span>
        </h1>

        <p className="admin-login-description">
          Entre com sua conta administrativa para cadastrar,
          editar e organizar seus projetos.
        </p>

        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >
          <label>
            E-mail

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="seu@email.com"
              required
              autoComplete="email"
            />
          </label>

          <label>
            Senha

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </label>

          {error && (
            <p className="admin-error">
              {error}
            </p>
          )}

          <button
            className="button button-primary"
            type="submit"
            disabled={loading}
          >
            {loading
              ? 'Entrando...'
              : 'Entrar no painel →'}
          </button>
        </form>

        <a
          href="/"
          className="admin-back"
        >
          ← Voltar para o portfólio
        </a>

      </section>
    </main>
  )
}