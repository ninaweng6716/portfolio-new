import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useReveal } from './hooks/useReveal'

import Background from './components/Background'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

import Wedding from './pages/Wedding'

function Home() {
  return (
    <>
      <Background />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </>
  )
}

export default function App() {
  useReveal()

  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wedding" element={<Wedding />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}