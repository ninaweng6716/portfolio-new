import { Outlet } from "react-router-dom"
import WeddingNav from "../components/WeddingNav"
import WeddingFooter from "../components/WeddingFooter"

function SpotifyPlayer() {
  return (
    <a
      href="https://open.spotify.com/playlist/YOUR_PLAYLIST_ID"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open our wedding playlist on Spotify — opens in Spotify app"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3
                 bg-white border border-weddingPink-light px-4 py-3
                 shadow-md transition-all duration-200
                 hover:shadow-lg hover:-translate-y-0.5 no-underline"
    >
      {/* Bouquet draped over top-left corner */}
      <img
        src="/bouquet.svg"
        alt=""
        aria-hidden="true"
        className="absolute -top-8 -left-8 w-20 h-20 pointer-events-none select-none"
      />

      {/* Spotify logo */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#1DB954"/>
        <path d="M16.8 10.8c-2.7-1.6-7.2-1.8-9.8-1a.75.75 0 01-.45-1.44c2.9-.9 7.8-.7 10.9 1.1a.75.75 0 01-.65 1.34zM16.6 13.4a.63.63 0 01-.86.2c-2.3-1.4-5.8-1.8-8.5-1a.63.63 0 01-.36-1.2c3.1-.95 7-.5 9.6 1.15a.63.63 0 01.12.85zM15.6 15.9a.5.5 0 01-.69.17c-2-1.2-4.5-1.5-7.5-.8a.5.5 0 01-.22-.98c3.3-.75 6.1-.43 8.4.9a.5.5 0 01.01.71z" fill="white"/>
      </svg>

      <span className="font-weddingBody text-[0.65rem] tracking-[0.2em] uppercase text-weddingPrint">
        Our Playlist
      </span>
    </a>
  )
}

export default function WeddingLayout() {
  return (
    <div className="wedding-site">
      <WeddingNav />
      <main>
        <Outlet />
      </main>
      <WeddingFooter />
      <SpotifyPlayer />
    </div>
  )
}