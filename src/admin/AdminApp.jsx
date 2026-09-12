import { useEffect, useState } from 'react'

import {
  supabase,
  hasSupabaseConfig,
} from '../lib/supabase'

import Login from './Login'
import Dashboard from './Dashboard'
import ProjectForm from './ProjectForm'

export default function AdminApp() {
  const [session, setSession] =
    useState(null)

  const [isAdmin, setIsAdmin] =
    useState(false)

  const [checking, setChecking] =
    useState(true)

  const [screen, setScreen] =
    useState('dashboard')

  const [
    editingProject,
    setEditingProject,
  ] = useState(null)

  /*
    ==============================
    RECUPERA SESSÃO
    ==============================
  */
  useEffect(() => {
    if (
      !hasSupabaseConfig ||
      !supabase
    ) {
      setChecking(false)
      return
    }

    let mounted = true

    async function loadSession() {
      const {
        data: { session },
        error,
      } =
        await supabase.auth.getSession()

      if (!mounted) {
        return
      }

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
    } =
      supabase.auth.onAuthStateChange(
        (_event, currentSession) => {
          if (!mounted) {
            return
          }

          setSession(
            currentSession,
          )
        },
      )

    return () => {
      mounted = false

      subscription.unsubscribe()
    }
  }, [])

  /*
    ==============================
    VERIFICA SE É ADMIN
    ==============================
  */
  useEffect(() => {
    if (
      !hasSupabaseConfig ||
      !supabase
    ) {
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
      } =
        await supabase
          .from('admin_users')
          .select('user_id')
          .eq(
            'user_id',
            session.user.id,
          )
          .maybeSingle()

      if (!mounted) {
        return
      }

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

  /*
    ==============================
    LOGIN
    ==============================
  */
  function handleLogin(
    currentSession,
  ) {
    setChecking(true)

    setSession(
      currentSession,
    )
  }

  /*
    ==============================
    LOGOUT
    ==============================
  */
  async function handleLogout() {
    if (!supabase) {
      return
    }

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

  /*
    ==============================
    NOVO PROJETO
    ==============================
  */
  function handleNewProject() {
    setEditingProject(null)

    setScreen('form')
  }

  /*
    ==============================
    EDITAR PROJETO
    ==============================
  */
  function handleEditProject(
    project,
  ) {
    setEditingProject(project)

    setScreen('form')
  }

  /*
    ==============================
    CANCELAR FORMULÁRIO
    ==============================
  */
  function handleCancelForm() {
    setEditingProject(null)

    setScreen('dashboard')
  }

  /*
    ==============================
    PROJETO SALVO
    ==============================
  */
  function handleProjectSaved() {
    setEditingProject(null)

    setScreen('dashboard')
  }

  /*
    ==============================
    SUPABASE NÃO CONFIGURADO
    ==============================
  */
  if (
    !hasSupabaseConfig ||
    !supabase
  ) {
    return (
      <main className="admin-loading">
        <div
          style={{
            textAlign: 'center',
            maxWidth: '500px',
            padding: '24px',
          }}
        >
          <strong>
            Supabase não configurado.
          </strong>

          <p>
            Verifique as variáveis
            VITE_SUPABASE_URL e
            VITE_SUPABASE_ANON_KEY
            ou
            VITE_SUPABASE_PUBLISHABLE_KEY.
          </p>
        </div>
      </main>
    )
  }

  /*
    ==============================
    CARREGANDO
    ==============================
  */
  if (checking) {
    return (
      <main className="admin-loading">
        Verificando acesso...
      </main>
    )
  }

  /*
    ==============================
    LOGIN
    ==============================
  */
  if (
    !session ||
    !isAdmin
  ) {
    return (
      <Login
        onLogin={handleLogin}
      />
    )
  }

  /*
    ==============================
    FORMULÁRIO
    ==============================
  */
  if (screen === 'form') {
    return (
      <ProjectForm
        project={
          editingProject
        }
        onCancel={
          handleCancelForm
        }
        onSaved={
          handleProjectSaved
        }
      />
    )
  }

  /*
    ==============================
    DASHBOARD
    ==============================
  */
  return (
    <Dashboard
      onLogout={
        handleLogout
      }
      onNewProject={
        handleNewProject
      }
      onEditProject={
        handleEditProject
      }
    />
  )
}