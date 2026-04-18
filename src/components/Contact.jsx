import { useState } from 'react'
import { contactData } from '../data/contact'

function ContactRow({ contactKey, value, index }) {
  const [copied, setCopied] = useState(false)

  function handleCopy(e) {
    e.preventDefault()
    e.stopPropagation()
    const text = contactKey === 'email' ? value : value.replace(/^https?:\/\//, '')
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className={`reveal delay-${index + 1} group relative flex items-center gap-4
      px-[1.375rem] py-[1.1rem] rounded-xl bg-tq border border-tq
      transition-all duration-200 hover:bg-tq-dim hover:border-tq-dim hover:-translate-y-0.5
      hover:shadow-[0_8px_28px_rgba(32,178,160,0.18)]`}
    >
      {/* Full-row link — z-10, sits above everything except the copy button */}
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 rounded-xl z-10"
        aria-label={`Open ${contactKey}`}
      />

      {/* Icon — no z, link floats above */}
      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-base flex-shrink-0">
        {contactKey === 'github'   && '🐱'}
        {contactKey === 'linkedin' && '💼'}
        {contactKey === 'email'    && '✉️'}
      </div>

      {/* Label — no z, link floats above */}
      <div className="flex-1 min-w-0">
        <div className="font-display text-base font-semibold tracking-[0.08em] uppercase text-white/80">
          {contactKey.charAt(0).toUpperCase() + contactKey.slice(1)}
        </div>
      </div>

      {/* Copy button — z-20, sits above the link */}
      <button
        onClick={handleCopy}
        aria-label={`Copy ${contactKey}`}
        className="relative z-20 flex items-center gap-1.5
          px-3 py-1.5 rounded-lg cursor-pointer
          text-xs font-display font-semibold tracking-[0.06em] uppercase
          transition-all duration-150 flex-shrink-0
          border-none outline-none
          bg-white/15 text-white hover:bg-white/25"
      >
        {copied
          ? <><span>✓</span><span>Copied</span></>
          : <><span>⎘</span><span>Copy</span></>
        }
      </button>
    </div>
  )
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-[12rem] px-[6vw] grid grid-cols-1 md:grid-cols-2 gap-20 items-center min-h-dvh overflow-hidden"
    >
      {/* Left copy */}
      <div className="relative z-10">
        <p className="section-eyebrow-wrapper reveal">Get in touch</p>
        <h2 className="reveal font-display font-bold text-ink tracking-[-0.025em] leading-[1.15]
          text-5xl mb-3.5">
          Let's build<br />something great.
        </h2>
        <p className="reveal delay-1 text-xl font-light text-ink-2 max-w-[36ch] leading-[1.7]">
          Open to freelance projects, full-time roles, and interesting conversations about the web.
        </p>
      </div>

      {/* Right links */}
      <div className="flex flex-col gap-5 relative z-10">
        {Object.entries(contactData).map(([key, value], i) => (
          <ContactRow key={key} contactKey={key} value={value} index={i} />
        ))}
      </div>
    </section>
  )
}