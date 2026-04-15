import { info } from '../data/portfolio'

const contacts = [
  { icon: '✉️', label: 'Email',    value: (i) => i.email,    href: (i) => `mailto:${i.email}` },
  { icon: '💼', label: 'LinkedIn', value: (i) => i.linkedin, href: (i) => `https://${i.linkedin}` },
  { icon: '🐙', label: 'GitHub',   value: (i) => i.github,   href: (i) => `https://${i.github}` },
]

export default function Contact() {
  return (
    <section id="contact"
      className="py-[6.5rem] px-[6vw] bg-ink grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

      {/* Left copy */}
      <div>
        <p className="reveal section-eyebrow !text-tq/80 before:!bg-tq/80">Get in touch</p>
        <h2 className="reveal font-display font-bold text-white tracking-[-0.025em] leading-[1.15]
          text-[clamp(1.8rem,3.5vw,2.6rem)] mb-3.5">
          Let's build<br />something great.
        </h2>
        <p className="reveal delay-1 text-[1rem] font-light text-white/45 max-w-[36ch] leading-[1.7]">
          Open to freelance projects, full-time roles, and interesting conversations about the web.
        </p>
      </div>

      {/* Right links */}
      <div className="flex flex-col gap-5">
        {contacts.map(({ icon, label, value, href }, i) => (
          <a key={label}
            href={href(info)}
            target="_blank"
            rel="noopener noreferrer"
            className={`reveal delay-${i + 1} group flex items-center gap-4 px-[1.375rem] py-[1.1rem]
              rounded-xl bg-white/[0.04] border border-white/[0.08] no-underline
              transition-all duration-200 hover:bg-tq/10 hover:border-tq/30 hover:translate-x-1`}>
            <div className="w-10 h-10 rounded-lg bg-tq/15 flex items-center justify-center text-[1.1rem] flex-shrink-0">
              {icon}
            </div>
            <div>
              <div className="font-display text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-white/35 mb-0.5">
                {label}
              </div>
              <div className="text-[0.9rem] font-light text-white/80">{value(info)}</div>
            </div>
            <span className="ml-auto text-[0.9rem] text-tq/60 transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        ))}
      </div>
    </section>
  )
}
