import { useState, useRef, useEffect } from "react"
import { SectionHeader } from "../components/WeddingPrimitives"
import { FAQS } from "../data/faqs"

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(bodyRef.current.scrollHeight)
    }
  }, [a])

  return (
    <div className="py-5 border-b border-weddingPink-light last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4
                   cursor-pointer text-left font-weddingBody text-weddingPrint
                   text-[1.05rem] leading-snug tracking-wide
                   focus-visible:outline-2 focus-visible:outline-weddingTq focus-visible:outline-offset-2"
      >
        <span>{q}</span>
        <span
          aria-hidden="true"
          className={[
            "flex-shrink-0 text-weddingTq text-xl leading-none",
            "transition-transform duration-300 ease-in-out",
            open ? "rotate-45" : "rotate-0",
          ].join(" ")}
        >
          +
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? height : 0, opacity: open ? 1 : 0 }}
      >
        <p
          ref={bodyRef}
          className="font-weddingBody text-weddingPrint text-base leading-relaxed pt-3 pb-1"
        >
          {a}
        </p>
      </div>
    </div>
  )
}

export default function FAQSection() {
  return (
    <section id="faq" className="bg-white">
      <div className="max-w-2xl mx-auto px-8 py-20">
        <SectionHeader
          label="Questions"
          heading={<>Frequently Asked <em className="italic text-weddingPrint">Questions</em></>}
        />
        <div className="mt-4">
          {FAQS.map(({ q, a }) => (
            <FAQItem key={q} q={q} a={a} />
          ))}
        </div>
      </div>
    </section>
  )
}