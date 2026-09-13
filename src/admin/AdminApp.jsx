import { useEffect, useState } from 'react'

import {
  supabase,
  hasSupabaseConfig,
} from '../lib/supabase'

import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './Login'
import Dashboard from './Dashboard'
import ProjectForm from './ProjectForm'

export default function AdminApp() {
  const [session, setSession] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [checking, setChecking] = useState(true)

  const [screen, setScreen] = useState('dashboard')

  const [
    editingProject,
    setEditingProject,
  ] = useState(null)

  useEffect(() => {
    if (!hasSupabaseConfig || !supabase) {
      setChecking(false)
      return
    }

    let mounted = true

    async function loadSession() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (!mounted) return

      if (error) {
        console.error(
          'Erro ao recuperar sessão:',
          error,
        )

        setSession(null)
        setChecking(false)

        return
      }

      setSession(session)
    }

    loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        if (!mounted) return

        setSession(currentSession)
      },
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!hasSupabaseConfig || !supabase) {
      setIsAdmin(false)
      setChecking(false)
      return
    }

    let mounted = true

    async function checkAdmin() {
      setChecking(true)

      if (!session?.user?.id) {
        if (mounted) {
          setIsAdmin(false)
          setChecking(false)
        }

        return
      }

      const {
        data,
        error,
      } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq(
          'user_id',
          session.user.id,
        )
        .maybeSingle()

      if (!mounted) return

      if (error) {
        console.error(
          'Erro ao verificar administrador:',
          error,
        )

        setIsAdmin(false)
        setChecking(false)

        return
      }

      if (!data) {
        setIsAdmin(false)
        setChecking(false)

        await supabase.auth.signOut()

        return
      }

      setIsAdmin(true)
      setChecking(false)
    }

    checkAdmin()

    return () => {
      mounted = false
    }
  }, [session])

  function handleLogin(currentSession) {
    setChecking(true)
    setSession(currentSession)
  }

  async function handleLogout() {
    if (!supabase) return

    const { error } =
      await supabase.auth.signOut()

    if (error) {
      console.error(
        'Erro ao sair:',
        error,
      )

      return
    }

    setSession(null)
    setIsAdmin(false)
    setEditingProject(null)
    setScreen('dashboard')
  }

  function handleNewProject() {
    setEditingProject(null)
    setScreen('form')
  }

  function handleEditProject(project) {
    setEditingProject(project)
    setScreen('form')
  }

  function handleCancelForm() {
    setEditingProject(null)
    setScreen('dashboard')
  }

  function handleProjectSaved() {
    setEditingProject(null)
    setScreen('dashboard')
  }

  if (!hasSupabaseConfig || !supabase) {
    return (
      <main
        className="container-fluid min-vh-100 bg-dark text-light"
        data-bs-theme="dark"
      >
        <div className="row min-vh-100 align-items-center justify-content-center">
          <div className="col-12 col-md-7 col-lg-5">
            <div className="alert alert-danger">
              <h4 className="alert-heading">
                Supabase não configurado
              </h4>

              <p className="mb-0">
                Verifique as variáveis de ambiente
                utilizadas pela aplicação.
              </p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (checking) {
    return (
      <main
        className="container-fluid min-vh-100 bg-dark text-light"
        data-bs-theme="dark"
      >
        <div className="row min-vh-100 align-items-center justify-content-center">
          <div className="col-auto text-center">

            <div
              className="spinner-border text-success mb-3"
              role="status"
            >
              <span className="visually-hidden">
                Carregando...
              </span>
            </div>

            <p className="text-secondary mb-0">
              Verificando acesso...
            </p>

          </div>
        </div>
      </main>
    )
  }

  if (!session || !isAdmin) {
    return (
      <Login
        onLogin={handleLogin}
      />
    )
  }

  if (screen === 'form') {
    return (
      <ProjectForm
        project={editingProject}
        onCancel={handleCancelForm}
        onSaved={handleProjectSaved}
      />
    )
  }

  return (
    <Dashboard
      onLogout={handleLogout}
      onNewProject={handleNewProject}
      onEditProject={handleEditProject}
    />
  )
}