import { useState } from "react"
import { GitHubIcon, LinkedInIcon, EmailIcon } from "./ContactIcons"

export default function ContactRow({
  contactKey,
  value,
  index,
  onEmailClick,
}) {
  const [copied, setCopied] = useState(false)

  function handleCopy(e) {
    e.preventDefault()
    e.stopPropagation()

    const text =
      contactKey === "email"
        ? value
        : value.replace(/^https?:\/\//, "")

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const href =
    contactKey === "email" ? `mailto:${value}` : value

  const label =
    contactKey === "email"
      ? "Send me an email"
      : contactKey === "github"
      ? "Visit my GitHub profile, opens in new tab"
      : contactKey === "linkedin"
      ? "Visit my LinkedIn profile, opens in new tab"
      : `Open ${contactKey}`

  return (
    <div
      className={`reveal delay-${index + 1} group relative flex items-center gap-4
      px-[1.375rem] py-[1.1rem] rounded-xl bg-tq border border-tq
      transition-all duration-200 hover:bg-tq-dim hover:border-tq-dim hover:-translate-y-0.5
      hover:shadow-[0_8px_28px_rgba(32,178,160,0.18)]`}
    >
      <a
        href={href}
        target={contactKey === "email" ? "_self" : "_blank"}
        rel="noopener noreferrer"
        onClick={contactKey === "email" ? onEmailClick : undefined}
        className="absolute inset-0 rounded-xl z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-tq"
        aria-label={label}
      />

      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center" aria-hidden="true">
        {contactKey === "github" && <GitHubIcon />}
        {contactKey === "linkedin" && <LinkedInIcon />}
        {contactKey === "email" && <EmailIcon />}
      </div>

      <div className="flex-1" aria-hidden="true">
        <div className="font-display text-base font-semibold tracking-[0.08em] uppercase text-white/80">
          {contactKey.charAt(0).toUpperCase() + contactKey.slice(1)}
        </div>
      </div>

      <button
        onClick={handleCopy}
        aria-label={copied ? `${contactKey} copied` : `Copy ${contactKey}`}
        aria-live="polite"
        className="relative z-20 flex items-center gap-1.5
        px-3 py-1.5 rounded-lg text-xs font-display font-semibold
        tracking-[0.06em] uppercase bg-white/15 text-white hover:bg-white/25
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-tq"
      >
        <span aria-hidden="true">{copied ? "✓" : "⎘"}</span>
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  )
}