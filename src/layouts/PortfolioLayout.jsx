import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import useReveal from "../hooks/useReveal"

const PAGE_TITLES = {
  '/':        'Home',
  '/wedding': 'Wedding',
}

export default function Layout({ weather, coords }) {
  const scrollY         = useReveal()
  const { pathname }    = useLocation()
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    const title = PAGE_TITLES[pathname] ?? 'Page'
    document.title = `Nina Weng — ${title}`
    setAnnouncement(`Navigated to ${title}`)
  }, [pathname])

  return (
    <>
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>
      <Nav />
      <main id="main-content">
        <Outlet context={{ scrollY, weather, coords }} />
      </main>
      <Footer />
    </>
  )
}