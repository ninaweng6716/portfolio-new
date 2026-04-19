import { useState } from 'react'
import { contactData } from '../data/contact'

function MailToast({ visible }) {
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50
      flex items-center gap-2.5 px-4 py-3 rounded-xl
      bg-neutral-900 border border-white/10 shadow-2xl
      text-sm font-display font-medium text-white/90 tracking-wide
      transition-all duration-300 pointer-events-none
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
    >
      <span>✉️</span>
      <span>Opening in your default mail app…</span>
    </div>
  )
}

function ContactRow({ contactKey, value, index, onEmailClick }) {
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

  const href = contactKey === 'email' ? `mailto:${value}` : value

  return (
    <div className={`reveal delay-${index + 1} group relative flex items-center gap-4
      px-[1.375rem] py-[1.1rem] rounded-xl bg-tq border border-tq
      transition-all duration-200 hover:bg-tq-dim hover:border-tq-dim hover:-translate-y-0.5
      hover:shadow-[0_8px_28px_rgba(32,178,160,0.18)]`}
    >
      <a
        href={href}
        target={contactKey === 'email' ? '_self' : '_blank'}
        rel="noopener noreferrer"
        onClick={contactKey === 'email' ? onEmailClick : undefined}
        className="absolute inset-0 rounded-xl z-10"
        aria-label={`Open ${contactKey}`}
      />

      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-base flex-shrink-0">
        {contactKey === 'github'   && '🐱'}
        {contactKey === 'linkedin' && '💼'}
        {contactKey === 'email'    && '✉️'}
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-display text-base font-semibold tracking-[0.08em] uppercase text-white/80">
          {contactKey.charAt(0).toUpperCase() + contactKey.slice(1)}
        </div>
      </div>

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
  const [mailToast, setMailToast] = useState(false)

  function handleEmailClick() {
    setMailToast(true)
    setTimeout(() => setMailToast(false), 3500)
  }

  return (
    <section
      id="contact"
      className="relative py-[12rem] px-[6vw] grid grid-cols-1 md:grid-cols-2 gap-20 items-center min-h-dvh overflow-hidden"
    >
      <MailToast visible={mailToast} />

      <div className="relative z-10">
        <p className="section-eyebrow-wrapper reveal">Get in touch</p>
        <h2 className="section-heading reveal">
          Let's build<br />something great.
        </h2>
        <p className="reveal delay-1 section-text">
          Open to freelance projects, full-time roles, and interesting conversations about the web.
        </p>
      </div>

      <div className="flex flex-col gap-5 relative z-10">
        {Object.entries(contactData).map(([key, value], i) => (
          <ContactRow key={key} contactKey={key} value={value} index={i} onEmailClick={handleEmailClick} />
        ))}
      </div>
    </section>
  )
}