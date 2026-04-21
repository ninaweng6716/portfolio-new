export default function MailToast({ visible }) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50
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