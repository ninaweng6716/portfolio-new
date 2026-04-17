import { Outlet } from "react-router-dom"
import WeddingNav from "../wedding/WeddingNav"
import WeddingFooter from "../wedding/WeddingFooter"

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