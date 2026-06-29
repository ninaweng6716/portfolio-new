import { useState, useRef, useEffect } from "react"
import { SectionHeader } from "../components/WeddingPrimitives"
import { FAQS } from "../data/faqs"

function FAQItem({ q, content }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(bodyRef.current.scrollHeight)
    }
  }, [content])

  return (
    <li className="border-b border-weddingTq-light py-5 last:border-0">
      <h3 className="font-weddingBody text-weddingPrint text-[1.05rem] leading-snug tracking-wide">
        <button
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 text-left
                     cursor-pointer focus-visible:outline-2 focus-visible:outline-weddingTq focus-visible:outline-offset-2"
        >
          <span className="text-lg">{q}</span>
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
      </h3>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? height : 0, opacity: open ? 1 : 0 }}
      >
        <p
          ref={bodyRef}
          className="font-weddingBody text-weddingPrint/75 text-lg leading-relaxed pt-3 pb-1 whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </li>
  )
}

export default function FAQSection() {
  return (
    <section id="faq">
      <div className="max-w-2xl mx-auto px-8 py-20">
        <SectionHeader
          heading={<>See the <em className="italic text-weddingPrint">FAQs</em></>}
        />
        <ul className="mt-4 list-none p-0">
          {FAQS.map((item) => (
            <FAQItem key={item.q} q={item.q} content={item.content} />
          ))}
        </ul>
      </div>
    </section>
  )
}