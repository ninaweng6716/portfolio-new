import { Outlet } from "react-router-dom"
import WeddingNav from "../components/WeddingNav"
import WeddingFooter from "../components/WeddingFooter"

export default function WeddingLayout() {
  return (
    <div className="wedding-site">
      <WeddingNav />
      <main>
        <Outlet />
      </main>
      <WeddingFooter />
    </div>
  )
}