import { info } from '../data/info'
import { about } from '../data/about'
import { useOutletContext } from 'react-router-dom'
import ClimbingGyms from '../components/ClimbingGyms'

export default function About() {
  const { weather, coords } = useOutletContext()

  return (
    <section id="about" className="py-[12rem] px-[6vw] min-h-dvh flex items-center">
      <div className="w-full flex flex-col gap-20">

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-20 items-center">
          <div className="reveal relative aspect-square rounded-2xl bg-tq-pale flex flex-col items-center justify-center gap-4
            overflow-hidden transition-transform duration-400 hover:scale-[1.02]">
            <img src={info.coolPic} alt={info.name} className='w-full h-full object-cover'/>
            <div className="absolute bottom-5 right-5 z-20 bg-white rounded-[10px] px-3.5 py-2
              shadow-[0_8px_24px_rgba(0,0,0,0.1)] font-display text-xs font-semibold text-ink
              flex items-center gap-1.5 animate-float">
              📍 {info.location}
            </div>
          </div>

          <div>
            <p className="section-eyebrow-wrapper reveal">About me</p>
            <h2 className="section-heading reveal">
              {about.headline[0]}<br />{about.headline[1]}
            </h2>
            <div className="space-y-4 mb-8">
              {about.paragraphs.map((paragraph, i) => (
                <p key={paragraph.id} className={`reveal delay-${i + 1} section-text`}>
                  {paragraph.text}
                </p>
              ))}
            </div>
            <div className="reveal delay-3 flex flex-col gap-0">
              {about.values.map(({ id, icon, text }) => (
                <div key={id}
                  className="flex items-center gap-3 text-xl text-ink-2 py-2.5
                    border-b border-rule last:border-none
                    transition-all duration-200 cursor-default hover:text-ink hover:pl-1.5">
                  <span className="w-5 text-center text-xl">{icon}</span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {coords?.lat && coords?.lng && (
          <ClimbingGyms lat={coords.lat} lng={coords.lng} />
        )}

      </div>
    </section>
  )
}