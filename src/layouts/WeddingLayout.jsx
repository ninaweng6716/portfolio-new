import { Outlet } from "react-router-dom"
import WeddingNav from "../wedding/components/WeddingNav"
import WeddingFooter from "../wedding/components/WeddingFooter"

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