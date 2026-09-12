import { useEffect, useState } from 'react'

import { supabase } from '../lib/supabase'

import Login from './Login'
import Dashboard from './Dashboard'
import ProjectForm from './ProjectForm'

export default function AdminApp() {
  const [session, setSession] = useState(null)

  const [isAdmin, setIsAdmin] = useState(false)

  const [checking, setChecking] = useState(true)

  const [screen, setScreen] = useState('dashboard')

  const [editingProject, setEditingProject] = useState(null)

  /*
    Recupera a sessão existente e acompanha
    login/logout do Supabase.
  */
  useEffect(() => {
    let mounted = true

    async function loadSession() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

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
    } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        if (!mounted) {
          return
        }

        setSession(currentSession)
      },
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  /*
    Sempre que a sessão mudar,
    verificamos se o usuário está
    cadastrado em admin_users.
  */
  useEffect(() => {
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
    LOGIN
  */
  function handleLogin(currentSession) {
    setChecking(true)

    setSession(currentSession)
  }

  /*
    LOGOUT
  */
  async function handleLogout() {
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
    NOVO PROJETO
  */
  function handleNewProject() {
    setEditingProject(null)

    setScreen('form')
  }

  /*
    EDITAR PROJETO
  */
  function handleEditProject(project) {
    setEditingProject(project)

    setScreen('form')
  }

  /*
    VOLTAR DO FORMULÁRIO
  */
  function handleCancelForm() {
    setEditingProject(null)

    setScreen('dashboard')
  }

  /*
    DEPOIS DE SALVAR
  */
  function handleProjectSaved() {
    setEditingProject(null)

    setScreen('dashboard')
  }

  /*
    CARREGAMENTO DA AUTENTICAÇÃO
  */
  if (checking) {
    return (
      <main className="admin-loading">
        Verificando acesso...
      </main>
    )
  }

  /*
    NÃO AUTENTICADO
  */
  if (!session || !isAdmin) {
    return (
      <Login
        onLogin={handleLogin}
      />
    )
  }

  /*
    FORMULÁRIO
  */
  if (screen === 'form') {
    return (
      <ProjectForm
        project={editingProject}
        onCancel={handleCancelForm}
        onSaved={handleProjectSaved}
      />
    )
  }

  /*
    DASHBOARD
  */
  return (
    <Dashboard
      onLogout={handleLogout}
      onNewProject={handleNewProject}
      onEditProject={handleEditProject}
    />
  )
}