import { BrowserRouter, Routes, Route } from "react-router-dom"

import PortfolioLayout from "./layouts/PortfolioLayout"
import WeddingLayout from "./wedding/layouts/WeddingLayout"

import Home from "./pages/Home"
import Wedding from "./wedding/pages/Wedding"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Portfolio */}
        <Route element={<PortfolioLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Wedding Single Page Site */}
        <Route element={<WeddingLayout />}>
          <Route path="/wedding" element={<Wedding />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}