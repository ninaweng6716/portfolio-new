import { useReveal } from './hooks/useReveal'
import Nav      from './components/Nav'
import Hero     from './components/Hero'
import About    from './components/About'
import Projects from './components/Projects'
import Contact  from './components/Contact'
import Footer   from './components/Footer'

export default function App() {
  useReveal()   // sets up IntersectionObserver for .reveal elements

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
