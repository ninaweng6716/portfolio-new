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

    const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )

  const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )

  const EmailIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.910 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  )

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
        {contactKey === 'github'   && <GitHubIcon />}
        {contactKey === 'linkedin' && <LinkedInIcon />}
        {contactKey === 'email'    && <EmailIcon />}
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
          Let's build<br />something great
        </h2>
        <p className="reveal delay-1 section-text">
          Open to projects of all shapes and sizes and interesting conversations about the web, climbing, and life.
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