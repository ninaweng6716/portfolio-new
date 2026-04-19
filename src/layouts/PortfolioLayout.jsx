import { Outlet } from "react-router-dom"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import useReveal from "../hooks/useReveal"

export default function Layout({ weather }) {
  const scrollY = useReveal()

  return (
    <>
      <Nav />
      <Outlet context={{ scrollY, weather }} />
      <Footer />
    </>
  )
}