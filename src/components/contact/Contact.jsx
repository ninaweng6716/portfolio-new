import { useState } from "react"
import { contactData } from "../../data/contact"
import ContactRow from "./ContactRow"
import MailToast from "./MailToast"

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
        <p className="section-eyebrow-wrapper reveal">
          Get in touch
        </p>

        <h2 className="section-heading reveal">
          Let's build
          <br />
          something great
        </h2>

        <p className="reveal delay-1 section-text">
          Open to projects of all shapes and sizes and
          interesting conversations about the web,
          climbing, and life.
        </p>
      </div>

      <div className="flex flex-col gap-5 relative z-10">
        {Object.entries(contactData).map(
          ([key, value], i) => (
            <ContactRow
              key={key}
              contactKey={key}
              value={value}
              index={i}
              onEmailClick={handleEmailClick}
            />
          )
        )}
      </div>
    </section>
  )
}