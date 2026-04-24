import DragonLogo from '../assets/dragon-head.svg?react'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] px-[6vw] py-5
      flex items-center justify-center gap-2 font-display text-base text-ink-2">
      <DragonLogo className="w-5 h-5 opacity-40" aria-hidden="true" />
      <p>© 2026 ninaweng.com</p>
    </footer>
  )
}