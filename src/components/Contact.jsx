import { useEffect, useRef } from 'react'
import { info } from '../data/info'
import { contactData } from '../data/contact'


export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-[12rem] px-[6vw] grid grid-cols-1 md:grid-cols-2 gap-20 items-center min-h-screen overflow-hidden"
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
        {Object.entries(contactData).map(([key, value]) => (
          <a key={key}
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className={`reveal delay-${Object.keys(contactData).indexOf(key) + 1} group flex items-center gap-4 px-[1.375rem] py-[1.1rem]
              rounded-xl bg-tq text-white border border-tq no-underline
              transition-all duration-200 hover:bg-tq-dim hover:border-tq-dim hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(32,178,160,0.18)]`}>
            <div className="w-10 h-10 rounded-lg bg-tq/15 flex items-center justify-center text-base flex-shrink-0">
              {key === 'github' && '🐱'}
              {key === 'linkedin' && '💼'}
              {key === 'email' && '✉️'}
            </div>
            <div>
              <div className="font-display text-base font-semibold tracking-[0.08em] uppercase text-white/80 mb-0.5">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </div>
              <div className="text-sm font-light text-white/80">{value}</div>
            </div>
            <span className="ml-auto text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        ))}
      </div>
    </section>
  )
}