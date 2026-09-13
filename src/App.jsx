import {
  lazy,
  Suspense,
} from 'react'

import Header from './components/Header'
import Hero from './components/Hero'
import Stack from './components/Stack'
import Projects from './components/Projects'
import About from './components/About'
import CodeLab from './components/CodeLab'
import ContactCTA from './components/ContactCTA'
import Footer from './components/Footer'

const AdminApp = lazy(
  () => import('./admin/AdminApp'),
)

function AdminLoading() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#0b0f0c',
        color: '#a6aea7',
        fontFamily:
          'Inter, system-ui, sans-serif',
      }}
    >
      Carregando painel...
    </main>
  )
}

export default function App() {
  const isAdmin =
    window.location.pathname.startsWith(
      '/admin',
    )

  if (isAdmin) {
    return (
      <Suspense
        fallback={
          <AdminLoading />
        }
      >
        <AdminApp />
      </Suspense>
    )
  }

  return (
    <>
      <Header />

      <main>
        <Hero />
        <Stack />
        <Projects />
        <About />
        <CodeLab />
        <ContactCTA />
      </main>

      <Footer />
    </>
  )
}