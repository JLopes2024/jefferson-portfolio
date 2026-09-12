import Header from './components/Header'
import Hero from './components/Hero'
import Stack from './components/Stack'
import Projects from './components/Projects'
import About from './components/About'
import CodeLab from './components/CodeLab'
import ContactCTA from './components/ContactCTA'
import Footer from './components/Footer'

import AdminApp from './admin/AdminApp'

export default function App() {
  const isAdmin =
    window.location.pathname.startsWith('/admin')

  if (isAdmin) {
    return <AdminApp />
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