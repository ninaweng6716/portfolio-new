import { useEffect, useState } from 'react'
import { info } from '../data/info'

export default function Footer() {

  return (
    <footer className="border-t border-white/[0.07] px-[6vw] py-5
      flex items-center justify-between font-display text-base text-ink-2">
      <span>© {new Date().getFullYear()} {info.name}</span>
      <span>Front-End Developer · {info.location}</span>
    </footer>
  )
}
